import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { addTask } from '../../helper/auth/apiCalls';

const AddTask = () => {

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
        title: '',
        description: '',
        status: 'incomplete',
    },
    // validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {

        let taskPromise = addTask(values)
        toast.promise(taskPromise, {
            loading: 'Creating...',
            success: <b>Task saved Successfully...!</b>,
            error: <b>Could not Save the Task.</b>
        });

        taskPromise.then(function () { navigate('/task/list') });
    }
})


  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form encType='multipart/form-data' onSubmit={formik.handleSubmit}>

                                
                                <div className="mb-4">
                                    <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br />
                                    <input type="text" {...formik.getFieldProps('title')} className="border-2 border-gray-300 p-2 w-full" name="title" id="title" required placeholder="Write your Article Title here..." />
                                </div>
                                

                                <div className="mb-4">
                                    <label className="text-xl text-gray-600">Description</label><br />
                                    <input type="text" {...formik.getFieldProps('description')} className="border-2 border-gray-300 p-2 w-full" name="description" id="description" placeholder="(Optional)" />
                                </div>
                                <div className="flex p-1 w-full">
                                    <select 
                                    {...formik.getFieldProps('status')} 
                                    onChange={formik.handleChange}
                                    className="border-2 border-gray-300 border-r p-2" name="status">
                                        <option value='complete'>Complete</option>
                                        <option value='incomplete' selected>Incomplete</option>
                                    </select>
                                    <button role="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400" required>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

    </>
    
  )
}

export default AddTask