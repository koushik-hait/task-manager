import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { loginValidation } from '../../helper/core/validator'
import { signinUser } from '../../helper/auth/apiCalls'
import {authenticate, isAuthenticated} from '../../helper/auth/index'


const Login = () => {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // let formdata = new FormData()
      // formdata.append('email', values.email)
      // formdata.append('password', values.password)

      let signinPromise = signinUser(values)
      toast.promise(signinPromise, {
        loading: 'Creating...',
        success: <b>LogedIn Successfully...!</b>,
        error: <b>Could not Login to your acount!.</b>
      });

      signinPromise.then((res) => {
        authenticate(res.data)
        let user = res.data.user;
        return user;
      }).then(function (user) { 
        if(isAuthenticated()){
          console.log(user);
          navigate('/') ;
        }
      })
    }
  })


  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl md:w-[50%]  m-2">
        <div className=" w-full md:w-3/4">
          <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">

            <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">Login to your account</h1>

          </div>
          <form action="" method="post" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
              <div className="">
                <div className="m-1 text-lg text-gray-500 text-semibold">Username</div>
                <input type="text" {...formik.getFieldProps('email')}
                  className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent" />
              </div>
              <div className="">
                <div className="m-1 text-lg text-gray-500 text-semibold">Password</div>
                <input type="password" {...formik.getFieldProps('password')}
                  className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent" />
              </div>
            </div>
            <div className="text-center mt-7">
              <button type='submit'
                className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-stone-600 hover:bg-stone-500  font-medium m-2 mb-6 ">Sign
                In</button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className='text-gray-500'>New here? <Link className='text-red-500' to="/register">Register Now</Link></span>
          </div>

        </div>
        

      </div>
    </div>
  )
}

export default Login