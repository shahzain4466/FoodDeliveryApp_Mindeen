import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';

const styles = StyleSheet.create({
  container: {
    ...theme.commonStyling.flex,
    padding: theme.spacing.padding.p1,
  },
  addmoretxt: {
    ...theme.typography.common.bodyr,
    fontWeight: '300',
    color: theme.palette.PrimaryDeep,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: scale(30),
  },
  notesContainer: {
    height: scale(92),
    borderWidth: scale(1),
    borderColor: theme.palette.GrayBorder,
    borderRadius: scale(14),
    marginTop: scale(20),
  },
  notes: {
    ...theme.typography.common.h2r,
    color: theme.palette.PrimaryDeep,
    fontWeight: '600',
    marginLeft: scale(14),
    marginTop: scale(5),
  },
  input: {
    ...theme.typography.common.bodyr,
    color: theme.palette.DarkBlack,
    marginLeft: scale(12),
    textAlignVertical: 'top',
    borderWidth: scale(0),
    width: '95%',
    // paddingLeft:scale(0)
  },
  promoview: {
    marginTop: scale(15),
    height: scale(60),
    flexDirection: 'row',
    borderWidth: scale(1),
    borderRadius: scale(20),
    borderColor: theme.palette.GrayBorder,
    paddingHorizontal: scale(10),
    alignItems: 'center',
  },
  titletxt: {
    ...theme.typography.common.h2r,
    fontWeight: '600',
    color: theme.palette.white,
  },
  btn: {
    width: '30%',
    height: scale(50),
    marginLeft: scale(0),
    position: 'absolute',
    right: scale(10),
  },
  check: {
    marginVertical: scale(30),
    width: '70%',
    alignSelf: 'center',
  },
  noItemsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCart: {
    flex: 1,
  },
});

export default styles;
