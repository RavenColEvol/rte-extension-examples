export declare const getEmbedType: (url: string) => {
    type: string;
    props: {
        id: string;
        url?: undefined;
    };
} | {
    type: string;
    props: {
        url: string | null;
        id?: undefined;
    };
};
