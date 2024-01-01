import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  //* Inputs
  tag: {
    marginBottom: theme.spacing.margin.m1,
  },
  input: {
    marginBottom: theme.spacing.margin.m1,
  },
  // *Bottom Sheet
  btmContainer: {
    flex: 1,
    padding: theme.spacing.padding.p1,
    justifyContent: 'space-between',
  },
  btmTitle: {
    textAlign: 'center',
    color: theme.palette.TypographyDeep,
    ...theme.typography.common.h1,
  },
  btmLogo: {
    alignSelf: 'center',
  },
});

export default styles;
