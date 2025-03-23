from flask import Flask, render_template
from flask_cors import CORS

# Import the blueprint
from app.ai.object_detection import object_detection_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register the blueprint
app.register_blueprint(object_detection_bp)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scanner')
def scanner():
    return render_template('scanner.html')

if __name__ == '__main__':
    print("Starting Overhaul Server...")
    app.run(debug=True, port=5000)
