import { useEffect,  useState } from 'react'
import { listTask, delTask } from '../../helper/auth/apiCalls';
import EditTask from './EditTask';

const ListTask = () => {
  const  [taskList, setTaskList] = useState([]);
  const  [editMode, setEditMode] = useState(false);
  const  [task, setTask] = useState({_id:"",title:"",description:"",status:""});


  useEffect(() => {
    listTask().then((res) =>{
      console.log(res);
      setTaskList(res.data.tasks);
    })
  },[]);

  const deleteTask = (id) => {
    delTask(id).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="text-gray-900 bg-gray-200">
    <div className="p-4 flex">
        <h1 className="text-3xl">
            Task list
        </h1>
    </div>
    <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Title</th>
                    <th className="text-left p-3 px-5">Description</th>
                    <th className="text-left p-3 px-5">Status</th>
                    <th>Action</th>
                </tr>
                <tr className={editMode ? "block " : "hidden "}>
                  <EditTask 
                  taskid={task._id} 
                  title={task.title} 
                  description={task.description}
                  status={task.status}
                  />
                </tr>
                {taskList.map(function(task, index) {
                  return (<>
                    <tr className="border-b hover:bg-orange-100 bg-gray-100" key={index}>
                    <td className="p-3 px-5"><input type="text" value={task.title} className="bg-transparent" key={index} /></td>
                    <td className="p-3 px-5"><input type="text" value={task.description} className="bg-transparent" key={index} /></td>
                    <td className="p-3 px-5">
                        <select value={task.status} key={index} className="bg-transparent">
                            <option value="complete">Complete</option>
                            <option value="incomplete">Incomplete</option>
                        </select>
                    </td>
                    <td className="p-3 px-5 flex justify-end" key={index} >
                      <button type="button" 
                      onClick={(e) => {
                        e.preventDefault()
                        setEditMode(true)
                        setTask(task)
                      }}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                      <button type="button" 
                      onClick={() => {
                        deleteTask(task._id)
                      }}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
                  </>)
                })}
                
                
            </tbody>
        </table>
    </div>
</div>
  )
}

export default ListTask