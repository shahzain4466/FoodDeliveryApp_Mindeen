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
  innerContainer: {
    flex: 1,
  },
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
  //* Buttons
  termConditionLink: {
    alignSelf: 'center',
    marginTop: scale(40),
    marginBottom: theme.spacing.margin.m1,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
  //* Radio Buttons
  radioContainer: {
    marginTop: theme.spacing.margin.max,
  },
});

export default styles;
