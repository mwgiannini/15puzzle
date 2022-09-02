// A class to encapsulate the puzzle logic.
class Puzzle {
    constructor(num_squares, row_size, empty_square = 0, roman = false){
        this.roman = document.querySelector('#roman-selector').value === 'true';
        this.empty_square = empty_square;
        this.row_size = row_size;

        // Create an array where each value is its index
        // Figured a 1d array would be easier to work with
        this.grid_array = [...Array(num_squares).keys()]

        // Create a div to contain the puzzle and place it in the DOM
        this.puzzle_div = document.createElement('div');
        this.puzzle_div.id = 'puzzle';
        document.querySelector('#puzzle-container').appendChild(this.puzzle_div);


        // Create divs for each square in the puzzle
        for(let i = 0; i < num_squares; i++){
            const pos = this.getCoords(i);

            const element = document.createElement('div');
            element.classList.add('puzzle-button');
            element.id = `x${pos.x}y${pos.y}`;
            element.style.gridArea = `${pos.x} / ${pos.y}`;
    
            this.puzzle_div.appendChild(element);
        }
    }

    // Destroy the puzzle by removing the puzzle div from the DOM
    destroy(){
        this.puzzle_div.remove();
    }

    // Moves the square at the given index to the empty square (if possible)
    move(index){
        if(!this.canMove(index)) return false;
        // Swap the empty-square and the clicked square
        const empty_index = puzzle.grid_array.indexOf(puzzle.empty_square);
        const clicked_index = index;
        puzzle.grid_array[empty_index] = puzzle.grid_array[clicked_index];
        puzzle.grid_array[clicked_index] = puzzle.empty_square;
        puzzle.render();
        return true;
    }

    // Makes n random moves on the puzzle
    // (not guaranteed to be valid moves, but result is guaranteed to be solvable)
    randomize(n){
        if( n <= 0) return;
        setTimeout(() => {
            puzzle.move(Math.floor(Math.random() * puzzle.grid_array.length));
            this.randomize(n-1);
        },
        5);
    }

    // Renders an array in the puzzle div
    render(){
        this.grid_array.map( (value, i) => {
            // Get the element with the given index
            const pos = this.getCoords(i);
            const element = document.querySelector(`#x${pos.x}y${pos.y}`);

            // Hide the empty square
            if(value === this.empty_square){
                element.classList.add('empty-square');
                return;
            }

            // Otherwise, show and update the div with the value of the array element
            element.classList.remove('empty-square');
            element.innerHTML = this.roman ? this.romanize(value) : value;
            element.onclick = (e) => onClick(e, i);
        });
    }

    // Returns true if the given index is next to the empty-square
    canMove(index){
        if(index > this.grid_array.length - 1 || index < 0) return null;
        const coords = this.getCoords(index);
        const empty_coords = this.getEmptySquareCoords();
        return Math.abs(coords.x - empty_coords.x) + Math.abs(coords.y - empty_coords.y) === 1;   
    }

    // Returns an object with x and y coordinates of the given index
    getCoords(index){
        if(index > this.grid_array.length - 1 || index < 0) return null;
        return {
            x: (Math.floor(index / this.row_size)) + 1,
            y: (index % this.row_size) + 1
        }
    }

    // Returns an object with x and y coordinates of the empty-square
    getEmptySquareCoords(){
        const i = this.grid_array.indexOf(this.empty_square);
        return this.getCoords(i);
    }

    // Returns true if the puzzle is solved 
    // (all squares are in sequential order with the empty square at the end)
    isSolved(){
        // Check the condition against every element in the array
        return this.grid_array.every((element,index,array) => {
            // Hack the empty square to be the last element in the array so I can use 0-based indexing everywhere else
            if(element === this.empty_square){
                element = this.grid_array.length;
            }
            return index === 0 || array[index-1] === element-1;
        })
    }

    // Returns the roman numeral for an integer between 1 and 15
    romanize(num){
        const numerals = [
            'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 
            'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'
        ]
        return numerals[num-1];
    }
}