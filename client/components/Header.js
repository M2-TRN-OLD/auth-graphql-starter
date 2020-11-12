import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {

    onLogoutClick() {
        //logging out current user
        // best strategy to refresh the query
        this.props.mutate({
            //could pass more than 1 query; by default it is an array
            refetchQueries: [{ query }]
        });
    }

    renderButtons() {
        const { loading, user } = this.props.data;
        if (loading) { return <div />; }

        if (user) {
            return (
                <li>
                    <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            )
        }


    }

    render() {
        console.log('this.props.data',this.props.data);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">Home</Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                    
                </div>
            </nav>
        )
    }
}

// ugly but must be done if there are more than 1 query or mutation
export default graphql(mutation) (
    graphql(query)(Header)
);
