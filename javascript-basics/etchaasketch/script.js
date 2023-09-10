const container = document.querySelector('.container');
const resetBtn = document.querySelector('#resetBtn');
const clear = document.querySelector('#clear');
const rainbow = document.querySelector('#rainbow');
const colorPen =document.querySelector('#colorPicker-pen');
const colorBg =document.querySelector('#colorPicker-bg');
const eraser = document.querySelector('#eraser');
let color = colorBg.value;
let pen = colorPen.value;
let isDrawing = false;


//initializing the grid
createGrid(16);
changePenColor(pen); //calling all the main events 
//getting input from input color and changing the pen and background
colorPen.addEventListener('input',(e)=>{
    e.stopPropagation();
    pen= colorPen.value;
    changePenColor(pen);
});
//clear button
clear.addEventListener('click', () => {
    clearColors();
});

colorBg.addEventListener('input',()=>{
    color = colorBg.value;
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = color; // Change this to your default color
    });
})



// Generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let colorHex = '#';
    for (let i = 0; i < 6; i++) {
        colorHex += letters[Math.floor(Math.random() * 16)];
    }
    return colorHex;
}

//reset Grid
resetBtn.addEventListener('click',() => {
    const newSize = prompt('Enter the number of squares per side (max 64):');

    if (newSize && !isNaN(newSize) && newSize <= 64) {
        clearGrid();
        createGrid(newSize);
    } else {
        alert('Please enter a valid number between 1 and 64');
        const newSize = prompt('Enter the number of squares per side (max 64):');
    }
});
function clearGrid() {
    container.innerHTML = '';
}
function createGrid(size) {
    const squareSize = 600 / size; // Calculate the size of each square
    container.style.width = '600px'; // Set the fixed container width
    container.style.height = '600px'; // Set the fixed container height

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        container.appendChild(square);
    }
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mouseenter', () => {
            if (isDrawing) {
                square.style.backgroundColor = color;
            }
        });
    });
}


// Function to clear colors
function clearColors() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = color; // Change this to your default color
    });
}

rainbow.addEventListener('click',()=>
{container.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    isDrawing = true;
    if (e.target.classList.contains('square')) {
        e.target.style.backgroundColor = getRandomColor();
    }
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    //mouse enter : when a mouse is still clicked or pressed like dragging
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mouseenter', (e) => {
            if (isDrawing) {
                e.target.style.backgroundColor = getRandomColor();
            }
        });
    });
});

});

function changePenColor(changeColor){
        container.addEventListener('mousedown', (e) => {
            isDrawing = true;
            if (e.target.classList.contains('square')) {
                e.target.style.backgroundColor = changeColor;
            }
        });
        //mouseup: as soon as you release a mouse button 
        document.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        
        
        //mouse enter : when a mouse is still clicked or pressed like dragging
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('mouseenter', (e) => {
                if (isDrawing) {
                    e.target.style.backgroundColor = changeColor;
                }
            });
        });
    }
  
    
eraser.addEventListener('click',()=>{
    changePenColor(color);
});
