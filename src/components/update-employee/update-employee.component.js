import { useForm } from "react-hook-form";
import {v4 as uuid} from "uuid";
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
import {
    OverLay,
    Spinner
} from "../common-components/common-components.styles";
import { useState } from "react";
const UpdateEmployee = ({setIsOpenUpdateForm,setIsOpenDetailForm,employee, handleAlert}) => {
    const [updateEmployee] = employeeApi.useUpdateEmployeeMutation();
    const {data} = employeeApi.useGetRolesQuery();
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            role: employee.role.role_name
        }
    });
    const confirmPassword = (pass, userInfor) => {
        if (userInfor.password !== pass) {
            return 'Mật Khẩu Không Trùng Khớp';
        }
        return true;
    }
    const onTurnOffForm = (e) => {
        e.preventDefault();
        setTimeout(()=>{
            setIsOpenUpdateForm(false);
        },500);
        setIsOpen(false);
    }
    const onComeBack = () => {
        setIsOpenUpdateForm(false);
        setIsOpenDetailForm(true);
    }
    const onUpdateEmployee = async (newEmployee) => {
        setIsLoading(true);
        delete newEmployee.rePass;
        const response = await updateEmployee({
            ...newEmployee,
            _id: employee._id,
            status: employee.status
        });
        setIsLoading(false);
        if(response.data) {
            handleAlert(response.data.message);
            setIsOpenUpdateForm(false);
        }
        else {
            handleAlert(response.error.data.message,'error');
        }
    }
    return(
        <>
        {(isLoading) && 
            <OverLay>
                <Spinner/>
                <p style={{color: '#fff'}}>Loading...</p>
            </OverLay>
        }
        
        <Form open={isOpen} onSubmit={handleSubmit(onUpdateEmployee)}>
            <Header>
                Cập Nhật Tài Khoản Nhân Viên {employee.name}
            </Header>
            <ButtonTurnOff onClick={(e) => onTurnOffForm(e)}>X</ButtonTurnOff>
            <Body>
                <DivContent>
                    <ContentSub isError={errors.name}>Tên Người Dùng:</ContentSub>
                    <ContentInput {...register("name", { required: true })} defaultValue={employee.name}/>
                    {(errors.name) ? <Notice>!</Notice> : ``}
                    <ContentSub isError={errors.email}>Email:</ContentSub>
                    <ContentInput {...register("email", { required: true, pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} defaultValue={employee.email} />
                    {(errors.email) ? <Notice>!</Notice> : ``}
                </DivContent>
                <DivContent>
                    <ContentSub isErrror={errors.user_name}>Tên Đăng Nhập:</ContentSub>
                    <ContentInput {...register("user_name", { required: true })} defaultValue={employee.user_name}/>
                    {(errors.user_name) ? <Notice>!</Notice> : ``}
                    <ContentSub>Địa Chỉ:</ContentSub>
                    <ContentInput {...register("address")} defaultValue={employee.address}/>
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.password}>Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("password")}/>
                    {(errors.password) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ngày Sinh:</ContentSub>
                    <ContentInput {...register("birthday")} defaultValue={employee.birthday}/>
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.rePass}>Nhập Lại Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("rePass", { validate: confirmPassword })}/>
                    {(errors.rePass) ? <Notice>!</Notice> : ``}
                    <ContentSub>Điện Thoại:</ContentSub>
                    <ContentInput {...register("phone")} defaultValue={employee.phone}/>
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.role}>Vai Trò:</ContentSub>
                    <select {...register("role", { required: true })}>
                    {data?.data?.map(item => (
                        <option key={item._id} selected={(item.role_name===employee.role.role_name)?true:false} value={item.role_name}>{item.role_name}</option>
                    ))}
                    </select>
                    {(errors.role) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ghi Chú:</ContentSub>
                    <ContentInput {...register("note")} defaultValue={employee.note}/>
                </DivContent>
            </Body>
            <Footer>
                <ComeBack onClick={onComeBack}>Quay Lại</ComeBack>
                <BtnEmp>Cập Nhật</BtnEmp>
            </Footer>
        </Form>
        </>
    );
}
export default UpdateEmployee;