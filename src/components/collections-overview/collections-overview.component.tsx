import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { selectCollections } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";
import CollectionPreview from "../collection-preview/collection-preview.component";
import "./collections-overview.styles.scss";


const mapStateToProps = (state: RootState) => ({
  collections: selectCollections(state),
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface CollectionOverviewProps extends PropsFromRedux {}

const CollectionsOverview = ({
  collections,
}: CollectionOverviewProps) => (
  <div className="collections-overview">
    {collections.map((collection) => (
      <CollectionPreview
        key={collection.id}
        title={collection?.title}
        items={collection?.items}
      />
    ))}
  </div>
);

export default connector(CollectionsOverview);
