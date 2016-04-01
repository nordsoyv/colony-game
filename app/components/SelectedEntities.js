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
    if(this.props.selected.count() == 0){
      return null;
    }
    let entities = this.props.selected.map(id => this.props.entities.get(id) );

    return (
      <div >
        <label>Selected:</label>
        <ul>
          {entities.map( (entity, number ) => <Entity name={entity.get('name')} number={number} id={entity.get('id')} />)}
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

