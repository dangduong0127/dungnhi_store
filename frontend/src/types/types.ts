export interface DataTypes {
  id: string | number;
  name: string;
  type: string;
  price: number;
}

export interface RowData {
  barcode: number | string;
  name: string;
  price: string | number;
  description: string;
  quantity: number;
  image: string;
  key: number;
}
