export const fieldExtractor = (group: any[] = [], group_title) => {
    return group.map((field) => {
        if (!field[group_title]) throw new Error("field is missing");
        return {
            label: field[group_title],
            value: field[group_title],
        };
    });
};

