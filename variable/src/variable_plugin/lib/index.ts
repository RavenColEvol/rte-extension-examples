export const fieldExtractor = (field: any[], uid: string, group_title) => {
    if (!Array.isArray(field)) {
        throw new Error("Group must be multiple");
    }
    const actualData: { [key: string]: any } = {};

    field.forEach((fieldObj) => {
        console.log("fieldObj", fieldObj)
        if (!fieldObj.hasOwnProperty(group_title)) {
            throw new Error("Mark a field as group title");
        }

        if (fieldObj.hasOwnProperty("enabled") && !fieldObj.enabled) return;

        actualData[fieldObj[group_title]] = { field: fieldObj, uid };
    });
    return actualData;
};

// export const fieldExtractor = (group: any[] = [], group_title) => {
//     return group.map((field) => {
//         if (!field[group_title]) throw new Error("field is missing");
//         return {
//             label: field[group_title],
//             value: field[group_title],
//         };
//     });
// };
