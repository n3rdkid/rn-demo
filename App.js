import React, { useEffect, useState } from 'react';
import { ActivityIndicator,FlatList, Image, SafeAreaView, StyleSheet, View,Text, ScrollView } from 'react-native';
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
    console.log("ITEM",item)
  const {imageUrl,name,price}=item;
  return  <View style={styles.itemWrapper} key={`${name}-${price}`}>
    <Image source={{
          uri: imageUrl,
        }}
        style={styles.itemImage}/>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>{price}</Text>
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
        <FlatList
    horizontal={true}
    style={{flex:1}}
    data={item.data}
    renderItem={({item}) => <ShopItem key={`${item.name}-item`}  item={item}/>} />
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
    height:300,
    width:250,
    resizeMode:"cover",
  },
  itemsWrapper:{
    flex:1,
    flexWrap:"wrap",
    flexDirection:"row",
  },
  itemWrapper:{
    margin:16
  },
  itemName:{
    marginTop:8,
    marginBottom:8,
    fontWeight:'bold'
  },
  itemPrice:{
    color:"#323232"
  }
});
