import React from "react";
import { View,Image,Text,StyleSheet } from "react-native";

const ShopItem = ({item:{imageUrl,name,price}})=>{
    return  <View style={styles.itemWrapper} key={`${name}-${price}`}>
      <Image source={{
            uri: imageUrl,
          }}
          style={styles.itemImage}/>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemPrice}>{price}</Text>
    </View>
    }

const styles = StyleSheet.create({
        itemImage:{
          height:300,
          width:250,
          resizeMode:"cover",
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
      
export {ShopItem};