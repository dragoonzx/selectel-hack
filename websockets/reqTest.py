# import pickle
# import psycopg2
# from psycopg2 import sql
# obj = ['asnfklqnfkl', 'sadnld', 'asndlas', 'gkfmr']
# x = pickle.dumps(obj)
# obj1 = pickle.loads(x)
# print(obj1)

# conn = psycopg2.connect(dbname='retrospective_db', user='retro_user', password='2427980baba', host='127.0.0.1', port='5432')
# cursor = conn.cursor()

# x = ['fhwp868faw', ['JBiJoNn8Ex', 'eO8KIalvPC', 'pFOIoSA2OH'], ['3kj5iPujsR', 'Q6lFo53Jin', '55wBhuCuX9'], ['CBsqibldzs', 'qvOEQkCIHD', 'kNPmNMmx5e'], ['Yl21d4cCtf', 'plbiWBMYCY', 'TtNMZSSe0x']]
# for i in range(1, 5):
#     x[i] = '&'.join(x[i])
# print(x)
# values = [tuple(x)]

# insert = 'INSERT INTO retros_session (id, payers, oneword, aff_pain, pigs) VALUES {};'.format(','.join(list(map(str,values))))
# print(insert)

# cursor.execute(insert)
# conn.commit()

# cursor.close()
# conn.close()
import requests

x = requests.post('http://46.182.24.183:8000/user/Romalox/1234')
print(x)