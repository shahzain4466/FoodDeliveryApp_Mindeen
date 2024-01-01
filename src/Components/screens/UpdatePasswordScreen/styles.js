import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';

const styles = StyleSheet.create({
  defSpaceBtw: {
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  //* Pass Indicator
  passIndicator: {
    marginTop: theme.spacing.margin.m1,
    textAlign: 'center',
    ...theme.typography.common.note,
  },
  //* Inputs
  tag: {
    marginBottom: theme.spacing.margin.m1,
  },
  input: {
    marginBottom: theme.spacing.margin.m1,
  },
  //* Bottom Sheet
  btmContainer: {
    flex: 1,
    padding: theme.spacing.padding.p1,
    justifyContent: 'space-evenly',
  },
  btmTitle: {
    textAlign: 'center',
    color: theme.palette.TypographyDeep,
    ...theme.typography.common.h1
  },
  btmDesc: {
    textAlign: 'center',
    color: theme.palette.GrayDark,
    ...theme.typography.common.h2r
  },
  btmLogo: {
    alignSelf: 'center'
  },
});

export default styles;
