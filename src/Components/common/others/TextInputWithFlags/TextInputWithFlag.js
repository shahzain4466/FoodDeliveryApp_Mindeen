import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../../../themes/theme';
import {scale} from '../../../../../utils/scale.js';
import {Strings} from '../../../../constants/Strings.js';

//* Icons
import PKFlag from '../../../../assets/svg/flags/pakistan.svg';
import SaudiFlag from '../../../../assets/svg/flags/saudi.svg';
import UAEFlag from '../../../../assets/svg/flags/united.svg';
import ChevronGeneral from '../../../../assets/svg/ChevronGeneral';
import Txt from '../../core/Txt';
// !TODO Clean ME And Write Doc Also for missing props
const CountryInput = ({
  value,
  onChangeText,
  onSelect,
  hideTag,
  Tag,
  error,
  errorDetail,
  TagStyling,
  PhoneStyle,
  ...rest
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFlagIndex, setSelectedFlagIndex] = useState(PKFlag);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
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

  const flags = [
    {id: 'pk', code: 'PK', svg: PKFlag, name: 'Pakistan'},
    {id: 'sa', code: 'SA', svg: SaudiFlag, name: 'Saudi Arabia'},
    {id: 'uae', code: 'UAE', svg: UAEFlag, name: 'UAE'},
  ];

  const renderFlagItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedFlagIndex(item.svg);
          setModalVisible(false);
          onSelect(item.code);
        }}
        style={styles.flagItemContainer}>
        <Txt style={styles.flagName}>{item.name}</Txt>
        {selectedFlagIndex === index && (
          <View style={styles.selectedFlagContainer}>
            <View style={styles.selectedFlag} />
          </View>
        )}
        <item.svg />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[PhoneStyle]}>
      {!hideTag ? (
        <Txt style={[styles.topPlaceHolder, TagStyling]}>{Tag}</Txt>
      ) : null}
      <View style={[styles.container, errorBorderStyling]}>
        <TouchableOpacity
          style={styles.flagContainer}
          onPress={() => setModalVisible(true)}>
          {selectedFlagIndex}
          <View style={styles.chevronIcon}>
            <ChevronGeneral
              color={theme.palette.GrayDark}
              rotate={180}
              height={scale(13)}
              width={scale(13, true)}
            />
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={value}
          keyboardType="numeric"
          onChangeText={onChangeText}
          placeholder={Strings.prPlaceHolder}
          placeholderTextColor={theme.palette.GrayDark}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          transparent={true}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.backdrop}>
              <View style={styles.modal}>
                <FlatList
                  data={flags}
                  keyExtractor={item => item.id}
                  renderItem={renderFlagItem}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      {error && errorDetail ? (
        <View
          style={[styles.defAlignment, {marginTop: theme.spacing.margin.m5}]}>
          <Txt style={styles.errorMessage}>{errorDetail}</Txt>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  defAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.padding.p7,
    borderRadius: theme.radius.r3,
    borderWidth: scale(1),
    borderColor: theme.palette.GrayLight,
  },
  input: {
    paddingLeft: theme.spacing.padding.p4,
    color: theme.palette.TypographyDeep,
    width: '85%',
    letterSpacing: scale(1.5),
    ...theme.typography.common.h3r,
  },
  topPlaceHolder: {
    marginBottom: theme.spacing.margin.m5,
    color: theme.palette.GrayDeep,
    ...theme.typography.common.h3r,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing.padding.p7,
  },
  chevronIcon: {
    marginLeft: theme.spacing.margin.m4,
  },
  //* Error
  errorMessage: {
    color: theme.palette.PrimaryDeep,
    ...theme.typography.common.note,
  },
  //* Modal
  modal: {
    alignSelf: 'center',
    width: scale(260, true),
    backgroundColor: theme.palette.white,
    borderRadius: theme.radius.r4,
    padding: theme.spacing.padding.p1,
  },
  flagItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.padding.p2,
  },
  flagName: {
    color: theme.palette.GrayDark,
    ...theme.typography.common.h2r,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
});

CountryInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSelect: PropTypes.func,
};

CountryInput.defaultProps = {
  value: '',
};

export default CountryInput;

/**
 * Component representing a text input with a country flag icon.
 *
 * @param {string} value - The value of the text input.
 * @param {function} onChangeText - Function to be called when the text input value changes.
 * @param {function} onSelect - Function to be called when the new flag is selected value changes.
 * @returns {JSX.Element} CountryInput component.
 */
