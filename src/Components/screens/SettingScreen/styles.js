import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import theme from '../../../themes/theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  subcontainer:{
    borderRadius:scale(22),
    backgroundColor:theme.palette.white,
    shadowColor: theme.palette.TypographyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4.22,
    elevation: 4,

  },
  separator:{
    borderBottomWidth:1,
    borderBottomColor:theme.palette.GrayBorder,
    marginTop:scale(30)
  },
  subcontainer1:{
    marginTop:scale(30),
    borderRadius:scale(22),
    backgroundColor:theme.palette.white,
    shadowColor: theme.palette.TypographyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4.22,
    elevation: 4,

  },
  btnStyle:{
    position:'absolute',
    bottom:scale(20),
    right:scale(15)
  }
})
export default styles
