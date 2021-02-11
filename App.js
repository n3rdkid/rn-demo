import React, { useEffect, useState } from 'react';
import {StyleSheet} from "react-native"
import { Loader,ShopItems } from './components/';
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



  
  if(isLoading){
  return  <Loader/>
  }
 
  return (<ShopItems shopItems={shopItems}/>)
}

