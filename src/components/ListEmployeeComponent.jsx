import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ListEmployeeComponent = () => {

    const [employee, setEmployee] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        getAllEmployees();
    },[])

    function getAllEmployees(){
        const fetchEmployees = async ()=>{
            const response = await axios.get("http://localhost:9090/employees");
            setEmployee(response.data)
        }
        fetchEmployees();
    }

    function addNewEmployee() {
        navigate("/add-employee")
    }

    function updateEmployee(id){
        navigate(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id)

        axios.delete(`http://localhost:9090/delete-employee/${id}`)
        .then(()=>{
            getAllEmployees();
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Employee Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map(employee => 
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.email}</td>
                                <td className='d-flex justify-content-evenly'>
                                    <button className='btn btn-info' 
                                    onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger'
                                    onClick={()=> removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent