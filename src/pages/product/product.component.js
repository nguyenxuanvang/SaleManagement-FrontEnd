import { 
    useEffect,
    useState,
    useRef
} from "react";
import { 
    Header,
    BtnSearch,
    SearchIcon,
    SearchEmp,
    BtnAddEmp,
    HeaderBody,
    TitleHeader,
    BodyBody,
    Alert,
    BtnDiv,
    BtnNext,
    BtnPrevious
} from "../employee/employee.styles";
import { 
    PBody,
    SelectCategory,
    ContentBodyP
} from "./product.styles";
import DetailProduct from "../../components/detail-product/detail-product.component";
import UpdateProduct from "../../components/update-product/update-product.component";
import AddProduct from "../../components/add-product/add-product.component";
import searchIcon from "../../icons/search.png";
import productApi from "../../redux/api/product-api.slice";
import catagoryApi from "../../redux/api/catagory-api-slice";
const Product = () => {
    const [getProducts,{data = []}] = productApi.useLazyGetProductsQuery();
    const {data: categories = []} = catagoryApi.useGetCategoriesQuery();
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [isOpenAddForm, setIsOpenAddForm] = useState(false);
    const [product, setProduct] = useState();
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const searchRef = useRef(null);
    const categoryRef = useRef(null);
    useEffect(()=>{
        getProducts();
    },[]);
    const onOpenDetailForm = (product) => {
        setProduct(product);
        setIsOpenDetailForm(true);
    }
    const onTurnOffDetailForm = () => {
        setIsOpenDetailForm(false);
    }
    const onOpenUpdateForm = () => {
        setIsOpenUpdateForm(true);
    }
    const onTurnOffUpdateForm = () => {
        setIsOpenUpdateForm(false);
    }
    const onOpenAddForm = () => {
        setIsOpenAddForm(true);
    }
    const onTurnOffAddForm = () => {
        setIsOpenAddForm(false);
    }
    const onSearch = () => {
        setSearch(searchRef.current.value);
        setCategory(categoryRef.current.value);
        getProducts({search: searchRef.current.value,category: categoryRef.current.value});
        setPage(1);
    }
    const onNext = async() => {
        const nextPage = page + 1;
        await getProducts({page: nextPage,search,category});
        setPage(nextPage);
    }
    const onPrevious = async () => {
        const previousPage = page - 1;
        await getProducts({page: previousPage,search,category});
        setPage(previousPage);
    }
    return (
        <section>
            <Header>
                <SearchEmp ref={searchRef} onChange={(e) => {
                    if(e.target.value === '') {
                        setSearch('');
                        getProducts({category});
                        setPage(1);
                    }}} placeholder="Tìm Kiếm Mặt Hàng"/>
                <SelectCategory ref={categoryRef} onChange={(e) => {
                    if(e.target.value === ''){
                        setCategory('');
                        getProducts({search});
                        setPage(1)
                    }}}>
                    <option></option>
                    {categories.map(item => (
                        <option>{item.tenNhomHang}</option>
                    ))}
                </SelectCategory>
                <BtnSearch onClick={onSearch}>
                    <SearchIcon src={searchIcon}/>
                </BtnSearch>
                <BtnAddEmp onClick={onOpenAddForm}>Thêm Hàng</BtnAddEmp>
            </Header>
            <PBody>
                {(data.length !== 0) ? <HeaderBody>
                    <TitleHeader>Mã Hàng</TitleHeader>
                    <TitleHeader>Tên Hàng</TitleHeader>
                    <TitleHeader>Giá Bán</TitleHeader>
                    <TitleHeader>Giá Vốn</TitleHeader>
                    <TitleHeader>Tồn Kho</TitleHeader>
                </HeaderBody> : <Alert>Không Có Sản Phẩm Nào</Alert>}
                 
                {data.map(item => (
                    <BodyBody key={item.maHang} onClick={() => {onOpenDetailForm(item)}}>
                    <ContentBodyP>{item.maHang}</ContentBodyP>
                    <ContentBodyP>{item.tenHang}</ContentBodyP>
                    <ContentBodyP>{item.giaBan}</ContentBodyP>
                    <ContentBodyP>{item.giaVon}</ContentBodyP>
                    <ContentBodyP>{item.tonKho}</ContentBodyP>
                </BodyBody>
                ))}
            </PBody>
            <BtnDiv>
                <BtnPrevious onClick={onPrevious} page={page}>Previous</BtnPrevious>
                <BtnNext onClick={onNext} data={data.length}>Next</BtnNext>
            </BtnDiv>
            {(isOpenDetailForm) && <DetailProduct page={page} onTurnOffDetailForm={onTurnOffDetailForm} onOpenUpdateForm={onOpenUpdateForm} product={product}/>}
            {(isOpenUpdateForm) && <UpdateProduct onTurnOffUpdateForm={onTurnOffUpdateForm} onTurnOffDetailForm={onTurnOffDetailForm} product={product}/>}
            {(isOpenAddForm) && <AddProduct onTurnOffAddForm={onTurnOffAddForm}/>}
        </section>
    );
}
export default Product;