export const generateFields = (obj: { [key: string]: any }): string[] => {
    return Object.getOwnPropertyNames(obj).map(f => {
        const property = (<any>obj)[f];
        if (typeof property === 'object' && property) {
            if (!Array.isArray(property)) {
                return `${f}(${Object.getOwnPropertyNames(property).join(',')})`;
            }
        }
        return f;
    });
};
