import { 
    useState,
    useEffect,
    useRef
} from "react";
import { 
    Header,
    BtnSearch,
    SearchIcon,
    SearchEmp,
    BtnAddEmp,
    Body,
    HeaderBody,
    TitleHeader,
    BodyBody,
    ContentBody,
    Alert,
    BtnDiv,
    BtnNext,
    BtnPrevious
} from "./employee.styles";
import { Alert as Notice } from "antd";
import AddEmployee from "../../components/add-employee/add-employee.component";
import DetailEmployee from "../../components/detail-employee/detail-employee.component";
import UpdateEmployee from "../../components/update-employee/update-employee.component";
import searchIcon from "../../icons/search.png";
import employeeApi from "../../redux/api/employee-api.slice";

const Employee = () => {
    const [isOpenAddForm, setIsOpenAddForm] = useState(false);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [getEmployees, {data = []}] = employeeApi.useLazyGetEmployeesQuery();
    const [employee, setEmployee] = useState();
    const searchRef = useRef(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success')
    useEffect(()=>{
        getEmployees();
    },[]);
    const onOpenAddForm = () => {
        setIsOpenAddForm(true);
    }
    const onOpenDetailForm = (emp) => {
        setIsOpenDetailForm(true);
        setEmployee(emp);
    }
    const onSearch = async () => {
        setSearch(searchRef.current.value);
        await getEmployees({search: searchRef.current.value});
        setPage(1);
    }
    const onNext = () => {
        const nextPage = page + 1;
        getEmployees({page: nextPage,search});
        setPage(nextPage);
    }
    const onPrevious = () => {
        const previousPage = page - 1;
        getEmployees({page: previousPage,search});
        setPage(previousPage);
    }
    const handleAlert = (message, type="success") => {
        setAlertMessage(message)
        setOpenAlert(true);
        setAlertType(type);
        setTimeout(()=>{
            setOpenAlert(false);
        },3000);
    }
    return (
        <section>
            <Header>
                <SearchEmp ref={searchRef} placeholder="Tìm Kiếm Tên Nhân Viên" onChange={(e) => {
                    if(e.target.value==='') {
                        setSearch('');
                        getEmployees();
                        setPage(1)
                    }}  }/>
                <BtnSearch onClick={onSearch}>
                    <SearchIcon src={searchIcon}/>
                </BtnSearch>
                <BtnAddEmp onClick={onOpenAddForm}>Thêm Nhân Viên</BtnAddEmp>
            </Header>
            <Body>
                {(data?.data?.length === 0) ? <Alert>Không Có Nhân Viên Nào</Alert> :
                 <HeaderBody>
                    <TitleHeader>Tên Đăng Nhập</TitleHeader>
                    <TitleHeader>Tên Nhân Viên</TitleHeader>
                    <TitleHeader>Điện Thoại</TitleHeader>
                    <TitleHeader>Trạng Thái</TitleHeader>
                </HeaderBody>
                }
                {data?.data?.map(item => (
                    <BodyBody key={item._id} onClick={() => onOpenDetailForm(item)}>
                        <ContentBody>{item.user_name}</ContentBody>
                        <ContentBody>{item.name}</ContentBody>
                        <ContentBody>{(item.phone) ? item.phone : `Chưa Cập Nhật`}</ContentBody>
                        <ContentBody active={item.status}>{(item.status==='true') ? `Đang Hoạt Động` : `Ngưng Hoạt Động`}</ContentBody>
                    </BodyBody>
                ))}
            </Body>
            <BtnDiv>
                {
                    (page > 1) && <BtnPrevious page={page} onClick={onPrevious}>Previous</BtnPrevious>
                }
                
                {
                    (data?.data?.length === 5) && <BtnNext onClick={onNext}>Next</BtnNext>
                }
            </BtnDiv>
            {(isOpenAddForm) && <AddEmployee setIsOpenAddForm={setIsOpenAddForm} handleAlert={handleAlert}/>}
            {(isOpenDetailForm) && <DetailEmployee page={page} setIsOpenDetailForm={setIsOpenDetailForm} setIsOpenUpdateForm={setIsOpenUpdateForm} employee={employee} handleAlert={handleAlert}/>}
            {(isOpenUpdateForm) && <UpdateEmployee setIsOpenUpdateForm={setIsOpenUpdateForm} setIsOpenDetailForm={setIsOpenDetailForm} employee={employee} handleAlert={handleAlert}/>}
            {(openAlert) && <Notice style={{position: 'fixed',top:'30px',right:'20px'}} message={alertMessage} type={alertType} showIcon />}
        </section>
    );
}
export default Employee;