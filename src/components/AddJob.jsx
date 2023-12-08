import React from 'react';
import ReactDOM from 'react-dom'
import {  PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import {
    DatePicker,
    DayOfWeek,
    Dropdown,
    IDropdownOption,
    mergeStyles,
    defaultDatePickerStrings,
  } from '@fluentui/react';
  import { v4 as uuid } from 'uuid';

export default class AddJob extends React.Component{
    unique_id = uuid();
     stackTokens = { childrenGap: 50 };
 iconProps = { iconName: 'Calendar' };
 stackStyles = { root: { width: 650 } };
 columnProps = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};
 rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });
 
constructor(props){
    super(props);
    this.state={
        companyName:"",
        role:"",
        location:"",
        status:"",
        links:"",
        userEmail:this.props.user.attributes.email,
        modifiedDate:new Date().toDateString(),
        appliedDate:"",
        notes:"",
        description:"",
        id:this.unique_id.toString()
    }
    this.addJob=this.addJob.bind(this);
}
 
 render(){
        return <div>
            <form className='addjob-form'>
            <Stack horizontal tokens={this.stackTokens} styles={this.stackStyles} >
            <Stack {...this.columnProps}>
            <TextField label="Company Name " required value={this.state.companyName} onChange={(e)=>{
                this.setState({
                    companyName:e.target.value
                })
            }}/>
         
            <TextField label="Job Status " required value={this.state.status} onChange={(e)=>{
                this.setState({
                    status:e.target.value
                })
            }}/>
               <TextField label="Description" multiline  rows={3} value={this.state.description} onChange={(e)=>{
                this.setState({
                    description:e.target.value
                })
            }}/>
            <TextField label="Job Links (Add multiple links separated by ;)" multiline  rows={3} value={this.state.links} onChange={(e)=>{
                this.setState({
                    links:e.target.value
                })
            }}/>
            </Stack>
            <Stack {...this.columnProps}>
            <TextField label="Role " required value={this.state.role} onChange={(e)=>{
                this.setState({
                    role:e.target.value
                })
            }}/>
            <TextField label="Location " required value={this.state.location} onChange={(e)=>{
                this.setState({
                    location:e.target.value
                })
            }}/>
            <DatePicker
        firstDayOfWeek={DayOfWeek.Sunday}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        label="Applied Date"
        onSelectDate={(e)=>{
            this.setState({
                appliedDate:e.toDateString()
            })
        }}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
      <TextField label="Notes" multiline  rows={3} value={this.state.notes} onChange={(e)=>{
                this.setState({
                    notes:e.target.value
                })
            }}/>
            </Stack>
                </Stack>
                <PrimaryButton text="Applied this job" allowDisabledFocus
                 disabled={this.state.companyName==""||this.state.role==""||this.state.location==""||this.state.status==""?true:false} 
                 onClick={()=>this.addJob()} className='add-button-addjob'/>
               
            </form>
        </div>
    }

   async addJob(){
    this.setState({
        companyName:"",
        role:"",
        location:"",
        status:"",
        links:"",
        userEmail:this.props.user.attributes.email,
        modifiedDate:new Date().toDateString(),
        appliedDate:"",
        notes:"",
        description:"",
        id:this.unique_id.toString()
    })
        await fetch("https://xrz0f1xcc1.execute-api.us-west-1.amazonaws.com/Production/jobs",{
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
            
        })
    }
}