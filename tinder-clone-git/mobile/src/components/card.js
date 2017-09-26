import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

import { iconAvatar } from '../utils/constants';

function Card({ name, age, avatar }) {
    return (
      <View style={styles.card}>
        <Image
          style={{ flex: 1 }}
          source={ {uri: avatar || iconAvatar } }
        />
        <View style={{margin:20}}>
          <Text style={{ fontSize: 20 }}>{name}, {age}</Text>
          <Text style={{ fontSize: 15, color: 'darkgrey' }}>Model</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 10,
    marginTop: 100,
    marginBottom: 100,
    width: 350,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  }
})

export default Card;
