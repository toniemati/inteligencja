import Car from './Car'
import { distance, findBestCarForPoint, findBestWarehouseForCar, randomIntBetween } from './helpers'
import Point from './Point'
import Position from './Position'
import Warehouse from './Warehouse'

const NUM_OF_WAREHOUSES = 5

const MIN_POINT_CAPACITY = 100
const MAX_POINT_CAPACITY = 200
const NUM_OF_POINTS = randomIntBetween(25, 50)

const MIN_NUM_CARS = 3
const MAX_NUM_CARS = 6
const NUM_OF_CARS = randomIntBetween(MIN_NUM_CARS, MAX_NUM_CARS)

const WAREHOUSES: Warehouse[] = []
const POINTS: Point[] = []
const CARS: Car[] = []

for (let i = 0; i < NUM_OF_WAREHOUSES; i++) {
    const y = randomIntBetween(0, 100)
    const x = randomIntBetween(0, 100)

    WAREHOUSES.push(new Warehouse(i + 1, new Position(x, y)))
}

for (let i = 0; i < NUM_OF_POINTS; i++) {
    const y = randomIntBetween(0, 100)
    const x = randomIntBetween(0, 100)

    let toDelivery = 0
    let toPickup = 0

    if (Math.random() < 0.5) {
        toDelivery = randomIntBetween(MIN_POINT_CAPACITY, MAX_POINT_CAPACITY)
        toPickup = 0
    } else {
        toDelivery = 0
        toPickup = randomIntBetween(MIN_POINT_CAPACITY, MAX_POINT_CAPACITY)
    }

    POINTS.push(new Point(i + 1, new Position(x, y), toDelivery, toPickup))
}

for (let i = 0; i < NUM_OF_CARS; i++) {
    const warehouse = WAREHOUSES[randomIntBetween(0, WAREHOUSES.length - 1)]
    const type = randomIntBetween(1, 3)
    let capacity = 0

    switch (type) {
        case 1: capacity = 1000; break
        case 2: capacity = 1500; break
        case 3: capacity = 2000; break
    }

    CARS.push(new Car(i + 1, warehouse.position, capacity))
}

let totalPickup = 0
let totalDelivery = 0

POINTS.forEach(point => {
    const car = findBestCarForPoint(point, CARS)
    const carDistance = distance(point.position, car.position)

    console.log(`Car ${car.id} (${car.position.x},${car.position.y}) - ${car.currentCapacity}/${car.maxCapacity}kg`)
    console.log(`Drives to (${point.position.x},${point.position.y}) - ${carDistance}km`)

    car.position = point.position
    car.distance += carDistance

    if (point.toPickup) {
        car.currentCapacity += point.toPickup
        totalPickup += point.toPickup
        console.log(`Pick ${point.toPickup}kg - ${car.currentCapacity}/${car.maxCapacity}kg`)
        point.toPickup = 0
    }

    if (point.toDelivery) {
        car.currentCapacity -= point.toDelivery
        totalDelivery += point.toDelivery
        console.log(`Leave ${point.toDelivery}kg - ${car.currentCapacity}/${car.maxCapacity}kg`)
        point.toDelivery = 0
    }

    if (car.currentCapacity < 200) {
        console.log(`Low capacity`)

        const warehouse = findBestWarehouseForCar(car, WAREHOUSES)
        const warehouseDistance = distance(car.position, warehouse.position)
        const pickUp = Math.floor(car.maxCapacity / 2)

        car.position = warehouse.position
        car.distance += warehouseDistance
        car.currentCapacity += pickUp

        console.log(`Back to warehouse (${warehouse.position.x},${warehouse.position.y}) - ${warehouseDistance}km`)
        console.log(`Refill ${pickUp}kg - ${car.currentCapacity}/${car.maxCapacity}kg`)
    }

    console.log('')
})

const totalDistance = CARS.reduce((prev, curr) => prev + curr.distance, 0)

console.log({ NUM_OF_WAREHOUSES, NUM_OF_POINTS, NUM_OF_CARS })
console.log({ totalDistance, totalPickup, totalDelivery })