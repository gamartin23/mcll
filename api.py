from flask import Flask, jsonify, request
from flask_limiter import Limiter, util
import json
from flask_cors import CORS
import random
from colorsys import hsv_to_rgb

app = Flask(__name__)
CORS(app, allow_headers=["Content-Type", "hx-trigger"], resources={r"/api/*": {"origins": {"https://edetculiao.xyz","http://127.0.0.1:5500","http://127.0.0.1:8000"}}})

limiter = Limiter(util.get_remote_address, app=app, default_limits=["1 per second"]
)
try:
    with open("/home/kovaqa/counter_base.txt", "r") as cb:
        counter = int(cb.read())
except:
    counter = 0

try:
    with open("/home/kovaqa/counter_qr.txt", "r") as cq:
        qr_counter = int(cq.read())
except:
    qr_counter = 0
print(f'KQA | {counter} || {qr_counter}')

COUNTER_FILE_PATH = "counter_all.json"
def load_json_counters():
    try:
        with open(COUNTER_FILE_PATH, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}  # Si el archivo no existe, devolvemos un diccionario vacío

def save_counters(counters):
    try:
        with open(COUNTER_FILE_PATH, "w") as f:
            json.dump(counters, f,indent=4)
    except Exception as e:
        print(f"Error saving counters: {e}")

#Default Edetculiao.xyz API

@app.route('/api/get-counter', methods=['GET'])
@limiter.exempt
def get_counter():
    print(f'KQA | Edet Culiao returned counter: {counter} for client {request.remote_addr}')
    return str(counter)

@app.route('/api/increment-counter', methods=['POST'])
@limiter.limit("1/second")
def increment_counter():
    global counter
    counter += 1
    try:
        with open("/home/kovaqa/counter_base.txt", "w") as cb:
            cb.write(str(counter))
    except:
        pass
    print(f'KQA | Edet Culiao returned counter: {counter} for client {request.remote_addr}')
    return str(counter)

@app.route('/api/reset-co', methods=['GET'])
def reset_counter():
    global counter
    counter = 0
    print(f'KQA | Edet Culiao resetted counter: {counter} for client {request.remote_addr}')
    return str(counter)

#qr counter

@app.route('/api/get-qr-counter', methods=['GET'])
@limiter.exempt
def get_qr_counter():
    return str(f'KQA | QR scans: {qr_counter}')

@app.route('/api/increment-qr-counter', methods=['POST'])
@limiter.exempt
def increment_qr_counter():
    global qr_counter
    qr_counter += 1
    try:
        with open("/home/kovaqa/counter_qr.txt", "w") as cb:
            cb.write(str(qr_counter))
    except:
        pass
    print(f'KQA | QR Scanned by client {request.remote_addr} | Current scans: {qr_counter}')
    return str(qr_counter),200

@app.route('/api/increment-qr-counter', methods=['OPTIONS'])
def handle_preflight():
    response = app.response_class(
        response='Cómo será la laguna, que el chancho la cruza al trote',
        status=204,
        headers={
            'Access-Control-Allow-Origin': 'https://edetculiao.xyz',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    )
    return response, 204

@app.route('/api/reset-qr-co', methods=['GET'])
def reset_qr_counter():
    global qr_counter
    qr_counter = 0
    return str(f'KQA | QR scan counter resetted: {qr_counter} from client {request.remote_addr}')

@app.route('/api/get-colour', methods=['GET'])
@limiter.exempt
def generate_water_color():
    #Randomly select a palette
    palette = random.choices(["dirty", "clear", "white"], weights=[47,47,6],k=1)[0]

    #Generate a color based on the selected palette's rules
    if palette == "dirty":
        hue = random.uniform(15, 45)  # Hue range for dirty palette
        # Saturation varies depending on hue
        if hue < 30:
            saturation = random.uniform(0.75, 1.0)  # Closer to 15, more saturated
        else:
            saturation = random.uniform(0.6, 0.75)  # Closer to 45, less saturated
        brightness = random.uniform(0.45, 0.6)  # Darker brightness
    elif palette == 'clear':  # "clear"
        hue = random.uniform(20, 40)  # Hue range for clear palette
        saturation = random.uniform(0, 0.45)  # Less saturated for clear colors
        brightness = 1.0  # Brightness is always full for clear palette
    elif palette == 'white':
        hue = 0
        saturation = 0
        brightness = 1.0

    #Convert HSV to RGB
    r, g, b = hsv_to_rgb(hue / 360.0, saturation, brightness)  # Convert hue to 0-1 scale
    r, g, b = int(r * 255), int(g * 255), int(b * 255)

    colour = f"#{r:02x}{g:02x}{b:02x}"
    print(f'KQA | SAT generated {colour} for client {request.remote_addr}')
    return colour

#Default mecortaronlaluz.com API
@app.route('/api/mcll-post', methods=['OPTIONS'])
def handle_json_preflight():
    response = app.response_class(
        response='Cómo será la laguna, que el chancho la cruza al trote',
        status=204,
        headers={
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, hx-trigger, hx-target, hx-swap, hx-current-url, hx-request'
        }
    )
    return response, 204

@app.route('/api/mcll-post', methods=['POST'])
@limiter.limit("1/second")
def increment_json_counter():
    counters = load_json_counters()
    data=str(request.full_path).split('?')[1]
    
    if not data:
        return jsonify({"error": "Invalid data"}), 400
    div_id = data
    if not div_id:
        return jsonify({"error": "Missing divId"}), 400
    if div_id in counters:
        counters[div_id] += 1
    else:
        counters[div_id] = 1
    print(counters)
    save_counters(counters)
    print(f'KQA | Counter updated for div: {div_id}, current counter: {counters[div_id]} for client {request.remote_addr}')
    return jsonify({"counter": counters[div_id]}), 200

@app.route('/api/mcll-get', methods=['GET'])
def get_json_counters():
    counters = load_json_counters()
    print(f'KQA | Counter served for client {request.remote_addr}\n')
    return jsonify(counters)

if __name__ == '__main__':
    app.run()