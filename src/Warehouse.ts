import Position from './Position'

export default class Warehouse {
    public id: number
    public position: Position

    constructor(id: number, position: Position) {
        this.id = id
        this.position = position
    }
}