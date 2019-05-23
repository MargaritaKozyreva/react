import React from 'react';
import './search-panel.css';


class SearchPanel extends React.Component {
  constructor({onSearch}) {
    super();

    this.state = {
      term: ''
    }

    this.onSearchChangeSearch = (e) => {
      const new_term = e.target.value;
      this.setState({
          term: new_term
      });
      onSearch(new_term)
    }
  }

    render() {
      console.log(this.props.onSearchChange)
      return (
        <input type="text"
          className="form-control search-input"
          placeholder="type to search"
          value = {this.state.term}
          onChange={this.onSearchChangeSearch} />
      );
    };
  };

  export default SearchPanel;
