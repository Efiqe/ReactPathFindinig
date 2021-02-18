import React, { useState, useEffect } from 'react'
import Node from './Node.jsx';
import './Pathfind.css';
import { BFS, drawPath } from '../Algorithms/Bfs';
import { Dijkstra, showDijkstra } from '../Algorithms/Dijkstra';
import { Astar, showAstar } from '../Algorithms/Astar';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


//GLOBAL
const cols = 27;
const rows = 20;
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
let mouseDown = 0;


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
    const [allDeleted, setAllDeleted] = useState(0);
    const [toggleAstar, setToggleAstar] = useState(0);
    const [path, setPath] = useState(null);
    const [sendData, setSendData] = useState(0);



    const START_ROW = startCords[0];
    const START_COL = startCords[1];
    const END_ROW = endCords[0];
    const END_COL = endCords[1];


    useEffect(() => {
        initializeGrid();
    }, [toggleBFS, toggleDijkstra, toggleAstar, startCords, endCords, wallCords,
        deleteWallCords, sandCords, iceCords, snowCords, treeCords, mudCords, deleteSurface, allDeleted]);

    useEffect(() => {
        sendPath();
    }, [sendData]);

    const sendPath = async() => {
        console.log("funguje");
        let res = await axios.post('http://localhost:5000/sendPath', {
            "path": path 
        })

        console.log(res);

        setPath(null)
    }
   

    //Inicializace gridu
    const initializeGrid = () => {
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
        }
        //Astart algoritmus
        if (toggleAstar === 1) {
            AstarAlg(grid);
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
                    grid[el.y][el.x].Fcost = el.Fcost;
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
                    grid[el.y][el.x].Fcost = el.Fcost;
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
                    grid[el.y][el.x].Fcost = el.Fcost;
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
                    grid[el.y][el.x].Fcost = el.Fcost;
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
                    grid[el.y][el.x].Fcost = el.Fcost;
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
        setPath(path);
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
        setPath(path);

        fillPath(grid, path);
    }

    const AstarAlg = (grid) => {
        drawingWalls(grid);
        drawingSurfaces(grid);

        let start = grid[START_ROW][START_COL];
        let end = grid[END_ROW][END_COL];

        setGrid(grid);

        const dict = Astar(grid, start, end);
        const path = showAstar(dict, [start.y, start.x], [end.y, end.x])
        setPath(path);

        fillPath(grid, path);
    }


    //Vytvoreni objektu pro kresleni sten
    function wallSpot(y, x, isWall) {
        this.y = y;
        this.x = x;
        this.isWall = isWall;
    }


    //Objekt porvrchu
    function surfaceTypes(y, x, type, weight, Fcost) {
        this.y = y;
        this.x = x;
        this.surfaceType = type;
        this.weight = weight;
        this.Fcost = Fcost;
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
        this.Gcost = 0;
        this.Hcost = 0;
        this.Fcost = this.Gcost + this.Hcost;
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


    const chosenSurface = (surface, surfacearr, weight, e, setSurfaceCords, Fcost) => {
        if (e.target.classList[1] === undefined) {
            let memPos = e.target.id;
            let pos = memPos.split("-");
            setSurfaceCords(new surfaceTypes(pos[0], pos[1], surface, weight, Fcost));
        }
        if (e.target.classList[1] === "node_" + surface) {
            let memPos = e.target.id;
            let pos = memPos.split("-");
            setDeleteSurface(pos);

            surfacearr.forEach((el) => {
                if (el.y === pos[0] && el.x === pos[1]) {
                    el.surfaceType = "none";
                }
            })
        }
    }


    const onMouseDown = (e) => {
        const cond = sand + ice + snow + tree + mud;
        mouseDown = 1

        if (cond > 0) {
            switch (cond) {
                case 1:
                    chosenSurface("sand", sandSurface, 5, e, setSandCords, 5);
                    break;
                case 2:
                    chosenSurface("ice", iceSurface, 15, e, setIceCords, 15);
                    break;
                case 3:
                    chosenSurface("snow", snowSurface, 10, e, setSnowCords, 10)
                    break;
                case 4:
                    chosenSurface("tree", treeSurface, 3, e, setTreeCords, 3);
                    break;
                case 5:
                    chosenSurface("mud", mudSurface, 7, e, setMudCords, 7);
                    break;
            }
        } else {
            if (e.target.classList[1] === undefined || e.target.classList[1] === "node_") {
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


    const onSuerface = (e) => {
        switch (e.target.name) {
            case "Sand":
                if(sand === 0) {
                    sand = 1;
                    e.target.className = "usedSand";
                } else {
                    sand = 0;
                    e.target.className = "sand";
                }       
                break;
            case "Ice":
                if(ice === 0) {
                    ice = 2;
                    e.target.className = "usedIce";
                } else {
                    ice = 0;
                    e.target.className = "ice";
                }       
                break;
            case "Snow":
                if(snow === 0) {
                    snow = 3;
                    e.target.className = "usedSnow";
                } else {
                    snow = 0;
                    e.target.className = "snow";
                }       
                break;
            case "Tree":
                if(tree === 0) {
                    tree = 4;
                    e.target.className = "usedTree";
                } else {
                    tree = 0;
                    e.target.className = "tree";
                }       
                break;
            case "Mud":
                if(mud === 0) {
                    mud = 5;
                    e.target.className = "usedMud";
                } else {
                    mud = 0;
                    e.target.className = "mud";
                }       
                break;
        }
    }


    const onMouseOver = (e) => {
        const cond = sand + ice + snow + tree + mud;

        if (mouseDown === 1) {
            if (cond > 0) {
                switch (cond) {
                    case 1:
                        chosenSurface("sand", sandSurface, 5, e, setSandCords);
                        break;
                    case 2:
                        chosenSurface("ice", iceSurface, 15, e, setIceCords);
                        break;
                    case 3:
                        chosenSurface("snow", snowSurface, 10, e, setSnowCords);
                        break;
                    case 4:
                        chosenSurface("tree", treeSurface, 3, e, setTreeCords);
                        break;
                    case 5:
                        chosenSurface("mud", mudSurface, 7, e, setMudCords);
                        break;
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
    }


    const onMouseUp = (e) => {
        if (mouseDown === 1) {
            mouseDown = 0
        } else {
            e.preventDefault();
        }
    }


    const deleteAll = () => {
        wall.forEach((el) => {
            el.isWall = false;
        })

        sandSurface.forEach((el) => {
            el.surfaceType = "none"
        })


        iceSurface.forEach((el) => {
            el.surfaceType = "none"
        })


        snowSurface.forEach((el) => {
            el.surfaceType = "none"
        })


        treeSurface.forEach((el) => {
            el.surfaceType = "none"
        })


        mudSurface.forEach((el) => {
            el.surfaceType = "none"
        })

        if (allDeleted === 0) {
            setAllDeleted(1)
        } else {
            setAllDeleted(0)
        }
    }


    const onSendData = () => {
        if(sendData === 0) {
            setSendData(1)
        } else {
            setSendData(0);
        }
    }


    // Funkce na vykresleni gridu
    const gridwithNode = (
        <div className="Grid" onDrop={(e) => (onDrop(e))} onDragOver={(e) => (onDragOver(e))}
            onMouseDown={(e) => (onMouseDown(e))}
            onMouseOver={(e) => (onMouseOver(e))}
            onMouseUp={(e) => (onMouseUp(e))}
        >
            {
                Grid.map((row, rowIndex) => {
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
                })
            }
        </div >
    )
    
    
    return (
        <div className='Wrapper'>
            <h1>Nejkratší cesta přes 2D pole</h1>
            {/* Vykresleni gridu */}
            {gridwithNode}
            <div className="algButtons">
                <div className="BFSbuttons">
                    <button className="bfsOn" onClick={() => setToggleBFS(1)}>Zapni BFS</button>
                    <button className="bfsOff" onClick={() => {if(toggleBFS === 1) {setToggleBFS(0)}}}>Vypni BFS</button>
                </div>
                <div className="dijkstraButtons">
                    <button className="dijkstraOn" onClick={() => setToggleDijkstra(1)}>Zapni Dijkstru</button>
                    <button className="dijkstraOff" onClick={() => {if(toggleDijkstra === 1) {setToggleDijkstra(0)}}}>Vypni Dijkstru</button>
                </div>
                <div className="astarButtons">
                    <button className="astarOn" onClick={() => setToggleAstar(1)}>Zapni Astar</button>
                    <button className="astarOff" onClick={() => {if(toggleAstar === 1) {setToggleAstar(0)}}}>Vypni Astar</button>
                </div>
            </div>
            <div className="utilityButtons">
                <div className="surfaceButtons">
                    <button className="sand" onClick={(e) => onSuerface(e)} name="Sand">Písek</button>
                    <button className="ice" onClick={(e) => onSuerface(e)} name="Ice">Led</button>
                    <button className="snow" onClick={(e) => onSuerface(e)} name="Snow">Sníh</button>
                    <button className="tree" onClick={(e) => onSuerface(e)} name="Tree">Stromy</button>
                    <button className="mud" onClick={(e) => onSuerface(e)} name="Mud">Bahno</button>
                </div>
                <div className="delButtons">
                    <button className="deleteAll" onClick={() => { deleteAll() }}>Delete ALL <ClearIcon className="clearIcon"/></button>
                    <button className="sendData" onClick={() => { onSendData() }}>Send Data <DoneIcon className="doneIcon"/></button>
                </div>
            </div>
        </div>
    )
}

export default Pathfind
