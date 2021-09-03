import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = ({match}: RouteComponentProps) => (
  <div className="shop-page">
    <Route exact path={match.path} component={CollectionsOverview} />
    <Route path={`${match.path}/:categoryId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
