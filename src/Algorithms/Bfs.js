const visited = [];

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

    return neighbors;
}

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
            break;
        } else {
            let neighbors = findNeighbors(grid, [current.y, current.x])

            neighbors.forEach(el => {
                let mem = grid[el[0]][el[1]];
                if (mem.searched === false && mem.isWall === false) {
                    mem.searched = true;
                    queue.push(mem);
                    dict[[el[0], el[1]]] = [current.y, current.x];
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
    }

    result.push(start);
    let path = result.reverse();
    path.shift();
    path.pop();

    return path;
}
