import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal, Text } from 'react-native';
import theme from '../../../../themes/theme';


export default Loader = (props) => {
    const { visible, style, isShowIndicator, onRequestClose } = props


    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType='fade'
            transparent>
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.1)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator
                    animating={isShowIndicator}
                    size={'large'}
                    color={theme.palette.PrimaryDark}
                    style={style}
                />
            </View>
        </Modal>

    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00000000',
        // backgroundColor: (colors.white + '30'),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
