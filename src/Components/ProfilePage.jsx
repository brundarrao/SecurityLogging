import React, { Component } from "react";
import Rollbar from 'rollbar';
import {auth} from "../firebase";
import '../Styles/Components/button.css';

class App extends Component {
    counter = 0;
    constructor(props) {
        super(props);

        this.state = {
            rollbar: new Rollbar({
                accessToken: "fa02e1db2f884ef8a7607ab56413efc1",
                captureUncaught: true,
                captureUnhandledRejections: true,
            }),
            counter: 1,
            counter2 : 1
        }
        //  this.props={
        //   user,
        //   signOut,
        //   signInWithGoogle,
        // }

        this.logInfo = this.logInfo.bind(this);
        this.throwError = this.throwError.bind(this);
        this.logInfo2 = this.logInfo2.bind(this);
       
    }
    
    render() {

        const {
            user, 
        } = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    <React.Fragment>
                        {this.logIn()}
                        <h1><center>Cloud Logging on Rollbar Dashboard</center></h1>
                        <h3>Error test button will shut the app down and other buttons will send log entry to rollbar cloud</h3>
                        <button className="btn btn-prim" id='rollbar-info' onClick={ this.logInfo }>Click to update Logs</button>
                        <button className="btn btn-prim" id='rollbar-info-2' onClick={ this.logInfo2 }>{user.displayName}</button>
                        <button className="btn btn-prim" id='throw-error' onClick={ this.throwError }>Error Test</button>
                        <p>Hello, {user.displayName}</p>
                        <p id = 'pod'></p>
                        <p id = 'pod2'></p>
                    </React.Fragment>
                </header>
                <button className = "w-full py-3 bg-pink-600 mt-4 text-white" onClick = {() => {auth.signOut(); this.logOut()}}>Sign out</button>
            </div>
        );
    }
    html1(){
       // <h1>"Update logs was clicked"</h1>;
       //window.print("hbhjb")
       

       //event handler
           //counter++;
           //alert('Number of clicks:' + counter);
       var bb = document.getElementById("pod");
       this.setState({ counter: this.state.counter + 1 });
       const curDate = new Date(Date.now());
       const dateStr = curDate.toLocaleDateString('en-UK');
       const timeStr = curDate.toLocaleTimeString('en-UK', {hour12: true});
       bb.innerHTML= `Update Logs was clicked ${this.state.counter} times, last clicked on ${dateStr} at ${timeStr}`;
    }

    html2(){
        // <h1>"Update logs was clicked"</h1>;
        //window.print("hbhjb")
        
 
        //event handler
            //counter++;
            //alert('Number of clicks:' + counter);
        var bb = document.getElementById("pod2");
        this.setState({ counter2: this.state.counter2 + 1 });
        const curDate = new Date(Date.now());
        const dateStr = curDate.toLocaleDateString('en-UK');
        const timeStr = curDate.toLocaleTimeString('en-UK', {hour12: true});
        bb.innerHTML= `${this.props.user.displayName} was clicked ${this.state.counter2} times, last clicked on ${dateStr} at ${timeStr}`;
     }
    logInfo() {
        // Example log event using the rollbar object.
        this.state.rollbar.info('Update Logs was clicked');
        this.html1()
    }

    logInfo2(){
        // Second Example log event using the rollbar object.
        this.state.rollbar.info(this.props.user.displayName + ' was clicked')
        this.html2()
    }

    throwError() {
        // Example error, which will be reported to rollbar.
        throw new Error('react test error');
    }

    logIn(){
        // Second Example log event using the rollbar object.
        this.state.rollbar.info(this.props.user.displayName + ' has logged in')
    }

    logOut(){
        // Second Example log event using the rollbar object.
        this.state.rollbar.info(this.props.user.displayName + ' has logged out')
    }
}

export default App;

