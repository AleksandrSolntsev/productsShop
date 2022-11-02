export const requiredField = value =>{
    if (value) return undefined;
    return "Field is required";
}
export const maxLength = value =>{
    if (value.length > 20) return "Max length is 20 symbols";
    return undefined;
}
