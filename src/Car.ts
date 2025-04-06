import Point from './Warehouse'

export default class Car {
    currentWarehouse: Point
    maxCapacity: number
    currentCapacity: number

    constructor(currentWarehouse: Point, maxCapacity: number) {
        this.currentWarehouse = currentWarehouse
        this.maxCapacity = maxCapacity
        this.currentCapacity = 0
    }
}