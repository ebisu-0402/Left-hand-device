from bluedot import BlueDot
import time

def start_server():
    bd = BlueDot()
    bd.start_server()
    print("Server started, waiting for connections...")
    
    def handle_client(client):
        print(f"Client connected: {client}")
        while True:
            data = client.receive()
            if data:
                print(f"Received: {data}")
                client.send("Acknowledged")
    
    bd.on_connect(handle_client)

if __name__ == "__main__":
    start_server()
