import React , { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCtx , moveViewDown, moveViewLeft, moveViewRight, moveViewUp}   from '../actions/index';


class App extends Component {
  componentDidMount() {
    console.log('mounted');
    var canvas = document.getElementById('mainWindow');
    var ctx = canvas.getContext('2d');
    this.props.saveCtx(ctx);
  }

  render() {
    return (<div>
        <h1>Colony game</h1>
        <button onClick={this.props.moveViewLeft}>  &lt;   </button>
        <button onClick={this.props.moveViewUp}>  ^   </button>
        <button onClick={this.props.moveViewDown}>  \/  </button>
        <button onClick={this.props.moveViewRight}>  &gt;  </button>
        <canvas id="mainWindow" width="500" height="500"
                style={{borderColor:"black", borderWidth:1 , borderStyle:"solid" }}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
