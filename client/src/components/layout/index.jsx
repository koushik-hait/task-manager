import { Outlet } from 'react-router-dom';
import Header from './Header'
import { Sidebar } from './Sidebar'

const Layout = () => {
  return (
    <>
      <div className="relative bg-yellow-50 overflow-hidden max-h-screen">
        <header className="fixed right-0 top-0 left-60 bg-yellow-50 py-3 px-4 h-16">
          <Header />
        </header>

        <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60 overflow-auto">
          <Sidebar />
        </aside>

        <main className="ml-60 pt-16 max-h-screen overflow-auto">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <Outlet />
            </div>
            <footer
                style={{
                textAlign: 'center',
                }}
            >
                Task Manager ©2023 Created by Koushik Hait
            </footer>
          </div>
        </main>
      </div>

    </>
  )
}

export default Layout