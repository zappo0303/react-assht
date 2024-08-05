export interface IdProducts{
    _id?: number | string ,
    category:string,
    name: string,
    img: string,
    imgCategory: string[],
    price: number,
    description: string,
    featured: boolean,
    tags: string[],
    coutInStock: number,
    discount: number,
    attributes: string
}

