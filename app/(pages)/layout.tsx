import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import '../globals.css'
import Sidebar from '@/components/Sidebar'
import { Toaster } from 'react-hot-toast'
import Providers from '@/store/provider'

const PageLayout = ({ children }: { children: ReactNode }) => {
  // use fetch post request isLoggedIn to check if user is logged in or not so that server side rendering can be done
  // don't use useRouter() hook here as it will not work on server side rendering

  return (
    <div>
      <Providers>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <div className="flex bg-white">
          <Sidebar />
          <main className="flex-[6] bg-primary">{children}</main>
        </div>
      </Providers>
    </div>
  )
}

export default PageLayout

// import { ReactNode } from 'react'
// import Navbar from '@/components/Navbar'
// import '../globals.css'
// import Sidebar from '@/components/Sidebar'
// import { setupStore } from '../../store/store'
// import { Provider } from 'react-redux'
// import { Toaster } from 'react-hot-toast'
// import { NextApiRequest, NextApiResponse } from 'next'
// const store = setupStore()

// const PageLayout = ({ children }: { children: ReactNode }) => {
//   return (
//     <html lang="en">
//       <head>
//         <title>Nazara Admin</title>
//       </head>
//       <body>
//         <Provider store={store}>
//           <Toaster position="top-center" reverseOrder={false} />
//           <Navbar />
//           <div className="flex bg-white">
//             <Sidebar />
//             <main className="flex-[6] bg-primary">{children}</main>
//           </div>
//         </Provider>
//       </body>
//     </html>
//   )
// }

// export async function getServerSideProps(context: {
//   req: NextApiRequest
//   res: NextApiResponse
// }) {
//   const { token } = context.req.cookies

//   const response = await fetch(
//     `${process.env.API_URL}/api/v1/user/isLoggedIn`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token,
//       }),
//     },
//   )

//   const data = await response.json()

//   if (data.status !== 'success') {
//     return {
//       redirect: {
//         destination: '/nazaara-admin',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }

// export default PageLayout
