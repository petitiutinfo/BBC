/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board(); // _toto renamed to _board for clarity

  public Play(symbol: string, x: number, y: number): void {
    // First move must be 'X'
    if (this._lastSymbol === ' ' && symbol === 'O') {
      throw new Error('Invalid first player');
    }

    // Check that the same player doesn't play twice in a row
    if (symbol === this._lastSymbol) {
      throw new Error('Invalid next player');
    }

    // Check that the tile is empty
    if (this._board.TileAt(x, y).Symbol !== ' ') {
      throw new Error('Invalid position');
    }

    // Update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    // Check all rows and columns
    for (let i = 0; i < 3; i++) {
      if (this._board.isRowWinner(i)) {
        return this._board.TileAt(i, 0).Symbol;
      }
      if (this._board.isColumnWinner(i)) {
        return this._board.TileAt(0, i).Symbol;
      }
    }

    // Check both diagonals
    if (this._board.isDiagonalWinner()) {
      return this._board.TileAt(1, 1).Symbol;
    }

    return ' ';
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    // Initialize the board with empty tiles
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this._plays.push({ X: i, Y: j, Symbol: ' ' });
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t) => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    // Update the symbol of the existing tile
    this.TileAt(x, y).Symbol = symbol;
  }

  // Check if a row has the same symbol
  public isRowWinner(row: number): boolean {
    const [a, b, c] = [
      this.TileAt(row, 0),
      this.TileAt(row, 1),
      this.TileAt(row, 2),
    ];
    return a.Symbol !== ' ' && a.Symbol === b.Symbol && b.Symbol === c.Symbol;
  }

  // Check if a column has the same symbol
  public isColumnWinner(col: number): boolean {
    const [a, b, c] = [
      this.TileAt(0, col),
      this.TileAt(1, col),
      this.TileAt(2, col),
    ];
    return a.Symbol !== ' ' && a.Symbol === b.Symbol && b.Symbol === c.Symbol;
  }

  // Check if a diagonal has the same symbol
  public isDiagonalWinner(): boolean {
    const center = this.TileAt(1, 1);
    const mainDiag =
        center.Symbol !== ' ' &&
        center.Symbol === this.TileAt(0, 0).Symbol &&
        center.Symbol === this.TileAt(2, 2).Symbol;

    const antiDiag =
        center.Symbol !== ' ' &&
        center.Symbol === this.TileAt(0, 2).Symbol &&
        center.Symbol === this.TileAt(2, 0).Symbol;

    return mainDiag || antiDiag;
  }
}
// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review