import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import CollectionItemCmp from "../../components/collection-item/collection-item.component";
import { selectOneCollection } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";

import './collection.styles.scss'

export interface CollectionPageRouteParams {
    collectionId: string
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<CollectionPageRouteParams>) => ({
    collection: selectOneCollection(ownProps?.match?.params?.collectionId)(state)
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<CollectionPageRouteParams>

const CollectionPage = ({match, collection}: PropsFromRedux) => (
    <div className='collection-page'>
        <h2 className='title'>{collection?.title}</h2>
        <div className='items'>
            {
                collection?.items.map(item => <CollectionItemCmp key={item.id} item={item} />)
            }
        </div>
    </div>
)

export default connector(CollectionPage)