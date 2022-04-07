export type Element = {
    type: string;
    attrs: any;
    children: Element[];
}

export type Leaf = {
    text: string;
    [key: string]: string;
}