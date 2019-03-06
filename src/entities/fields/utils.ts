export interface GenericObject {
    [key: string]: any;
}

const nestedField = (property: string, fields: string[]): string => {
    return `${property}(${fields.join(',')})`;
};

export const generateFields = (obj: GenericObject): string[] => {
    return Object.getOwnPropertyNames(obj).map(f => {
        const property = (<any>obj)[f];
        if (typeof property === 'object' && property) {
            if (!Array.isArray(property)) {
                return nestedField(f, generateFields(property));
            } else if (property.length > 0) {
                return nestedField(f, generateFields(property[0]));
            }
        }
        return f;
    });
};

export const generateFieldsQuery = (obj: GenericObject): string => {
    return generateFields(obj).join(',');
};
