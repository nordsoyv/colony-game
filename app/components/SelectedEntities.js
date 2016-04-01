import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as types from '../game/entityTypes';

function Entity(props){
  return <li key={props.name} >{props.name}</li>;
}

class SelectedEntities extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    let entities = this.props.selected.filter(entity => entity.get('type') == types.HUMAN);
    return (
      <div >
        <label>Selected:</label>
        <ul>
          {entities.map(entity  => <Entity name={entity.get('name')} />)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.world.selectedEntities
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedEntities);

