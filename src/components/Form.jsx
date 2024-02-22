import React from 'react';

const Form = ({handleSubmit, setFormData, formData}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" name="firstName" className="form-control" id="firstName" onChange={(e) => setFormData({...formData, firstName: e.target.value})} value={formData.firstName}/>
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" name="lastName" className="form-control" id="lastName" onChange={(e) => setFormData({...formData, lastName: e.target.value})} value={formData.lastName}/>
            </div>
            <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <select className="form-select" name="department" aria-label="Default select example" onChange={(e) => setFormData({...formData, department: e.target.value})} value={formData.department}>
                    <option value="" selected>Please choose one</option>
                    <option value="Data Management">Data Management</option>
                    <option value="Finance, HR & Administration">Finance, HR & Administration</option>
                    <option value="Product Development & Operation">Product Development & Operation</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea name="address" className="form-control" id="address" rows="3" onChange={(e) => setFormData({...formData, address: e.target.value})} value={formData.address}></textarea>
            </div>
            <div className="d-grid gap-2">
                <button type="submit" id="submit-btn">Submit</button>
            </div>
        </form>
    );
}

export default Form;
