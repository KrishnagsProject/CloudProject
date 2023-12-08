import React from 'react';
import ReactDOM from 'react-dom'
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import todo from './data/todo.json';
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox';
import { Stack } from '@fluentui/react/lib/Stack';
import PendingTodo from './PendingTodo';
import CompletedTodo from './CompletedTodo';
export default class ToDo extends React.Component{
     stackTokens = { childrenGap: 10 };
     constructor(props){
         super(props);
         this.state={
             todoList:todo,
             isLoading:true
         }
     }
    render(){
        return <div>
            <Pivot aria-label="Basic Pivot Example">
      <PivotItem headerText="Pending">
          <PendingTodo user={this.props.user}/>
      </PivotItem>
      
      <PivotItem headerText="Completed">
        <CompletedTodo user={this.props.user}/>
      </PivotItem>
    </Pivot>
        </div>
    }
   
}