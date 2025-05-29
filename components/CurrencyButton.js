import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

const CurrencyButton=(props)=>{
  return(
    <>
      <View style={styles.buttonContainer}>
        <Text style={styles.flag}>{props.flag}</Text>
        <Text style={styles.country}>{props.country}</Text>
      </View>
    </>
  )
}

export default CurrencyButton;

const styles = StyleSheet.create({
buttonContainer:{
  alignItems: 'center',
  justifyContent: 'center',
},
flag:{
  fontSize:28,
  color:'#FFFFFF',
  marginBottom: 4
},
country:{
  fontSize:14,
  color:'#000000',
  textAlign: 'center',  
}
})