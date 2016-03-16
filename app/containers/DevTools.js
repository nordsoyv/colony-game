import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <FilterMonitor blacklist={['EFFECT_RESOLVED','EFFECT_TRIGGERED']}>
      <LogMonitor />
    </FilterMonitor>
  </DockMonitor>
);