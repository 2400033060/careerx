import Navbar from './Navbar'
import ToastStack from './ToastStack'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#efeae2] bg-[radial-gradient(circle_at_top_right,rgba(55,171,116,0.12)_0%,rgba(239,234,226,1)_40%)]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-52 bg-[linear-gradient(to_bottom,rgba(7,94,84,0.14),transparent)]" />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      <ToastStack />
    </div>
  )
}

export default Layout
