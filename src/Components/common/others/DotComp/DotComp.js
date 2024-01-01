import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from '../../../../../utils/scale'
import theme from '../../../../themes/theme'

const DotComp = () => {
  return (
    <View style={styles.dot}>
      
    </View>
  )
}

export default DotComp

const styles = StyleSheet.create({
    dot:{
        width:scale(7),
        height:scale(7),
        backgroundColor:theme.palette.SecondaryDeep,
        borderRadius:theme.radius.rounded
    }
})