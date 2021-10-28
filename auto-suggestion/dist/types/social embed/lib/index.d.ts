export declare const getEmbedType: (url: string) => {
    type: string;
    props: {
        url: string;
        id?: undefined;
    };
} | {
    type: string;
    props: {
        id: string;
        url?: undefined;
    };
};
