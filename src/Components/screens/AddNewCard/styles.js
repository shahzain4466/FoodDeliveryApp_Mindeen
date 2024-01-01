import {StyleSheet} from 'react-native';
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  btn: {
    position: 'absolute',
    bottom: scale(10),
    alignSelf: 'center',
  },
  Cardimg: {
    // position:"absolute",
    width: scale(125),
    height: scale(125),
    marginTop: scale(200),
    alignSelf: 'center',
  },
  Carddesc: {
    width: scale(287),
    alignSelf: 'center',
    marginTop: scale(30),
  },
  heading: {
    ...theme.typography.common.Card,
    color: theme.palette.PrimaryDark,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtxt: {
    ...theme.typography.common.h2r,
    textAlign: 'center',
  },
  titletxt: {
    ...theme.typography.common.h2r,
    fontWeight: '600',
    color: theme.palette.simpleWhite,
  },
  btntxt: {
    ...theme.typography.common.h2r,
    fontWeight: '600',
    color: theme.palette.simpleWhite,
  },
  dateinput: {
    width: '40%',
  },
  dateinput1: {
    width: '50%',
  },
  datecontainer: {
    borderColor: theme.palette.PrimaryDark,
    borderWidth: scale(1),
  },
  titletxt: {
    ...theme.typography.common.h2r,
    color: theme.palette.GrayPlaceHolder,
  },
  name: {
    ...theme.typography.common.h4r,
    color: theme.palette.PrimaryDark,
  },
  Expiry: {
    ...theme.typography.common.h4r,
    color: theme.palette.black,
  },
  Cvv: {
    ...theme.typography.common.h4r,
    color: theme.palette.black,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft:scale(6),
  },
  cardnum: {
    ...theme.typography.common.h4r,
    color: theme.palette.black,
  },
  DateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scale(30),
  },
  btmContainer: {
    ...theme.commonStyling.defFlexWithSpc,
  },
  delBtmTitle: {
    color: theme.palette.TypographyDeep,
    textAlign: 'center',
    ...theme.typography.common.h1,
  },
  infoBtmTitle: {
    color: theme.palette.black,
    ...theme.typography.common.bodyr,
    width: scale(224),
    height: scale(72),
    fontWeight: '700',
    alignSelf: 'center',
  },
  subinfohead: {
    color: theme.palette.GrayPlaceHolder,
    ...theme.typography.common.bodyr,
    fontWeight: '400',
  },
  delBtmDesc: {
    color: theme.palette.GrayDark,
    textAlign: 'center',
    marginVertical: theme.spacing.margin.m2,
    ...theme.typography.common.h3r,
  },
  successTickIconContainer: {
    alignSelf: 'center',
  },
  placeholdercolor: {
    color: theme.palette.GrayInputField,
  },
  infomodalpic: {
    width: scale(224),
    height: scale(107),
  },
  closebtn: {
    width: scale(150),
    height: scale(54),
    alignSelf: 'center',
    marginBottom: scale(10),
  },
  errorText: {
    marginTop: theme.spacing.margin.m7,
    textAlign: 'center',
    ...theme.typography.common.note,
    color: theme.palette.PrimaryDeep,
  },
  input: {
    width: '50%',
  },
  input1: {
    width: '40%',
  },
  cardContainer: {
    marginTop: scale(15),
  },
});
export default styles;
