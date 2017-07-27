import React from 'react'
import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native'

const AlertExample = () => {

   const showAlert = () => {
      Alert.alert(
         'WARNING!',
         'AN ASSASIN IS NEARBY!!!!!!!'
      )
   }

   return (
      <TouchableOpacity onPress = {showAlert} style = {styles.button}>
         <Text>Alert</Text>
      </TouchableOpacity>
   )
}

export default AlertExample

const styles = StyleSheet.create ({
   button: {
      backgroundColor: '#4ba37b',
      width: 200,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 100
   }
})
