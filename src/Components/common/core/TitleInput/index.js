
import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import theme from '../../../../themes/theme';
import { scale } from '../../../../../utils/scale';
const TitleInput = (props) => {

    const {
        title,
        titleAllCaps,
        placeholder,
        onIconPress,
        iconSrc,
        mainContainer,
        placeholderColor,
        value,
        onChangeText,
        secureTextEntry,
        keyboardType,
        multiline,
        inputStyle,
        rowContainer,
        textAlignVertical,
        defaultValue,
        iconDisabled,
        editable,
        iconStyle,
        onFocus,
        onBlur,
        titlestyle,
        maxLength
    } = props
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
      };
      const handleBlur = () => setIsFocused(false);
    
      const borderNormal = {
        borderWidth: 0.3,
        borderColor: theme.palette.SlightGray,
      };
    
      const activeBorder = {
        borderWidth: 1,
        borderColor: theme.palette.TypographyDeep,
      };
      const errorBorder = {
        borderWidth: 1,
        borderColor: theme.palette.PrimaryDeep,
      };
    
      const borderStyling = isFocused ? activeBorder : borderNormal;
    //   const errorBorderStyling = error ? errorBorder : borderStyling;

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <Text style={[styles.title, titlestyle]}>{titleAllCaps ? title?.toUpperCase() : title}</Text>
            <View style={[styles.rowContainer, rowContainer,borderStyling,]}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.inputContainer, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    textAlignVertical={textAlignVertical}
                    defaultValue={defaultValue}
                    maxLength={maxLength}
                    onFocus={handleFocus}
                     onBlur={handleBlur}
                    // cursorColor={colors.white}
                    editable={editable}
                />
                {iconSrc ? <TouchableOpacity
                    disabled={iconDisabled}
                    style={styles.iconContainer}
                    onPress={onIconPress}
                >
                    <Image
                        source={iconSrc}
                        style={[{ width: 18, height: 18, tintColor: 'white', }, iconStyle]}
                        resizeMode="contain"
                    />
                </TouchableOpacity> : null}
            </View>
        </View>
    )
}

export default TitleInput
const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        // padding: scale(5),
        marginTop:scale(10)
    },
    title: {
        fontSize: scale(14),
        fontWeight: "400",
        color: theme.palette.GrayPlaceHolder
    },
    rowContainer: {
        width: "100%",
        height: scale(65),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: scale(10),
        paddingLeft: scale(3),
        backgroundColor: theme.palette.white,
        marginVertical: scale(5),
        shadowColor: theme.palette.shadowColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.2,
        elevation: 5,
    },
    inputContainer: {
        width: "85%",
        height: "100%",
        color: theme.palette.PrimaryDark,
        fontSize: scale(12),
        fontWeight: "400"
    },
    iconContainer: {
        width: scale(60),
        height: scale(40),
        alignItems: "center",
        justifyContent: "center",
    }
})