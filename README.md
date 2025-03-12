# Huffman Compression Tool 🚀  

A powerful **compression tool** implementing **Huffman Coding** for both **text** and **image compression**. It provides an efficient way to reduce file sizes while maintaining quality.  

## Live Demo  
[Live Demo](https://thegravityfalls-11.github.io/HuffMan-Coding/)  

## What Problem Does It Solve? 🤔  

### 1. **Reduces Text & Image Size Efficiently** 📉  
- Compresses input text into a smaller binary format, saving storage space.  
- Compresses images using Huffman encoding to reduce file size without significant quality loss.  
- Displays original vs. compressed size and compression ratio.  

### 2. **Provides Compression Insights** 📊  
- Shows execution time for compression.  
- Displays Huffman character mappings.  
- Visualizes compression ratio with a circular progress bar.  

### 3. **Improves Data Transmission & Storage** 📂  
- Useful for sending large text/image data over networks with reduced bandwidth.  
- Helps in storing large files efficiently.  

## Technology Stack 🛠️  

- **Frontend**: HTML, CSS (UI & Animations)  
- **Backend Logic (Client-Side)**: JavaScript (for Huffman Encoding Algorithm)  
- **Data Visualization**: SVG for progress circles, dynamic DOM manipulation for stats display  

## Features ✨  

### 1. **Intuitive User Interface**  
- Simple text input and image upload field with a clean design.  
- "Compress" button to initiate Huffman encoding.  
- Animated loading indicator during compression.  

### 2. **Real-Time Compression Statistics**  
- **Original & Compressed Size**: Displays text/image size before and after compression.  
- **Compression Ratio**: Visualized with a dynamic circular progress bar.  
- **Execution Time**: Measures the time taken for compression.  

### 3. **Huffman Encoding Details**  
- **Compressed Binary Output**: Displays the compressed binary representation of the input text.  
- **Character Mappings**: Shows the Huffman code assigned to each character.  

### 4. **Algorithm Complexity Analysis** ⚡  
- Displays **Time Complexity (O(n log n))** and **Space Complexity (O(n))** of Huffman coding.  
- Explains why Huffman Compression is efficient with a tooltip feature.  

## Image Compression 🖼️  
- Supports **lossless compression** for images using Huffman coding.  
- Allows users to upload an image, compress it, and download the compressed version.  
- Reduces image file size while preserving quality.  

## Setup & Installation 🚀  

Follow the steps below to set up and run **Huffman Compression Tool** on your local system.  

### Prerequisites  
- A web browser (Chrome, Firefox, Edge, etc.).  
- A local or online server for execution (optional, but improves performance).  

### Running the Project  

#### 1. Clone the Repository  
```sh
git clone https://github.com/TheGravityFalls-11/HuffMan-Coding.git
```  

#### 2. Navigate to the Project Directory  
```sh
cd HuffMan-Coding
```  

#### 3. Open `index.html` in a browser  
- Simply double-click `index.html` or open it via VS Code Live Server.  

#### 4. (Optional) Run on a Local Server  
```sh
python -m http.server 8000  # Runs a simple Python HTTP server
```  
Then, open `http://localhost:8000` in your browser.  

## Screenshots 📷  

### Home Page  
![Front Page](https://github.com/user-attachments/assets/60c028a6-5317-4871-a300-d3068f9b5c00)

###  Text Compression Result  
![Result Page](https://github.com/user-attachments/assets/e161bcd8-fd0c-4720-a7fb-af82da3cb3c1)  

### Image Compression Result
![Result Page](https://github.com/user-attachments/assets/7ecaff30-f92f-4462-8775-b67c6ef6139f)

## Usage 🎯  

1. **For Text Compression**  
   - Enter text into the input box.  
   - Click "Compress" to initiate Huffman encoding.  
   - View compression results, including:  
     - Compressed binary output.  
     - Huffman character mappings.  
     - Compression ratio & execution time.  

2. **For Image Compression**  
   - Upload an image file.  
   - Click "Compress" to start image compression.  
   - Download the compressed image.  

## Future Scope 🔮  

### 1. **File Compression Support**  
- Extend functionality to support **multiple file formats** for compression.  

### 2. **Multi-Language Support**  
- Optimize for different character encodings (UTF-8, Unicode, etc.).  

### 3. **Huffman Decoding Feature**  
- Implement decompression for recovering the original text and images.  

### 4. **Advanced Compression Algorithms**  
- Compare Huffman Coding with **LZW, Arithmetic Encoding, etc.**  

### 5. **Performance Optimization**  
- Improve time efficiency by optimizing data structures.  

## License 📜  
This project is licensed under the **MIT License** – free to use and modify.  

## Contact & Contributions 🤝  
- GitHub: [Huffman-Compression-Tool](https://github.com/TheGravityFalls-11/HuffMan-Coding)  
