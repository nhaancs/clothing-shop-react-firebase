import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { CollectionItem } from "../../models/collection.model";
import CollectionItemCmp from "../collection-item/collection-item.component";
import {
  CollectionPreviewContainer,
  PreviewContainer,
  TitleContainer
} from "./collection-preview.styles";

interface CollectionPreviewProps extends RouteComponentProps {
  title: string;
  routeName: string;
  items: CollectionItem[];
}

const CollectionPreview = ({
  title,
  items,
  history,
  match,
  routeName,
}: CollectionPreviewProps) => (
  <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItemCmp key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
