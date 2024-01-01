import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

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
    borderRadius: theme.radius.r3,
    borderWidth: 1,
    // paddingHorizontal: theme.spacing.padding.p4,
    // paddingVertical: theme.spacing.padding.p4,
    color: theme.palette.TypographyDeep,
    letterSpacing: scale(0.8),
    ...theme.typography.common.h3r,
  },
  //* Buttons
  forgotBtn: {
    alignSelf: 'center',
    marginTop: scale(40),
  },
  newUser: {
    color: theme.palette.GrayDark,
    ...theme.typography.common.h3r,
  },
  signUp: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: theme.spacing.margin.m1,
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
