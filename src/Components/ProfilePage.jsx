import React, { Component } from "react";
import Rollbar from 'rollbar';
import {auth} from "../firebase";
import '../Styles/Components/button.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rollbar: new Rollbar({
                accessToken: "fa02e1db2f884ef8a7607ab56413efc1",
                captureUncaught: true,
                captureUnhandledRejections: true,
            })
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
            user
        } = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    <React.Fragment>
                        <h1>Cloud Logging on Rollbar Dashboard</h1>
                        <h3>Error test button will shut the app down and other buttons will send log entry to rollbar cloud</h3>
                        <button className="btn btn-primary" id='rollbar-info' onClick={ this.logInfo }>Click to update Logs</button>
                        <button className="btn btn-primary" id='rollbar-info-2' onClick={ this.logInfo2 }>{user.displayName}</button>
                        <button className="btn btn-primary" id='throw-error' onClick={ this.throwError }>Error Test</button>
                        <p>Hello, {user.displayName}</p>
                    </React.Fragment>
                </header>
                <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
            </div>
        );
    }
    logInfo() {
        // Example log event using the rollbar object.
        this.state.rollbar.info('Update Logs was clicked');
    }

    logInfo2(){
        // Second Example log event using the rollbar object.
        this.state.rollbar.info(this.props.user.displayName + ' was clicked')
    }

    throwError() {
        // Example error, which will be reported to rollbar.
        throw new Error('react test error');
    }
}

export default App;

