import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import PropTypes from 'prop-types';
import theme from '../../../../themes/theme';
import {scale} from '../../../../../utils/scale';

const RadioGroup = ({
  radioOptions,
  horizontal,
  onSelect,
  activeBg,
  nonActiveBg,
  defValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(defValue);

  const handleSelect = value => {
    setSelectedValue(value);
    onSelect && onSelect(value);
  };

  const radioButtonStyle = {
    ...styles.radioButton,
    ...(activeBg && {backgroundColor: activeBg}),
    ...(nonActiveBg && {borderColor: nonActiveBg}),
  };

  return (
    <RadioForm formHorizontal={horizontal} animation={true}>
      {radioOptions.map((option, index) => (
        <RadioButton labelHorizontal={true} key={index}>
          <RadioButtonInput
            obj={option}
            index={index}
            isSelected={selectedValue === option.value}
            onPress={handleSelect}
            buttonInnerColor={theme.palette.PrimaryDeep}
            buttonSize={14}
            buttonStyle={radioButtonStyle}
            buttonWrapStyle={styles.radioButtonWrap}
          />
          <RadioButtonLabel
            obj={option}
            index={index}
            labelHorizontal={true}
            onPress={handleSelect}
            labelStyle={styles.radioButtonLabel}
          />
        </RadioButton>
      ))}
    </RadioForm>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    borderColor: theme.palette.GrayMedium,
    borderWidth: scale(3),
    marginLeft: theme.spacing.margin.m2,
  },
  radioButtonWrap: {
    marginLeft: theme.spacing.margin.m1,
  },
  radioButtonLabel: {
    ...theme.typography.common.h3r,
    color: theme.palette.GrayDark,
  },
});

export default RadioGroup;

RadioGroup.propTypes = {
  radioOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  horizontal: PropTypes.bool,
  onSelect: PropTypes.func,
  activeBg: PropTypes.string,
  nonActiveBg: PropTypes.string,
  defValue: PropTypes.string,
};

RadioGroup.defaultProps = {
  radioOptions: [],
  horizontal: false,
  activeBg: '',
  nonActiveBg: '',
  defValue: '',
};

/**
 * RadioGroup component for selecting options.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Array} props.radioOptions - The array of radio options. Each option should have a `label` and `value` property.
 * @param {boolean} [props.horizontal=true] - Whether to display radio buttons horizontally.
 * @param {function} [props.onSelect] - The callback function to handle the selection of a radio option.
 * @param {string} [props.activeBg] - The background color of the active radio button.
 * @param {string} [props.nonActiveBg] - The background color of the non-active radio buttons.
 * @param {string} [props.defValue] - The default selected radio button.
 * @return {JSX.Element} - A radio group component.
 */
