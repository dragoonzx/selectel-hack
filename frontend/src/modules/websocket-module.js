class WebSocketModule {
    static websocket = new WebSocket("ws://127.0.0.1:3001/");

    static send(event) {
        this.websocket.send(JSON.stringify(event));
    }
}