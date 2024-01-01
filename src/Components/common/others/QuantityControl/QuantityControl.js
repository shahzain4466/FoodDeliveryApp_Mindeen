import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {scale} from '../../../../../utils/scale';
import theme from '../../../../themes/theme';

const QuantityControl = ({
  add,
  data,
  quantity,
  negtiveBtn,
  addBtn,
  negtivePress,
  addPress,
  btnStyle,
  btntxt,
  quantitybtnstyle,
}) => {
  return (
    <View style={styles.main}>
      {data ? (
        <View style={styles.price}>
          <Text style={styles.priceTxt}>{`PKR ${data}`}</Text>
        </View>
      ) : null}

      <View style={[styles.handlequantity, quantitybtnstyle]}>
        <>
          <TouchableOpacity
            style={[styles.removebtn, btnStyle]}
            onPress={negtivePress}>
            <Text style={[styles.negtivetxt, btntxt]}>{negtiveBtn}</Text>
          </TouchableOpacity>
          <Text style={styles.numtxt}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.addbtn, btnStyle]}
            onPress={addPress}>
            <Text style={[styles.positivetxt, btntxt]}>{addBtn}</Text>
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
};
export default QuantityControl;
const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    // width: '30%',
  },
  priceTxt: {
    fontSize: scale(24),
    lineHeight: scale(36),
    color: theme.palette.PrimaryDark,
    fontWeight: '600',
  },
  handlequantity: {
    width: '40%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    borderColor: theme.palette.PrimaryDeep,
    borderWidth: scale(1),
    alignItems: 'center',
  },
  negtivetxt: {
    color: theme.palette.PrimaryDeep,
    // fontSize:scale(40)
  },
  positivetxt: {
    color: theme.palette.white,
  },
  numtxt: {
    marginHorizontal: scale(20),
    ...theme.typography.common.bodyr,
    color: theme.palette.DarkBlack,
  },
  removebtn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    borderColor: theme.palette.PrimaryDeep,
    borderWidth: scale(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addbtn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: theme.palette.PrimaryDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
