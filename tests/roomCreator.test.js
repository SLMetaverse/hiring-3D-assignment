import Room from'../src/roomCreator/room.js'
import {Walls} from '../src/roomCreator/walls.js'
import RoomCreator from '../src/roomCreator/roomCreator.js'


test('RoomCreator returns created rooms', () => {
    let grid1 = makeGrid1()
    let grid2 = makeGrid2()
    let grid3 = makeGrid3()

    let grids = [grid1.grid, grid2.grid, grid3.grid]
    let expectedRooms = [grid1.expectedRoom, grid2.expectedRoom, grid3.expectedRoom]

    for (let index = 0; index < grids.length; index++) {
        let roomCreator = new RoomCreator(grids[index])
        expect(roomCreator.rooms()).toEqual(expectedRooms[index])
    }
})

// Helpers

function makeGrid1() {
    return {
        grid: [[0,1], [1,1]],
        expectedRoom: [
            new Room(1,0,[Walls.BACK]),
            new Room(0,1,[Walls.RIGHT]),
            new Room(1,1,[Walls.FRONT, Walls.LEFT]),
        ]
    }
}

function makeGrid2() {
    return {
        grid: [[0],[1]],
        expectedRoom: [
            new Room(0,1,[]),
        ]
    }
}

function makeGrid3() {
    return {
        grid: [[1,0,1],[1,1,1],[0,0,1]],
        expectedRoom: [
            new Room(0,0,[Walls.BACK]),
            new Room(2,0,[Walls.BACK]),
            new Room(0,1,[Walls.FRONT, Walls.RIGHT]),
            new Room(1,1,[Walls.LEFT, Walls.RIGHT]),
            new Room(2,1,[Walls.FRONT, Walls.BACK, Walls.LEFT]),
            new Room(2,2,[Walls.FRONT]),
        ]
    }
}