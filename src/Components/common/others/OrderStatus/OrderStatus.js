import { View, Text,StyleSheet, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from '../../../../../utils/scale'
import Correct from '../../../../assets/svg/Correct.svg'
import Whitedot from '../../../../assets/svg/Whitedot.svg'
import theme from '../../../../themes/theme'


const OrderStatus = ({Statusheading,Statusdsc,btnStyles,tick}) => {
  return (
    <View  style={styles.main}>
    <View style={[styles.btn,btnStyles]}>
        { tick ?
    <Correct/>:
    <Whitedot/>
        }
    </View>
     <View  style={styles.subcon}>
        <Text style={styles.headtxt}>{Statusheading}</Text>
        <Text  style={styles.dsctxt}>{Statusdsc}</Text>
     </View>
    </View>
  )
}

export default OrderStatus
const styles=StyleSheet.create({
    main:{
        width:'100%',
        flexDirection:'row',
        paddingHorizontal: scale(15),
        alignItems:'center',
        marginVertical:scale(20)
    },
    subcon:{
        width:'80%',
        paddingHorizontal:scale(25)
    },
    btn:{
        width:scale(34),
        height:scale(31),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:scale(10)
    },
    headtxt:{
        color:theme.palette.DarkBlack,
        ...theme.typography.common.h3r,
        fontWeight:'800'
    },
    dsctxt:{
        ...theme.typography.common.bodyr,
        fontWeight:'500',
        color:theme.palette.DarkBlack
    }
})