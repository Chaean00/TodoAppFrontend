
import Home from "../components/Home";
import Todo from "../components/Todo";
import { useAuth } from "../contexts/authContext";

export default function HomePage() {
    const { isSignedIn } = useAuth();

    return (
        isSignedIn ? <Todo/> : <Home/>
    )
}