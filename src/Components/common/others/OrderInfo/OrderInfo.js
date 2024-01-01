import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { scale } from '../../../../../utils/scale'
import theme from '../../../../themes/theme'

const OrderInfo = ({ title, btntxt, sourceimg, detail, cardNum, imgstyle }) => {
   return (
      <View style={styles.main}>
         <View style={styles.head}>
            <Text style={styles.titletxt}>{title}</Text>
            <TouchableOpacity>
               <Text style={styles.btn}>{btntxt}</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.subCon}>
            <View style={{ flexDirection: 'row' }}>
               <Image
                  source={sourceimg}
                  style={[styles.img, imgstyle]}
               />
               {detail ?
                  <Text style={styles.detailtxt}>{detail}</Text>
                  :
                  null
               }
            </View>
            {
               cardNum ?
                  <Text style={styles.numtxt}>{cardNum}</Text>
                  :
                  null
            }
         </View>
      </View>
   )
}

export default OrderInfo
const styles = StyleSheet.create({
   main: {
      width: '100%',
      marginVertical: scale(27),
      borderRadius: scale(22),
      padding: scale(15),
      backgroundColor: '#FFFFFF',
      shadowColor: theme.palette.shadowColor,
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 0.2,
      elevation: 5,
   },
   head: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'

   },
   titletxt: {
      color: theme.palette.GrayDark,
      ...theme.typography.common.h3r,
      fontWeight: '400'
   },
   btn: {
      ...theme.typography.common.h3r,
      color: '#FEBB00'
   },
   subCon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   }, img: {
      width: scale(33),
      height: scale(33)
   },
   detailtxt: {
      ...theme.typography.common.h3r,
      color: theme.palette.DarkBlack,
      width: scale(256),
      marginLeft: scale(10)
   },
   numtxt: {
      ...theme.typography.common.h3r,
      color: theme.palette.lightGray
   }
})