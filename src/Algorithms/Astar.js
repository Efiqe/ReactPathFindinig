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
            return "Nejde"
        } else {
            return this.items.shift()
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }
}


const findNeighbours = (grid, cord) => {
    let neighbours = [];

    //Nahoru
    if (cord[0] + 1 < grid.length) {
        neighbours.push([cord[0] + 1, cord[1]])
    }

    //Dolu
    if (cord[0] - 1 >= 0) {
        neighbours.push([cord[0] - 1, cord[1]])
    }

    //Doleva
    if (cord[1] - 1 >= 0) {
        neighbours.push([cord[0], cord[1] - 1])
    }

    //Doprava
    if (cord[1] + 1 < grid[0].length) {
        neighbours.push([cord[0], cord[1] + 1])
    }


    return neighbours;
}


const heuristic = (goal, current) => {
    return (Math.abs(goal.y - current.y) + Math.abs(goal.x - current.x)) * 10
}


export const Astar = (grid, start, end) => {
    const PQ = new PriorityQueue()
    let dict = {};
    start.searched = true;
    start.Gcost = 0;
    start.Hcost = heuristic(end, start);
    start.Fcost = start.Gcost + start.Hcost;
    PQ.enqueue(start, start.Fcost);

    while (PQ.items.length > 0) {
        let curr = PQ.dequeue();
        let current = curr.element;

        if (current.y === end.y && current.x === end.x) {
            console.log("Found");
            break;
        } else {
            let neighbours = findNeighbours(grid, [current.y, current.x]);

            neighbours.forEach(el => {
                let nb = grid[el[0]][el[1]];

                if (nb.searched === false && nb.isWall === false) {
                    nb.searched = true;
                    nb.Gcost = current.Gcost + 10;
                    nb.Hcost = heuristic(end, current);
                    nb.Fcost = nb.weight + nb.Gcost + nb.Hcost;
                    // console.log(nb);
                    PQ.enqueue(nb, nb.Fcost);
                    dict[[el[0], el[1]]] = [current.y, current.x]
                }
            })
        }
    }

    return dict;
}

export const showAstar = (dict, start, end) => {
    let curPos = end;
    const result = [];

    while (!equal(curPos, start)) {
        result.push(curPos);
        curPos = dict[curPos];
    }

    result.push(start);
    result.reverse();
    result.shift();
    result.pop();

    return result;
}
