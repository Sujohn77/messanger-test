export const RegexEmail = (value) => {
    return(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))? undefined: "Email should contain @gmail.com or @mail.ru";
};