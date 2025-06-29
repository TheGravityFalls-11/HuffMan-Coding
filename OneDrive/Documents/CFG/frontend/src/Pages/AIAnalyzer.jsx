import React, { useState, useEffect } from 'react';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const geminikey=import.meta.env.VITE_GOOGLE_API_KEY;
import ReactMarkdown from 'react-markdown';

const llm = new ChatGoogleGenerativeAI({
  apiKey:geminikey,
  model: "gemini-2.0-flash",
  temperature: 0,
  maxRetries: 2,
  // other params...
});


const AIAnalyzer = () => {
  
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
        // Simulate API call
        async function fetchVillages(){
    
               const respose = await fetch("http://localhost:8080/api/village/get");
           
               console.log(respose);
               const village= await respose.json();
               console.log(village);
        setVillages(village.info);
          const aiMsg = await llm.invoke([
  [
    "system",
    "You are the provider of a non profit organization involved in distributing farm equipment to rural areas. We prefer villages that are surrounded by most amount of villages and the impact on farming would be the greatest. You will be given json data about villages with appropriate parameters. Return a comprehensive analysis of the same.",
  ],
  ["human",JSON.stringify(village.info)],
]);

setAnalysisResult(aiMsg.content);

console.log("AI Output" , aiMsg.content);
        setLoading(false);
        }


      
    
        fetchVillages();
       
  }, []);

  const styles = {
    container: {
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#2E7D32',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#666',
      marginBottom: '30px'
    },
    resultContainer: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
      border: '2px solid #E8F5E8'
    },
    resultLabel: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#2E7D32',
      marginBottom: '15px'
    },
    resultTextarea: {
      width: '100%',
      minHeight: '120px',
      padding: '15px',
      border: '2px solid #E0E0E0',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      resize: 'vertical',
      backgroundColor: '#F8F9FA'
    },
    loading: {
      textAlign: 'center',
      padding: '30px',
      color: '#666'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #4CAF50',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 15px'
    },
    error: {
      background: '#FFEBEE',
      color: '#C62828',
      padding: '15px',
      borderRadius: '8px',
      borderLeft: '4px solid #F44336',
      marginBottom: '20px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.header}>
        <h1 style={styles.title}>🤖 AI Analyzer</h1>
        <p style={styles.subtitle}>Village analysis results based on agricultural productivity</p>
      </div>

      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>AI is analyzing village data...</p>
        </div>
      )}

      <div style={styles.resultContainer}>
        <label style={styles.resultLabel}>
          📊 Villages Sorted by AI Analysis:
        </label>
          <ReactMarkdown>{analysisResult}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AIAnalyzer; 