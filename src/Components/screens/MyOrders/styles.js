import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import theme from '../../../themes/theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  innerContainer: {
    flex: 1,
  },
  container1: {
    height: scale(65),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: scale(1),
    borderRadius: theme.radius.rounded,
    borderColor: theme.palette.GrayBorder,
    marginBottom: theme.spacing.margin.m1,
  },

  option: {
    // paddingBottom: 5,
    alignItems: 'center',
    // width:scale(160),
    width: '50%',
    flex: 1,
    justifyContent: 'center',
    paddingTop: scale(10),
    paddingBottom: scale(10),
    margin: scale(3),
  },
  selected: {
    backgroundColor: theme.palette.PrimaryDeep,
    // borderBottomWidth: 3,
    borderRadius: 100,
    flex: 1,
    width: '50%'
  },
  UpcomingText: {
    ...theme.typography.common.h3r,
    fontWeight: '500',
    color: theme.palette.PrimaryDeep,
  },
  selectedAccount: {
    color: theme.palette.white,
  },
  LatOrd: {
    ...theme.typography.common.h2sb,
    fontWeight: '800',
    color: theme.palette.deepblack,
    marginBottom: scale(10)

  },
  Latcon: {
    marginTop: scale(20)
  },
  listItemContainer: {
    marginBottom: theme.spacing.margin.m1 / 2,

  },
  CardStyle: {
    marginTop: scale(5),
    padding: scale(5),
    width: '100%',
    alignSelf: 'center',
    borderRadius: theme.radius.r1,
    shadowColor: theme.palette.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4.22,
    elevation: 4,
  }
})
export default styles