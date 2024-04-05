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
    return (
        <section>
            <Header>
                <SearchEmp ref={searchRef} placeholder="Tìm Kiếm Nhân Viên" onChange={(e) => {
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
                {(data.length === 0) ? <Alert>Không Có Nhân Viên Nào</Alert> :
                 <HeaderBody>
                    <TitleHeader>Tên Đăng Nhập</TitleHeader>
                    <TitleHeader>Tên Nhân Viên</TitleHeader>
                    <TitleHeader>Điện Thoại</TitleHeader>
                    <TitleHeader>Trạng Thái</TitleHeader>
                </HeaderBody>
                }
                {data.map(item => (
                    <BodyBody key={item.id} onClick={() => onOpenDetailForm(item)}>
                        <ContentBody>{item.tenDangNhap}</ContentBody>
                        <ContentBody>{item.tenNguoiDung}</ContentBody>
                        <ContentBody>{(item.dienThoai) ? item.dienThoai : `Chưa Cập Nhật`}</ContentBody>
                        <ContentBody active={item.trangThai}>{(item.trangThai) ? `Đang Hoạt Động` : `Ngưng Hoạt Động`}</ContentBody>
                    </BodyBody>
                ))}
            </Body>
            <BtnDiv>
                <BtnPrevious page={page} onClick={onPrevious}>Previous</BtnPrevious>
                <BtnNext data={data.length} onClick={onNext}>Next</BtnNext>
            </BtnDiv>
            {(isOpenAddForm) && <AddEmployee setIsOpenAddForm={setIsOpenAddForm}/>}
            {(isOpenDetailForm) && <DetailEmployee page={page} setIsOpenDetailForm={setIsOpenDetailForm} setIsOpenUpdateForm={setIsOpenUpdateForm} employee={employee}/>}
            {(isOpenUpdateForm) && <UpdateEmployee setIsOpenUpdateForm={setIsOpenUpdateForm} setIsOpenDetailForm={setIsOpenDetailForm} employee={employee}/>}
        </section>
    );
}
export default Employee;