import React , { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCtx , moveViewDown, moveViewLeft, moveViewRight, moveViewUp}   from '../actions/index';

import styles from './Map.css';

class Map extends Component {
  componentDidMount() {
    console.log('mounted');
    var canvas = document.getElementById('mainWindow');

    var ctx = canvas.getContext('2d');
    this.props.saveCtx(ctx);
  }

  render() {
    return ( <div id="mapContainer" className={styles.container}>
        <canvas id="mainWindow" width="512" height="512" />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveCtx,
    moveViewDown,
    moveViewUp,
    moveViewLeft,
    moveViewRight
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
