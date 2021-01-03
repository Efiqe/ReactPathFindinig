function equal(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}


class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        let qElement = new QElement(element, priority);
        let contain = false;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        if (!contain) {
            this.items.push(qElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow"
        } else {
            return this.items.shift()
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }
}


const findNeighbors = (grid, cord) => {
    let neighbors = [];

    //Nahoru
    if (cord[0] + 1 < grid.length) {
        neighbors.push([cord[0] + 1, cord[1]])
    }

    //Dolu
    if (cord[0] - 1 >= 0) {
        neighbors.push([cord[0] - 1, cord[1]])
    }

    //Doleva
    if (cord[1] - 1 >= 0) {
        neighbors.push([cord[0], cord[1] - 1])
    }

    //Doprava
    if (cord[1] + 1 < grid[0].length) {
        neighbors.push([cord[0], cord[1] + 1])
    }

    return neighbors;
}


export const Dijkstra = (grid, start, end) => {
    const PQ = new PriorityQueue();
    let dict = {};
    start.weight = 0;
    start.searched = true;
    PQ.enqueue(start, start.weight);

    while (PQ.items.length > 0) {
        let curr = PQ.dequeue();
        let current = curr.element;

        if (current === end) {
            console.log("Found");
            break;
        } else {
            let neighbors = findNeighbors(grid, [current.y, current.x]);

            neighbors.forEach(el => {
                let mem = grid[el[0]][el[1]];

                if (mem.searched === false && mem.isWall === false) {
                    mem.searched = true;
                    mem.weight = current.weight + mem.weight;
                    PQ.enqueue(mem, mem.weight);
                    dict[[el[0], el[1]]] = [current.y, current.x];
                }
            })
        }
    }

    return dict;
}

export const showDijkstra = (dict, start, end) => {
    let curPos = end;
    const result = [];

    console.log(dict)

    while (!equal(curPos, start)) {
        result.push(curPos);
        curPos = dict[curPos];
    }

    result.push(start);
    let path = result.reverse();
    path.shift();
    path.pop();

    return path;
}


