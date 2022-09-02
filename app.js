// Create a new puzzle when the app starts
let puzzle = new Puzzle(16, 4);
puzzle.render();
puzzle.randomize(500);

// Handle the click event on a puzzle square
function onClick(event, index){
    puzzle.move(index);
    setTimeout(() => {
        if(puzzle.isSolved()){
            alert('You win!');
        }
    },
    300);
}

// Handle the change event on the puzzle size selector
const sizeElement = document.querySelector('#size-selector');
sizeElement.addEventListener('change', (event) => {
    // Destroy the current puzzle
    puzzle.destroy();

    // Create a new puzzle with the selected size
    const size = parseInt(event.target.value) + 1;
    const row_size = Math.sqrt(size);
    puzzle = new Puzzle(size, row_size);
    puzzle.render();
    puzzle.randomize(500);
});

// Handle the change event on the roman numeral selector
const romanElement = document.querySelector('#roman-selector');
romanElement.addEventListener('change', (event) => {
    puzzle.roman = event.target.value === 'true';
    puzzle.render();
})