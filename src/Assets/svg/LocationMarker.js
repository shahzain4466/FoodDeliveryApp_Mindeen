import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { scale } from "../../../utils/scale"

function LocationMarker({width, height}) {
  return (
    <Svg
      width={height || scale(24, true)}
      height={width || scale(30)}
      viewBox="0 0 24 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.001.008C5.71.008.578 5.139.578 11.43c0 2.495.79 4.868 2.285 6.854l8.435 11.364c.123.176.457.352.703.352.264 0 .58-.194.703-.352.035-.053 8.523-11.487 8.594-11.593.018 0 .018 0 .018-.017a11.37 11.37 0 002.108-6.608c0-6.292-5.131-11.423-11.423-11.423zm0 17.574a6.158 6.158 0 01-6.15-6.151C5.85 8.039 8.61 5.28 12 5.28c3.392 0 6.151 2.76 6.151 6.15 0 3.393-2.76 6.152-6.15 6.152z"
        fill="#C5002E"
      />
    </Svg>
  )
}

export default LocationMarker