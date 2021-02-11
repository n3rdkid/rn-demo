import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [description,setDescription]=useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to do something"
        onChangeText={text => setDescription(text)}
        defaultValue={description}
      />
      <Text>{description}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
