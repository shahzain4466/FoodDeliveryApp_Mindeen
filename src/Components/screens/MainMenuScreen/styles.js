import {StyleSheet} from 'react-native';
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';

const styles = StyleSheet.create({
  defSpBtw: {
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.padding.p1,
  },
  container: {
    flex: 1,
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
  image: {
    height: scale(100),
    width: scale(100, true),
    borderRadius: theme.radius.rounded,
    resizeMode: 'contain',
  },
  //* Heading
  headingContainer: {
    marginVertical: theme.spacing.margin.m1,
  },
  //* Name
  name: {
    color: theme.palette.TypographyDeep,
    textTransform: 'uppercase',
    ...theme.typography.common.h1a,
  },
  email: {
    color: theme.palette.PrimaryDeep,
    ...theme.typography.common.bodyr,
  },
  //* Menu
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(28),
  },
  //* Title
  listItemTitle: {
    color: theme.palette.TypographyDeep,
    marginLeft: theme.spacing.margin.m1,
    ...theme.typography.common.h2m,
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
});

export default styles;
