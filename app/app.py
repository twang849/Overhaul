from flask import Flask, render_template, request, jsonify
import os

# Import your object detection blueprint
from app.ai.object_detection import object_detection_bp

def create_app():
    app = Flask(__name__)
    
    # Register the object detection blueprint
    app.register_blueprint(object_detection_bp)
    
    # Ensure the static directory exists
    os.makedirs('app/static/js', exist_ok=True)
    
    # Add route for the scanner page
    @app.route('/scanner')
    def scanner():
        return render_template('scanner.html')
    
    # Add other existing routes
    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/about')
    def about():
        return render_template('about.html')
    
    # Add more routes as needed
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)