import Car from './Car.js'
import { distance, draw, findBestCarForPoint, findBestWarehouseForCar, randomIntBetween } from './helpers.js'
import Point from './Point.js'
import Position from './Position.js'
import Warehouse from './Warehouse.js'

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

const board = document.querySelector('#board')

draw(board, WAREHOUSES, POINTS, CARS)

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const process = async () => {
    for (const point of POINTS) {
        const car = findBestCarForPoint(point, CARS)
        const carDistance = distance(point.position, car.position)

        let pointElement = document.querySelector(`#point_${point.id}`) as HTMLDivElement
        let carElement = document.querySelector(`#car_${car.id}`) as HTMLDivElement

        console.log(`Car ${car.id} (${car.position.x},${car.position.y}) - ${car.currentCapacity}/${car.maxCapacity}kg`)
        console.log(`Drives to (${point.position.x},${point.position.y}) - ${carDistance}km`)

        car.position = point.position
        car.distance += carDistance

        carElement.style.left = car.position.x + '%'
        carElement.style.top = car.position.y + '%'
        board?.removeChild(pointElement)

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

            carElement.style.left = car.position.x + '%'
            carElement.style.top = car.position.y + '%'

            console.log(`Back to warehouse (${warehouse.position.x},${warehouse.position.y}) - ${warehouseDistance}km`)
            console.log(`Refill ${pickUp}kg - ${car.currentCapacity}/${car.maxCapacity}kg`)
        }

        console.log('')
        await delay(1000) // odczekaj 1s przed następnym
    }


    const totalDistance = CARS.reduce((prev, curr) => prev + curr.distance, 0)

    await console.log({ NUM_OF_WAREHOUSES, NUM_OF_POINTS, NUM_OF_CARS })
    await console.log({ totalDistance, totalPickup, totalDelivery })
}

process()