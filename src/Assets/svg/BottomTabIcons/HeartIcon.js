import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';
// import styles from '../../../components/screens/IntroScreen/styles';
import { StyleSheet } from 'react-native';

function HeartIcon({active,customStyles}) {
  return (
    <Svg
      style={[styles.heartIconStyle,customStyles]}
      // width={scale(22, true)}
      // height={scale(20)}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.866 0a5.78 5.78 0 00-5.039 2.95A5.78 5.78 0 005.787 0 6.117 6.117 0 000 6.16c0 8.027 10.827 13.627 10.827 13.627S21.654 14.19 21.654 6.16A6.117 6.117 0 0015.866 0z"
        fill={active ? theme.palette.PrimaryDeep : theme.palette.GrayMedium}
      />
    </Svg>
  );
}

export default HeartIcon;
const styles=StyleSheet.create({
 heartIconStyle: {height: scale(20), width: scale(22)}
})

HeartIcon.defaultProps = {
  active: false,
};
