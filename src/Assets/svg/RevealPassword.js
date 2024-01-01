import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function RevealPassword({height, width, fill}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 256 256"
    >
      <G
        stroke="none"
        strokeWidth={0}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        fill="none"
        fillRule="nonzero"
        opacity={1}
      >
        <Path
          d="M85.999 46.764c-.974 0-1.95-.354-2.721-1.069-25.757-23.91-50.799-23.911-76.557 0a4 4 0 01-5.443-5.863c29.012-26.931 58.431-26.93 87.443 0a4 4 0 01-2.722 6.932z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill={fill||"#000"}
          fillRule="nonzero"
          opacity={1}
        />
        <Path
          d="M45 70.267c-9.741 0-17.667-7.926-17.667-17.667S35.259 34.933 45 34.933 62.667 42.858 62.667 52.6 54.741 70.267 45 70.267z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill={fill||"#000"}
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  )
}

export default RevealPassword