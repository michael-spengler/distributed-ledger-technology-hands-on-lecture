export interface IMetadata {
    name: string,
    description: string,
    image: string,
    attributes: IAttribute[],
}

export interface IAttribute {
    trait_type: string,
    value: any
}