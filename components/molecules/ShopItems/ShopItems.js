import React from "react";
import { FlatList, SafeAreaView, StyleSheet,Text, ScrollView } from 'react-native';
import {ShopItem} from "../../atoms/ShopItem/ShopItem"

const ShopItems=({shopItems})=><SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginLeft:16,
      marginTop:16
    },
    itemsWrapper:{
      flex:1,
      flexWrap:"wrap",
      flexDirection:"row",
    },
  });

  export {ShopItems}


  