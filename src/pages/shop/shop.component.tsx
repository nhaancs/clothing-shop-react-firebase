import React, { ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStartAction } from "../../redux/collection/collection.actions";
import CollectionPageContainer from "../collection/collection.container";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStartAction()),
});

const connector = connect(null, mapDispatchToProps);

type PropsFromReduxAndRoute = ConnectedProps<typeof connector> &
  RouteComponentProps;

interface ShopPageProps extends PropsFromReduxAndRoute {}

class ShopPage extends React.Component<ShopPageProps> {
  componentDidMount() {
    this.props?.fetchCollectionsStart();
  }

  render(): ReactNode {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

export default connector(ShopPage);
