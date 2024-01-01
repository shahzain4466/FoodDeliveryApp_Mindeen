import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';

function LocationIcon({active}) {
  return (
    <Svg
      width={scale(21, true)}
      height={scale(24)}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M18.849 4.719a9.871 9.871 0 00-8.453-4.72 9.867 9.867 0 00-8.453 4.72 10.43 10.43 0 00-1.036 8.226c1.717 5.905 7.483 9.738 9.076 10.7a.8.8 0 00.822 0c1.594-.965 7.359-4.8 9.076-10.7a10.427 10.427 0 00-1.032-8.226zm-8.453 8.829a3.384 3.384 0 11.002-6.768 3.384 3.384 0 01-.002 6.768z"
        fill={active ? theme.palette.PrimaryDeep : theme.palette.GrayMedium}
      />
    </Svg>
  )
}

export default LocationIcon

LocationIcon.defaultProps = {
  active: false,
};
