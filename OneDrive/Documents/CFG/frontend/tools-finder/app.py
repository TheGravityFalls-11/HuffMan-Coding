from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os
from datetime import datetime

app = Flask(__name__)

# Global variables for models and encoders
model = None
mlb_crops = None
mlb_machines = None
mlb_tech_gaps = None
mlb_suggested = None
le_labor = None

def load_models():
    """Load all models and encoders"""
    global model, mlb_crops, mlb_machines, mlb_tech_gaps, mlb_suggested, le_labor
    
    try:
        print("🔄 Loading models and encoders...")
        model = joblib.load("model.pkl")
        mlb_crops = joblib.load("mlb_crops.pkl")
        mlb_machines = joblib.load("mlb_machines.pkl")
        mlb_tech_gaps = joblib.load("mlb_tech_gaps.pkl")
        mlb_suggested = joblib.load("mlb_suggested.pkl")
        le_labor = joblib.load("le_labor.pkl")
        print("✅ All models loaded successfully!")
        return True
    except Exception as e:
        print(f"❌ Error loading models: {str(e)}")
        return False

def get_available_options():
    """Get all available options for dropdowns"""
    return {
        'crops': sorted(mlb_crops.classes_.tolist()),
        'machines': sorted(mlb_machines.classes_.tolist()),
        'tech_gaps': sorted(mlb_tech_gaps.classes_.tolist()),
        'labor_issues': sorted(le_labor.classes_.tolist()),
        'suggested_machines': sorted(mlb_suggested.classes_.tolist())
    }

@app.route('/')
def home():
    """Home page"""
    if not all([model, mlb_crops, mlb_machines, mlb_tech_gaps, mlb_suggested, le_labor]):
        if not load_models():
            return render_template('error.html', 
                                 error="Failed to load models. Please ensure all .pkl files are present.")
    
    options = get_available_options()
    return render_template('index.html', options=options)

@app.route('/predict', methods=['POST'])
def predict():
    """Make prediction"""
    try:
        # Get form data
        village_name = request.form.get('village_name', '').strip()
        crops = request.form.getlist('crops')
        machines = request.form.getlist('machines')
        tech_gaps = request.form.getlist('tech_gaps')
        labor_issue = request.form.get('labor_issue', '').strip()
        land_size = float(request.form.get('land_size', 0))
        
        # Validate inputs
        if not village_name:
            raise ValueError("Village name is required")
        if not crops:
            raise ValueError("At least one crop must be selected")
        if not machines:
            raise ValueError("At least one machine type must be selected")
        if not tech_gaps:
            raise ValueError("At least one tech gap must be selected")
        if not labor_issue:
            raise ValueError("Labor issue must be selected")
        if land_size <= 0:
            raise ValueError("Land size must be greater than 0")
        
        # Encode features
        crops_encoded = mlb_crops.transform([crops])
        machines_encoded = mlb_machines.transform([machines])
        tech_gaps_encoded = mlb_tech_gaps.transform([tech_gaps])
        
        # Handle unknown labor issues
        try:
            labor_encoded = le_labor.transform([labor_issue]).reshape(1, 1)
        except ValueError:
            # If labor issue not in training data, use most common one
            labor_encoded = le_labor.transform([le_labor.classes_[0]]).reshape(1, 1)
        
        land_encoded = np.array([[land_size]])
        
        # Combine features
        X_input = np.concatenate([
            crops_encoded, 
            machines_encoded, 
            tech_gaps_encoded, 
            labor_encoded, 
            land_encoded
        ], axis=1)
        
        # Make prediction
        prediction = model.predict(X_input)
        prediction_proba = model.predict_proba(X_input)
        
        # Get suggested machines
        suggested_machines = mlb_suggested.inverse_transform(prediction)[0]
        
        # Calculate confidence scores
        confidence_scores = []
        for i, estimator in enumerate(model.estimators_):
            if len(prediction_proba[i]) > 1:  # Binary classification
                confidence_scores.append(np.max(prediction_proba[i][0]))
            else:
                confidence_scores.append(0.5)  # Default for single class
        
        avg_confidence = np.mean(confidence_scores) * 100
        
        # Prepare result
        result = {
            'village_name': village_name,
            'land_size': land_size,
            'crops': crops,
            'machines': machines,
            'tech_gaps': tech_gaps,
            'labor_issue': labor_issue,
            'suggested_machines': list(suggested_machines),
            'confidence': round(avg_confidence, 1),
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        options = get_available_options()
        return render_template('index.html', options=options, result=result)
        
    except ValueError as ve:
        options = get_available_options()
        return render_template('index.html', options=options, 
                             error=f"Input Error: {str(ve)}")
    except Exception as e:
        options = get_available_options()
        return render_template('index.html', options=options, 
                             error=f"Prediction Error: {str(e)}")

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """API endpoint for predictions"""
    try:
        data = request.get_json()
        
        # Extract data
        crops = data.get('crops', [])
        machines = data.get('machines', [])
        tech_gaps = data.get('tech_gaps', [])
        labor_issue = data.get('labor_issue', '')
        land_size = float(data.get('land_size', 0))
        
        # Encode and predict (same logic as above)
        crops_encoded = mlb_crops.transform([crops])
        machines_encoded = mlb_machines.transform([machines])
        tech_gaps_encoded = mlb_tech_gaps.transform([tech_gaps])
        
        try:
            labor_encoded = le_labor.transform([labor_issue]).reshape(1, 1)
        except ValueError:
            labor_encoded = le_labor.transform([le_labor.classes_[0]]).reshape(1, 1)
        
        land_encoded = np.array([[land_size]])
        
        X_input = np.concatenate([
            crops_encoded, machines_encoded, tech_gaps_encoded, 
            labor_encoded, land_encoded
        ], axis=1)
        
        prediction = model.predict(X_input)
        suggested_machines = mlb_suggested.inverse_transform(prediction)[0]
        
        return jsonify({
            'success': True,
            'suggested_machines': list(suggested_machines),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'models_loaded': all([model, mlb_crops, mlb_machines, mlb_tech_gaps, mlb_suggested, le_labor]),
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Starting Agricultural Machinery Prediction App")
    print("=" * 50)
    
    # Load models on startup
    if load_models():
        print("🌐 Starting Flask server...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("❌ Failed to start app due to model loading errors")
