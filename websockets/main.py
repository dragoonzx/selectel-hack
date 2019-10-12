import asyncio
import json
import logging
import websockets

logging.basicConfig()

STATE = {"value": "empty"}

USERS = set()


def state_event():
    return json.dumps({"type": "data", **STATE})


def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})


async def notify_state():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = state_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def notify_users():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = users_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def register(websocket):
    USERS.add(websocket)
    await notify_users()


async def unregister(websocket):
    USERS.remove(websocket)
    await notify_users()


async def counter(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        await websocket.send(state_event())
        async for message in websocket:
            data = json.loads(message)
            if data:
                STATE["value"] = data["data"]
                await notify_state()
            else:
                logging.error("Massage is empty")
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 3001)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()