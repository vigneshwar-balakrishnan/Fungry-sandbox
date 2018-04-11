import React, { Component } from 'react';
import { Text } from 'react-native'
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false,  response: []  };

    onButtonPress() {
        const {email, password} = this.state;

        this.setState({ error: '', loading: true}); // this is to reset the error msg for correct sigin after wrong attempt

        // firebase.auth().signInWithEmailAndPassword(email,password)
        //     .then(this.onLoginSuccess.bind(this))
        //     .catch(() => {  //is from promise returned from signinMethod
        //         firebase.auth().createUserWithEmailAndPassword(email, password)
        //             .catch(this.onLoginFail.bind(this));
        //     });
        
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then( data => {
            this.setState({
                response: data.error
            })
        })
        .catch(data => {
            this.setState({
                response: "data.error"
            })
        })
        // fetch('https://rallycoding.herokuapp.com/api/music_albums')
        // .then(response => response.json())
        // .then(data => this.setState({ response: data }))
        // .catch( error => this.setState({ response: "error" }));
              
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
      }

    onLoginSuccess() {
        this.setState({
          email: '',
          password: '',
          loading: false,
          error: ''
        });
      }

    renderButton(){
        if(this.state.loading){
            return <Spinner />
        }
        // if else can also be used ,since default else is return button keep plain
        return(
            <Button onTap={this.onButtonPress.bind(this)} >
                Log In
            </Button>
           
        )
    }
   
    renderResponse() {
        if (this.state.response.length > 0) {
            return this.state.response;
        } else {
            return "Empty response"
        }
    }

    render() {
        console.log(this.state)
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="MotherTeresa@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <Text style={styles.errorTextStyle}>
                    {this.renderResponse()}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

               <Button>
                   lala
               </Button>
                
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;