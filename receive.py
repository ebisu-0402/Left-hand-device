import asyncio
from bleak import BleakClient

async def run(address):
    try:
        async with BleakClient(address) as client:
            print(f"Connected: {client.is_connected}")
            # ここにデバイスからデータを受信するコードを追加
    except Exception as e:
        print(f"Failed to connect: {e}")

# デバイスアドレスを指定
device_address1 = "9C:2E:7A:ED:A8:39"
device_address2 = "30:A1:FA:04:C3:F4"
asyncio.run(run(device_address1))
asyncio.run(run(device_address2))
