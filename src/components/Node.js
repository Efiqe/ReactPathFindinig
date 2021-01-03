import React from 'react';
import './Node.css';

const Node = ({ isStart, isEnd, searched, isPath, row, col, isWall, surfaceType }) => {
    const selClass = () => {
        if (isStart) {
            return "node_start";
        }
        if (isEnd) {
            return "node_end";
        }
        if (isPath) {
            return "node_path";
        }
        if (isWall) {
            return "node_wall";
        }
        if (surfaceType === "sand") {
            return "node_sand";
        }
        if (surfaceType === "ice") {
            return "node_ice";
        }
        if (surfaceType === "snow") {
            return "node_snow";
        }
        if (surfaceType === "tree") {
            return "node_tree";
        }
        if (surfaceType === "mud") {
            return "node_mud";
        } else {
            return "";
        }
    }


    const classes = selClass();
    const draggAble = isStart ? true : isEnd ? true : false;


    const onDrop = (e) => {
        e.preventDefault();
        // let data = e.dataTransfer.getData("text");
    }


    const onDragStart = (e) => {
        e.dataTransfer.setData("text", e.target.id);
    }


    const onDragOver = (e) => {
        e.dataTransfer.setData("text", e.target.id);
    }


    return (
        <div
            id={`node-${row}-${col}`}
            onDrop={(e) => (onDrop(e))}
            onDragOver={(e) => (onDragOver(e))}
        >
            <div
                id={`${row}-${col}`}
                className={`node ${classes}`}
                draggable={draggAble}
                onDragStart={(e) => {
                    if (e.target.draggable === true) {
                        onDragStart(e);
                    } else {
                        e.preventDefault();
                    }
                }}
            />
        </div>
    )
}

export default Node;