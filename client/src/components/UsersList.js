import React, { Component } from 'react';
import _ from 'lodash'
import {Link} from 'react-router'


function User({username, id}) {
    return (<li>
        <Link to={`/users/${id}/expenses`}>{username}</Link>
    </li>)
}

class UsersList extends Component {

    render() {
        const {users} = this.props
        return (<div>
            {_.map(users, (user)=><User key={user.id} {...user} />)}
        </div>);
    }
}

export default UsersList;
