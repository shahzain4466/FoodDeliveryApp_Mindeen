import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, Dimensions, Modal,} from "react-native"
import theme from "../../../../themes/theme";
import Botton from "../../core/Button";
import { scale } from "../../../../../utils/scale";
import { Strings } from "../../../../constants/Strings";


const  Customodal = (props) => {

    return (
        <Modal visible={props.modalVisible}
        style={{flex:1,justifyContent:'center'}}
            transparent={true}
        >
            <View style={styles.mainContainer}>
                <View style={[styles.container, props.modalContainerStyle]}>
                    <Text style={[styles.containerHeader, props.modalLabelStyle]}>{props.label}</Text>
                    <Botton
                        titleStyle={styles.titletxt}
                        title={props.firstButtonLabel}
                        singleButtonStyle={styles.btn}
                        onPress={props.onAdd}
                    />

                    <Botton
                        titleStyle={styles.titletxt}
                        title={props.secondButtonLabel}
                        singleButtonStyle={styles.btn}
                        onPress={props.Continue}
                    />
                    <Botton
                        titleStyle={styles.titletxt}
                        title={props.cancelBtn}
                        singleButtonStyle={styles.btn}
                        onPress={props.onCancel}
                    />
                </View>
            </View>
            {/* {props.show&&<CustomButton
                    mainButtonStyle={styles.nextButtonStyle}
                    label={"NEXT"}
                    onPress={props.onNextPress}
                />} */}
        </Modal>
    )
}
export default Customodal
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    width: '100%',
     alignItems: 'center',
      justifyContent: 'center',
      alignSelf:'center',
      backgroundColor:"rgba(0,0,0,0.5)" 
    },
 container: {
        backgroundColor:theme.palette.white,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:scale(20),
    },
    containerHeader: {
        fontSize:scale (12),
        marginBottom: scale(10),
        marginTop:scale (10),
        color: theme.palette.black,
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
})