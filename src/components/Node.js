import React from 'react';
import './Node.css';

const Node = ({ isStart, isEnd, searched, isPath, row, col, isWall }) => {
    const classes = isStart ? "node_start" : isEnd ? "node_end" : isPath ? "node_path" : isWall ? "node_wall" : "";
    const draggAble = isStart ? true : isEnd ? true : false;

    const onDrop = (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
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