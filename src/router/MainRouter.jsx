import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";

const mainRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/signIn',
        element: <SignInPage/>
    },
    {
        path: '/signUp',
        element: <SignUpPage/>
    }
])

export default mainRouter;