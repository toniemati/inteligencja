import Position from './Position'

export default class Point {
    public id: number
    public position: Position
    public toDelivery: number
    public toPickup: number

    constructor(id: number, position: Position, toDelivery: number, toPickup: number) {
        this.id = id
        this.position = position
        this.toDelivery = toDelivery
        this.toPickup = toPickup
    }
}