import { connect } from "react-redux";
import { selectCollectionFetching } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = (state: RootState) => ({
  isCollectionFetching: selectCollectionFetching(state),
});

const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
// Todo: research using redux/compose with types

export default CollectionOverviewContainer