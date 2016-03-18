import React , { Component} from 'react';

import Map from '../components/Map';
import SideBar from '../components/SideBar';

export default class App extends Component {
  render() {
    return (<div style={{display:'flex'}}>
        <Map />
        <SideBar/>
      </div>
    )
  }
}

