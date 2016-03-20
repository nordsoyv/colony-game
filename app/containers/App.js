import React , { Component} from 'react';

import Map from '../components/Map';
import SideBar from '../components/SideBar';
import styles from './App.css';


export default class App extends Component {
  render() {
    return (<div className={styles.flexContainer}>
        <div className={styles.flexSidebar}>
          <SideBar/>
        </div>
        <div className={styles.flexMap}>
          <Map />
        </div>
      </div>
    )
  }
}

