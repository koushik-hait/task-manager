
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import {registerValidation } from '../../helper/core/validator'
import {registerUser} from '../../helper/auth/apiCalls'

export default function Register() {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues : {
      name: '',
      email: '',
      username: '',
      password : ''
    },
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      // let formdata = new FormData()
      // formdata.append('name',values.username)
      // formdata.append('username',values.username)
      // formdata.append('email',values.email)
      // formdata.append('password',values.password)

      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });

      registerPromise.then(function(){ navigate('/login')});
    }
  })

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className='glass' style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Happy to join you!
            </span>
          </div>

          <form className='py-1' encType='multipart/form-data' onSubmit={formik.handleSubmit}>
              

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('email')} className='textbox' type="text" placeholder='Email*' />
                  <input {...formik.getFieldProps('name')} className='textbox' type="text" placeholder='Username*' />
                  <input {...formik.getFieldProps('password')} className='textbox' type="text" placeholder='Password*' />
                  <button className='btn' type='submit'>Register</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/login">Login Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
