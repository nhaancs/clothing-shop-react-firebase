import React, { ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, RouteComponentProps } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchCollectionsStartAsync } from "../../redux/collection/collection.actions";
import { selectCollectionFetching } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";
import CollectionPage, {
  CollectionPageRouteParams
} from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, void, Action>) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

const mapStateToProps = (state: RootState) => ({
  isCollectionFetching: selectCollectionFetching(state),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromReduxAndRoute = ConnectedProps<typeof connector> &
  RouteComponentProps;

interface ShopPageProps extends PropsFromReduxAndRoute {}

class ShopPage extends React.Component<ShopPageProps> {
  componentDidMount() {
    this.props?.fetchCollectionsStartAsync();
  }

  render(): ReactNode {
    const { match, isCollectionFetching } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          render={(props: RouteComponentProps) => (
            <CollectionsOverviewWithSpinner
              loading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props: RouteComponentProps<CollectionPageRouteParams>) => (
            <CollectionPageWithSpinner
              loading={isCollectionFetching}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default connector(ShopPage);
