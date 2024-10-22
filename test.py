from flask import Flask, request, jsonify
import subprocess
import pyautogui
import pyperclip
import time

app = Flask(__name__)

@app.route('/command', methods=['POST'])
def receive_command():
    data = request.json
    command = data.get('command', '')
    print(f"Received command: {command}")

    try:
        if command == 'Chrome':
            # Chromeを開く
            subprocess.Popen("start chrome", shell=True)
            print("Chrome opened.")

        elif command == 'file':
            # ファイルエクスプローラーを開く
            subprocess.Popen(["explorer"])
            print("File Explorer opened.")

        elif command == 'copy':
            # コピー操作
            pyautogui.hotkey('ctrl', 'c')
            time.sleep(0.5)  # コピーの待機時間
            clipboard_text = pyperclip.paste()
            print(f"Text copied to clipboard: {clipboard_text}")

        elif command == 'paste':
            # ペースト操作
            pyautogui.hotkey('ctrl', 'v')
            print("Text pasted at cursor position.")
        
        elif command == 'teams':  
            # Teams URLを開く
            url = "https://teams.microsoft.com/v2/?culture=ja-jp&country=jp&clientexperience=t2"
            subprocess.Popen(f"start chrome {url}", shell=True)
            print(f"Opened {url} in Chrome.")

        elif command == 'login':
            # 特定のテキストを貼り付ける
            specific_text = "oca2204240003@edu.oca.ac.jp"
            pyperclip.copy(specific_text) 
            pyautogui.hotkey('ctrl', 'v') 
            pyautogui.hotkey('enter') 
            print(f"Pasted text: {specific_text}")

        else:
            raise ValueError(f"Unknown command: {command}")

        # 成功時にステータスを返す
        return jsonify({'status': 'success'}), 200

    except Exception as e:
        # エラー時の処理
        print(f"Command execution failed: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
