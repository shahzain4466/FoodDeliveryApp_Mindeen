import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
    container: {
        ...theme.commonStyling.flex,
      },
  listItemContainer: {
    marginBottom: theme.spacing.margin.m1 / 2,
  },
  itemCardStyle: {
    width: scale(337, true),
  },
  flatListContainer: {
    alignSelf: 'center',
    marginTop: theme.spacing.margin.max,
  },
  
});

export default styles;
