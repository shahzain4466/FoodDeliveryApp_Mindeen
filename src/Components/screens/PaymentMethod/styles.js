import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import theme from '../../../themes/theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  btn: {
    position: "absolute",
    bottom: scale(10),
    alignSelf: 'center'
  },
  btn1: {
    position: "absolute",
    bottom: scale(10),
    alignSelf: 'center'
  },
  Cardimg: {
    // position:"absolute",
    width: scale(125),
    height: scale(125),
    marginTop: scale(200),
    alignSelf: 'center'
  },
  Carddesc: {
    width: scale(287),
    alignSelf: 'center',
    marginTop: scale(30)
  },
  heading: {
    ...theme.typography.common.Card,
    color: theme.palette.PrimaryDark,
    fontWeight: '600',
    textAlign: 'center'
  },
  subtxt: {
    ...theme.typography.common.h2r,
    textAlign: 'center',
    color: theme.palette.GrayDark,
    marginTop: scale(20),
    lineHeight: scale(24)
  },
  titletxt: {
    ...theme.typography.common.h2r,
    fontWeight: '600'
  },
  cardStyle:{
    borderWidth:1,
    borderColor:theme.palette.PrimaryDark
  },
  select:{
    ...theme.typography.common.h3r,
    color:theme.palette.PrimaryDark,
    fontWeight:'400'
  },
  methodcon:{
    flex:1,
    marginBottom:scale(52)
  },
  btmContainer: {
    ...theme.commonStyling.defFlexWithSpc
  },
  successTickIconContainer: {
    alignSelf: 'center'
  },
  delBtmTitle: {
    color: theme.palette.TypographyDeep,
    textAlign: 'center',
    ...theme.typography.common.h1,
  },
})
export default styles