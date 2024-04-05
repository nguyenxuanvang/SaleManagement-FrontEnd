import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginRegistrationApi from "../../redux/api/login-registration-api-slice.js";
import {
    RegistrationForm,
    Header,
    Body,
    Input,
    PhoneEmail,
    Phone,
    Email,
    Footer,
    Submit,
    ComeBack,
    Notice
} from './registration.styles.js';
const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [registration] = loginRegistrationApi.useRegistrationMutation();
    const navigate = useNavigate();
    let isNotice = false;
    const confirmPassword = (pass, userInfor) => {
        if(userInfor.matKhau !== pass) {
            return 'Mật Khẩu Không Trùng Khớp';
        }
        return true;
    }
    const onSubmit = async (userInfor) => {
        const response = await registration({
            hoTen: userInfor.hoTen,
            dienThoai: userInfor.dienThoai,
            email: userInfor.email,
            diaChi: userInfor.diaChi,
            tenCuaHang: userInfor.tenCuaHang,
            tenDangNhap: userInfor.tenDangNhap,
            matKhau: userInfor.matKhau
        })
        if (response.error.originalStatus === 200) {
            alert('Đăng Ký Thành Công');
            navigate('/login');
        }
        else {
            alert('Tên Đăng Nhập Đã Tồn Tại');
        }
    }
    return (
        <RegistrationForm onSubmit={handleSubmit(onSubmit)}>
            <Header>Đăng Ký</Header>
            <Body>
                <Input>
                    <p>Họ và Tên:</p>
                    <input {...register("hoTen", { required: 'Họ Tên Không Được Phép Bỏ Trống !' })} />
                </Input>
                {(errors.hoTen) ? <Notice>{errors.hoTen.message}</Notice> : ''}
                {(errors.hoTen) ? isNotice = true : isNotice = false}
                <PhoneEmail>
                    <p>Điện Thoại:</p>
                    <Phone {...register("dienThoai", { required: 'Điện Thoại Không Được Phép Bỏ Trống !' })} />
                    <p>Email:</p>
                    <Email {...register("email", { required: 'Email Không Được Phép Bỏ Trống !', pattern: {value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: 'Email Không Hợp Lệ !'} })} />
                </PhoneEmail>
                {(isNotice) ? '' : (errors.dienThoai) ? <Notice>{errors.dienThoai.message}</Notice> : (errors.email) ? <Notice>{errors.email.message}</Notice> : ''}
                {(isNotice) ? '' : (errors.dienThoai || errors.email) ? isNotice = true : isNotice = false}
                <Input>
                    <p>Địa Chỉ:</p>
                    <input {...register("diaChi", { required: 'Địa Chỉ Không Được Phép Bỏ Trống !' })} />
                </Input>
                {(isNotice) ? '' : (errors.diaChi) ? <Notice>{errors.diaChi.message}</Notice> : ''}
                {(isNotice) ? '' : (errors.diaChi) ? isNotice = true : isNotice = false}
                <Input>
                    <p>Tên Cửa Hàng:</p>
                    <input {...register("tenCuaHang", { required: 'Tên Cửa Hàng Không Được Phép Bỏ Trống !' })} />
                </Input>
                {(isNotice) ? '' : (errors.tenCuaHang) ? <Notice>{errors.tenCuaHang.message}</Notice> : ''}
                {(isNotice) ? '' : (errors.tenCuaHang) ? isNotice = true : isNotice = false}
                <Input>
                    <p>Tên Đăng Nhập:</p>
                    <input {...register("tenDangNhap", { required: 'Tên Đăng Nhập Không Được Phép Bỏ Trống !' })} />
                </Input>
                {(isNotice) ? '' : (errors.tenDangNhap) ? <Notice>{errors.tenDangNhap.message}</Notice> : ''}
                {(isNotice) ? '' : (errors.tenDangNhap) ? isNotice = true : isNotice = false}
                <Input>
                    <p>Mật Khẩu:</p>
                    <input type="password" {...register("matKhau", { required: 'Mật Khẩu Không Được Phép Bỏ Trống !' })} />
                </Input>
                {(isNotice) ? '' : (errors.matKhau) ? <Notice>{errors.matKhau.message}</Notice> : ''}
                {(isNotice) ? '' : (errors.matKhau) ? isNotice = true : isNotice = false}
                <Input>
                    <p>Nhập Lại Mật Khẩu:</p>
                    <input type="password" {...register("reMatKhau", { required: 'Nhập Lại Mật Khẩu Không Được Phép Bỏ Trống !', validate: confirmPassword })} />
                </Input>
                {(isNotice) ? '' : (errors.reMatKhau) ? <Notice>{errors.reMatKhau.message}</Notice> : ''}
            </Body>
            <Footer>
                <ComeBack onClick={() => navigate('/login')}>Quay Lại</ComeBack>
                <Submit>Đăng Ký</Submit>
            </Footer>
        </RegistrationForm>

    );
}
export default Registration;