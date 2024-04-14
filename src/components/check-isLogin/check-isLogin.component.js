import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const CheckIsLogin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/home');
    },[]);
    return null;
}
export default CheckIsLogin;