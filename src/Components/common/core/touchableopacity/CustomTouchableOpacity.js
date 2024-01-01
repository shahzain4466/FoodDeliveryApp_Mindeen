import React from "react";
import { TouchableOpacity } from "react-native";
import { ACTIVE_OPACITY } from "../../../../constants/constants";

const CustomTouchableOpacity = (props) => {
  return <TouchableOpacity activeOpacity={ACTIVE_OPACITY} {...props} />;
};

export default CustomTouchableOpacity;
