import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {db} from "./config";
export default function App() {
  const [shopItems,setShopItems]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    fetchData()

  },[])

  const fetchData =async ()=>{
    const response= db.collection('collections')
    const data = await response.get();
    return convertCollectionsSnapshotToMap(data)
  }

  const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map(doc => {
      const { title, items } = doc.data();
      return { id: doc.id, title, route: encodeURI(title.toLowerCase()), items };
    });
    return transformedCollections.reduce((accmulator, collection) => {
      accmulator[collection.title.toLowerCase()] = collection;
      return accmulator;
    }, {});
  };
  


  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
    <View style={{backgroundColor: 'powderblue'}} />
    <View style={{backgroundColor: 'skyblue'}} />
    <View style={{backgroundColor: 'steelblue'}} />
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
