import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectCollectionFetching } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";
import CollectionPage from './collection.component'

const mapStateToProps = (state: RootState) => ({
  isCollectionFetching: selectCollectionFetching(state),
});

const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))
// Todo: research using redux/compose with types

export default CollectionPageContainer