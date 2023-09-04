import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Button = (props: any) => {
    const {
        buttonMainContainer,
        buttonImage,
        buttonStyle,
        onPress
    } = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={buttonMainContainer}>
            <Image source={buttonImage} style={buttonStyle} />
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({})