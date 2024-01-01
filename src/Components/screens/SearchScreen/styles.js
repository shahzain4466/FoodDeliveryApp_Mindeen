import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  container: {},
  iconBg: {
    backgroundColor: theme.palette.white,
    paddingHorizontal: theme.spacing.padding.p2,
    paddingVertical: theme.spacing.padding.p3,
    borderRadius: theme.radius.r2,

    //* Shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  headerContainer: {
    paddingHorizontal: theme.spacing.padding.p5,
    paddingTop: theme.spacing.padding.p1,
    paddingBottom: theme.spacing.padding.p1,
    backgroundColor: theme.palette.white,
  },
  defAlignmentWithSpBtw: {},
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.GrayBorder,
    paddingHorizontal: '15%',
    marginVertical: theme.spacing.margin.m1,
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
    color: theme.palette.GrayDeep,
    textTransform: 'capitalize',
  },
  selectedAccount: {
    color: theme.palette.PrimaryDeep,
  },
  innerContainer: {
    paddingHorizontal: theme.spacing.padding.p1,
  },
  heading: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.palette.black,
  },
  itemView: {
    alignItems:'center',
    justifyContent:'center'
  },

  //* render item
  touchable: {
    borderWidth: 1,
    borderColor: theme.palette.silver,
    borderRadius: theme.radius.rounded,
    padding: theme.spacing.padding.p7,
    marginTop: theme.spacing.margin.m5,
    marginRight: theme.spacing.margin.m2,
  },
  suggest: {
    fontSize: theme.typography.size.heading.h5,
    color: theme.palette.black,
    paddingLeft: theme.spacing.padding.p7,
    paddingRight: theme.spacing.padding.p7,
    fontFamily: theme.typography.type.reg,
  },
  space: {
    height: 25,
  },

  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  c1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentView: {
    borderWidth: 1,
    borderColor: theme.palette.PrimaryDeep,
    borderRadius: theme.radius.rounded,
    padding: theme.spacing.padding.p7,
    marginTop: theme.spacing.margin.m5,
    marginRight: theme.spacing.margin.m2,
    // ...touchable,
    // marginLeft: scale(10),
    backgroundColor: theme.palette.PrimaryDeep,
    flexDirection:'row',
    alignItems:'center'
  },
  icon: {
    marginTop:scale(20),
  },
  recent: {
    fontSize: theme.typography.size.heading.h5,
    color: theme.palette.white,
    paddingLeft: theme.spacing.padding.p6,
    paddingRight: theme.spacing.padding.p7,
    fontFamily: theme.typography.type.reg,
  },
  searchcon:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:'85%'
  },
  crossimg:{
    tintColor:theme.palette.white,
    width:scale(10),
     height:scale(10),
     padding:scale(5)
  },
  avialableItem:{
    ...theme.typography.common.h3r,
    fontWeight:'700',
    color:theme.palette.black,
    paddingVertical:scale(10)
  },
  listItemContainer: {
    marginBottom: theme.spacing.margin.m1 / 0.6,
    width:'100%',
    backgroundColor:'red'
  },
  itemCardStyle:{
    // width:'100%',
    // height:scale(285,true),
    
  }
});

export default styles;
