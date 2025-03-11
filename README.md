# Huffman Text Compression 🚀

A powerful text compression tool implementing Huffman Coding, an optimal lossless compression algorithm. This project allows users to input text and receive a compressed binary representation along with compression statistics, execution time, and Huffman character mappings.
## Live Demo
[Live Demo](https://thegravityfalls-11.github.io/HuffMan-Coding/)

## What Problem Does It Solve? 🤔

### 1. Reduces Text Size Efficiently 📉

- Compresses input text into a smaller binary format, saving storage space.
- Displays original vs. compressed size and compression ratio.

### 2. Provides Compression Insights 📊

- Shows execution time for compression.
- Displays Huffman character mappings.
- Visualizes compression ratio with a circular progress bar.

### 3. Improves Data Transmission & Storage 📂

- Useful for sending large text data over networks with reduced bandwidth.
- Helps in storing large documents efficiently.

## Technology Stack 🛠️

- **Frontend**: HTML, CSS (UI & Animations)
- **Backend Logic (Client-Side)**: JavaScript (for Huffman Encoding Algorithm)
- **Data Visualization**: SVG for progress circles, dynamic DOM manipulation for stats display

## Features ✨

### 1. Intuitive User Interface

- Simple text input field with a clean design.
- "Compress" button to initiate Huffman encoding.
- Animated loading indicator during compression.

### 2. Real-Time Compression Statistics

- Original & Compressed Size: Displays text size before and after compression.
- Compression Ratio: Visualized with a dynamic circular progress bar.
- Execution Time: Measures the time taken for compression.

### 3. Huffman Encoding Details

- Compressed Binary Output: Displays the compressed binary representation of the input text.
- Character Mappings: Shows the Huffman code assigned to each character.

### 4. Algorithm Complexity Analysis ⚡

- Displays Time Complexity (O(n log n)) and Space Complexity (O(n)) of Huffman coding.
- Explains why Huffman Compression is efficient with a tooltip feature.

## Setup & Installation 🚀

Follow the steps below to set up and run Huffman Text Compression on your local system.

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

![Front Page](https://github.com/user-attachments/assets/fcc51825-76f3-43ae-a362-eb32869182b2)

### Compression Result

![Result Page](https://github.com/user-attachments/assets/e161bcd8-fd0c-4720-a7fb-af82da3cb3c1)

## Usage 🎯

1. Enter text into the input box.
2. Click "Compress" to initiate Huffman encoding.
3. View compression results, including:
   - Compressed binary output.
   - Huffman character mappings.
   - Compression ratio & execution time.
4. Analyze algorithm complexity in the info section.

## Future Scope 🔮

### 1. File Compression Support

- Extend functionality to support text file uploads for compression.

### 2. Multi-Language Support

- Optimize for different character encodings (UTF-8, Unicode, etc.).

### 3. Huffman Decoding Feature

- Implement decompression for recovering the original text from binary output.

### 4. Advanced Compression Algorithms

- Compare Huffman Coding with LZW, Arithmetic Encoding, etc.

### 5. Performance Optimization

- Improve time efficiency by optimizing data structures.

## License 📜

This project is licensed under the MIT License – free to use and modify.

## Contact & Contributions 🤝
- GitHub: [Huffman-Text-Compression](https://github.com/TheGravityFalls-11/HuffMan-Coding)



