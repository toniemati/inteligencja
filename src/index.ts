import Car from './Car'
import { randomIntBetween } from './helpers'
import Warehouse from './Warehouse'

const MIN_WAREHOUSE_CAPACITY = 100
const MAX_WAREHOUSE_CAPACITY = 200
const NUM_OF_WAREHOUSES = 5

const MIN_NUM_CARS = 3
const MAX_NUM_CARS = 6
const NUM_OF_CARS = randomIntBetween(MIN_NUM_CARS, MAX_NUM_CARS)

const WAREHOUSES = []
const CARS = []

for (let i = 0; i < NUM_OF_WAREHOUSES; i++) {
    const y = randomIntBetween(0, 100)
    const x = randomIntBetween(0, 100)
    let toDelivery = 0
    let toPickup = 0

    if (Math.random() < 0.5) {
        toDelivery = randomIntBetween(MIN_WAREHOUSE_CAPACITY, MAX_WAREHOUSE_CAPACITY)
        toPickup = 0
    } else {
        toDelivery = 0
        toPickup = randomIntBetween(MIN_WAREHOUSE_CAPACITY, MAX_WAREHOUSE_CAPACITY)
    }

    WAREHOUSES.push(new Warehouse(x, y, toDelivery, toPickup))
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

    CARS.push(new Car(warehouse, capacity))
}

// console.log(NUM_OF_CARS)
// console.log(WAREHOUSES)
// console.log(CARS)