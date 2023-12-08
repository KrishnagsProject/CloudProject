import React from 'react';
import ReactDOM from 'react-dom'
import Jobs from './data/job.json';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { Label } from '@fluentui/react/lib/Label';
import { Stack, TooltipHost,IStackProps } from '@fluentui/react';
import { v4 as uuid } from 'uuid';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import {
    DatePicker,
    DayOfWeek,
    Dropdown,
    IDropdownOption,
    mergeStyles,
    defaultDatePickerStrings,
  } from '@fluentui/react';
import { JobsService } from './services/JobsService';
export default class AppliedJobs extends React.Component{
   unique_id = uuid();
   service=new JobsService();
    rowProps = { horizontal: true, verticalAlign: 'center' };

    tokens = {
     sectionStack: {
       childrenGap: 10,
     },
     spinnerStack: {
       childrenGap: 20,
     },
   };
 
     columns = [
       
        {
          key: 'column2',
          name: 'Company Name',
          fieldName: 'name',
          minWidth: 210,
          maxWidth: 350,
          isRowHeader: true,
          isResizable: true,
          isSorted: true,
          isSortedDescending: false,
          sortAscendingAriaLabel: 'Sorted A to Z',
          sortDescendingAriaLabel: 'Sorted Z to A',
          onColumnClick: this._onColumnClick,
          data: 'string',
          isPadded: true,
          onRender: (item) => {
            return <span>{item.companyName}</span>;
          },
        },
        {
          key: 'column3',
          name: 'Role',
          fieldName: 'dateModifiedValue',
          minWidth: 70,
          maxWidth: 90,
          isResizable: true,
          onColumnClick: this._onColumnClick,
          data: 'string',
          onRender: (item) => {
            return <span>{item.role}</span>;
          },
          isPadded: true,
        },
        {
          key: 'column4',
          name: 'Location',
          fieldName: 'modifiedBy',
          minWidth: 70,
          maxWidth: 90,
          isResizable: true,
          isCollapsible: true,
          data: 'string',
          onColumnClick: this._onColumnClick,
          onRender: (item) => {
            return <span>{item.location}</span>;
          },
          isPadded: true,
        },
        {
          key: 'column5',
          name: 'Status',
          fieldName: 'fileSizeRaw',
          minWidth: 70,
          maxWidth: 90,
          isResizable: true,
          isCollapsible: true,
          data: 'string',
          onColumnClick: this._onColumnClick,
          onRender: (item) => {
            return <span>{item.status}</span>;
          },
        }
      ];
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
          items:[],
          isLoading:true,
          isShowingJobDetails:false,
          job:{
            companyName:"",
            role:"",
            location:"",
            status:"",
            links:"",
            userEmail:"",
            modifiedDate:"",
            appliedDate:"",
            notes:"",
            description:"",
            id:""
          }
      }
    this.getJobs()
    this._onItemInvoked=this._onItemInvoked.bind(this);
    this.updateJob=this.updateJob.bind(this);
    this.deleteJob=this.deleteJob.bind(this);
     }
    async getJobs(){
      await fetch("https://xrz0f1xcc1.execute-api.us-west-1.amazonaws.com/Production/jobs/"+this.props.user.attributes.email).
      then((res)=>res.json())
      .then((data)=>{ this.setState({
        items:data!=undefined?data:[],
        isLoading:false
      },()=>{})})
      
    }
 
    render(){
        return <div>{
          this.state.isShowingJobDetails?
          <div>
          <form className='addjob-form'>
          <Stack horizontal tokens={this.stackTokens} styles={this.stackStyles} >
          <Stack {...this.columnProps}>
          <TextField label="Company Name " required defaultValue={this.state.job.companyName} onChange={(e)=>{
              let jobDetail=this.state.job
              jobDetail.companyName=e.target.value
              this.setState({
                job:jobDetail
             })
          }}/>
       
          <TextField label="Job Status " required defaultValue={this.state.job.status} onChange={(e)=>{
             let jobDetail=this.state.job
             jobDetail.status=e.target.value
             this.setState({
              job:jobDetail
           })
          }}/>
           <DatePicker
         value={new Date(this.state.job.modifiedDate)}
      firstDayOfWeek={DayOfWeek.Sunday}
      placeholder="Select a date..."
      ariaLabel="Select a date"
      label="Last Modified Date"
      disabled
   
      // DatePicker uses English strings by default. For localized apps, you must override this prop.
      strings={defaultDatePickerStrings}
    />
             <TextField label="Description" multiline  rows={3} defaultValue={this.state.job.description} onChange={(e)=>{
               let jobDetail=this.state.job
               jobDetail.description=e.target.value
               this.setState({
                job:jobDetail
             })
          }}/>
          <TextField label="Job Links (Add multiple links separated by ;)" multiline  rows={3} defaultValue={this.state.job.links} onChange={(e)=>{
               let jobDetail=this.state.job
               jobDetail.links=e.target.value
               this.setState({
                job:jobDetail
             })
          }}/>
          </Stack>
          <Stack {...this.columnProps}>
          <TextField label="Role " required defaultValue={this.state.job.role} onChange={(e)=>{
              let jobDetail=this.state.job
              jobDetail.role=e.target.value
              this.setState({
                job:jobDetail
             })
          }}/>
          <TextField label="Location " required defaultValue={this.state.job.location} onChange={(e)=>{
               let jobDetail=this.state.job
               jobDetail.location=e.target.value
               this.setState({
                job:jobDetail
             })
          }}/>
          <DatePicker
          value={this.state.job.appliedDate!=""&&new Date(this.state.job.appliedDate)}
      firstDayOfWeek={DayOfWeek.Sunday}
      placeholder="Select a date..."
      ariaLabel="Select a date"
      label="Applied Date"
      onSelectDate={(e)=>{
        let jobDetail=this.state.job
        jobDetail.appliedDate=e.toDateString()
        this.setState({
          job:jobDetail
       })
      }}
      // DatePicker uses English strings by default. For localized apps, you must override this prop.
      strings={defaultDatePickerStrings}
    />
    <TextField label="Notes" multiline  rows={3} defaultValue={this.state.job.notes} onChange={(e)=>{
             let jobDetail=this.state.job
             jobDetail.notes=e.target.value
            this.setState({
                 job:jobDetail
              })
          }}/>
          </Stack>
              </Stack>
              {this.state.job.companyName==""||this.state.job.role==""||this.state.job.location==""||this.state.job.status==""?
        <div>    <PrimaryButton text="Update job" allowDisabledFocus
        disabled className='add-button-addjob parllel-components'/>
        <PrimaryButton text="Delete job" allowDisabledFocus disabled
        onClick={()=>this.addJob()} className='add-button-addjob  parllel-components'/>
         <DefaultButton text="Cancel" allowDisabledFocus
              onClick={()=>this.setState({
                isShowingJobDetails:false
              })}        className='add-button-addjob cancel-button parllel-components'/>
                       
        </div>  
                        :
                        <div>  <PrimaryButton text="Update job" allowDisabledFocus onClick={()=>this.updateJob()} className='add-button-addjob parllel-components'/> 
                        <PrimaryButton text="Delete job" allowDisabledFocus
                        onClick={()=>this.deleteJob()} className='add-button-addjob delete-button parllel-components'/>
                      <DefaultButton text="Cancel" allowDisabledFocus
                        onClick={()=>this.setState({
                          isShowingJobDetails:false
                        })} className='add-button-addjob cancel-button parllel-components'/>
                       
                        </div> 
                        
            } 
            
          </form>
      </div>
          :
          <div>
            <h3>All Applied Jobs</h3>{
              this.state.isLoading?
             <div> <Stack {...this.rowProps} tokens={this.tokens.spinnerStack}>
             <Label>Loading Data...</Label>
             <Spinner size={SpinnerSize.large} />
           </Stack>
             </div>
              :
              this.state.items.length==0?
              <h3>No Applied Jobs present</h3>
              :
            <DetailsList
            items={this.state.items}
            columns={this.columns}
            selectionMode={SelectionMode.none}
            getKey={this._getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            onItemInvoked={this._onItemInvoked}
          />}
          </div>
    }
        </div>
    }

    _onItemInvoked(item){
      this.setState({
        isShowingJobDetails:true,
        job:item
      })
     
    }
   async updateJob(){
      this.setState({
        isShowingJobDetails:false
      })
      await fetch("https://xrz0f1xcc1.execute-api.us-west-1.amazonaws.com/Production/jobs",{
        method:'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'Content-Type',
          'Access-Control-Allow-Methods':'*'
        },
        body:JSON.stringify(this.state.job)
    }).
    then((res)=>res.json())
    .then((data)=>{
        
    })
    }

    async deleteJob(){
      this.setState({
        isShowingJobDetails:false,
        isLoading:true
      })
      await fetch("https://xrz0f1xcc1.execute-api.us-west-1.amazonaws.com/Production/job",{
        method:'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'Content-Type',
          'Access-Control-Allow-Methods':'*'
        },
        body:JSON.stringify(this.state.job)
    }).
    then((res)=>res.json())
    .then((data)=>this.getJobs())
    }
}