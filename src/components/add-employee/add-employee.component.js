import {v4 as uuid} from "uuid";
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
import {OverLay, Spinner} from "../common-components/common-components.styles";
import { useState } from "react";
const AddEmployee = ({ setIsOpenAddForm, handleAlert }) => {
    const [addNewEmployee] = employeeApi.useAddEmployeeMutation();
    const {data} = employeeApi.useGetRolesQuery();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            role: "Owner"
        } 
    });
    const confirmPassword = (pass, userInfor) => {
        if (userInfor.password !== pass) {
            return 'Mật Khẩu Không Trùng Khớp';
        }
        return true;
    }
    const onAddEmployee = async(newEmployee) => {
        setIsLoading(true);
        const response = await addNewEmployee({
            ...newEmployee,
            role: newEmployee.role,
            status: true
        });
        setIsLoading(false);
        if(response.error) {
            handleAlert(response.error.data.message,'error');
        }
        else {
            handleAlert(response.data.message);
            setIsOpenAddForm(false);
        }
    }
    const onTurnOffForm = (e) => {
        e.preventDefault();
        setTimeout(()=>{
            setIsOpenAddForm(false);
        },500);
        setIsOpen(false);
    }
    return (
        <>
        {(isLoading) && 
            <OverLay>
                <Spinner/>
                <p style={{color: '#fff'}}>Loading...</p>
            </OverLay>
        }
        <Form open={isOpen} onSubmit={handleSubmit(onAddEmployee)}>
            <Header>
                Thêm Tài Khoản Nhân Viên
            </Header>
            <ButtonTurnOff onClick={(e)=>onTurnOffForm(e)}>X</ButtonTurnOff>
            <Body>
                <DivContent>
                    <ContentSub isError={errors.name}>Tên Người Dùng:</ContentSub>
                    <ContentInput {...register("name", { required: true })} />
                    {(errors.name) ? <Notice>!</Notice> : ``}
                    <ContentSub isError={errors.email}>Email:</ContentSub>
                    <ContentInput {...register("email", { required: true, pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} />
                    {(errors.email) ? <Notice>!</Notice> : ``}
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.user_name}>Tên Đăng Nhập:</ContentSub>
                    <ContentInput {...register("user_name", { required: true })} />
                    {(errors.user_name) ? <Notice>!</Notice> : ``}
                    <ContentSub>Địa Chỉ:</ContentSub>
                    <ContentInput {...register("address")} />
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.pasword}>Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("password", { required: true })} />
                    {(errors.password) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ngày Sinh:</ContentSub>
                    <ContentInput {...register("birthday")} />
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.rePass}>Nhập Lại Mật Khẩu:</ContentSub>
                    <ContentInput type="password" {...register("rePass", { required: true, validate: confirmPassword })} />
                    {(errors.rePass) ? <Notice>!</Notice> : ``}
                    <ContentSub>Điện Thoại:</ContentSub>
                    <ContentInput {...register("phone")} />
                </DivContent>
                <DivContent>
                    <ContentSub isError={errors.role}>Vai Trò:</ContentSub>
                    <select {...register("role", { required: true })}>
                        {data?.data?.map(item => (
                            <option key={item._id} value={item.role_name}>{item.role_name}</option>
                        ))}
                    </select>
                    {(errors.role) ? <Notice>!</Notice> : ``}
                    <ContentSub>Ghi Chú:</ContentSub>
                    <ContentInput {...register("note")} />
                </DivContent>
            </Body>
            <Footer>
                <ComeBack onClick={onTurnOffForm}>Quay Lại</ComeBack>
                <BtnEmp>Thêm</BtnEmp>
            </Footer>
        </Form>
        </>
    );
}
export default AddEmployee;