import React, { Component } from 'react';
import { Text } from 'react-native'
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false, response: [] };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true }); 
        fetch('http://10.13.7.96:3000/api/auth/login', {
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
            .then(data => {
                if (data.error !== null) {
                    this.setState({
                        response: data.error
                    })
                } else {
                    this.setState({
                        error: data.message
                    })
                    this.onLoginSuccess.bind(this);
                }

            })
            .catch((error) => {
                this.setState({
                    response: "Unknown error =>" + error.toString()
                })
            })
        
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner />
        }
        
        return (
            <Button onTap={this.onButtonPress.bind(this)} >
                <Text>Log In</Text>
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