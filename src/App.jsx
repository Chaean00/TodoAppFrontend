import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./contexts/authContext"
import mainRouter from "./router/MainRouter"


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={mainRouter}/>
    </AuthProvider>
  )
}

export default App
