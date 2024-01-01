import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../../utils/scale';

function ChevronGeneral({color, height, width, rotate}) {
  return (
    <View style={styles(rotate).container}>
      <Svg
        width={width || scale(11, true)}
        height={height || scale(7)}
        viewBox="0 0 11 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M10.25 6.25l-4.684-5L.75 6.066"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export const styles = rotate => {
  let style = {
    container: {
      transform: [{rotate: `${rotate}deg`}],
    },
  };
  return StyleSheet.create(style);
};

export default ChevronGeneral;
