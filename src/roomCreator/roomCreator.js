import Room from './room'
import {Walls} from './walls'

export default class RoomCreator {
    constructor(grid) {
        this.grid = grid
    }

    rooms() {
        let rooms = []
        let grid = this.grid
        grid.forEach((rows, rowIndex) => {
            rows.forEach((value, colIndex) => {
                if (value == 1) {
                    let openWalls = []
                    if (this.#hasRoom(colIndex, rowIndex - 1)) openWalls.push(Walls.FRONT)
                    if (this.#hasRoom(colIndex, rowIndex + 1)) openWalls.push(Walls.BACK)
                    if (this.#hasRoom(colIndex - 1, rowIndex)) openWalls.push(Walls.LEFT)
                    if (this.#hasRoom(colIndex + 1, rowIndex)) openWalls.push(Walls.RIGHT)
                    let room = new Room(colIndex, rowIndex, openWalls)
                    rooms.push(room)
                }
            });
        });
        return rooms
    }

    #hasRoom(x, y) {
        let cols = this.grid[0].length
        let rows = this.grid.length
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
            if (this.grid[y][x] == 1) return true
        }
        return false
    }
}