export const extractToken = (data: string | { message: string }): string | undefined => {
    if (typeof data === 'object' && 'message' in data) {
        return undefined;
    } else if (typeof data === 'string') {
        return data;
    }
    return undefined;
};

export const extractErrorMessage = (data: string | { message: string }): string | undefined => {
    if (typeof data === 'object' && 'message' in data) {
        return data.message;
    } else if (typeof data === 'string') {
        return data;
    }
    return undefined;
};
