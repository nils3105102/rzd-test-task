import React from 'react';
import { Divider, Container } from 'semantic-ui-react';
import OrderForm from './components/OrderForm/OrderForm';

class App extends React.Component {

    submit = async(values) => {
        try {
            await fetch('https://webhook.site/a4379f87-890c-47df-8e96-1fc1762735f3', {
                method: 'POST',
                body: JSON.stringify(values),
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.error('Ошибка',error);
        }
    }

    render() {
        return (
            <Container>
                <Divider hidden />
                <OrderForm onSubmit={this.submit} submitButton/>
            </Container>
        );
    }
}

export default App;
