import React, { useState, useEffect } from 'react'
// import uniqueId from 'react-html-id'
import Node from './Node';
import './Pathfind.css';
import { BFS, showPath } from './Bfs';

const cols = 45;
const rows = 20;
const START_ROW = 0;
const START_COL = 0;
const END_ROW = rows - 1;
const END_COL = cols - 1;


const Pathfind = () => {
    const [Grid, setGrid] = useState([]);

    useEffect(() => {
        initalizeGrid();
    }, []);

    //Vytvoreni gridu
    const initalizeGrid = () => {
        const grid = [];


        //Filling grid with spots
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }

        const start = grid[START_ROW][START_COL];
        const end = grid[END_ROW][END_COL];

        setGrid(grid);

        const dict = BFS(grid, start, end);
        // console.log(dict)
        const path = showPath(dict, [start.y, start.x], [end.y, end.x]);
        console.log(path)
        console.log("cislo " + path[path.length - 1][0])

        fillPath(grid, path);
        // console.log("num " + path[path.length - 1][0])
        // console.log(path[0][1])
        // console.log(grid[0].length)
        // console.log(grid[path[0][0]][path[0][1]])
    };

    // Vytvoreni bodu
    function Spot(y, x) {
        this.y = y;
        this.x = x;
        this.isStart = this.y === START_ROW && this.x === START_COL;
        this.isEnd = this.y === END_ROW && this.x === END_COL;
        this.searched = false;
        this.isPath = false;
    };

    //Naplneni cesty
    const fillPath = (grid, path) => {
        for (let i = 0; i < path.length; i++) {
            grid[path[i][0]][path[i][1]].isPath = true;
        }
    }

    // Vykresleni gridu
    const gridwithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='rowWrapper'>
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd, searched, isPath } = col;
                            return (
                                <Node key={colIndex} isPath={isPath} isStart={isStart} isEnd={isEnd} searched={searched} row={rowIndex} col={colIndex} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

    // console.log(Grid)

    return (
        <div className='Wrapper'>
            <h1>Pathfinding</h1>
            {gridwithNode}
        </div>
    )
}

export default Pathfind
