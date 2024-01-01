import {StyleSheet} from 'react-native';
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  heading: {
    ...theme.typography.common.h2r,
    color: theme.palette.PrimaryDark,
    fontWeight: '500',
    marginTop: scale(10),
  },
  Addbtn: {
    width: '45%',
    backgroundColor: theme.palette.transparent,
    borderWidth: scale(1),
    borderColor: theme.palette.PrimaryDeep,
  },
  Conbtn: {
    width: '45%',
  },
  titletxt: {
    color: theme.palette.PrimaryDeep,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: scale(10),
    alignSelf: 'center',
  },
  img: {
    width: scale(50),
    height: scale(29),
    marginLeft: scale(10),
  },
  Cardimg: {
    // position:"absolute",
    width: scale(125),
    height: scale(125),
    marginTop: scale(200),
    alignSelf: 'center',
  },
  methodcon: {
    flex: 1,
    marginBottom: scale(52),
  },
  select: {
    ...theme.typography.common.h3r,
    color: theme.palette.PrimaryDark,
    fontWeight: '400',
  },
  cardStyle: {
    borderWidth: 1,
    // borderColor:theme.palette.PrimaryDark
    borderColor: theme.palette.cardinfoColor,
  },
  Carddesc: {
    width: scale(287),
    alignSelf: 'center',
    marginTop: scale(30),
  },
  heading1: {
    ...theme.typography.common.Card,
    color: theme.palette.PrimaryDark,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtxt: {
    ...theme.typography.common.h2r,
    textAlign: 'center',
  },
});
export default styles;
