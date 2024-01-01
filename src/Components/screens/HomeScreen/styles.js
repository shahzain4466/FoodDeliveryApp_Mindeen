import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  container: {
    ...theme.commonStyling.flex,
  },
  header: {
    paddingHorizontal: theme.spacing.padding.p1,
    marginBottom: theme.spacing.margin.m1,
  },
  btmContainer: {
    flex: 1,
    padding: theme.spacing.padding.p1,
  },
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
  renderItemContainer: {
    marginBottom: theme.spacing.margin.m4,
  },
  title: {
    color: theme.palette.black,
    ...theme.typography.common.h3r,
  },
  slocation: {
    color: theme.palette.black,
    ...theme.typography.common.h3r,
    paddingVertical: theme.spacing.padding.p1,
  },
  newlocation: {
    color: theme.palette.PrimaryDark,
    ...theme.typography.common.h3r,
    paddingVertical: theme.spacing.padding.p1,
  },
  currentLocationContainer: {
    borderWidth: scale(1),
    borderRadius: theme.radius.r3,
    borderColor: theme.palette.GrayLight,
    marginTop: theme.spacing.margin.m1,
    padding: scale(2)
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
    height: scale(140),
    borderRadius: theme.radius.r3,
    borderWidth: scale(2),
    borderColor: theme.palette.white,
  },
});

export default styles;
