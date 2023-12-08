import React from 'react';
import ReactDOM from 'react-dom'
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import todo from './data/todo.json';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Stack } from '@fluentui/react/lib/Stack';


export default class PendingTodo extends React.Component{
    stackTokens = { childrenGap: 10 };
    constructor(props){
        super(props);
        this.state={
            todoList:[],
            isLoading:true
        }
        
        this.getToDo();
        this.changeHandler=this.changeHandler.bind(this);
    }
    render(){
        return <div className='todos-list'>
            {
              this.state.isLoading?
              <h4>Loading..</h4>
              :
              this.state.todoList.length==0?
              <h4>No Pending ToDO Items</h4>
              :
      <Stack tokens={this.stackTokens}>
    {
        this.state.todoList.map((item)=>
<Checkbox label={item.name} defaultChecked={"true"===item.checked} key={item.id} id={item.id} onChange={(e)=>this.changeHandler(e)} />
        )
    }
    </Stack>
    }
        </div>

    }
    async getToDo(){
        await fetch("https://6hjw1m5p7l.execute-api.us-west-1.amazonaws.com/Production/todo/false/"+this.props.user.attributes.email).
        then((res)=>res.json())
        .then((data)=>{ this.setState({
            todoList:data!=undefined?data:[],
          isLoading:false
        },()=>{})})
        
      }

      changeHandler(event){
        let todo=this.state.todoList;
        todo.map((item)=>{
            if(item.id==event.target.id){
                item.checked= item.checked==="true"?"false":"true"
               this.updateTodo(item)
               
            }
        });
        this.setState({
            todoList:todo
        })
      }
      async updateTodo(item){
       await fetch("https://6hjw1m5p7l.execute-api.us-west-1.amazonaws.com/Production/todo",{
            method:'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'Content-Type',
              'Access-Control-Allow-Methods':'*'
            },
            body:JSON.stringify(item)
        }).
        then((res)=>res.json())
        .then((data)=>{
            this.getToDo()
        }) 
      }
}