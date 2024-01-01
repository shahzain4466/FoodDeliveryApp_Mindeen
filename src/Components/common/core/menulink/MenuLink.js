import React from "react";
import PropTypes from "prop-types";
import { useRoute } from "@react-navigation/native";
import CustomLink from "../link/CustomLink";
import { scale } from "../../../../../utils/scale";

const MenuLink = ({ to, Icon, ActiveIcon }) => {
  const widthAndHeightProps = { width: scale(42), height: scale(42) };
  const route = useRoute();

  const match = to.screen === route.name;

  return (
    <CustomLink to={to}>
      {match ? (
        <ActiveIcon active {...widthAndHeightProps} />
      ) : (
        <Icon {...widthAndHeightProps} />
      )}
    </CustomLink>
  );
};

MenuLink.propTypes = {
  to: PropTypes.object.isRequired,
  Icon: PropTypes.elementType.isRequired,
  ActiveIcon: PropTypes.elementType.isRequired,
};

export default MenuLink;
