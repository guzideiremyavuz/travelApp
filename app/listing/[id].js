import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ListingDetails = () => {
    const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>ListingDetails{id}</Text>
    </View>
  )
}

export default ListingDetails

const styles = StyleSheet.create({})