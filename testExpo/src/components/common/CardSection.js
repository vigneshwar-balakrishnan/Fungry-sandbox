import React, { Component } from 'react';
import {  View } from 'react-native';

const CardSection = (props) => {
    return(
        <View style={styles.cardStyle}>
          {props.children}
        </View>
    );
};

const styles={
    cardStyle: {
        borderColor: '#ddd',
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'flex-start',
       
    }
}

export  {CardSection};