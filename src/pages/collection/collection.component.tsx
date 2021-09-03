import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { selectOneCollection } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";

import './collection.styles.scss'

interface RouteParams {
    collectionId: string
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<RouteParams>) => ({
    collection: selectOneCollection(ownProps?.match?.params?.collectionId)(state)
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps<RouteParams>

const CollectionPage = ({match, collection}: PropsFromRedux) => (
    <div className='category'>
        <h2>{collection?.title}</h2>
        {
            collection?.items.map(item => <h3>{item.name}</h3>)
        }
    </div>
)

export default connector(CollectionPage)