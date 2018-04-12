import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import  LoginForm  from './src/components/LoginForm'

class App extends Component{
    state = { loggedIn: false,}
    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyBgbj6NARdbbBLk_03zEnBjY_5-dB8XslU",
            authDomain: "authentication-8de52.firebaseapp.com",
            databaseURL: "https://authentication-8de52.firebaseio.com",
            projectId: "authentication-8de52",
            storageBucket: "authentication-8de52.appspot.com",
            messagingSenderId: "756207885495"
          });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }

        });
        
    }
    renderContent() {
        switch (this.state.loggedIn) {
          case true:
            return (
              <Button onTap={() => firebase.auth().signOut()} >
                <Text>Log Out</Text>
              </Button>
            );
          case false:
            return <LoginForm />;
          default:
            return <Spinner size="large" />;
        }
      }
    render(){
       
        return(
            <View>
                <Header headerText="Auth" />
                {this.renderContent()}
            </View>            
        );
    }
}

export default App;