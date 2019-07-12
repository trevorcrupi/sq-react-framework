export const isString = value => {
    return typeof value === 'string' || value instanceof String;
}

export const isArray = value => {
    return value && typeof value === 'object' && value.constructor === Array;
}

export const isNumber = value => {
    return typeof value === 'number' && isFinite(value);
}

export const isObject = value => {
    return value && typeof value === 'object' && value.constructor === Object;
}

export const isBoolean = value => {
    return typeof value === 'boolean';
}

export const isFunction = value => {
    return typeof value === 'function'; 
}