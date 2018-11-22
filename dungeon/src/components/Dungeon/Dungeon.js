import React, {Component} from 'react';
import './Dungeon.css';
import dungeonGen from '../../scripts/dungeonGen.js';
import Tile from '../Tile/Tile.js'

class Dungeon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: dungeonGen(),
    }
  }

  render() {
    return (
      <div className="dungeon-container">{this.state.map.map(x => <div className="viewRow">{x.map(y => <Tile id={y} />)}</div>)}</div>
    )
  }
}

export default Dungeon;