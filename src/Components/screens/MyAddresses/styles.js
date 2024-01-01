import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
  devider: {
    height: scale(1),
    backgroundColor: theme.palette.GrayLight,
    width: '90%',
    alignSelf: 'center',
    marginVertical: theme.spacing.margin.max / 1.3,
  },
  title: {
    color: theme.palette.GrayDark,
    ...theme.typography.common.h3r,
  },

  //* Header
  header: {},
  //* Footer
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  renderItemContainer: {
    marginBottom: theme.spacing.margin.m4,
  },
  //* Current Location
  currentLocationContainer: {
    borderWidth: scale(1),
    borderRadius: theme.radius.r3,
    borderColor: theme.palette.GrayLight,
    marginTop: theme.spacing.margin.m1,
  },
  currentLocationHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.padding.p4,
    marginBottom: theme.spacing.margin.m7,
  },
  currentLocation: {
    color: theme.palette.GrayDark,
    ...theme.typography.common.h3r,
    maxWidth: '90%',
  },
  mapContainer: {
    overflow: 'hidden',
    height: scale(150),
    borderRadius: theme.radius.r3,
    borderWidth: scale(2),
    borderColor: theme.palette.white,
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
  noAddressFound: {
    color: theme.palette.GrayDark,
    textAlign: 'center',
    ...theme.typography.common.h2m,
  },
  //* Bottom Sheets
  btmContainer: {
    ...theme.commonStyling.defFlexWithSpc,
  },
  //* Delete Location Bottom Sheet
  delBtmTitle: {
    color: theme.palette.TypographyDeep,
    textAlign: 'center',
    ...theme.typography.common.h1,
  },
  delBtmDesc: {
    color: theme.palette.GrayDark,
    textAlign: 'center',
    marginVertical: theme.spacing.margin.m2,
    ...theme.typography.common.h3r,
  },
  //* Location Deleted Bottom Sheet
  successTickIconContainer: {
    alignSelf: 'center',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
