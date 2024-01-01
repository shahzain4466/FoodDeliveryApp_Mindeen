import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
//* Icons
import RevealPassword from '../../../../assets/svg/RevealPassword.js';
import SearchIcon from '../../../../assets/svg/SearchV2.svg';
//* Others
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {scale} from '../../../../../utils/scale';
import theme from '../../../../themes/theme';
import Txt from '../Txt';
import PropTypes from 'prop-types';
import  Close from '../../../../assets/svg/Close.svg'
import {Screens} from '../../../../constants/constants.js';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../../assets/images/index.js';
const Input = ({
  icon,
  Filtericon,
  onKeyPress,
  filterPress,
  imgSource,
  onPress,
  closePress,
  Closeicon,
  ContentContainerStyle,
  InputStyling,
  TagStyling,
  hideTag,
  Tag,
  inputType,
  error,
  errorDetail,
  bottomDetail,
  isBottomSheetInput,
  bottomDetailStyling,
  search,
  editable,
  pressable,
  goToSearch,
  placeholder,
  keyboardType,
  value,
  onChangeTest,
  onSubmitEditing,
  maxLength,
  ...rest
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setSecureTextEntry(inputType === 'password');
  }, [inputType]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => setIsFocused(false);

  const borderNormal = {
    borderWidth: 1,
    borderColor: theme.palette.GrayLight,
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
  const errorBorderStyling = error ? errorBorder : borderStyling;

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  //* Render Inputs Icons
  const renderIcon = () => {
    if (inputType === 'password') {
      return (
        <Pressable
          onPress={toggleSecureTextEntry}
          style={styles().iconContainer}>
          <RevealPassword
            fill={
              secureTextEntry
                ? theme.palette.TypographyDeep
                : theme.palette.PrimaryDeep
            }
          />
        </Pressable>
      );
    } else if (inputType === 'btn') {
      return icon ? 
        <TouchableOpacity
          onPress={onPress}
          style={styles().calendar}>
          <Image
            source={imgSource}
            style={{width: scale(20), height: scale(20)}}
          />
        </TouchableOpacity>
       : 
        <TouchableOpacity style={styles().btn} onPress={onPress}>
          <Text style={styles().titleStyle}>{'Change'}</Text>
        </TouchableOpacity>
      
    } else if (search) {
      return (
        <View style={styles().searchIconContainer}>
          <SearchIcon />
        </View>
      );
    }  
    else {
      return null;
    }
  };

  return (
    <View style={[ContentContainerStyle]}>
      {!hideTag ? (
        <Txt style={[styles().topPlaceHolder, TagStyling]}>{Tag}</Txt>
      ) : null}
      <View style={styles().inputWrapper}>
        {isBottomSheetInput ? (
          <BottomSheetTextInput
            placeholderTextColor={theme.palette.GrayDark}
            style={[
              styles(error, search, editable, pressable).input,
              errorBorderStyling,
              InputStyling,
            ]}
            secureTextEntry={secureTextEntry}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!editable || pressable ? false : true}
            onSubmitEditing={onSubmitEditing}
            {...rest}
          />
        ) : (
          <Pressable
            style={{width: '100%'}}
            onPress={() => {
              goToSearch ? navigation.navigate(Screens.Search) : null;
            }}>
            <TextInput
              placeholderTextColor={theme.palette.GrayDark}
              style={[
                styles(error, search, editable, pressable).input,
                errorBorderStyling,
                InputStyling,
              ]}
              keyboardType={keyboardType}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              maxLength={maxLength}
              editable={!editable || pressable ? false : true}
              onChangeText={onChangeTest}
              onSubmitEditing={onSubmitEditing}
              onKeyPress={onKeyPress}
              {...rest}
            />
          </Pressable>
        )}
        {renderIcon()}
        {
          Closeicon &&
          <TouchableOpacity  
          onPress={closePress}
          style={styles().close}
          > 
          <Close />
          </TouchableOpacity>
        }
         {
          Filtericon &&
          <TouchableOpacity  
          onPress={filterPress}
          style={{justifyContent:'center'}}
          > 
          <Image
          source={Images.Filterimg}
          style={styles().filter}
          />
          </TouchableOpacity>
        }
      </View>
     
      {error && errorDetail ? (
        <View
          style={[styles().defAlignment, {marginTop: theme.spacing.margin.m5}]}>
          <Txt style={styles().errorMessage}>{errorDetail}</Txt>
        </View>
      ) : null}

      {!error && bottomDetail ? (
        <View style={[{marginTop: theme.spacing.margin.m5}]}>
          <Txt style={[styles().bottomDetailTxt, bottomDetailStyling]}>
            {bottomDetail}
          </Txt>
        </View>
      ) : null}
    </View>
  );
};

export const styles = (error, search, editable, pressable) => {
  const Activated = theme.palette.white;
  const InputColor = pressable
    ? theme.palette.TypographyDeep
    : !editable
    ? theme.palette.GrayDark
    : theme.palette.TypographyDeep;
  const havePaddingHorizontal = search ? undefined : theme.spacing.padding.p4;
  const havePaddingLeft = search ? scale(40) : undefined;

  let style = {
    defAlignment: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      backgroundColor: Activated,
      borderRadius: theme.radius.r3,
      paddingHorizontal: havePaddingHorizontal,
      paddingVertical: theme.spacing.padding.p4,
      paddingLeft: havePaddingLeft,
      color: InputColor,
      width: '100%',
      letterSpacing: scale(0.8),
      ...theme.typography.common.h3r,
    },
    topPlaceHolder: {
      marginBottom: theme.spacing.margin.m5,
      color: theme.palette.GrayDeep,
      ...theme.typography.common.h3r,
    },
    inputWrapper: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      position: 'absolute',
      right: scale(10),
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchIconContainer: {
      position: 'absolute',
      left: scale(10),
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftIcon: {
      marginRight: theme.spacing.margin.m4,
    },

    //* Error
    alertIcon: {
      marginRight: scale(8),
    },
    errorMessage: {
      color: theme.palette.PrimaryDeep,
      ...theme.typography.common.note,
    },
    //* Bottom Detail
    bottomDetailTxt: {
      color: theme.palette.GrayDark,
      ...theme.typography.common.note,
    },
    calendar:{
      width: scale(20),
      height: scale(20),
      position: 'absolute',
      right: scale(10),
    },
    close:{
      // width: scale(15),
      // height: scale(15),
      justifyContent: 'center',
      alignItems: 'center',
      position:"absolute",
      right:scale(10),
      padding:scale(5)
      // top: scale(25)
      
    },
    filter:{
      width: scale(32),
      height: scale(26),
      position:"absolute",
      right:scale(45),
      // top: scale(25)
    },
    btn: {
      position: 'absolute',
      right: scale(10),
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(70),
      height: scale(30),
      backgroundColor: 'white',
      borderColor: theme.palette.PrimaryDark,
      borderWidth: scale(1),
      borderRadius: theme.radius.r1,
    },
    titleStyle: {
      fontSize: scale(12),
      color: theme.palette.black,
    },
  };

  return StyleSheet.create(style);
};

Input.defaultProps = {
  hideTag: true,
  Tag: '',
  inputType: '',
  error: false,
  errorDetail: '',
  bottomDetail: '',
  isBottomSheetInput: false,
  search: false,
  editable: true,
  pressable: false,
};

Input.propTypes = {
  ContentContainerStyle: PropTypes.object,
  InputStyling: PropTypes.object,
  TagStyling: PropTypes.object,
  hideTag: PropTypes.bool,
  Tag: PropTypes.string,
  inputType: PropTypes.string,
  error: PropTypes.bool,
  errorDetail: PropTypes.string,
  bottomDetail: PropTypes.string,
  isBottomSheetInput: PropTypes.bool,
  bottomDetailStyling: PropTypes.object,
  search: PropTypes.bool,
  editable: PropTypes.bool,
  pressable: PropTypes.bool,
};

export default Input;

//* Documentation
/**
 * Input is a custom TextInput component with support for a tag, password input, and error handling.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} [props.ContentContainerStyle] - The style object to apply to the container view.
 * @param {object} [props.TagStyling] - The style object to apply to the tag.
 * @param {object} [props.InputStyling] - The style object to apply to the TextInput.
 * @param {boolean} [props.hideTag=true] - Whether to hide the tag.
 * @param {string} [props.Tag=''] - The tag text to display above the TextInput.
 * @param {string} [props.inputType=''] - The input type. Can be "password".
 * @param {boolean} [props.error=false] - Whether there is an error with the input.
 * @param {string} [props.errorDetail=''] - The error detail message to display below the input.
 * @param {string} [props.bottomDetail=''] - The detail message to display below the input, without error styling.
 * @param {string} [props.bottomDetailStyling] - The style object to apply to the bottom detail text.
 * @param {boolean} [props.isBottomSheetInput=false] - Whether to use the BottomSheetTextInput component.
 * @param {boolean} [props.search=false] - Whether to render a search input with a search icon.
 * @param {boolean} [props.editable=true] - If "true" user can edit input and if "false" user cannot.
 * @param {boolean} [props.pressable=false] - If "true" the input is pressbale and if "false" its not.
 * @param {any} [rest] - Any other props that can be passed to a TextInput component.
 * @return {JSX.Element} - A custom TextInput component with support for a tag, password input, and error handling.
 */
