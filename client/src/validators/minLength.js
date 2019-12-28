export const minLengthCreator = (value) => (length) =>{
    if(!value.length > length)  {
        return "Min length is "+length;
    }
};