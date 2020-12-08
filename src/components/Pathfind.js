import React, { useState, useEffect } from 'react'
import Node from './Node';
import './Pathfind.css';
import { BFS, drawPath } from './Bfs';

//GLOBAL
const cols = 10;
const rows = 10;
let wall = [];

const Pathfind = () => {
    const [Grid, setGrid] = useState([]);
    const [togglePath, setTogglePath] = useState(0);
    const [startCords, setStartCords] = useState([0, 0]);
    const [endCords, setEndCords] = useState([rows - 1, cols - 1]);
    const [wallCords, setWallCords] = useState([]);
    const [deleteWallCords, setDeleteWallCords] = useState([]);

    const START_ROW = startCords[0];
    const START_COL = startCords[1];
    const END_ROW = endCords[0];
    const END_COL = endCords[1];

    useEffect(() => {
        initalizeGrid();
    }, [togglePath, startCords, endCords, wallCords, deleteWallCords]);

    //Inicializace gridu
    const initalizeGrid = () => {
        const grid = [];

        //Filling grid with spots
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }

        if (wallCords.length > 0 && deleteWallCords.length === 0) {
            console.log("first if is used")
            wall.push(wallCords);

            wall.forEach((el, idx) => {
                if (el.length > 0) {
                    if (grid[el[0]][el[1]].isWall === false) {
                        grid[el[0]][el[1]].isWall = true;
                    }
                }
            })
        }

        if (deleteWallCords.length > 0) {
            console.log("second if is used")
            let delY = deleteWallCords[0]
            let delX = deleteWallCords[1]
            let index;

            wall.forEach((el, idx) => {
                if (el.length > 0) {
                    if (grid[el[0]][el[1]].isWall === false) {
                        grid[el[0]][el[1]].isWall = true;
                    }
                }

                if (grid[delY][delX].isWall === true) {
                    index = idx;
                }
            })

            if (grid[delY][delX].isWall === true) {
                grid[delY][delX].isWall = false;
            }

            if (wall[index] !== undefined) {
                wall[index].splice(0, 2);
            }
        }

        let start = grid[START_ROW][START_COL];
        let end = grid[END_ROW][END_COL];

        setGrid(grid);

        const dict = BFS(grid, start, end);
        const path = drawPath(dict, [start.y, start.x], [end.y, end.x]);

        if (togglePath === 1) {
            fillPath(grid, path);
        }
    };

    // Vytvoreni jednotlivych spotu v gridu
    function Spot(y, x) {
        this.y = y;
        this.x = x;
        this.isStart = this.y === START_ROW && this.x === START_COL;
        this.isEnd = this.y === END_ROW && this.x === END_COL;
        this.searched = false;
        this.isPath = false;
        this.isWall = false;
    };

    //Nasteveni promene isPath v kazdem spotu ktery je soucasti cesty na true
    const fillPath = (grid, path) => {
        for (let i = 0; i < path.length; i++) {
            grid[path[i][0]][path[i][1]].isPath = true;
        }
    }

    const onDrop = (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        const el = document.getElementById(data);

        if (el.className === "node node_start") {
            let scords = e.nativeEvent.srcElement.id;
            let startcords = scords.split("-");
            setStartCords(startcords);
        } else {
            let ecords = e.nativeEvent.srcElement.id;
            let endcords = ecords.split("-");
            setEndCords(endcords);
        }

        e.nativeEvent.target.draggable = el.draggable
        e.nativeEvent.target.className = el.className

        el.draggable = false;
        el.className = "node";
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onClickTrue = (e) => {
        setTogglePath(1)
    }

    const onClickFalse = (e) => {
        setTogglePath(0)
    }

    const onClick = (e) => {
        if (e.target.classList[1] === undefined || e.target.classList[1] === "node_path") {
            let memPos = e.target.id;
            let pos = memPos.split("-");
            setWallCords(pos);
        }

        if (e.target.classList[1] === "node_wall") {
            let memPos = e.target.id;
            let pos = memPos.split("-");
            setDeleteWallCords(pos);
            e.target.attributes.class.value = "node ";
        } else {
            e.preventDefault();
        }
    }

    // Funkce na vykresleni gridu
    const gridwithNode = (
        <div className="Grid" onDrop={(e) => (onDrop(e))} onDragOver={(e) => (onDragOver(e))}
            onClick={(e) => (onClick(e))}
        >
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='rowWrapper'>
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd, searched, isPath, isWall } = col;
                            return (
                                <Node key={colIndex}
                                    isPath={isPath}
                                    isWall={isWall}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    searched={searched}
                                    row={rowIndex}
                                    col={colIndex}
                                />
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
            {/* Vykresleni gridu */}
            {gridwithNode}
            <button onClick={(e) => onClickTrue(e)}>Show path</button>
            <button onClick={(e) => onClickFalse(e)}>Hide path</button>
        </div >
    )
}

export default Pathfind
