import React from 'react';
import './add-item.css';

export default class AddItem extends React.Component {
    
    constructor(){
        super();

        this.onLabelChange = (event) => {
            this.setState({
                label: event.target.value
            })
        };

        this.onSubmit = (e) => {
            e.preventDefault();
            this.props.onItemAdded(this.state.label);
            this.setState({
                label: ''
            })
        }
        this.state = {
            label: ''
        }
    }

    render() {

        return (
            <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
                <input type="text" 
                        className="form-control" 
                        onChange={this.onLabelChange} 
                        placeholder="What needs to be done"
                        value={this.state.label} />
                <button className="btn btn-success">Add</button>
            </form>
        );
    }
}