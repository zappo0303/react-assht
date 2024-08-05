export interface FormProductAdd {
    name: string;
    price: number;
    img: FileList;
    imgCategory: FileList;
    discount: number;
    coutInStock: number;
    category: string;
    description: string;
    featured: boolean;
    tags: string[];
    attributes: string;
  }
