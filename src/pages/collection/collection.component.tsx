import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import CollectionItemCmp from "../../components/collection-item/collection-item.component";
import { selectOneCollection } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";
import { CollectionItemsContainer, CollectionTitle, CollectionPageContainer } from "./collection.styles";

import "./collection.styles.ts";

export interface CollectionPageRouteParams {
  collectionId: string;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<CollectionPageRouteParams>
) => ({
  collection: selectOneCollection(ownProps?.match?.params?.collectionId)(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector> &
  RouteComponentProps<CollectionPageRouteParams>;

const CollectionPage = ({ collection }: PropsFromRedux) => {
  // use useEffect as componentWillUnmount
  useEffect(() => {
    // clean up function, get call before component unmounted
    return () => {};
  }, []);

  return (
    <CollectionPageContainer>
      <CollectionTitle>{collection?.title}</CollectionTitle>
      <CollectionItemsContainer>
        {collection?.items.map((item) => (
          <CollectionItemCmp key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default connector(CollectionPage);
