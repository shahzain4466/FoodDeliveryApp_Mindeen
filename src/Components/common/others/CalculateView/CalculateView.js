import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../themes/theme'
import { scale } from '../../../../../utils/scale'

const CalculateView = ({ ChargesTitle, Charges, bottomline,titlestyle ,chargesstyle,signstyle}) => {
    return (
        <View style={styles.main}>
            <View style={styles.innerview}>
                <Text style={[styles.titletxt,titlestyle]}>{ChargesTitle}</Text>
                <View style={{ alignItems: 'flex-end', width: '30%' }}>
                    <Text style={[styles.chargestxt, chargesstyle]}>{Charges}<Text style={[styles.signtxt, signstyle]}>{'USD'}</Text></Text>
                </View>
            </View>
            {bottomline ?
                <View style={styles.bottomm}></View> :
                null
            }
        </View>
    )
}

export default CalculateView
const styles = StyleSheet.create({
    main: {
        width: '100%',
    },
    innerview: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scale(18)
    },
    titletxt: {
        color: theme.palette.DarkBlack,
        ...theme.typography.common.h2r,
        fontWeight: '500',
        width: '60%'
    },
    chargestxt: {
        color: theme.palette.DarkBlack,
        ...theme.typography.common.h2r,
        fontWeight: '500',
    },
    signtxt: {
        ...theme.typography.common.bodyr,
        fontWeight: "400",
        color: theme.palette.GrayDark
    },
    bottomm: {
        borderBottomWidth: scale(1),
        borderBottomColor: theme.palette.GrayBorder,
        marginTop: scale(10)
    }
})