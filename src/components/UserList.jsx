import React from 'react';

const UserList = ({ users, handleEdit, handleDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">	Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, i) => (
                        <tr key={user.id}>
                            <th scope="row">{i + 1}</th>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td>{user.department}</td>
                            <td>{user.address}</td>
                            <td>
                                <div className='d-flex gap-3'>
                                    <button type="button" className="btn btn-warning btn-sm" value={user.id} onClick={handleEdit}>Edit</button>
                                    <button type="button" className="btn btn-danger btn-sm" value={user.id} onClick={handleDelete}>Delete</button>
                                </div>                                    
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default UserList;
