import {Dimensions} from 'react-native';
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

export const scale = (number, isWith) => {

  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;

  const width = Math.min(deviceWidth, deviceHeight);
  const height = Math.max(deviceWidth, deviceHeight);

  if (isWith) {
    return number * (width / DESIGN_WIDTH);
  } else {
    return number * (height / DESIGN_HEIGHT);
        }
};

// Screen Vs Windows