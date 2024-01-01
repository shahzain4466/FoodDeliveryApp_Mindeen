import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  //* MAP Marker
  mapMarkerOuterBg: {
    backgroundColor: '#C5002E15',
    borderRadius: theme.radius.rounded/0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(150),
    width: scale(150, true),
  },
  mapMarkerInnerBg: {
    backgroundColor: '#C5002E35',
    borderRadius: theme.radius.rounded,
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(65),
    width: scale(65, true),
  },
  //* Header Container
  headerContainer: {
    padding: theme.spacing.padding.p1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  //* Footer Container
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.white,
    padding: theme.spacing.padding.p1,
    borderTopLeftRadius: theme.radius.r1 / 0.6,
    borderTopRightRadius: theme.radius.r1 / 0.6,
  },
  footerTitle: {
    color: theme.palette.GrayDark,
    marginBottom: theme.spacing.margin.m6,
    ...theme.typography.common.h3r,
  },
  footerLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.margin.m1 / 0.7,
  },
  markerIcon: {
    backgroundColor: theme.palette.GrayLight,
    borderRadius: theme.radius.rounded,
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(36),
    width: scale(36, true),
  },
  footerLocation: {
    color: theme.palette.TypographyDeep,
    marginLeft: theme.spacing.margin.m1,
    maxWidth: '90%',
    ...theme.typography.common.h2m,
  },
  //* Bottom Sheet
  btmContainer: {
    flex: 1,
    padding: theme.spacing.padding.p1
  },
  successIcon: {
    alignSelf: 'center'
  },
  btmTitle: {
    color: theme.palette.TypographyDeep,
    textAlign: 'center',
    marginVertical: theme.spacing.margin.m1,
    ...theme.typography.common.h1,
  },
});

export default styles;
