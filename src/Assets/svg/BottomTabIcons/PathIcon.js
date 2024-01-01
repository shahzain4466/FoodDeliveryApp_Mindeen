import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';

function PathIcon({active}) {
  return (
    <Svg
      width={scale(28, true)}
      height={scale(27)}
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.97 1.332a11.855 11.855 0 100 23.71 11.855 11.855 0 000-23.71zm4.433 8.348l-1.687 5.743a.745.745 0 01-.505.506l-5.748 1.692a.746.746 0 01-.925-.937l1.756-5.683a.746.746 0 01.493-.493l5.68-1.751a.747.747 0 01.936.923z"
        fill={active ? theme.palette.PrimaryDeep : theme.palette.GrayMedium}
      />
    </Svg>
  );
}

export default PathIcon;

PathIcon.defaultProps = {
  active: false,
};
