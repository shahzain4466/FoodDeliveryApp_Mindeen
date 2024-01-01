import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
//* Icons
import ChevronDownIcon from '../../../../assets/svg/ChevronGeneral.js';
import DustbinIcon from '../../../../assets/svg/Dustbin.svg';
//* Components
import CustomTouchableOpacity from '../../core/touchableopacity/CustomTouchableOpacity';
import Txt from '../../core/Txt';
//* Others
import theme from '../../../../themes/theme';
import {scale} from '../../../../../utils/scale';
import PropTypes from 'prop-types';

const ExpandableView = ({data, onDelete, onPress, selected}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View
      style={[
        styles.container,
        selected && {borderColor: theme.palette.PrimaryDeep},
      ]}>
      <CustomTouchableOpacity
        style={styles.header}
        onPress={() => {
          // handleToggleExpansion();
          onPress();
        }}>
        <Txt numberOfLines={2} style={styles.title}>
          {data.street}
        </Txt>
        {isExpanded ? (
          <TouchableOpacity onPress={() => handleToggleExpansion()}>
            <ChevronDownIcon
              color={theme.palette.PrimaryDeep}
              rotate={0}
              height={scale(13)}
              width={scale(13, true)}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleToggleExpansion()}>
            <ChevronDownIcon
              color={theme.palette.PrimaryDeep}
              rotate={180}
              height={scale(13)}
              width={scale(13, true)}
            />
          </TouchableOpacity>
        )}
      </CustomTouchableOpacity>

      {isExpanded && (
        <>
          <View style={styles.divider} />
          <View style={styles.details}>
            <View style={styles.itemContainer}>
              <Txt style={styles.desc}>
                Street: {data.street}
                {'\n'}
                City: {data.city}
                {'\n'}
                State/province/area: {data.state}
                {'\n'}
                Country: {data.country}
              </Txt>
              <CustomTouchableOpacity
                onPress={onDelete}
                style={styles.deleteButton}>
                <DustbinIcon />
              </CustomTouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.padding.p1 / 0.8,
    borderRadius: theme.radius.r4,
    marginBottom: theme.spacing.margin.m1,
    borderColor: theme.palette.GrayLight,
    borderWidth: scale(1),
  },
  header: {
    ...theme.commonStyling.defRowSpcBtw,
  },
  title: {
    marginRight: theme.spacing.margin.m5,
    color: theme.palette.TypographyDeep,
    maxWidth: '95%',
    ...theme.typography.common.h3r,
  },
  divider: {
    height: scale(1),
    backgroundColor: theme.palette.GrayLight,
    marginVertical: theme.spacing.margin.m5,
    width: '70%',
  },
  details: {
    marginTop: theme.spacing.margin.m5,
  },
  desc: {
    color: theme.palette.GrayDark,
    maxWidth: '95%',
    ...theme.typography.common.bodyr,
  },
  itemContainer: {
    marginBottom: theme.spacing.margin.m5,
    ...theme.commonStyling.defRowSpcBtw,
  },
  deleteButton: {
    alignSelf: 'flex-end',
  },
});

ExpandableView.defaultProps = {
  data: {},
  selected: null,
};

ExpandableView.prototype = {
  data: PropTypes.object,
  onPress: PropTypes.func,
  onDelete: PropTypes.func,
  selected: PropTypes.any,
};

export default ExpandableView;
