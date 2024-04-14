import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginRegistrationApi from "../../redux/api/login-registration-api-slice.js";
import { useState } from "react";
import {
    LoginForm,
    Header,
    Body,
    Input,
    Footer,
    Submit,
    ToRegistration,
    Notice
} from './login.styles.js';
import { type } from "@testing-library/user-event/dist/type/index.js";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const [login] = loginRegistrationApi.useLoginMutation();
    const navigate = useNavigate();
    const onSubmit = async (userInfor) => {
        const response = await login({
            user_name: userInfor.tenDangNhap,
            password: userInfor.matKhau
        });
        if (!response.data) {
            alert(response.error.data.message);
            reset();
        }
        else {
            alert(response.data.message);
            setTimeout(()=>{
                navigate('/home');
            },500);
        }
    }
    return (
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <Header>Đăng Nhập</Header>
            <Body>
                <Input>
                    <p>Tên Đăng Nhập:</p>
                    <input {...register("tenDangNhap", { required: 'Tên Đăng Nhập Không Được Phép Bỏ Trống !' })} />
                </Input>
                {(errors.tenDangNhap) ? <Notice>{errors.tenDangNhap.message}</Notice> : ''}
                <Input>
                    <p>Mật Khẩu:</p>
                    <input type="password" {...register("matKhau", { required: 'Mật Khẩu Không Được Phép Bỏ Trống !' })} />
                </Input>
                {(!errors.tenDangNhap && errors.matKhau) ? <Notice>{errors.matKhau.message}</Notice> : ''}
            </Body>
            <Footer>
                <Submit>Đăng Nhập</Submit>
                <ToRegistration onClick={() => navigate('/registration')}>Đăng Ký</ToRegistration>
            </Footer>
        </LoginForm>
    );
}
export default Login;