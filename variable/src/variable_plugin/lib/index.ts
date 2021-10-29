export const fieldExtractor = (field: any[], uid: string) => {
    if (!Array.isArray(field)) {
        throw new Error("Group must be multiple");
    }
    const actualData: { [key: string]: any } = {};

    field.forEach((fieldObj) => {
        if (!fieldObj.hasOwnProperty("title")) {
            throw new Error("Mark a field as group title");
        }

        actualData[fieldObj.title] = { field: fieldObj, uid };
    });

    return actualData;
};
