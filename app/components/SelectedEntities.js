import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function Entity(props){
  return <li key={props.number} >{props.name + ' #' + props.id}</li>;
}

class SelectedEntities extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.selected.length == 0){
      return null;
    }
    return (
      <div >
        <label>Selected:</label>
        <ul>
          {this.props.selected.map( (entity, number ) => <Entity name={entity.name} number={number} id={entity.id} />)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.world.selectedEntities,
    entities: state.world.entities
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedEntities);

