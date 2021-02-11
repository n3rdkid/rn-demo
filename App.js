import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, View,Text, SectionList } from 'react-native';
import {db} from "./config";
export default function App() {
  const [shopItems,setShopItems]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData =async ()=>{
    setIsLoading(true);
    const response= db.collection('collections')
    const data = await response.get();
    const mappedData=convertCollectionsSnapshotToMap(data);
    setShopItems(mappedData);
    setIsLoading(false);
    return mappedData
  }

  const convertCollectionsSnapshotToMap =collections => {
    const transformedCollection= collections.docs.map(doc => {
      const { title, items } = doc.data();
      return { id: doc.id, title, route: encodeURI(title.toLowerCase()), items };
    });
    return transformedCollection.reduce((accmulator, collection) => {
      accmulator.push({title:collection.title,data: collection.items});
      return accmulator;
    }, []);
  
 };


  const ShopItem = ({item})=>{
  const {imageUrl,name,price}=item;
  return  <View>
    {console.log(imageUrl)}
    <Image source={{
          uri: imageUrl,
        }}
        height={200}
        width={200}/>
        {/* <Text>{name}</Text>
        <Text>{price}</Text> */}
  </View>
  }
  
  if(isLoading){
  return  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={"#323232"} size="large" />
  </View>
  }
 
  return (<SafeAreaView style={styles.container}>
       <SectionList
        sections={shopItems}
        keyExtractor={(item, index) => { 
          return item + index
        }}
        renderItem={({item})=> <ShopItem item={item}/>}
        renderSectionHeader={({ section: { title } }) =>  <Text>{title}</Text>}
      />
    </SafeAreaView>)
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
