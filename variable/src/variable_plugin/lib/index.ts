export const fieldExtractor = (field: any[], uid: string, group_title) => {
    if (!Array.isArray(field)) {
        throw new Error("Group must be multiple");
    }
    const actualData: { [key: string]: any } = {};

    field.forEach((fieldObj) => {
        if (!fieldObj.hasOwnProperty(group_title)) {
            throw new Error("Field title not found");
        }

        if (fieldObj.hasOwnProperty("enabled") && !fieldObj.enabled) return;

        actualData[fieldObj[group_title]] = { field: fieldObj, uid };
    });
    return actualData;
};

