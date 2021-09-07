import {
  collection,
  CollectionReference,
  onSnapshot,
  query,
  Unsubscribe
} from "@firebase/firestore";
import React, { ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {
  convertCollectionsSnapshotToMap,
  firestore
} from "../../firebase/firebase.utils";
import { Collection } from "../../models/collection.model";
import { updateCollections } from "../../redux/collection/collection.actions";
import CollectionPage, {
  CollectionPageRouteParams
} from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateCollections: (collectionsMap: { [key: string]: Collection }) =>
    dispatch(updateCollections(collectionsMap)),
});

const connector = connect(null, mapDispatchToProps);

type PropsFromReduxAndRoute = ConnectedProps<typeof connector> &
  RouteComponentProps;

interface ShopPageProps extends PropsFromReduxAndRoute {}

class ShopPage extends React.Component<ShopPageProps> {
  state = {
    loading: true,
  };
  private unsubscribeFromSnapshot!: Unsubscribe;

  componentDidMount() {
    const collectionRef = collection(
      firestore,
      "collections"
    ) as CollectionReference<Collection>;
    this.unsubscribeFromSnapshot = onSnapshot(
      query(collectionRef),
      (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        this.props.updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render(): ReactNode {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          render={(props: RouteComponentProps) => (
            <CollectionsOverviewWithSpinner loading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props: RouteComponentProps<CollectionPageRouteParams>) => (
            <CollectionPageWithSpinner loading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

export default connector(ShopPage);
