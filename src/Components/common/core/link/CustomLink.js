import React from "react";
import PropTypes from "prop-types";
import { useLinkProps } from "@react-navigation/native";
import CustomTouchableOpacity from "../touchableopacity/CustomTouchableOpacity";

const CustomLink = ({ to, action, component, ...rest }) => {
  const { onPress, ...props } = useLinkProps({ to, action });

  if (component) {
    const Component = component;
    return <Component onPress={onPress} {...props} {...rest} />;
  }

  return <CustomTouchableOpacity onPress={onPress} {...props} {...rest} />;
};

CustomLink.propTypes = {
  to: PropTypes.shape({ screen: PropTypes.string.isRequired }).isRequired,
  action: PropTypes.object,
  component: PropTypes.elementType,
};

export default CustomLink;
