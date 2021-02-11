import React from "react";
import { View,ActivityIndicator } from "react-native";

const Loader = ()=>
 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={"#323232"} size="large" />
  </View>

export {Loader};