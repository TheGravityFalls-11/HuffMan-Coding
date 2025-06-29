import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import classification_report, accuracy_score
import warnings
warnings.filterwarnings('ignore')

def load_and_preprocess_data():
    """Load and preprocess the dataset"""
    print("📊 Loading dataset...")
    df = pd.read_csv('village_tech_gap_dataset_500.csv')
    
    print(f"📈 Dataset shape: {df.shape}")
    print(f"📋 Columns: {list(df.columns)}")
    
    # Drop missing values in important columns
    initial_rows = len(df)
    df.dropna(subset=[
        'Crops', 'Machines Available', 'Suggested Machines',
        'Land Size (Acres)', 'Labor Issues', 'Tech Gaps'
    ], inplace=True)
    
    print(f"🧹 Removed {initial_rows - len(df)} rows with missing values")
    print(f"✅ Final dataset size: {len(df)} rows")
    
    return df

def preprocess_features(df):
    """Preprocess and encode features"""
    print("🔄 Preprocessing features...")
    
    # Split list-like fields and clean them
    df['Crops'] = df['Crops'].apply(lambda x: [i.strip() for i in str(x).split(',') if i.strip()])
    df['Machines Available'] = df['Machines Available'].apply(lambda x: [i.strip() for i in str(x).split(',') if i.strip()])
    df['Tech Gaps'] = df['Tech Gaps'].apply(lambda x: [i.strip() for i in str(x).split(',') if i.strip()])
    df['Suggested Machines'] = df['Suggested Machines'].apply(lambda x: [i.strip() for i in str(x).split(',') if i.strip()])
    df['Labor Issues'] = df['Labor Issues'].astype(str).str.strip()
    
    # Initialize encoders
    mlb_crops = MultiLabelBinarizer()
    mlb_machines = MultiLabelBinarizer()
    mlb_tech_gaps = MultiLabelBinarizer()
    mlb_suggested = MultiLabelBinarizer()
    le_labor = LabelEncoder()
    
    # Encode features
    X_crops = mlb_crops.fit_transform(df['Crops'])
    X_machines = mlb_machines.fit_transform(df['Machines Available'])
    X_tech_gaps = mlb_tech_gaps.fit_transform(df['Tech Gaps'])
    X_labor = le_labor.fit_transform(df['Labor Issues']).reshape(-1, 1)
    X_land = df[['Land Size (Acres)']].values
    
    # Combine all features
    X = np.concatenate([X_crops, X_machines, X_tech_gaps, X_labor, X_land], axis=1)
    y = mlb_suggested.fit_transform(df['Suggested Machines'])
    
    print(f"🎯 Feature matrix shape: {X.shape}")
    print(f"🎯 Target matrix shape: {y.shape}")
    print(f"📝 Available crops: {list(mlb_crops.classes_)}")
    print(f"🔧 Available machines: {list(mlb_machines.classes_)}")
    print(f"⚠️ Tech gaps: {list(mlb_tech_gaps.classes_)}")
    print(f"👥 Labor issues: {list(le_labor.classes_)}")
    print(f"💡 Suggested machines: {list(mlb_suggested.classes_)}")
    
    return X, y, mlb_crops, mlb_machines, mlb_tech_gaps, mlb_suggested, le_labor

def train_model(X, y):
    """Train the machine learning model"""
    print("🤖 Training model...")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y.sum(axis=1)
    )
    
    # Train model with optimized parameters
    model = MultiOutputClassifier(
        RandomForestClassifier(
            n_estimators=200,
            max_depth=15,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1
        )
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test)
    
    print("\n🎯 Model Performance:")
    print(f"📊 Training samples: {len(X_train)}")
    print(f"📊 Testing samples: {len(X_test)}")
    
    # Calculate accuracy for each output
    accuracies = []
    for i in range(y_test.shape[1]):
        acc = accuracy_score(y_test[:, i], y_pred[:, i])
        accuracies.append(acc)
    
    print(f"📈 Average accuracy: {np.mean(accuracies):.3f}")
    print(f"📈 Min accuracy: {np.min(accuracies):.3f}")
    print(f"📈 Max accuracy: {np.max(accuracies):.3f}")
    
    return model, X_test, y_test, y_pred

def save_model_and_encoders(model, mlb_crops, mlb_machines, mlb_tech_gaps, mlb_suggested, le_labor):
    """Save model and encoders"""
    print("💾 Saving model and encoders...")
    
    joblib.dump(model, 'model.pkl')
    joblib.dump(mlb_crops, 'mlb_crops.pkl')
    joblib.dump(mlb_machines, 'mlb_machines.pkl')
    joblib.dump(mlb_tech_gaps, 'mlb_tech_gaps.pkl')
    joblib.dump(mlb_suggested, 'mlb_suggested.pkl')
    joblib.dump(le_labor, 'le_labor.pkl')
    
    print("✅ All files saved successfully!")

def main():
    """Main training pipeline"""
    print("🚀 Starting Agricultural Machinery Prediction Model Training")
    print("=" * 60)
    
    try:
        # Load and preprocess data
        df = load_and_preprocess_data()
        
        # Preprocess features
        X, y, mlb_crops, mlb_machines, mlb_tech_gaps, mlb_suggested, le_labor = preprocess_features(df)
        
        # Train model
        model, X_test, y_test, y_pred = train_model(X, y)
        
        # Save everything
        save_model_and_encoders(model, mlb_crops, mlb_machines, mlb_tech_gaps, mlb_suggested, le_labor)
        
        print("\n🎉 Training completed successfully!")
        print("🔧 You can now run the Flask app with: python app.py")
        
    except Exception as e:
        print(f"❌ Error during training: {str(e)}")
        raise

if __name__ == '__main__':
    main()
