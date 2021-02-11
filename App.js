import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, View,Text, SectionList, ScrollView } from 'react-native';
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
  return  <View style={styles.itemWrapper} key={`${name}-${price}`}>
    <Image source={{
          uri: imageUrl,
        }}
        style={styles.itemImage}/>
        <Text>{name}</Text>
        <Text>{price}</Text>
  </View>
  }
  
  if(isLoading){
  return  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={"#323232"} size="large" />
  </View>
  }
 
  return (
 
  <SafeAreaView style={styles.container}>
     <ScrollView>
      {shopItems.map(item=>{
       return <>
        <Text style={styles.title}>{item.title}</Text> 
        <View style={styles.itemsWrapper}>
          {item.data.map((shopItem,idx)=>{
           return <ShopItem  key={`${shopItem.name}-${idx}`}  item={shopItem}/>})}
       </View>
        </>
      })}
      </ScrollView>
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    marginLeft:16,
    marginTop:16
  },
  itemImage:{
    height:400,
    width:300,
    resizeMode:"cover",
  },
  itemsWrapper:{
    flex:1,
    flexWrap:"wrap",
    flexDirection:"row",
  },
  itemWrapper:{
    margin:16
  }
});
