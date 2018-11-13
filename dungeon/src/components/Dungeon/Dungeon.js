import React, {Component} from 'react';
import './Dungeon';
import dungeonGen from '../../scripts/dungeonGen.js';

class Dungeon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: dungeonGen(),
    }
  }

  render() {
    return (
      <div>{this.state.map.map(x => <div>{x.join(" ")}</div>)}</div>
    )
  }
}

export default Dungeon;