import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ImageItem from '../../core/ImageItem';
import CustomTouchableOpacity from '../../core/touchableopacity/CustomTouchableOpacity';
import Txt from '../../core/Txt';
import theme from '../../../../themes/theme';
import { scale } from '../../../../../utils/scale';

const CategoryComp = ({ data, selectedCategory, onSelectCategory }) => {
  const renderItem = ({ item }) => {
    const isSelected = item === selectedCategory;

    return (
      <CustomTouchableOpacity
        style={styles.categoryItemContainer}
        onPress={() => onSelectCategory(item)}>
        <ImageItem
          priority="high"
          imageUrl={item?.image}
          imageStyling={[styles.categoryImg, isSelected && styles.defBorder]}
        />
        <Txt style={styles.categoryName}>{item.name}</Txt>
      </CustomTouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data?.data}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContainer}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

CategoryComp.defaultProps = {
  data: [],
  selectedCategory: null,
  onSelectCategory: () => { },
};

CategoryComp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func,
};

export default CategoryComp;

const styles = StyleSheet.create({
  defBorder: {
    borderWidth: 1,
    borderColor: theme.palette.PrimaryDeep,
    borderRadius: theme.radius.r2,
  },
  //* Categories
  flatListContainer: {
    alignSelf: 'center',
    marginTop: theme.spacing.margin.max,
  },
  categoryItemContainer: {
    alignItems: 'center',
    marginRight: theme.spacing.margin.max,
  },
  categoryImg: {
    height: scale(60),
    width: scale(60, true),
    borderRadius: theme.radius.r2,
  },
  categoryName: {
    color: theme.palette.TypographyDeep,
    marginTop: theme.spacing.margin.m6,
    ...theme.typography.common.bodysm,
  },
});
