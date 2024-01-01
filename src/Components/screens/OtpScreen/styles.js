import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  defSpaceBtw: {
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  optTitle: {
    color: theme.palette.GrayDark,
    ...theme.typography.common.h3r,
  },
  //* OTP Input
  codeFieldRoot: {
    marginTop: theme.spacing.margin.max,
    width: '80%',
    alignSelf: 'center'
  },
  cell: {
    width: scale(50, true),
    height: scale(60),
    textAlign: 'center',
    color: theme.palette.TypographyDeep,
    backgroundColor: theme.palette.GrayLight,
    borderRadius: theme.radius.r3,
    ...theme.typography.common.h1,
    lineHeight: 60,
  },
  focusCell: {
    borderColor: theme.palette.TypographyDeep,
    borderWidth: 1,
  },
  wrongOtp: {
    marginTop: theme.spacing.margin.max,
    maxWidth: '90%',
    alignSelf: 'center',
    color: theme.palette.PrimaryDeep,
    ...theme.typography.common.h3r,
  },
  //* Buttons
  resendBtn: {
    textAlign: 'center',
    marginTop: theme.spacing.margin.max,
    marginBottom: theme.spacing.margin.m7,
  },
  //* Bottom Sheet
  btmContainer: {
    flex: 1,
    padding: theme.spacing.padding.p1,
    justifyContent: 'space-between',
  },
  btmTitle: {
    textAlign: 'center',
    color: theme.palette.TypographyDeep,
    ...theme.typography.common.h1
  },
  btmLogo: {
    alignSelf: 'center'
  },
});

export default styles;
