const GRID_SIZE = 4;
const CELL_SIZE = 15;
const CELL_GAP = 1;

// "#cells" this are private variables which cannot acces outside of the class;
export default class Grid {
    #cells;
    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size", GRID_SIZE);
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        })
    }

    get cells() {
        return this.#cells;
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }
    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }

    get #emptyCells() {
        return this.#cells.filter((cell) => cell.tile === null);
    }
    randomEmptyCell() {
        // because we write emptyCells getter so we can access that one as a property which return array.
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
        // this generate random value from 0 to emptyCells.length-1;
        return this.#emptyCells[randomIndex];
    }
}

// x --> columns;
// y --> rows;
class Cell {
    #cellElement;
    #x;
    #y;
    #tile = null;
    #mergeTile = null;
    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }
    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }
    get tile() {
        return this.#tile;
    }
    set tile(value) {
        this.#tile = value;
        if (value === null) {
            return;
        }

        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }
    get mergeTile() {
        return this.#mergeTile;
    }
    set mergeTile(value) {
        this.#mergeTile = value;
        if (value === null) {
            return;
        }
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }
    canAccept(tile) {
        return (
            this.tile === null || (this.mergeTile === null && this.tile.value === tile.value)
        )
    }
    mergeTheTiles() {
        if (this.tile === null || this.mergeTile === null) {
            return;
        }
        this.tile.value = this.tile.value + this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
    }
}

function createCellElements(gridElement) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell);
        gridElement.append(cell);
    }
    return cells;
}