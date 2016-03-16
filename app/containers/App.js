import React , { Component} from 'react';

import Map from '../components/Map';

export default class App extends Component {
  render() {
    return (<div>
        <h1>Colony game</h1>
        <Map />
      </div>
    )
  }
}

