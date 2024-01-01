import { View, Text,TouchableOpacity,StyleSheet, Image } from 'react-native'
import React from 'react'
import { scale } from '../../../../../utils/scale'
import theme from '../../../../themes/theme'
import SmallBag from '../../../../assets/svg/SmallBag'

const AddBtn = ({btnStyle,sourceimg}) => {
  return (
   <TouchableOpacity  style={[styles.btncontainer,btnStyle]}>
     <SmallBag/>
   </TouchableOpacity>
  )
}

export default AddBtn
const styles=StyleSheet.create({
btncontainer:{
    width:scale(52),
    height:scale(52),
    borderRadius:scale(26),
    backgroundColor: theme.palette.PrimaryDeep,
    justifyContent:'center',
    alignItems:'center'
},
img:{
    width:scale(19),
    height:scale(19),
    color:theme.palette.white
}
})