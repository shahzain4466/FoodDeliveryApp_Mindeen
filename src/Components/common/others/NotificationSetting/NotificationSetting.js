import { View, StyleSheet, Text, Button, Image, Switch } from 'react-native';
import React, { useState } from 'react'
import theme from '../../../../themes/theme';
import { scale } from '../../../../../utils/scale';
import SwitchBtn from '../../core/SwitchBtn';

const NotificationSetting = ({ titletxt, desctxt, btn,onPress,themeStatus }) => {

    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <Text style={styles.heading}>{titletxt}</Text>
                <View style={styles.subhead}>
                    <View style={styles.txtcon}>
                        <Text style={styles.notitxt}>{desctxt}</Text>
                    </View>
                    {btn ?
                    <View style={styles.swtchbtn}>
                        <SwitchBtn onPress={onPress} 
                          themeStatus={themeStatus}
                          />
                    </View>
                    :
                    null
                        }
                </View>
            </View>
        </View>
    )
}

export default NotificationSetting
const styles = StyleSheet.create({
    main: {
        width: '100%',
    },
    subhead: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtcon: {
        width: '80%',
    },
    notitxt: {
        fontSize: scale(10),
        lineHeight: scale(15),
        color: theme.palette.lightGray,
        fontFamily: theme.typography.type.reg,
        fontWeight: '500',
        marginTop: scale(5)
    },
    heading: {
        fontSize: scale(15),
        lineHeight: scale(20),
        color: theme.palette.DarkBlack,
        fontFamily: theme.typography.type.reg,
        fontWeight: '500',
        marginTop: scale(5)
    },
    swtchbtn: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    head: {
        justifyContent: 'center',
        padding:scale(10),
        paddingHorizontal:scale(10)
    },
})