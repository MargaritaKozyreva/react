import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item'

import './app.css';

class App extends Component {

    maxId = 100;

    constructor() {
        super();
        this.onDeleted = (param) => {
            this.setState(({ todoData }) => {
                const idx = todoData.findIndex((el) => el.id === param);
                const before = todoData.slice(0, idx);
                const after = todoData.slice(idx + 1);
                const newArray = [...before, ...after];
                return {
                    todoData: newArray
                };
            })
        }

        this.onItemAdded = (text) => {
            const newItem = this.createTodoItem(text);

            this.setState(({ todoData }) => {
                const newArray = [...todoData, newItem];
                return {
                    todoData: newArray
                }
            })
        }
    }

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        const newArray = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
        return newArray;
  }
 
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
            todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
            todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }
        
        
    createTodoItem = (label) => {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    search(items, term) {
        if(term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchChange = (term) => {
        this.setState({
            term: term
        })
    }

    state = {
        todoData: [
            this.createTodoItem ('important thing'),
            this.createTodoItem ('less important thing'),
            this.createTodoItem ('not today'),
        ],
        term: ''
    }

    render() {
        const {todoData, term} = this.state; 
        const visibleItems = this.search(todoData, term);
        const doneCount = todoData.filter((item) => item.done).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearchChange}/>
                    <ItemStatusFilter />
                </div>
                <TodoList todos={visibleItems}
                    onDeleted={this.onDeleted}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone} />

                <AddItem onItemAdded={this.onItemAdded} />
            </div>
        )
    }
}

export default App;