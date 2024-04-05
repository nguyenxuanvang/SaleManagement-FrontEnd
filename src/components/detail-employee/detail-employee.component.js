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
const DetailEmployee = ({page, setIsOpenDetailForm,setIsOpenUpdateForm,employee}) => {
    const [updateEmployee] = employeeApi.useUpdateEmployeeMutation();
    const [deleteEmployee] = employeeApi.useDeleteEmployeeMutation();
    const [getEmployees] = employeeApi.useLazyGetEmployeesQuery();
    const onTurnOffForm = () => {
        setIsOpenDetailForm(false);
    }
    const OpenUpdateForm = () => {
        setIsOpenDetailForm(false);
        setIsOpenUpdateForm(true);
    }
    const onChangeStatus = async () => {
        const response = await updateEmployee({
            ...employee,
            trangThai: !employee.trangThai,
            id: employee.id
        })
        if(response.data) {
            setIsOpenDetailForm(false);
        }
        else {
            alert(`${(employee.trangThai) ? `Không Thể Ngưng Hoạt Động Tài Khoản Này` : `Không Thể Kích Hoạt Lại Tài Khoản Này`}`);
        }
    }
    const onDeleteEmployee = async () => {
        const response = await deleteEmployee(employee.id);
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
        <Form>
            <Header>Thông Tin Chi Tiết Của Nhân Viên {employee.tenNguoiDung}</Header>
            <ButtonTurnOff onClick={onTurnOffForm}>X</ButtonTurnOff>
            <Body>
                <DivContent>
                    <ContentSub>Tên Đăng Nhập:</ContentSub>
                    <ContentInfor>{employee.tenDangNhap}</ContentInfor>
                    <ContentSub>Ngày Sinh:</ContentSub>
                    <ContentInfor>{(employee.ngaySinh) ? employee.ngaySinh : `Chưa Cập Nhật`}</ContentInfor>
                </DivContent>
                <DivContent>
                    <ContentSub>Tên Người Dùng:</ContentSub>
                    <ContentInfor>{employee.tenNguoiDung}</ContentInfor>
                    <ContentSub>Email:</ContentSub>
                    <ContentInfor>{employee.email}</ContentInfor>
                </DivContent>
                <DivContent>
                    <ContentSub>Điện Thoại:</ContentSub>
                    <ContentInfor>{(employee.dienThoai) ? employee.dienThoai : `Chưa Cập Nhật`}</ContentInfor>
                    <ContentSub>Địa Chỉ:</ContentSub>
                    <ContentInfor>{(employee.diaChi) ? employee.diaChi : `Chưa Cập Nhật`}</ContentInfor>
                </DivContent>
                <DivContent>
                    <ContentSub>Vai Trò:</ContentSub>
                    <ContentInfor>{employee.vaiTro}</ContentInfor>
                    <ContentSub>Trạng Thái:</ContentSub>
                    <ContentInfor status={employee.trangThai}>{(employee.trangThai) ? `Đang Hoạt Động` : `Ngưng Hoạt Động`}</ContentInfor>
                </DivContent>
            </Body>
            <Footer>
                <BtnEmp onClick={OpenUpdateForm}>Cập Nhật</BtnEmp>
                <BtnEmp onClick={onChangeStatus}>{(employee.trangThai) ? `Ngưng Hoạt Động` : `Kích Hoạt Trở Lại`}</BtnEmp>
                <BtnEmp onClick={onDeleteEmployee}>Xóa Nhân Viên</BtnEmp>
            </Footer>
        </Form>
    );
}
export default DetailEmployee;