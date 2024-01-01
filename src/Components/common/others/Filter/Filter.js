import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, Dimensions, Modal,TouchableWithoutFeedback,TouchableOpacity} from "react-native"
import theme from "../../../../themes/theme";
import Botton from "../../core/Button";
import { scale } from "../../../../../utils/scale";
import { Strings } from "../../../../constants/Strings";


const  Filter = ({label,
    showFilter,
    modalContainerStyle,
    modalLabelStyle,
    setShowFilter,
    setPriceFilter,
    setRatingFilter,
    setTimeFilter
}) => {
    return (
        <Modal visible={showFilter}
        style={{flex:1,justifyContent:'center'}}
            transparent={true}
            onRequestClose={()=>setShowFilter(false)}
        >
            <TouchableWithoutFeedback onPress={() => setShowFilter(false)}>
            <View style={styles.mainContainer}>
                <View style={[styles.container, modalContainerStyle]}>
                    <View style={styles.section}>
                    <Text style={[styles.containerHeader, modalLabelStyle]}>{Strings.filterLabel}</Text>
                    </View>
                    <TouchableOpacity  onPress={()=>{
                        setPriceFilter('sort by price')
                        setShowFilter(false)
                        }}>
                    <Text style={styles.filtertxt}>{Strings.filterPrice}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setRatingFilter('sort by rating')
                        setShowFilter(false)
                        }}>
                    <Text style={styles.filtertxt}>{Strings.filterRating}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>{
                        setTimeFilter('sort by time')
                          setShowFilter(false)
                    }}>
                    <Text style={styles.filtertxt}>{Strings.filterTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* {props.show&&<CustomButton
                    mainButtonStyle={styles.nextButtonStyle}
                    label={"NEXT"}
                    onPress={props.onNextPress}
                />} */}
                </TouchableWithoutFeedback>
        </Modal>
    )
}
export default Filter
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    width: '100%',
    //  alignItems: 'center',
    //   justifyContent: 'center',
    //   alignSelf:'center',
      backgroundColor:"rgba(0,0,0,0.5)" 
    },
 container: {
        backgroundColor:theme.palette.white,
        position:'absolute',
        width: '40%',
        right:scale(35),
        top:scale(52),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:scale(20),
    },
    containerHeader: {
        fontSize:scale (16),
        marginBottom: scale(10),
        marginTop:scale (10),
        color: theme.palette.white,
        textAlign: 'center',

    },
    cancelButton: {
        backgroundColor: theme.palette.white,
        width: '80%',
        height:scale (40),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: scale(20)
    },
    cancelButtonText: {
        color: theme.palette.Gray
    },
    continueButton: {
        width: '80%',
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: scale(20)
    },
    titletxt: {
        ...theme.typography.common.h3sb,
        fontWeight: '600',
    },
    btn: {
        marginBottom: scale(10),
        width:'70%',
        alignSelf: 'center'
    },
    filtertxt:{
        padding:scale(10),
        fontSize:scale(14),
        color:theme.palette.DarkBlack
    },
    section:{
        backgroundColor:theme.palette.PrimaryDeep,
        width:'100%',
        borderTopLeftRadius:scale(10),
        borderTopRightRadius:scale(10)
    }
})