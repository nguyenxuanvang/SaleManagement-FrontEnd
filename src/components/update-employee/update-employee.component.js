import { useForm } from "react-hook-form";
import { useState } from "react";
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
} from "../add-employee/add-employee.styles";
const UpdateEmployee = ({setIsOpenUpdateForm,setIsOpenDetailForm,employee}) => {
    const [updateEmployee] = employeeApi.useUpdateEmployeeMutation();
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
    const onTurnOffForm = () => {
        setIsOpenUpdateForm(false);
    }
    const onComeBack = () => {
        setIsOpenUpdateForm(false);
        setIsOpenDetailForm(true);
    }
    const onUpdateEmployee = async (newEmployee) => {
        delete newEmployee.reMatKhau;
        const response = await updateEmployee({
            ...newEmployee,
            id: employee.id,
            trangThai: employee.trangThai
        })
        if(response.data) {
            alert('Cập Nhật Thành Công');
            setIsOpenUpdateForm(false);
        }
        else {
            alert('Trùng Tên Đăng Nhập');
        }
    }
    return(
        <Form onSubmit={handleSubmit(onUpdateEmployee)}>
            <Header>
                Cập Nhật Tài Khoản Nhân Viên {employee.tenNguoiDung}
            </Header>
            <ButtonTurnOff onClick={onTurnOffForm}>X</ButtonTurnOff>
            <Body>
                <DivContent>
                    <ContentSub isError={errors.tenNguoiDung}>Tên Người Dùng:</ContentSub>
                    <ContentInput {...register("tenNguoiDung", { required: true })} defaultValue={employee.tenNguoiDung}/>
                    {(errors.tenNguoiDung) ? <Notice>!</Notice> : ``}
                    <ContentSub isError={errors.email}>Email:</ContentSub>
                    <ContentInput {...register("email", { required: true, pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} defaultValue={employee.email} />
                    {(errors.email) ? <Notice>!</Notice> : ``}
                </DivContent>
                <DivContent>
                    <ContentSub isErrror={errors.tenDangNhap}>Tên Đăng Nhập:</ContentSub>
                    <ContentInput {...register("tenDangNhap", { required: true })} defaultValue={employee.tenDangNhap}/>
                    {(errors.tenDangNhap) ? <Notice>!</Notice> : ``}
                    <ContentSub>Địa Chỉ:</ContentSub>
                    <ContentInput {...register("diaChi")} defaultValue={employee.diaChi}/>
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.matKhau}>Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("matKhau", { required: true })} defaultValue={employee.matKhau}/>
                    {(errors.matKhau) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ngày Sinh:</ContentSub>
                    <ContentInput {...register("ngaySinh")} defaultValue={employee.ngaySinh}/>
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.reMatKhau}>Nhập Lại Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("reMatKhau", { required: true, validate: confirmPassword })} defaultValue={employee.matKhau}/>
                    {(errors.reMatKhau) ? <Notice>!</Notice> : ``}
                    <ContentSub>Điện Thoại:</ContentSub>
                    <ContentInput {...register("dienThoai")} defaultValue={employee.dienThoai}/>
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.vaiTro}>Vai Trò:</ContentSub>
                    <ContentInput {...register("vaiTro", { required: true })} defaultValue={employee.vaiTro}/>
                    {(errors.vaiTro) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ghi Chú:</ContentSub>
                    <ContentInput {...register("ghiChu")} defaultValue={employee.ghiChu}/>
                </DivContent>
            </Body>
            <Footer>
                <ComeBack onClick={onComeBack}>Quay Lại</ComeBack>
                <BtnEmp>Cập Nhật</BtnEmp>
            </Footer>
        </Form>
    );
}
export default UpdateEmployee;