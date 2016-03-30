import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setTool} from '../actions';

class ToolMenu extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }


  onSelect() {
    this.props.setTool(this.refs.tool.value);
  }

  render() {
    return (
      <div >
        <label>Tools:</label>
        <select onChange={this.onSelect} ref="tool" value={this.props.selectedTool}>
          <option value="move">Move</option>
          <option value="cut">Cut</option>
          <option value="harvest">Harvest</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedTool: state.input.selectedTool
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setTool
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolMenu);
