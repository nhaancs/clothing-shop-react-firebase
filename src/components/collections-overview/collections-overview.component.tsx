import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { selectCollections } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { CollectionsOverviewContainer } from "./collections-overview.styles";

const mapStateToProps = (state: RootState) => ({
  collections: selectCollections(state),
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps;

interface CollectionOverviewProps extends PropsFromRedux {}

const CollectionsOverview = ({
  collections,
}: CollectionOverviewProps) => (
  <CollectionsOverviewContainer>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionsOverviewContainer>
);

export default connector(CollectionsOverview);
