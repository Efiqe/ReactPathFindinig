import React, { Component, useState, useEffect } from 'react'
// import uniqueId from 'react-html-id'
import Node from './Node';
import './Pathfind.css';

const cols = 45;
const rows = 20;
const START_ROW = 0;
const START_COL = 0;
const END_ROW = rows - 1;
const END_COL = cols - 1;


const Pathfind = (props) => {
    const [Grid, setGrid] = useState([]);

    useEffect(() => {
        initalizeGrid();
    }, []);

    const initalizeGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(cols);
        }

        createSpot(grid);

        setGrid(grid);
    };

    const createSpot = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    };

    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === START_ROW && this.y === START_COL;
        this.isEnd = this.x === END_ROW && this.y === END_COL;
        this.g = 0;
        this.f = 0;
        this.h = 0;
    };

    const gridwithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='rowWrapper'>
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd } = col;
                            return (
                                <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

    return (
        <div className='Wrapper'>
            <h1>Pathfinding</h1>
            {gridwithNode}
        </div>
    )
}

export default Pathfind
