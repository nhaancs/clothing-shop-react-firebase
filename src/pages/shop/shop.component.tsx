import React, { lazy, Suspense, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import Spinner from "../../components/spinner/spinner.component";
import { fetchCollectionsStartAction } from "../../redux/collection/collection.actions";

const CollectionOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStartAction()),
});

const connector = connect(null, mapDispatchToProps);

type PropsFromReduxAndRoute = ConnectedProps<typeof connector> &
  RouteComponentProps;

interface ShopPageProps extends PropsFromReduxAndRoute {}

const ShopPage = ({fetchCollectionsStart, match}: ShopPageProps) => {
  useEffect(() => {
    fetchCollectionsStart();
  },[fetchCollectionsStart])

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={match.path}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
}

export default connector(ShopPage);
