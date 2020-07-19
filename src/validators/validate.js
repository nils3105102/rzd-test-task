export const required = value => value ? undefined : 'Обязательно для заполнения'
export const maxLength = max => value =>
    value && value.length > max ? `Должно быть ${max} символов или меньше` : undefined
export const maxLength15 = maxLength(15)
export const number = value => value && isNaN(Number(value)) ? 'Введите число' : undefined
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Неверный формат email' : undefined

export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Неверный номер, должно быть не менее 10 цифр'
        : undefined

export const date = value => 
    // eslint-disable-next-line
    value && !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(value) 
    ? 'Неверный формат даты' : undefined