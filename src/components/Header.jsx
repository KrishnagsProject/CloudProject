import React from 'react';
import ReactDOM from 'react-dom'


export default class Header extends React.Component{
    render(){
        return <header className="App-header ">
          <h1 className='parallel-components header-title' >Application Tracking System</h1>

          <div className='parallel-components'>
       <div  className='parallel-components welcome-header'> {"Welcome!! "+this.props.user.attributes.email}{
         
        }
        </div>
        <button onClick={this.props.signOut} className='parallel-components signout-button'>Sign Out</button>
        </div>
      </header>
    }
}