from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

@app.route('/api/confirm', methods=['POST'])
def confirm():
    data = request.json
    # Here you could save to a database or process the data
    print('Received confirmation:', data)
    return jsonify({'status': 'success', 'message': 'Confirmation received'})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
