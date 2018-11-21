import React, {Component} from 'react';
import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="tile-container">{this.props.id}</div>
    )
  }
}

export default Tile;