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
  //* Inputs
  tag: {
    marginBottom: theme.spacing.margin.m1,
  },

  input: {
    marginBottom: theme.spacing.margin.m1,
  },
  checkBoxView:{
    flexDirection:'row',
    marginTop:theme.spacing.margin.m1,
   
  },
  checkBox: {
    width: scale(20),
    height: scale(20),
    marginRight:scale(10)
  },
  remember:{
   color:theme.palette.Graydesctxt 
  },
  //* Buttons
  forgotBtn: {
    alignSelf: 'center',
    marginTop: scale(30),
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
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.GrayBorder,
    paddingHorizontal: '15%',
    marginBottom: theme.spacing.margin.m1,
  },
  option: {
    paddingBottom: 5,
    alignItems: 'center',
    flex: 1,
  },
  selected: {
    borderBottomColor: theme.palette.PrimaryDeep,
    borderBottomWidth: 3,
    flex: 1,
  },
  emailText: {
    ...theme.typography.common.bodyr,
    fontWeight: '500',
    color:theme.palette.Graydesctxt
  },
  selectedAccount: {
    color: theme.palette.PrimaryDeep,
  },
});

export default styles;
