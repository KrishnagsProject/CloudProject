import React from 'react';
import ReactDOM from 'react-dom'
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import AppliedJobs from './AppliedJobs';
import AddJob from './AddJob';
import ToDo from './ToDo.jsx';
import AddToDo from './AddToDo';

export default class DashBoard extends React.Component{
    render(){
        return <div className='main-component'>
          <div className='parallel-components jobs-component'>
<Pivot aria-label="Basic Pivot Example">
      <PivotItem headerText="Applied Jobs">
        <AppliedJobs user={this.props.user}/>
      </PivotItem>
      
      <PivotItem headerText="Add a Job">
        <AddJob user={this.props.user}/>
      </PivotItem>
    </Pivot>
    </div>
    <div className='parallel-components todo-component'>
    <Pivot aria-label="Basic Pivot Example" >
      <PivotItem headerText="To-Do" className='todo-pivot'>
        <ToDo user={this.props.user}/>
      </PivotItem>
      
      <PivotItem headerText="Add To-do" className='todo-pivot'>
       <AddToDo user={this.props.user}/>
      </PivotItem>
    </Pivot>
    </div>
    </div>
       
    }
}