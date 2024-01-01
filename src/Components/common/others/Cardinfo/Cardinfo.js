import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { scale } from '../../../../../utils/scale'
import theme from '../../../../themes/theme'

const Cardinfo = ({ Cardimg, numtxt, righticon, cardStyle, onpress, pressable, pressRightIcon, imgstyle, emptyview, select }) => {
  return (
    <TouchableOpacity activeOpacity={pressable ? 0 : 1}
      style={[styles.card, cardStyle]}
      onPress={onpress}
    >
      <Image
        source={Cardimg}
        style={[styles.img, imgstyle]}
      />
      <View style={styles.numcontainer}>
        <Text style={styles.cardnum}>{numtxt}</Text>
        {righticon &&
          <TouchableOpacity onPress={pressRightIcon}>
            <Image
              source={righticon}
              style={styles.rightimg}
            />
          </TouchableOpacity>
        }
        {
          emptyview ?
            <View style={{ width: '40%' }}></View> :
            null
        }
      </View>
    </TouchableOpacity>
  )
}

export default Cardinfo
const styles = StyleSheet.create({
  card: {
    height: scale(73),
    backgroundColor: theme.palette.cardinfoColor,
    borderRadius: theme.radius.r6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
    marginTop: scale(30)
  },
  img: {
    width: scale(60),
    height: scale(60)
  },
  cardnum: {
    ...theme.typography.common.h3r,
    color: theme.palette.lightGray,
    fontWeight: '400'
  },
  numcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightimg: {
    width: scale(24),
    height: scale(24),
    marginLeft: scale(10)
  }
})