import React, { useEffect, useState } from 'react';

const initialState = {
    name: '',
    dob: null,
    gender: '',
    phoneNumber: ''
}

const Userform = () => {

    const [formState, setFormState] = useState(initialState);
    const [table, setTable] = useState([]);

    useEffect(() => {
        let table = localStorage.getItem('table') ? JSON.parse(localStorage.getItem('table')) : [];
        setTable({
            ...table
        })
    }, []);

    const handleChange = (value, key) => {
        setFormState({
            ...formState,
            [key]: value
        })
    }

    const handleSubmit = () => {
        let tableEntry = localStorage.getItem('table') ? JSON.parse(localStorage.getItem('table')) : [];
        tableEntry.push(formState);
        setTable(tableEntry);
        localStorage.setItem('table', JSON.stringify(tableEntry));
        setFormState(initialState);
    }

    const handleDelete = (index) => {
        let tableEntry = localStorage.getItem('table') ? JSON.parse(localStorage.getItem('table')) : [];
        let newEntry = [];
        if (tableEntry.length) {
            newEntry = tableEntry.filter(elem => elem.name !== index);
            setTable(newEntry);
            localStorage.setItem('table', JSON.stringify(newEntry));
        }
    }

    const updateValue = (formState) => {
        setFormState({
            ...formState
        })
    }

    console.log('DEBUG', formState);

    return (
        <div>
            <input placeholder="enter name" value={formState.name} onChange={(event) => handleChange(event.target.value, 'name')}/>
            <input type="date" value={formState.dob} onChange={(event) => handleChange(event.target.value, 'dob')}/>
            <input placeholder="enter gender" value={formState.gender} onChange={(event) => handleChange(event.target.value, 'gender')}/>
            <input placeholder="enter phone" value={formState.phoneNumber} onChange={(event) => handleChange(event.target.value, 'phoneNumber')}/>
            <button onClick={handleSubmit}>Save</button>
            {table.length && table.map((value, index) => {
                return (
                    <div>
                        <label>{value.name}</label>&nbsp;&nbsp;
                        <label>{value.dob}</label>&nbsp;&nbsp;
                        <label>{value.gender}</label>&nbsp;&nbsp;
                        <label>{value.phoneNumber}</label>&nbsp;&nbsp;
                        {/* <button onClick={() => updateValue(value)}>Update</button> */}
                        <button onClick={() => handleDelete(value.name)}>Delete</button>
                    </div>
                );
            }) 
            
            } 
            
        </div>
    );
}

export default Userform;
