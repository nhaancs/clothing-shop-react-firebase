export interface Collection {
  id: string;
  title: string;
  routeName: string;
  items: CollectionItem[];
}

export interface CollectionItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}
