import Position from './Position'

export default class Car {
    public id: number
    public position: Position
    public maxCapacity: number
    public currentCapacity: number
    public distance: number

    constructor(id: number, position: Position, maxCapacity: number) {
        this.id = id
        this.position = position
        this.maxCapacity = maxCapacity
        this.currentCapacity = Math.floor(maxCapacity / 2)
        this.distance = 0
    }
}