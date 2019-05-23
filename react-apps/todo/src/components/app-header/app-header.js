import React from 'react';
import './app-header.css';

const AppHeader = ({ toDo, done }) => {

    if (toDo === 0) {
        toDo = `${done} заданий выполнено`
        done = '';
    } else {
        toDo = 'Осталось: ' + toDo;
        done = 'Сделано: ' + done;
    }

    return (
        <div className="app-header d-flex">
            <h1>Todo List</h1>
            <h2>{toDo} {done}</h2>
        </div>
    )
}

export default AppHeader;