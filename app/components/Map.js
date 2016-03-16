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
    return (<div className={styles.container}>
        <button onClick={this.props.moveViewUp}>  ^   </button>
        <br/>
        <button onClick={this.props.moveViewLeft}>  &lt;   </button>
        <canvas id="mainWindow" width="500" height="500"
                style={{borderColor:"black", borderWidth:1 , borderStyle:"solid" }}/>
        <button onClick={this.props.moveViewRight}>  &gt;  </button>
        <br />
        <button onClick={this.props.moveViewDown}>  \/  </button>


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
