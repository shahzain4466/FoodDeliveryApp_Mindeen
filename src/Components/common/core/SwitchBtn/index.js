import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { scale } from '../../../../../utils/scale'
import theme from '../../../../themes/theme'

const SwitchBtn = ({ onPress, themeStatus }) => {
  const [active, setActive] = useState(themeStatus)
  return (
    <Pressable style={[styles.maincontaier, { backgroundColor: themeStatus ? theme.palette.PrimaryDeep : theme.palette.Gray }]}
      onPress={onPress}
    >
      <View style={[styles.thumb, { alignSelf: themeStatus ? 'flex-end' : 'flex-start' }]}></View>
    </Pressable>
  )
}

export default SwitchBtn
const styles = StyleSheet.create({
  maincontaier: {
    width: scale(39),
    height: scale(23),
    borderRadius: scale(30),
    justifyContent: 'center',
    paddingStart: scale(5),
    paddingEnd: scale(5),
  },
  thumb: {
    width: scale(13),
    height: scale(13),
    borderRadius: scale(6.5),
    backgroundColor: theme.palette.white
  }
})