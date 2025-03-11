function createBackgroundElements() {
    const container = document.getElementById('background-animation');
    const bubbleCount = 10;
    const shapeCount = 15;
    
    // Create bubbles
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size between 50px and 200px
        const size = Math.random() * 150 + 50;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 8s and 20s
        const duration = Math.random() * 12 + 8;
        bubble.style.animationDuration = `${duration}s`;
        
        // Random delay
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(bubble);
    }
    
    // Create various shapes
    const shapeTypes = ['triangle', 'square', 'pentagon'];
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.classList.add('shape', shapeType);
        
        // Random position
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 10s and 25s
        const duration = Math.random() * 15 + 10;
        shape.style.animationDuration = `${duration}s`;
        
        // Random delay
        shape.style.animationDelay = `${Math.random() * 8}s`;
        
        container.appendChild(shape);
    }
}

// Update clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Update circular progress
function updateProgressCircle(percentage) {
    const circle = document.getElementById('progress-circle');
    const text = document.getElementById('progress-text');
    
    // Calculate the stroke-dashoffset value
    // The circumference of a circle is 2πr
    // For our circle with r=45, the circumference is approximately 283
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    
    // Update the circle and text
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}%`;
    
    // Change color based on percentage
    if (percentage < 30) {
        circle.style.stroke = '#FF6B8B'; // Light red
    } else if (percentage < 60) {
        circle.style.stroke = '#FF9E80'; // Orange
    } else {
        circle.style.stroke = '#66BB6A'; // Green
    }
}

// Huffman Coding Implementation
class MinHeapNode {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    extractMin() {
        if (this.isEmpty()) return null;
        
        const min = this.heap[0];
        const last = this.heap.pop();
        
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        
        return min;
    }

    bubbleUp() {
        let index = this.size() - 1;
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            if (element.freq >= parent.freq) break;
            
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    sinkDown(index) {
        const length = this.size();
        const element = this.heap[index];
        
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.freq < element.freq) {
                    swap = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.freq < element.freq) || 
                    (swap !== null && rightChild.freq < leftChild.freq)
          || 
                    (swap !== null && rightChild.freq < leftChild.freq)
                ) {
                    swap = rightChildIndex;
                }
            }
            
            if (swap === null) break;
            
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

class HuffmanCoding {
    constructor() {
        this.root = null;
        this.codes = {};
        this.originalSize = 0;
        this.compressedSize = 0;
        this.executionTime = 0;
    }

    buildFrequencyTable(text) {
        const freqTable = {};
        for (let char of text) {
            if (!freqTable[char]) {
                freqTable[char] = 0;
            }
            freqTable[char]++;
        }
        return freqTable;
    }

    buildHuffmanTree(freqTable) {
        const minHeap = new MinHeap();
        
        // Create leaf nodes for each character and add to min heap
        for (let char in freqTable) {
            minHeap.insert(new MinHeapNode(char, freqTable[char]));
        }
        
        // Build Huffman Tree
        while (minHeap.size() > 1) {
            const left = minHeap.extractMin();
            const right = minHeap.extractMin();
            
            // Create a new internal node with frequency equal to the sum
            // of the two nodes' frequencies. The '$' is a placeholder character
            const internalNode = new MinHeapNode('$', left.freq + right.freq);
            internalNode.left = left;
            internalNode.right = right;
            
            minHeap.insert(internalNode);
        }
        
        // The remaining node is the root of the Huffman Tree
        this.root = minHeap.extractMin();
    }

    generateCodes(node, code = '') {
        if (!node) return;
        
        // If this is a leaf node (has a character that's not the placeholder)
        if (node.char !== '$') {
            this.codes[node.char] = code;
            return;
        }
        
        // Traverse left (add '0')
        this.generateCodes(node.left, code + '0');
        
        // Traverse right (add '1')
        this.generateCodes(node.right, code + '1');
    }

    encode(text) {
        let encodedText = '';
        for (let char of text) {
            encodedText += this.codes[char];
        }
        return encodedText;
    }

    compress(text) {
        const startTime = performance.now();
        
        // Calculate original size (assuming 8 bits per character)
        this.originalSize = text.length * 8;
        
        // Build frequency table
        const freqTable = this.buildFrequencyTable(text);
        
        // Build Huffman Tree
        this.buildHuffmanTree(freqTable);
        
        // Generate codes for each character
        this.generateCodes(this.root);
        
        // Encode the text
        const encodedText = this.encode(text);
        
        // Calculate compressed size
        this.compressedSize = encodedText.length;
        
        // Calculate execution time
        this.executionTime = performance.now() - startTime;
        
        return {
            encodedText,
            codes: this.codes,
            originalSize: this.originalSize,
            compressedSize: this.compressedSize,
            compressionRatio: ((this.originalSize - this.compressedSize) / this.originalSize * 100).toFixed(2),
            executionTime: this.executionTime.toFixed(2)
        };
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundElements();
    updateClock();
    setInterval(updateClock, 1000);
    
    // Initialize progress circle
    updateProgressCircle(0);
    
    const compressBtn = document.getElementById('compress-btn');
    const inputText = document.getElementById('input-text');
    const outputSection = document.getElementById('output-section');
    const binaryOutput = document.getElementById('binary-output');
    const mappingOutput = document.getElementById('mapping-output');
    const originalSize = document.getElementById('original-size');
    const compressedSize = document.getElementById('compressed-size');
    const executionTime = document.getElementById('execution-time');
    const loading = document.getElementById('loading');
    
    compressBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        
        if (!text) {
            alert('Please enter some text to compress.');
            return;
        }
        
        // Show loading animation
        loading.style.display = 'block';
        outputSection.style.display = 'none';
        
        // Use setTimeout to allow the UI to update before processing
        setTimeout(() => {
            const huffman = new HuffmanCoding();
            const result = huffman.compress(text);
            
            // Update the UI with results
            binaryOutput.textContent = result.encodedText;
            
            let mappingText = '';
            for (let char in result.codes) {
                const displayChar = char === ' ' ? 'Space' : char === '\n' ? 'Newline' : char;
                mappingText += `'${displayChar}': ${result.codes[char]}\n`;
            }
            mappingOutput.textContent = mappingText;
            
            originalSize.textContent = `${result.originalSize} bits`;
            compressedSize.textContent = `${result.compressedSize} bits`;
            executionTime.textContent = `${result.executionTime} ms`;
            
            // Update the progress circle with the compression ratio
            updateProgressCircle(parseFloat(result.compressionRatio));
            
            // Hide loading and show results
            loading.style.display = 'none';
            outputSection.style.display = 'block';
            
            // Add a subtle animation to the output section
            outputSection.style.animation = 'none';
            outputSection.offsetHeight; // Trigger reflow
            outputSection.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 100);
    });
    
    // Add 3D tilt effect based on mouse position for the entire container
    const container = document.querySelector('.container');
    
    document.addEventListener('mousemove', function(e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Reset transform when mouse leaves
    document.addEventListener('mouseleave', function() {
        container.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    
    // Add individual 3D effects for each box
    const boxes = document.querySelectorAll('.output-box, .stat-item, .complexity-info');
    
    boxes.forEach(box => {
        box.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const xRotation = (yPercent - 0.5) * 10; // -5 to 5 degrees
            const yRotation = (0.5 - xPercent) * 10; // -5 to 5 degrees
            
            this.style.transform = `
                translateZ(30px)
                rotateX(${xRotation}deg)
                rotateY(${yRotation}deg)
            `;
            
            // Update glow effect position
            const glow = this.querySelector('.glow-effect');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, rgba(255, 255, 255, 0.8), transparent 60%)`;
            }
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Sample text for easy testing
    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
        "AAAAABBBBBBBBBCCCCCCCCCCCCDDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ];
    
    // Add double-click event to fill with sample text
    inputText.addEventListener('dblclick', function() {
        const randomIndex = Math.floor(Math.random() * sampleTexts.length);
        inputText.value = sampleTexts[randomIndex];
    });
});