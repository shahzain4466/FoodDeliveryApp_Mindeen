import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.padding.p5,
  },
  nameTitle: {
    fontFamily: theme.typography.type.med,
    fontSize: scale(18),
    lineHeight: scale(27),
    textAlign: 'center',
    color: theme.palette.GrayDark,
  },
  menuTxt: {
    color: theme.palette.PrimaryDeep,
  },
  filterContainer: {
    marginTop: theme.spacing.margin.m4,
    marginBottom: scale(24),
    marginLeft: theme.spacing.margin.m4,
  },
  filterBtn: {
    paddingHorizontal: theme.spacing.padding.p1,
    paddingVertical: theme.spacing.padding.p5,
    borderRadius: theme.radius.r3,
    marginRight: theme.spacing.margin.m7,
    marginLeft: theme.spacing.margin.m7,
    // marginHorizontal: theme.spacing.margin.m4,

    marginBottom: scale(24),
  },
  bestSellerCont: {
    marginHorizontal: theme.spacing.margin.m4,
    marginBottom: scale(18),
  },
  bestSellers: {
    fontFamily: theme.typography.type.med,
    fontSize: scale(18),
    lineHeight: scale(27),
    color: theme.palette.black,
  },
  menuItemCard: {
    marginTop: theme.spacing.margin.m3,
    borderRadius: theme.radius.r1,
    overflow: 'hidden',
    backgroundColor: theme.palette.GrayLight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    height: scale(90),
    width: scale(102, true),
    borderRadius: theme.radius.r1,
    marginRight: theme.spacing.margin.m1,
    justifyContent: 'flex-end',
  },
  vegetableName: {
    ...theme.typography.common.h3m,
    color: theme.palette.black,
  },
  inPizzaManiaTxt: {
    fontFamily: theme.typography.type.med,
    fontSize: scale(12),
    lineHeight: scale(18),
    color: theme.palette.GrayDark,
  },
  addTxt: {
    fontSize: scale(25),
    fontFamily: theme.typography.type.med,
    color: theme.palette.GrayDark,
    flex: 0.1,
  },
  vegTxtCont: {
    flex: 1,
    justifyContent: 'center',
  },
  discount: {
    backgroundColor: theme.palette.PrimaryDeep,
    width: scale(90, true),
    borderRadius: theme.radius.r1,
    borderTopLeftRadius: 0,
    paddingHorizontal: theme.spacing.padding.p3,
    // paddingVertical: theme.spacing.padding.p7,
  },
  discountTxt: {
    color: theme.palette.white,
    fontFamily: theme.typography.type.bold,
    textAlign: 'center',
  },
  addbtn: {
    alignItems: 'center',
    marginRight: scale(15),
    justifyContent: 'center',
  },
  showaddmsg: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: scale(40),
    backgroundColor: '#32BA7C',
    width: scale(282),
    height: scale(60),
    borderRadius: scale(15),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  itemadd: {
    ...theme.typography.common.h3r,
    fontWeight: '500',
    color: theme.palette.white,
    marginLeft: scale(10),
  },
});
export default styles;
