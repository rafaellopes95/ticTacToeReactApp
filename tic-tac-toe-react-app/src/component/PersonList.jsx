import React from 'react';
import Axios from 'axios';
import AxiosRetry from 'axios-retry';

class PersonList extends React.Component {
   
    constructor(props) {
        super(props);

        this.state = {
            people: [],
        }
    }

    // Lifecycle that is executed right after the component has been rendered in DOM.
    componentDidMount() {
        AxiosRetry(Axios, { retries: 3, retryDelay: () => { return 5000; } , retryCondition: (error) => {
            // const errorMessage = error.message;
            // return errorMessage.includes('NETWORK') ? true : false;
            return true;
        }});
        Axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const people = response.data;
            this.setState({ people });
        })
        .catch(response => {
            console.log('Error to get the users!');
        });
    }

    render() {
        return (
            <ul>
                {this.state.people.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
        )
    }
}

export default PersonList;