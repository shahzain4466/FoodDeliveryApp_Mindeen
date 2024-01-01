import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  btmContainer: {
    ...theme.commonStyling.defFlexWithSpc,
  },
  successTickIconContainer: {
    alignSelf: 'center',
  },
  delBtmTitle: {
    color: theme.palette.TypographyDeep,
    textAlign: 'center',
    ...theme.typography.common.h1,
  },
  defSpBtw: {
    paddingBottom: theme.spacing.padding.p1,
  },
  container: {
    padding: theme.spacing.padding.p1,
  },
  //* Header
  header: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    justifyContent: 'flex-start',
  },
  //* Profile
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    // tintColor:theme.palette.PrimaryDeep
  },
  camIconBg: {
    backgroundColor: theme.palette.GrayDark,
    height: scale(28),
    width: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.rounded,
    position: 'absolute',
    bottom: scale(10),
    left: scale(76, true),
    zIndex: 1,
  },
  btn: {
    position: 'absolute',
    bottom: theme.spacing.margin.max,
  },
  //* Footer
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutTxt: {
    color: theme.palette.PrimaryDeep,
    marginLeft: theme.spacing.margin.m1,
    ...theme.typography.common.h2r,
  },
  logoutIconBg: {
    backgroundColor: theme.palette.PrimaryDeep,
    height: scale(26),
    width: scale(26),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.rounded,
  },

  // render Item
  inputLabels: {},
  tag: {
    marginTop: theme.spacing.margin.m1,
  },
  picContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  img: {
    width: scale(165),
    height: scale(129),
  },
  closebtn: {
    marginBottom: scale(10),
  },
});

export default styles;
