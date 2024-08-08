import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        name : '',
        age : '',
        email : ''
    })

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(name.trim()){
            errorsCopy.name = '';
        }else{
            errorsCopy.name = 'name is required';
            valid = false;
        }
        
        if(age.trim()){
            errorsCopy.age = '';
        }else{
            errorsCopy.age = 'age is required';
            valid = false;
        }
        
        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'email is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;

    }


    const navigator = useNavigate();

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setName(response.data.name)
                setAge(response.data.age)
                setEmail(response.data.email)
            }).catch(error=>{
                console.error(error);
            })
        }
    },[id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee = {name,age,email}

            if(id){
                updateEmployee(id, employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.error(error);
                })
            }

            createEmployee(employee).then((response)=>{
                navigator('/employees')
            }).catch(error=>{
                console.error(error);
            })
        }
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Name : </label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee Name'
                            name="name"
                            value={name}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            onChange={(e) => setName(e.target.value)}
                            >   
                            </input>
                            {errors.name && <div className='invalid-feedback'>
                                {errors.name} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Age : </label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee Age'
                            name="age"
                            value={age}
                            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                            onChange={(e) => setAge(e.target.value)}
                            >   
                            </input>
                            {errors.age && <div className='invalid-feedback'>
                                {errors.age} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email : </label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee Email'
                            name="email"
                            value={email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            onChange={(e) => setEmail(e.target.value)}
                            >   
                            </input>
                            {errors.email && <div className='invalid-feedback'>
                                {errors.email} </div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent