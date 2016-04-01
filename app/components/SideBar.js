import React , { Component} from 'react';
import ToolMenu from './ToolMenu';
import SelectedEntities from './SelectedEntities';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './SideBar.css';

class SideBar extends Component {

  render() {
    return (<div className={styles.container}>
        <h1>Colony Game</h1>
        <ToolMenu />
        <SelectedEntities />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
