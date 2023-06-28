import { Link } from "react-router-dom"

export const Sidebar = () => {
  return (
    <>
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="flex flex-col justify-center items-center w-full py-10">
          
          {/* <div className="px-5 w-84">
            <a className="flex order-first lg:order-none title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">Task Manager</span>
            </a>
          </div> */}
          
          <nav className="bg-gray-900 px-4 py-2 rounded mt-4 w-84">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center justify-center">
                <i className="bx bx-x text-white text-2xl"></i>
              </div>
              <div className="flex items-center justify-center">
                <i className="bx bxs-envelope text-white text-2xl"></i>
                <i className="bx bx-trending-up text-white text-2xl ml-6"></i>
              </div>
            </div>
            <div className="mt-4">
              <ul>
                <li>
                  <a href="#" title="" className="block text-white text-lg font-semibold py-2 hover:text-gray-500">
                    Tasks
                  </a>
                  <ul className="pl-4 border-l border-gray-700 ml-1">
                    <li><Link to='/task/add' className="block text-white py-2 hover:text-gray-500">Add Task</Link></li>
                    <li><Link to='/task/list' title="" className="block text-white py-2 hover:text-gray-500">List Task</Link></li>
                  </ul>
                </li>
                
              </ul>
              
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
