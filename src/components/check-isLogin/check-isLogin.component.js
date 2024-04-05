import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const CheckIsLogin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/home');
        }
        else {
            navigate('/login');
        }
    },[]);
    return null;
}
export default CheckIsLogin;