#отправить в канал 

import random
import requests
import json 
import os
import time
import re
import pandas as pd
import psycopg2
from psycopg2 import sql
from slackclient import SlackClient

TOKEN = 'xoxb-778749144738-795422339110-30gEq1TjPfsw1JqImjBEeuNO'
# instantiate Slack client
slack_client = SlackClient(TOKEN)
# starterbot's user ID in Slack: value is assigned after the bot starts up
starterbot_id = None

# constants
RTM_READ_DELAY = 1 # 1 second delay between reading from RTM
EXAMPLE_COMMAND = "help"
MENTION_REGEX = "^<@(|[WU].+?)>(.*)"
HELP_RESPONSE = "Hi, this is Report Bot. That's what I can do: \n \
    help -- this bouqelet \n \
    refresh_db -- insert new users into database"


def parse_bot_commands(slack_events):
    """
        Parses a list of events coming from the Slack RTM API to find bot commands.
        If a bot command is found, this function returns a tuple of command and channel.
        If its not found, then this function returns None, None.
    """
    for event in slack_events:
        if event["type"] == "message" and not "subtype" in event:
            user_id, message = parse_direct_mention(event["text"])
            if user_id == starterbot_id:
                return message, event["channel"]
    return None, None

def parse_direct_mention(message_text):
    """
        Finds a direct mention (a mention that is at the beginning) in message text
        and returns the user ID which was mentioned. If there is no direct mention, returns None
    """
    matches = re.search(MENTION_REGEX, message_text)
    # the first group contains the username, the second group contains the remaining message
    return (matches.group(1), matches.group(2).strip()) if matches else (None, None)

def handle_command(command, channel):
    """
        Executes bot command if the command is known
    """
    # Default response is help text for the user
    default_response = "Not sure what you mean. Try *{}*.".format(EXAMPLE_COMMAND)

    # Finds and executes the given command, filling in response
    response = None
    # This is where you start to implement more commands!

    if command.startswith(EXAMPLE_COMMAND):
        response = HELP_RESPONSE
   
    elif command.startswith('refresh_db'):
       
        #Connect to database
        conn = psycopg2.connect(dbname='retrospective_db', user='retro_user', password='2427980baba', host='127.0.0.1', port='5432')
        
        #Fetch user id's from it 
        cursor = conn.cursor()
        cursor.execute('SELECT u.id FROM retros_users u')
        
        #Create a set of external user ids
        user_ids_external = cursor.fetchall()
        user_ids_external = set([user_ids_external[i][0] for i in range(len(user_ids_external))]) 

        #Get dictionary of members
        user_list = requests.get('https://slack.com/api/users.list?token=xoxb-778749144738-795422339110-30gEq1TjPfsw1JqImjBEeuNO').json()['members']
        
        #Make relevant dataframe and set of internal user ids
        user_dataframe = pd.DataFrame(user_list)
        user_dataframe = user_dataframe[['id', 'real_name']]        
        user_ids_internal = set(user_dataframe['id'].values)

        records_difference = user_ids_internal - user_ids_external
        #print('Set difference: ' + str(records_difference))
        
        if len(records_difference) > 1:
           
            users_difference_dataframe = user_dataframe.loc[user_dataframe['id'].isin(records_difference)]
            #Make (almost)random passwords for new members 
            alphabet = "abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            users_difference_dataframe['passwords'] = pd.Series(["".join(random.sample(alphabet, 10)) for i in range(users_difference_dataframe.shape[0])])

            #Here we want to get only those rows which are in the difference
        
            values_to_insert = [tuple(x) for x in users_difference_dataframe.values if 'UP9FTA18V' not in x]
            #print(values_to_insert)
        
            insertion_query = 'INSERT INTO retros_users (id, name, password) VALUES {};'.format(','.join(list(map(str,values_to_insert))))
            #print(insertion_query)

            #Make query happen
            cursor.execute(insertion_query)
            conn.commit()
            
            response  = 'Session started! New members added. Authentication code is: {code}'.format(code="".join(random.sample(alphabet, 10)))
            
            for user in records_difference:
                user_id = requests.post('https://slack.com/api/im.open', data={'token': TOKEN, 'user': user}).json()
                if user_id['ok'] == True:
                    
                    user_id = user_id['channel']['id']
                    user_info = (users_difference_dataframe[users_difference_dataframe['id'] == user]['real_name'].iloc[0],
                             users_difference_dataframe[users_difference_dataframe['id'] == user]['passwords'].iloc[0])
                    
                    slack_client.api_call('chat.postMessage', 
                    channel=user_id,
                    text='Hi! Your credentials are: \n \
                        Login: {login} \n \
                        Password: {password}'.format(login=user_info[0], password=user_info[1])
                    )
                else:
                    continue
            
            cursor.close()
            conn.close()
        else:
            response  = 'Session started! No new members. Authentication code is: {code}'.format(code="".join(random.sample(alphabet, 10)))
            cursor.close()
            conn.close()
        
        

       
    
    # Sends the response back to the channel
    if response is None:
        slack_client.api_call(
        "chat.postMessage",
        channel=channel,
        text=default_response
    )
    else: 
        slack_client.api_call(
        "chat.postMessage",
        channel=channel,
        text=response
    )

if __name__ == "__main__":
    if slack_client.rtm_connect(with_team_state=False):
        print("Starter Bot connected and running!")
        # Read bot's user ID by calling Web API method `auth.test`
        starterbot_id = slack_client.api_call("auth.test")["user_id"]
        while True:
            command, channel = parse_bot_commands(slack_client.rtm_read())
            if command:
                handle_command(command, channel)
            time.sleep(RTM_READ_DELAY)
    else:
        print("Connection failed. Exception traceback printed above.")


