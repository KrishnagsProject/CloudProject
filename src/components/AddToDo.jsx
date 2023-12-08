import React from 'react';
import ReactDOM from 'react-dom'
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { v4 as uuid } from 'uuid';
import {  PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

export default class AddToDo extends React.Component{
    unique_id = uuid();
    stackTokens = { childrenGap: 50 };
    stackStyles = { root: { width: 300 } };
    constructor(props){
        super(props)
        this.state={
            name:"",
            checked:"false",
            id:this.unique_id,
            userEmail:this.props.user.attributes.email
        }
        this.addToDo=this.addToDo.bind(this);
    }
    render(){
        return <div>
             <Stack horizontal tokens={this.stackTokens} styles={this.stackStyles} >
                  <TextField label="ToDo Item"   value={this.state.name} onChange={(e)=>{
                this.setState({
                    name:e.target.value
                })
            }}/>
             </Stack>
            <PrimaryButton text="Add ToDo Item" allowDisabledFocus
                 disabled={this.state.name==""?true:false} 
                 onClick={()=>this.addToDo()} className='add-button-addtodo'/>
        </div>
    }

    async addToDo(){
        await fetch("https://6hjw1m5p7l.execute-api.us-west-1.amazonaws.com/Production/todo",{
            method:'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'Content-Type',
              'Access-Control-Allow-Methods':'*'
            },
            body:JSON.stringify(this.state)
        }).
        then((res)=>res.json())
        .then((data)=>{
           this.setState({
            name:"",
            checked:"false",
            id:uuid(),
            userEmail:this.props.user.attributes.email
           })
        }) 
    }
}