import * as React from "react"
import {  View,Text } from "react-native";
import Svg, { Path } from "react-native-svg"
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';

function HandBagIcon({active, counter}) {

  return (
    <Svg
      width={scale(22, true)}
      height={scale(25)}
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M20.972 10.072a4.105 4.105 0 00-3.859-3.64v-.284A6.129 6.129 0 0015.312 1.8 6.133 6.133 0 0010.962 0a6.151 6.151 0 00-6.148 6.15v.286a4.105 4.105 0 00-3.788 3.639L0 19.419a4.728 4.728 0 004.74 4.709h12.52a4.728 4.728 0 004.74-4.71l-1.028-9.346zM6.62 6.16a4.342 4.342 0 118.686 0v.264H6.62v-.264zm.856 6.388a1.09 1.09 0 11.419-2.1 1.09 1.09 0 01-.419 2.1zm7.05 0a1.093 1.093 0 01-1.01-1.51 1.093 1.093 0 111.428 1.427 1.09 1.09 0 01-.418.083z"
        fill={active ? theme.palette.PrimaryDeep : theme.palette.GrayMedium}
      />
     
     {counter > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -8,
            width: scale(15),
            height: scale(15),
            backgroundColor: '#FFC529',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color:theme.palette.white, fontSize:scale(10), fontWeight: '700' }}>
            {counter}
          </Text>
        </View>
      )} 

    </Svg>
  )
}

export default HandBagIcon

HandBagIcon.defaultProps = {
  active: false,
};
