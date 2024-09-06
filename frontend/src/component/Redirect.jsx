import { useNavigate } from "react-router-dom";

export const Redirect = () => {
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate();
    if(!user) {
        navigate('/')
    }
}