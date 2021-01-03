import React, { useState, useEffect } from 'react'
import Node from './Node';
import './Pathfind.css';
import { BFS, drawPath } from '../Algorithms/Bfs';
import { Dijkstra, showDijkstra } from '../Algorithms/Dijkstra';

//GLOBAL
const cols = 10;
const rows = 10;
let wall = [];
let sand = 0;
let sandSurface = [];
let ice = 0;
let iceSurface = [];
let snow = 0;
let snowSurface = [];
let tree = 0;
let treeSurface = [];
let mud = 0;
let mudSurface = [];


const Pathfind = () => {
    const [Grid, setGrid] = useState([]);
    const [toggleBFS, setToggleBFS] = useState(0);
    const [startCords, setStartCords] = useState([0, 0]);
    const [endCords, setEndCords] = useState([rows - 1, cols - 1]);
    const [wallCords, setWallCords] = useState([]);
    const [deleteWallCords, setDeleteWallCords] = useState([]);
    const [toggleDijkstra, setToggleDijkstra] = useState(0);
    const [sandCords, setSandCords] = useState([]);
    const [iceCords, setIceCords] = useState([]);
    const [snowCords, setSnowCords] = useState([]);
    const [treeCords, setTreeCords] = useState([]);
    const [mudCords, setMudCords] = useState([]);
    const [deleteSurface, setDeleteSurface] = useState([]);


    const START_ROW = startCords[0];
    const START_COL = startCords[1];
    const END_ROW = endCords[0];
    const END_COL = endCords[1];


    useEffect(() => {
        initalizeGrid();
    }, [toggleBFS, toggleDijkstra, startCords, endCords, wallCords,
        deleteWallCords, sandCords, iceCords, snowCords, treeCords, mudCords, deleteSurface]);


    //Inicializace gridu
    const initalizeGrid = () => {
        const grid = [];

        //Naplneni gridu(grafu)
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }

        //BFS algoritmus
        if (toggleBFS === 1) {
            BFSalg(grid);
        }
        //Dijkstruv algoritmus
        if (toggleDijkstra === 1) {
            DijkstraAlg(grid);
        } else {
            setGrid(grid);
            drawingWalls(grid);
            drawingSurfaces(grid);
        }
    };


    //Funkce na kresleni sten
    const drawingWalls = (grid) => {
        if (typeof wallCords.y === "string") {
            wall.push(wallCords);

            wall.forEach((el) => {
                if (grid[el.y][el.x].isWall === false && el.isWall === true) {
                    grid[el.y][el.x].isWall = true;
                }

                if (grid[el.y][el.x].isWall === true && el.isWall === false) {
                    grid[el.y][el.x].isWall = false;
                }
            })
        }
    }


    const drawingSurfaces = (grid) => {
        if (typeof sandCords.y === "string") {
            sandSurface.push(sandCords);

            sandSurface.forEach((el) => {
                if (grid[el.y][el.x].surfaceType === "none" && el.surfaceType !== "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                    grid[el.y][el.x].weight = el.weight;
                }

                if (grid[el.y][el.x].surfaceType !== "none" && el.surfaceType === "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                }
            })
        }


        if (typeof iceCords.y === "string") {
            iceSurface.push(iceCords);

            iceSurface.forEach((el) => {
                if (grid[el.y][el.x].surfaceType === "none" && el.surfaceType !== "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                    grid[el.y][el.x].weight = el.weight;
                }

                if (grid[el.y][el.x].surfaceType !== "none" && el.surfaceType === "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                }
            })
        }


        if (typeof snowCords.y === "string") {
            snowSurface.push(snowCords);

            snowSurface.forEach((el) => {
                if (grid[el.y][el.x].surfaceType === "none" && el.surfaceType !== "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                    grid[el.y][el.x].weight = el.weight;
                }

                if (grid[el.y][el.x].surfaceType !== "none" && el.surfaceType === "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                }
            })
        }


        if (typeof treeCords.y === "string") {
            treeSurface.push(treeCords);

            treeSurface.forEach((el) => {
                if (grid[el.y][el.x].surfaceType === "none" && el.surfaceType !== "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                    grid[el.y][el.x].weight = el.weight;
                }

                if (grid[el.y][el.x].surfaceType !== "none" && el.surfaceType === "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                }
            })
        }


        if (typeof mudCords.y === "string") {
            mudSurface.push(mudCords);

            mudSurface.forEach((el) => {
                if (grid[el.y][el.x].surfaceType === "none" && el.surfaceType !== "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                    grid[el.y][el.x].weight = el.weight;
                }

                if (grid[el.y][el.x].surfaceType !== "none" && el.surfaceType === "none") {
                    grid[el.y][el.x].surfaceType = el.surfaceType;
                }
            })
        }
    }


    //Implementace BFS
    const BFSalg = (grid) => {
        drawingWalls(grid);

        let start = grid[START_ROW][START_COL];
        let end = grid[END_ROW][END_COL];

        setGrid(grid);

        const dict = BFS(grid, start, end);
        const path = drawPath(dict, [start.y, start.x], [end.y, end.x]);
        console.log(path)

        fillPath(grid, path);
    }


    //Implementace Dijkstry
    const DijkstraAlg = (grid) => {
        drawingWalls(grid);
        drawingSurfaces(grid);

        let start = grid[START_ROW][START_COL];
        let end = grid[END_ROW][END_COL];

        setGrid(grid);

        const dict = Dijkstra(grid, start, end);
        const path = showDijkstra(dict, [start.y, start.x], [end.y, end.x]);

        fillPath(grid, path);
    }


    //Vytvoreni objektu pro kresleni sten
    function wallSpot(y, x, isWall) {
        this.y = y;
        this.x = x;
        this.isWall = isWall;
    }


    //Objekt porvrchu
    function surfaceTypes(y, x, type, weight) {
        this.y = y;
        this.x = x;
        this.surfaceType = type;
        this.weight = weight;
    }


    // Vytvoreni objektu pro jednotlive spoty v gridu(grafu)
    function Spot(y, x) {
        this.y = y;
        this.x = x;
        this.isStart = this.y === START_ROW && this.x === START_COL;
        this.isEnd = this.y === END_ROW && this.x === END_COL;
        this.searched = false;
        this.isPath = false;
        this.isWall = false;
        this.surfaceType = "none";
        this.weight = 1;
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


    const startBFS = (e) => {
        setToggleBFS(1)
    }


    const endBFS = (e) => {
        setToggleBFS(0)
    }


    const startDijkstra = (e) => {
        setToggleDijkstra(1);
    }

    const endDijkstra = (e) => {
        setToggleDijkstra(0);
    }


    const onClick = (e) => {
        const cond = sand + ice + snow + tree + mud;

        if (cond === 1) {
            if (sand === 1 && e.target.classList[1] === undefined) {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setSandCords(new surfaceTypes(pos[0], pos[1], "sand", 5));
            }
            if (e.target.classList[1] === "node_sand") {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setDeleteSurface(pos);

                sandSurface.forEach((el) => {
                    if (el.y === pos[0] && el.x === pos[1]) {
                        el.surfaceType = "none";
                    }
                })
            }


            if (ice === 1 && e.target.classList[1] === undefined) {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setIceCords(new surfaceTypes(pos[0], pos[1], "ice", 15));
            }
            if (e.target.classList[1] === "node_ice") {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setDeleteSurface(pos);

                iceSurface.forEach((el) => {
                    if (el.y === pos[0] && el.x === pos[1]) {
                        el.surfaceType = "none";
                    }
                })
            }


            if (snow === 1 && e.target.classList[1] === undefined) {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setSnowCords(new surfaceTypes(pos[0], pos[1], "snow", 10));
            }
            if (e.target.classList[1] === "node_snow") {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setDeleteSurface(pos);

                snowSurface.forEach((el) => {
                    if (el.y === pos[0] && el.x === pos[1]) {
                        el.surfaceType = "none";
                    }
                })
            }


            if (tree === 1 && e.target.classList[1] === undefined) {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setTreeCords(new surfaceTypes(pos[0], pos[1], "tree", 3));
            }
            if (e.target.classList[1] === "node_tree") {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setDeleteSurface(pos);

                treeSurface.forEach((el) => {
                    if (el.y === pos[0] && el.x === pos[1]) {
                        el.surfaceType = "none";
                    }
                })
            }


            if (mud === 1 && e.target.classList[1] === undefined) {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setMudCords(new surfaceTypes(pos[0], pos[1], "mud", 7));
            }
            if (e.target.classList[1] === "node_mud") {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setDeleteSurface(pos);

                mudSurface.forEach((el) => {
                    if (el.y === pos[0] && el.x === pos[1]) {
                        el.surfaceType = "none";
                    }
                })
            }
        } else {
            if (e.target.classList[1] === undefined || e.target.classList[1] === "node_path" || e.target.classList[1] === "node_sand"
                || e.target.classList[1] === "node_ice" || e.target.classList[1] === "node_snow" || e.target.classList[1] === "node_tree"
                || e.target.classList[1] === "node_mud") {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setWallCords(new wallSpot(pos[0], pos[1], true));
            }

            if (e.target.classList[1] === "node_wall") {
                let memPos = e.target.id;
                let pos = memPos.split("-");
                setDeleteWallCords(pos);

                wall.forEach((el) => {
                    if (el.y === pos[0] && el.x === pos[1]) {
                        el.isWall = false;
                    }
                })
            }
        }
    }

    const onSand = (e) => {
        if (sand === 0) {
            sand = 1;
            e.target.className = "usedButton";
        } else {
            sand = 0;
            e.target.className = "defButton";
        }
    }


    const onIce = (e) => {
        if (ice === 0) {
            ice = 1;
            e.target.className = "usedButton";
        } else {
            ice = 0;
            e.target.className = "defButton";
        }
    }


    const onSnow = (e) => {
        if (snow === 0) {
            snow = 1;
            e.target.className = "usedButton";
        } else {
            snow = 0;
            e.target.className = "defButton";
        }
    }


    const onTree = (e) => {
        if (tree === 0) {
            tree = 1;
            e.target.className = "usedButton";
        } else {
            tree = 0;
            e.target.className = "defButton";
        }
    }


    const onMud = (e) => {
        if (mud === 0) {
            mud = 1;
            e.target.className = "usedButton";
        } else {
            mud = 0;
            e.target.className = "defButton";
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
                            const { isStart, isEnd, searched, isPath, isWall, surfaceType } = col;
                            return (
                                <Node key={colIndex}
                                    isPath={isPath}
                                    isWall={isWall}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    searched={searched}
                                    row={rowIndex}
                                    col={colIndex}
                                    surfaceType={surfaceType}
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
            <div>
                <button onClick={(e) => startBFS(e)}>Zapni BFS</button>
                <button onClick={(e) => endBFS(e)}>Vypni BFS</button>
            </div>
            <div>
                <button onClick={(e) => startDijkstra(e)}>Zapni Dijkstru</button>
                <button onClick={(e) => endDijkstra(e)}>Vypni Dijkstru</button>
            </div>
            <div>
                <button onClick={(e) => onSand(e)} className="defButton">Pisek</button>
                <button onClick={(e) => onIce(e)} className="defButton">Led</button>
                <button onClick={(e) => onSnow(e)} className="defButton">Snih</button>
                <button onClick={(e) => onTree(e)} className="defButton">Stromy</button>
                <button onClick={(e) => onMud(e)} className="defButton">Bahno</button>
            </div>
        </div >
    )
}

export default Pathfind
