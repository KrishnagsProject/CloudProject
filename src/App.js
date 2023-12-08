import logo from './logo.svg';
import './App.css';
import React from 'react';

import {withAuthenticator} from '@aws-amplify/ui-react';
import Header from './components/Header';
import Footer from './components/Footer';
import DashBoard from './components/DashBoard';


function App({signOut,user}) {
  return (
    <div className="App">

      <Header user={user} signOut={signOut}/>
      <DashBoard user={user}/>
      <Footer/>
    </div>
  );
}

export default withAuthenticator(App) ;
