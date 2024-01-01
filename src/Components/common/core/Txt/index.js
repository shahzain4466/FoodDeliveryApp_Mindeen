import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

const Txt = ({style, children, ...rest}) => {
  return (
    <Text style={[style]} {...rest}>
      {children}
    </Text>
  );
};

Txt.propTypes = {
  children: PropTypes.node,
};

export default Txt;

//* Documentation
/**
 * Txt is a custom Text component that applies a theme-specific text color
 * based on the user's device color scheme preference.
 *
 * @param {object} props - The component props.
 * @param {object} [props.style] - The style object to apply to the text.
 * @param {node} props.children - The content to render inside the Text component.
 * @return {JSX.Element} - A Text component with the appropriate theme-specific text color.
 */
