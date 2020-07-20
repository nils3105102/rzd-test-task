import React from 'react';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import './OrderForm.css';
import { Field, reduxForm, FieldArray, reset } from 'redux-form';
import { required, maxLength15, number, phoneNumber, email, date } from '../../validators/validate';


const afterSubmit = (result, dispatch) => (
    dispatch(reset('order'))
)

const renderInput = ({ input, label,  meta: { touched, error, warning } }) => (
    <>
        <Form.Input 
            name={input.name} 
            label={label} 
            value={input.value}
            onChange={(e, {value}) => input.onChange(value)}
            error={touched && error ? true : false}
        />
        {touched && ((error && <Label basic color='red' pointing='left'>{error}</Label>) || (warning && <span>{warning}</span>))}
    </>
    
);


const renderSelect = ({ input, label, options, meta: { touched, error, warning } }) => (
    <>
        <Form.Select
            label={label}
            name={input.name}
            options={options}
            onChange={(e, {value}) => input.onChange(value)}
            value={input.value}
            error={touched && error ? true : false}
        />
        {touched && ((error && <Label basic color='red' pointing='left'>{error}</Label>) || (warning && <span>{warning}</span>))}
    </>
);

const renderCheckbox = field => (
    <Form.Checkbox
        checked={!!field.input.value}
        name={field.input.name}
        label={field.label}
        onChange={(e, {checked}) => field.input.onChange(checked)} 
    />
)

const renderPassengers = ({fields}) => (
    <>
    {
        fields.map((passenger, index) => (
            <React.Fragment key={index}>
                <Header as='h1' textAlign='left'>Пассажир №{index + 1}:</Header>
                <Header as='h3' textAlign='right'>
                    <Button disabled={fields.length === 1 ? true : false} type='button' onClick={() => fields.remove(index)} style={{'cursor': 'pointer', 'color': 'red'}}>Удалить пассажира</Button>
                    
                </Header>
                <Form.Group widths='equal'>
                    <Field component={ renderInput } name={`${passenger}.lastName`} label='Фамилия *' validate={[ required, maxLength15 ]} />
                    <Field component={ renderInput } name={`${passenger}.firstName`} label='Имя *' validate={[ required, maxLength15 ]} />
                    <Field component={ renderInput } label='Отчество (обязательно, при наличии) *' name={`${passenger}.patronymic`} validate={[ required, maxLength15 ]} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Field
                        component={renderSelect}
                        label='Пол *'
                        options={[
                            { key: 'm', text: 'Мужчина', value: 'male' },
                            { key: 'f', text: 'Женщина', value: 'female' }
                        ]}
                        name={`${passenger}.sex`}
                        validate={[required]}
                    />
                    <Field component={renderInput} label='Дата рождения(ДД/ММ/ГГГГ) *' name={`${passenger}.birthDate`} validate={[required, date]}/>
                    <Field 
                        component={renderSelect} 
                        label='Гражданство *' 
                        options={[
                            { key: 'ru', text: 'Россия', value: 'russia' },
                            { key: 'by', text: 'Беларусь', value: 'belarus' },
                            { key: 'ua', text: 'Украина', value: 'ukraine' },
                            { key: 'kz', text: 'Казахстан', value: 'kazakhstan' }
                        ]}
                        name={`${passenger}.country`}
                        validate={[required]}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Field 
                        component={renderSelect} 
                        label='Тип документа *' 
                        options={[
                            { key: 'pasp', text: 'Паспорт', value: 'pasport' },
                            { key: 'zagr_pasp', text: 'Заграничный паспорт', value: 'zagr_pasp' },
                            { key: 'birth_cert', text: 'Свидетельство о рождении', value: 'birth_cert' },
                        ]}
                        name={`${passenger}.docType`}
                        validate={[required]}
                    />
                    <Field component={ renderInput } label='Номер документа *' name={`${passenger}.docNumber`} validate={[required, maxLength15, number]}/>
                    <Field component={ Form.Input } label='Тариф *' name={`${passenger}.rate`} disabled />
                </Form.Group>
                    <Field
                        component={renderCheckbox} 
                        name={`${passenger}.isAgreed`}
                        label='Согласен на получение оповещений в случаях чрезвычайных ситуаций на железножородном транспорте' 
                    />
                <Form.Group widths='equal'>
                    <Field component={ renderInput } label='Телефон пассажира' name={`${passenger}.phone`} validate={[phoneNumber]} />
                    <Field component={ renderInput } label='E-mail пассажира' name={`${passenger}.email`} validate={[email]}/>
                </Form.Group>
            </React.Fragment>
        ))
    }
        <Button floated='right' type='button' disabled={fields.length === 5 ? true : false} onClick={() => fields.length < 5 && fields.push()} primary>Добавить пассажира </Button>
    </>
);

let OrderForm = ({submitButton, handleSubmit, submitting}) => {
    return (
        <>
        <Form  className='formStyle' onSubmit={handleSubmit}>
            <FieldArray name='passengers' component={renderPassengers}/>
            {
                submitButton ? <Form.Button floated='left' disabled={submitting}>Отправить</Form.Button> : null
            }
            
        </Form>
        </>
    );
}

OrderForm = reduxForm({
    form: 'order',
    onSubmitSuccess: afterSubmit,
    initialValues: {
        passengers: [null]
    }
})(OrderForm)

export default OrderForm;