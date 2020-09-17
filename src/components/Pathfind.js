import React, { Component, useState, useEffect } from 'react'
// import uniqueId from 'react-html-id'
import Node from './Node';
import './Pathfind.css';

const cols = 45;
const rows = 20;
let idCounter = 0;

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
                            idCounter++;
                            return (
                                <Node key={colIndex} myID={'id-' + (idCounter - 900).toString()} />
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
