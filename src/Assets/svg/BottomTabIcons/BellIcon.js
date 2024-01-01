import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';

function BellIcon({active}) {
  return (
    <Svg
      width={scale(21, true)}
      height={scale(25)}
      viewBox="0 0 21 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M19.938 12.473a7.46 7.46 0 01-1.227-2.013 4.778 4.778 0 01-.335-1.79v-.221a7.936 7.936 0 10-15.874.002v.223a4.75 4.75 0 01-.333 1.78A7.457 7.457 0 01.94 12.472a4.51 4.51 0 001.58 6.203l.054.031c.132.07.268.13.408.18.054.021.115.043.181.066.19.07.384.13.581.177.038.008.075.019.113.024h.008l.227.054c.16.036.331.07.518.107l.292.052a23.952 23.952 0 001.411.191c1.371.136 2.748.203 4.125.2.8 0 1.522-.012 2.177-.04 1.145-.05 2.077-.14 2.832-.248.323-.046.615-.1.875-.147a5.816 5.816 0 002.053-.66 4.51 4.51 0 001.563-6.189zM13.541 21.44a7.506 7.506 0 00-3.1-.466 7.509 7.509 0 00-3.1.466.886.886 0 00-.421.924 2.917 2.917 0 002.3 1.974 4.68 4.68 0 002.448 0 2.915 2.915 0 002.3-1.974.885.885 0 00-.427-.924z"
        fill={active ? theme.palette.PrimaryDeep : theme.palette.GrayMedium}
      />
    </Svg>
  )
}

export default BellIcon

BellIcon.defaultProps = {
  active: false,
};
