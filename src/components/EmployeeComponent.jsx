import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams} from 'react-router-dom'

const EmployeeComponent = () => {

  const navigate = useNavigate();

  const {id} = useParams();

  const [name, setName] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [email, setEmail] = useState('')

  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  })

//------FUNCTION TO ADD THE EMPLOYEE ---------------------------
  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();
    const employee = {name, phoneNumber, email}
    if (validateForm()) {
      if(id){
        axios.put(`http://localhost:9090/edit-employee/${id}`, employee)
        .then((response)=>{
          console.log(response)
          navigate("/")
        })
        .catch(error =>{
          console.error(error)
        })
      }else{
        try {
        await axios.post("http://localhost:9090/add-employee", { name, phoneNumber, email });
        setName("");
        setphoneNumber("");
        setEmail("");
        navigate("/")
      } catch (error) {
        console.log("error while adding employee", error);
      }
      }
      
    }

  }

//--------------FUNCTON TO GET A SPECIFIC EMPLOYEE ---------------

useEffect(()=>{
  axios.get(`http://localhost:9090/employees/${id}`)
  .then(resposnse =>{
    setName(resposnse.data.name)
    setphoneNumber(resposnse.data.phoneNumber)
    setEmail(resposnse.data.email)
  })
  .catch(error =>{
    console.error(error)
  })
},[id])


// --------------FORM VALIDATION FUNCTION ----------------//
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors }

    if (name.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'name is required';
      valid = false;
    }

    if (phoneNumber.trim()) {
      errorsCopy.phoneNumber = '';
    } else {
      errorsCopy.phoneNumber = 'phoneNumber is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'email is required';
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;

  }

//---------FUNCTION TO DYNAMICALLY CHANGE FORM TITLE ---------------
  function titleHandler(){
    if(id){
      return <h1 className='text-center'>Update Employee Details</h1>
    }else{
      return <h1 className='text-center'>Add Employee Details</h1>
    }
  }

  return (
    <div className='container'>
      <br /> <br /> <br /> <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {
            titleHandler()
          }
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className='form-label'>Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Name'
                  name='Name'
                  value={name}
                  className={`form-control ${errors.name ? "is-invalid": ""}`}
                  onChange={(e) => setName(e.target.value)}
                >
                </input>
                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
              </div>

              <div className="form-group mb-2">
                <label className='form-label'>Phone Number:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Phone Number'
                  name='phoneNumber'
                  value={phoneNumber}
                  className={`form-control ${errors.phoneNumber ? "is-invalid": ""}`}
                  onChange={(e) => setphoneNumber(e.target.value)}
                >
                </input>
                {errors.phoneNumber && <div className='invalid-feedback'>{errors.phoneNumber}</div>}
              </div>

              <div className="form-group mb-2">
                <label className='form-label'>Email:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid": ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                >
                </input>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
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