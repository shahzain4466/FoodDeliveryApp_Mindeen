import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
//* Core Components
import Txt from '../Txt';
import CustomTouchableOpacity from '../touchableopacity/CustomTouchableOpacity';
//* Others
import DropShadow from 'react-native-drop-shadow';
import PropTypes from 'prop-types';
import { scale } from '../../../../../utils/scale';
import theme from '../../../../themes/theme';

const Botton = ({
  title,
  onPress,
  onContinue,
  onCancel,
  variant,
  button1Style,
  button2Style,
  titleStyle,
  singleButtonStyle,
  outlineButtonStyle,
  linkButtonStyle,
  continueTitle,
  cancelTitle,
  loading,
  disabled,
  accessibilityLabel,
  continueBtnAccessibilityLabel,
  cancelBtnAccessibilityLabel,
  v1ContainerStyling,
}) => {
  const containerStyles = {
    v1: [styles().v1ButtonsContainer, v1ContainerStyling],
  };

  const defaultButtonStyles = {
    single: [styles(disabled, loading).singleButton, singleButtonStyle],
    outline: [styles(disabled, loading).outlineButton, outlineButtonStyle],
    link: [styles().link, linkButtonStyle],
    v1: [styles(disabled, loading).v1Button],
  };

  const textStyles = {
    single: [styles().singleButtonText],
    outline: [styles().outlineButtonText],
    link: [styles(disabled).linkTxt],
    v1: [styles().v1ButtonText],
  };

  const containerStyle = containerStyles[variant];
  const buttonStyle = defaultButtonStyles[variant];
  const textStyle = [textStyles[variant], titleStyle];

  if (variant === 'v1') {
    const [defaultStyle] = buttonStyle;
    return (
      <View style={containerStyle}>
        <CustomTouchableOpacity
          accessibilityLabel={cancelBtnAccessibilityLabel}
          style={[
            defaultStyle,
            styles().cancelBtn,
            button2Style,
            { justifyContent: loading ? 'center' : 'flex-start' },
          ]}
          onPress={onCancel}>
          <Txt style={[textStyle, { color: theme.palette.PrimaryDeep }]}>
            {cancelTitle}
          </Txt>
        </CustomTouchableOpacity>
        <CustomTouchableOpacity
          accessibilityLabel={continueBtnAccessibilityLabel}
          style={[
            defaultStyle,
            button1Style,
            { justifyContent: loading ? 'center' : 'flex-start' },
          ]}
          onPress={onContinue}
          disabled={loading || disabled}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Txt style={textStyle}>{continueTitle}</Txt>
          )}
        </CustomTouchableOpacity>
      </View>
    );
  } else if (variant === 'link') {
    return (
      <>
        {loading ? (
          <View style={[textStyle]}>
            <ActivityIndicator size="small" color={theme.palette.PrimaryDeep} />
          </View>
        ) : (
          <CustomTouchableOpacity
            accessibilityLabel={accessibilityLabel}
            style={[buttonStyle]}
            onPress={onPress}
            disabled={disabled}>
            <Txt style={textStyle}>{title}</Txt>
          </CustomTouchableOpacity>
        )}
      </>
    );
  }

  return (
    <CustomTouchableOpacity
      accessibilityLabel={accessibilityLabel}
      style={[buttonStyle]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading ? (
        <ActivityIndicator size="small" color={theme.palette.white} />
      ) : (
        <Txt style={[textStyle]}>{title}</Txt>
      )}
    </CustomTouchableOpacity>
  );
};

export const styles = (disabled, loading) => {
  let Activated;

  if (disabled || loading) {
    Activated = theme.palette.GrayLight;
  } else {
    Activated = theme.palette.PrimaryDeep;
  }
  const textColor = theme.palette.white;

  let style = {
    //! Test
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
    //? Buttons
    cancelBtn: {
      backgroundColor: undefined,
      borderWidth: scale(1),
      borderColor: theme.palette.PrimaryDeep,
      borderRadius: theme.radius.rounded,
    },
    //* Single
    singleButton: {
      width: '100%',
      paddingVertical: theme.spacing.padding.p1,
      borderRadius: theme.radius.rounded,
      backgroundColor: Activated,
      alignItems: 'center',
      justifyContent: 'center',


      //! Test
      // shadowColor: 'red',
      // shadowOffset: {
      //   width: 0,
      //   height: 18,
      // },
      // shadowOpacity: 1,
      // shadowRadius: 20.0,
      // elevation: 24,
      // marginHorizontal: 8,
    },
    singleButtonText: {
      color: textColor,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      ...theme.typography.common.h3sb,
    },
    //* Outline
    outlineButton: {
      padding: theme.spacing.padding.p2,
      borderRadius: theme.radius.rounded,
      borderColor: theme.palette.PrimaryDeep,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    outlineButtonText: {
      color: theme.palette.PrimaryDeep,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      ...theme.typography.common.h3sb,
    },
    //* Links
    link: {},
    linkTxt: {
      textDecorationLine: disabled ? undefined : 'underline',
      color: disabled ? theme.palette.GrayDark : theme.palette.PrimaryDeep,
      ...theme.typography.common.h3m,
    },
    //* V1
    v1ButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    v1Button: {
      padding: theme.spacing.padding.p1,
      borderRadius: theme.radius.rounded,
      backgroundColor: Activated,
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%',
      minWidth: '45%',
    },
    v1ButtonText: {
      color: textColor,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      ...theme.typography.common.h3sb,
    },
  };

  return StyleSheet.create(style);
};

Botton.propTypes = {
  title: PropTypes.string,
  onContinue: PropTypes.string,
  onCancel: PropTypes.string,
  onPress: PropTypes.func,
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
  variant: PropTypes.oneOf(['single', 'outline', 'link', 'v1']),
  button1Style: PropTypes.object,
  button2Style: PropTypes.object,
  titleStyle: PropTypes.any,
  v1ContainerStyling: PropTypes.object,
  singleButtonStyle: PropTypes.object,
  outlineButtonStyle: PropTypes.object,
  linkButtonStyle: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  cancelBtnAccessibilityLabel: PropTypes.string,
  continueBtnAccessibilityLabel: PropTypes.string,
};

Botton.defaultProps = {
  variant: 'single',
  continueTitle: 'Continue',
  cancelTitle: 'Cancel',
  accessibilityLabel: 'Btn',
  cancelBtnAccessibilityLabel: 'Btn',
  continueBtnAccessibilityLabel: 'Btn',
  loading: false,
  disabled: false,
  button1Style: {},
  button2Style: {},
  v1ContainerStyling: {},
  titleStyle: {},
  singleButtonStyle: {},
  outlineButtonStyle: {},
  linkButtonStyle: {},
};

export default Botton;

//* Documentation
/**
Button is a custom button component that can be customized based on the
variant passed to it. The button component also applies a theme-specific
background color and text color based on the user's device color scheme preference.
@param {object} props - The component props.
@param {string} props.title - The text to display on the button.
@param {function} props.onPress - The function to execute when the button is pressed.
@param {function} props.onContinue - The function to execute when the continue button is pressed.
@param {function} props.onCancel - The function to execute when the cancel button is pressed.
@param {string} props.variant - The button variant to display.
@param {object} [props.button1Style] - The style object to apply to the first button.
@param {object} [props.button2Style] - The style object to apply to the second button.
@param {object} [props.titleStyle] - The style object to apply to the button text.
@param {object} [props.singleButtonStyle] - The style object to apply to the single button.
@param {object} [props.outlineButtonStyle] - The style object to apply to the outline button.
@param {object} [props.linkButtonStyle] - The style object to apply to the link button.
@param {string} [props.continueTitle] - The text to display on the continue button.
@param {string} [props.cancelTitle] - The text to display on the cancel button.
@param {bool} [props.loading] - If true, the button will display a loading indicator instead of the title.
@param {bool} [props.disabled] - If true, the button will be disabled.
@param {string} [props.accessibilityLabel] - The accessibility label for the button.
@param {string} [props.continueBtnAccessibilityLabel] - The accessibility label for the continue button.
@param {string} [props.cancelBtnAccessibilityLabel] - The accessibility label for the cancel button.
@param {object} [props.v1ContainerStyling] - The styling object for the v1 container.
@return {JSX.Element} - A button component with the appropriate theme-specific background color and text color.
*/
