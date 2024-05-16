import employeeApi from "../../redux/api/employee-api.slice";
import { 
    Form,
    Header,
    ButtonTurnOff,
    Body,
    DivContent,
    ContentSub,
    ContentInfor,
    Footer,
    BtnEmp
} from "./detail-employee.styles";
import {OverLay, Spinner} from "../common-components/common-components.styles";
import { useState } from "react";
const DetailEmployee = ({page, setIsOpenDetailForm,setIsOpenUpdateForm,employee,handleAlert}) => {
    const [updateEmployee] = employeeApi.useUpdateEmployeeMutation();
    const [deleteEmployee] = employeeApi.useDeleteEmployeeMutation();
    const [getEmployees] = employeeApi.useLazyGetEmployeesQuery();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const onTurnOffForm = () => {
        setTimeout(()=>{
            setIsOpenDetailForm(false);
        },500);
        setIsOpen(false);
    }
    const OpenUpdateForm = () => {
        setIsOpenDetailForm(false);
        setIsOpenUpdateForm(true);
    }
    const onChangeStatus = async () => {
        setIsLoading(true);
        const response = await updateEmployee({
            ...employee,
            role: employee.role.role_name,
            status: (employee.status==='true')?'false':'true',
        })
        setIsLoading(false);
        if(response.data) {
            handleAlert(response.data.message);
            setIsOpenDetailForm(false);
        }
        else {
            handleAlert(`${(employee.status) ? `Không Thể Ngưng Hoạt Động Tài Khoản Này` : `Không Thể Kích Hoạt Lại Tài Khoản Này`}`,'error');
        }
    }
    const onDeleteEmployee = async () => {
        const response = await deleteEmployee(employee._id);
        if(response.data) {
            getEmployees({page});
            alert('Xóa Thành Công');
            setIsOpenDetailForm(false);
        }
        else {
            alert('Xóa Thất Bại');
        }
    }
    return (
        <>
        {(isLoading) && 
            <OverLay>
                <Spinner/>
                <p style={{color: '#fff'}}>Loading...</p>
            </OverLay>
        }
        <Form open={isOpen}>
            <Header>Thông Tin Chi Tiết Của Nhân Viên {employee.name}</Header>
            <ButtonTurnOff onClick={onTurnOffForm}>X</ButtonTurnOff>
            <Body>
                <DivContent>
                    <ContentSub>Tên Đăng Nhập:</ContentSub>
                    <ContentInfor>{employee.user_name}</ContentInfor>
                    <ContentSub>Ngày Sinh:</ContentSub>
                    <ContentInfor>{(employee.birthday) ? employee.birthday : `Chưa Cập Nhật`}</ContentInfor>
                </DivContent>
                <DivContent>
                    <ContentSub>Tên Người Dùng:</ContentSub>
                    <ContentInfor>{employee.name}</ContentInfor>
                    <ContentSub>Email:</ContentSub>
                    <ContentInfor>{employee.email}</ContentInfor>
                </DivContent>
                <DivContent>
                    <ContentSub>Điện Thoại:</ContentSub>
                    <ContentInfor>{(employee.phone) ? employee.phone : `Chưa Cập Nhật`}</ContentInfor>
                    <ContentSub>Địa Chỉ:</ContentSub>
                    <ContentInfor>{(employee.address) ? employee.address : `Chưa Cập Nhật`}</ContentInfor>
                </DivContent>
                <DivContent>
                    <ContentSub>Vai Trò:</ContentSub>
                    <ContentInfor>{employee.role?.role_name}</ContentInfor>
                    <ContentSub>Trạng Thái:</ContentSub>
                    <ContentInfor status={employee.status}>{(employee.status==='true') ? `Đang Hoạt Động` : `Ngưng Hoạt Động`}</ContentInfor>
                </DivContent>
            </Body>
            <Footer>
                <BtnEmp onClick={OpenUpdateForm}>Cập Nhật</BtnEmp>
                <BtnEmp onClick={onChangeStatus}>{(employee.status==='true') ? `Ngưng Hoạt Động` : `Kích Hoạt Trở Lại`}</BtnEmp>
                <BtnEmp onClick={onDeleteEmployee}>Xóa Nhân Viên</BtnEmp>
            </Footer>
        </Form>
        </>
    );
}
export default DetailEmployee;