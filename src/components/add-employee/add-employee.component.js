import { useState } from "react";
import { useForm } from "react-hook-form";
import employeeApi from "../../redux/api/employee-api.slice";
import {
    Form,
    Header,
    ButtonTurnOff,
    Body,
    DivContent,
    ContentSub,
    ContentInput,
    Footer,
    ComeBack,
    BtnEmp,
    Notice
} from "./add-employee.styles";
const AddEmployee = ({ setIsOpenAddForm }) => {
    const [addNewEmployee] = employeeApi.useAddEmployeeMutation();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const confirmPassword = (pass, userInfor) => {
        if (userInfor.matKhau !== pass) {
            return 'Mật Khẩu Không Trùng Khớp';
        }
        return true;
    }
    const onAddEmployee = async(newEmployee) => {
        const response = await addNewEmployee({
            ...newEmployee,
            trangThai: true
        });
        if(response.error) {
            alert('Tên Đăng Nhập Đã Tồn Tại');
        }
        else {
            alert('Thêm Nhân Viên Thành Công');
            setIsOpenAddForm(false);
        }
    }
    const onTurnOffForm = () => {
        setIsOpenAddForm(false);
    }
    return (
        <Form onSubmit={handleSubmit(onAddEmployee)}>
            <Header>
                Thêm Tài Khoản Nhân Viên
            </Header>
            <ButtonTurnOff onClick={onTurnOffForm}>X</ButtonTurnOff>
            <Body>
                <DivContent>
                    <ContentSub isError={errors.tenNguoiDung}>Tên Người Dùng:</ContentSub>
                    <ContentInput {...register("tenNguoiDung", { required: true })} />
                    {(errors.tenNguoiDung) ? <Notice>!</Notice> : ``}
                    <ContentSub isError={errors.email}>Email:</ContentSub>
                    <ContentInput {...register("email", { required: true, pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} />
                    {(errors.email) ? <Notice>!</Notice> : ``}
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.tenDangNhap}>Tên Đăng Nhập:</ContentSub>
                    <ContentInput {...register("tenDangNhap", { required: true })} />
                    {(errors.tenDangNhap) ? <Notice>!</Notice> : ``}
                    <ContentSub>Địa Chỉ:</ContentSub>
                    <ContentInput {...register("diaChi")} />
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.matKhau}>Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("matKhau", { required: true })} />
                    {(errors.matKhau) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ngày Sinh:</ContentSub>
                    <ContentInput {...register("ngaySinh")} />
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.reMatKhau}>Nhập Lại Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("reMatKhau", { required: true, validate: confirmPassword })} />
                    {(errors.reMatKhau) ? <Notice>!</Notice> : ``}
                    <ContentSub>Điện Thoại:</ContentSub>
                    <ContentInput {...register("dienThoai")} />
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.vaiTro}>Vai Trò:</ContentSub>
                    <ContentInput {...register("vaiTro", { required: true })} />
                    {(errors.vaiTro) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ghi Chú:</ContentSub>
                    <ContentInput {...register("ghiChu")} />
                </DivContent>
            </Body>
            <Footer>
                <ComeBack onClick={onTurnOffForm}>Quay Lại</ComeBack>
                <BtnEmp>Thêm</BtnEmp>
            </Footer>
        </Form>
    );
}
export default AddEmployee;