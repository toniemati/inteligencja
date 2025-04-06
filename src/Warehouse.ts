export default class Warehouse {
    x: number
    y: number
    toDelivery: number
    toPickup: number

    constructor(x: number, y: number, toDelivery: number, toPickup: number) {
        this.x = x
        this.y = y
        this.toDelivery = toDelivery
        this.toPickup = toPickup
    }
}