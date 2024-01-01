import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  defPadding: {
    padding: theme.spacing.padding.p1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: scale(30),
    marginVertical: theme.spacing.margin.m2,
    color: theme.palette.TypographyDeep,
    fontFamily: theme.typography.type.semi,
    textAlign: 'center',
  },
  text: {
    color: theme.palette.GrayDeep,
    textAlign: 'center',
    ...theme.typography.common.h2r,
  },
  activeDot: {
    backgroundColor: theme.palette.PrimaryDeep,
    width: 12,
    height: 8,
  },
  dot: {
    backgroundColor: theme.palette.GrayLight,
    width: 12,
    height: 8,
  },

  btn: {
    margin: theme.spacing.margin.m1,
  },
});

export default styles;
