export const minLengthCreator = (length) => (value) =>{
    return value.length > length ?  undefined: "Min length is "+length;
};