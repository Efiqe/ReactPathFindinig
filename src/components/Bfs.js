const visited = [];

function Node(y, x) {
    this.y = y;
    this.x = x;
    this.searched = false;
    this.isWall = false;
}

function equal(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
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

    fillNeighbors(neighbors);

    return neighbors;
}

const fillNeighbors = (neigh) => {
    neigh.forEach((el, idx, arr) => {
        // console.log(el[0])
        let y = el[0];
        let x = el[1];
        arr[idx] = new Node(y, x);
    });
};

export const BFS = (grid, start, end) => {
    let queue = []
    start.searched = true
    queue.push(start)
    let dict = {};

    while (queue.length > 0) {
        let current = queue.shift();
        visited.push(current);

        if (current === end) {
            console.log("Found");
            // console.log(dict)
            break;
        } else {

            let neighbors = findNeighbors(grid, [current.y, current.x])


            neighbors.forEach(el => {
                let mem = grid[el.y][el.x];
                if (grid[el.y][el.x].searched === false && grid[el.y][el.x].isWall === false) {
                    mem.searched = true;
                    queue.push(mem);
                    dict[[el.y, el.x]] = [current.y, current.x];
                };
            });
        }
    };

    return dict;
};

export const drawPath = (dict, start, end) => {
    let curPos = end;
    const result = [];

    while (!equal(curPos, start)) {
        result.push(curPos);
        curPos = dict[curPos];
        // console.log(result)
    }

    result.push(start);
    let path = result.reverse();
    path.shift();
    path.pop();

    // console.log(path[0][0])
    // console.log(path[0][1])

    // console.log(path.length)

    return path;
}
