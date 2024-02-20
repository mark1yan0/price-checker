export type IJson =
  | string
  | number
  | boolean
  | null
  | { [key: string]: IJson | undefined }
  | IJson[];

export interface IPriceItem {
  id: number;
  name: string;
  css_selector: string;
  base_price: number;
  url: string;
}

export interface IDatabase {
  public: {
    Tables: {
      price_items: {
        Row: IPriceItem; // the data expected from .select()
        Insert: Omit<IPriceItem, 'id'>; // the data to be passed to .insert()
        Update: Omit<IPriceItem, 'id'>; // the data to be passed to .update()
      };
    };
  };
}
