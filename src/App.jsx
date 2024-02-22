import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState } from 'react';
import Form from './components/Form';
import UserList from './components/UserList';

function App() {
    const [users, setUsers] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        address: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        const isValidated = validateInputs(e.target);
        if (!isValidated) {
            handleError();
            return;
        }

        if (toEdit !== null) editUser();
        else {
            const findUser = users.filter(user => user.firstName === formData.firstName && user.lastName === formData.lastName);
            if (findUser.length <= 0) addUser();
            else {
                handleDuplicate(`${findUser[0].firstName} ${findUser[0].lastName}`);    
                return;
            }
        }

        handleSuccess();
        resetForm();
    }

    function handleEdit(e) {
        const id = e.target.value;
        const user = users.find(user => user.id === id);

        setToEdit(id);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department,
            address: user.address
        })
    }

    function handleDelete(e) {
        const id = e.target.value;
        setUsers(current => current.filter(user => user.id !== id));
    }

    function editUser() {
        const newData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            department: formData.department,
            address: formData.address
        }
        setUsers(current => users.map(
            user => user.id === toEdit ? {...user, ...newData} : user
        ));
    }

    function addUser() {
        const newUser = { 
            id: Date.now().toString(36), 
            firstName: formData.firstName,
            lastName: formData.lastName,
            department: formData.department,
            address: formData.address
        }
        setUsers([...users, newUser]);
    }

    const validateInputs = () => {
        if (formData.firstName === '') {
            setErrorMessage('Data is incomplete, First Name is required');
            return false;
        } else if (formData.lastName === '') {
            setErrorMessage('Data is incomplete, Last Name is required');
            return false;
        } else if (formData.department === '') {
            setErrorMessage('Data is incomplete, Department is required');
            return false;
        } else if (formData.address === '') {
            setErrorMessage('Data is incomplete, Address is required');
            return false;
        } else return true;
    }

    function handleDuplicate(name) {
        setErrorMessage(`User with name: ${name} already exist, try editing it`);
        handleError();
    }

    function handleSuccess() {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
    }

    function handleError() {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 5000);
    }

    function resetForm() {
        setToEdit(null);
        setFormData({
            firstName: '',
            lastName: '',
            department: '',
            address: ''
        });
    }

    const SuccessNotification = () => (
        <div className="alert alert-success">
            Data has been saved successfully
        </div>
    );

    const ErrorNotification = ( { message }) => (
        <div className="alert alert-danger">
            {message}
        </div>
    );

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center m-0">
          <h1 className='text-center font-weight-bold py-4'>Registration Form</h1>
        <div className="row" style={{maxWidth: '60%'}}>
            {showSuccess && <SuccessNotification />}
            {showError && <ErrorNotification message={errorMessage}/>}
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <Form handleSubmit={handleSubmit} setFormData={setFormData} formData={formData}/>
                    </div>
                </div>
            </div>

            <div className="col-8">
            <div className="card" style={{background: '#00494d'}}>
                      <div className="card-header text-white">
                        <strong>USER LIST</strong>
                    </div>
                    <div className="card-body">
                        <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default App
