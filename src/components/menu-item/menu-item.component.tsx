import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { BackgroundImageContainer, ContentContainer, ContentSubtitle, ContentTitle, MenuItemContainer } from "./menu-item.styles";

import "./menu-item.styles.ts";

export interface MenuItemProps extends RouteComponentProps {
  title: string;
  imageUrl: string;
  linkUrl: string;
  size?: "large";
}

const MenuItem = ({
  size,
  title,
  imageUrl,
  history,
  linkUrl,
  match,
}: MenuItemProps): JSX.Element => (
  <MenuItemContainer
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      className="background-image"
      imageUrl={imageUrl}
    />
    <ContentContainer className="content">
      <ContentTitle>{title.toUpperCase()}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
