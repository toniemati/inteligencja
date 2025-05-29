import Car from './Car'
import Point from './Point'
import Position from './Position'
import Warehouse from './Warehouse'

export const randomIntBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const distance = (a: Position, b: Position): number => {
    const dx = a.x - b.x
    const dy = a.y - b.y

    return Math.floor(Math.sqrt(dx * dx + dy * dy))
}

export const findBestCarForPoint = (point: Point, cars: Car[]): Car => {
    let bestCar = cars[0]
    let shortestDist = Infinity

    for (const c of cars) {
        if (
            c.currentCapacity + point.toPickup > c.maxCapacity
            || c.currentCapacity < point.toDelivery
        ) {
            continue
        }

        const dist = distance(point.position, c.position)

        if (dist < shortestDist) {
            shortestDist = dist
            bestCar = c
        }
    }

    return bestCar
}

export const findBestWarehouseForCar = (car: Car, warehouses: Warehouse[]): Warehouse => {
    let bestWarehouse = warehouses[0]
    let shortestDist = Infinity

    for (const w of warehouses) {
        const dist = distance(car.position, w.position)

        if (dist < shortestDist) {
            shortestDist = dist
            bestWarehouse = w
        }
    }

    return bestWarehouse
}

export const draw = (board: Element | null, warehouses: Warehouse[], points: Point[], cars: Car[]) => {
    warehouses.forEach(warehouse => {
        const div = document.createElement('div')

        div.setAttribute('id', `warehouse_${warehouse.id}`)
        div.classList.add('block', 'warehouse')
        div.style.left = warehouse.position.x + '%'
        div.style.top = warehouse.position.y + '%'

        board?.appendChild(div)
    })

    points.forEach(point => {
        const div = document.createElement('div')

        div.setAttribute('id', `point_${point.id}`)
        div.classList.add('block', 'point')
        div.style.left = point.position.x + '%'
        div.style.top = point.position.y + '%'

        board?.appendChild(div)
    })


    cars.forEach(car => {
        const div = document.createElement('div')

        div.setAttribute('id', `car_${car.id}`)
        div.classList.add('block', 'car')
        div.style.left = car.position.x + '%'
        div.style.top = car.position.y + '%'

        board?.appendChild(div)
    })
}