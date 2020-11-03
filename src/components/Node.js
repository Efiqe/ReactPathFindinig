import React from 'react';
import './Node.css';

const Node = ({ isStart, isEnd, searched, isPath, row, col }) => {
    const classes = isStart ? "node_start" : isEnd ? "node_end" : isPath ? "node_path" : "";

    return (
        <div className={`node ${classes}`} id={`node-${row}-${col}`}>

        </div>
    )
}

export default Node;