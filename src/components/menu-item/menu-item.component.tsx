import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import './menu-item.styles.scss'

interface MenuItemProps extends RouteComponentProps {
  title: string
  imageUrl: string
  linkUrl: string
  size?: 'large'
}

const MenuItem = (props: MenuItemProps): JSX.Element => (
  <div className={`${props.size || ''} menu-item`} onClick={() => props.history.push(`${props.match.url}${props.linkUrl}`)}>
    <div className="background-image" style={{backgroundImage: `url(${props.imageUrl})`}}></div>
    
    <div className="content">
      <h1 className="title">{props.title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem)
