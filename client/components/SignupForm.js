import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/currentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: []}
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            // can't add .then because it will run at the same time as refetchQueries with React
            refetchQueries: [{ query }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });

    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm
                    errors={this.state.errors} 
                    onSubmit={this.onSubmit.bind(this)}  />
                
            </div>
        )
    }
} 

export default graphql(query)(
    graphql(mutation)(SignupForm)
);