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
    HeaderBody,
    TitleHeader,
    BodyBody,
    Alert,
    BtnDiv,
    BtnNext,
    BtnPrevious,
    OverLay
} from "../employee/employee.styles";
import { 
    PBody,
    SelectCategory,
    ContentBodyP,
    Image
} from "./product.styles";
import DetailProduct from "../../components/detail-product/detail-product.component";
import UpdateProduct from "../../components/update-product/update-product.component";
import searchIcon from "../../icons/search.png";
import productApi from "../../redux/api/product-api.slice";
import catagoryApi from "../../redux/api/catagory-api-slice";
const Product = () => {
    const [getProducts,{data = []}] = productApi.useLazyGetProductsQuery();
    const {data: categories = []} = catagoryApi.useGetCategoriesQuery();
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
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
    const onSearch = () => {
        setSearch(searchRef.current.value);
        setCategory(categoryRef.current.value);
        getProducts({search: searchRef.current.value,categoryId: categoryRef.current.value});
        setPage(1);
    }
    const onNext = async() => {
        if(data.data.length === 5) {
            const nextPage = page + 1;
            await getProducts({page: nextPage,search,category});
            setPage(nextPage);
        }
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
                    {categories.data?.map(item => (
                        <option key={item._id} value={item._id}>{item.category_name}</option>
                    ))}
                </SelectCategory>
                <BtnSearch onClick={onSearch}>
                    <SearchIcon src={searchIcon}/>
                </BtnSearch>
            </Header>
            <PBody>
                {(data.data?.length !== 0) ? <HeaderBody>
                    <TitleHeader>Ảnh</TitleHeader>
                    <TitleHeader>Tên Hàng</TitleHeader>
                    <TitleHeader>Giá Bán</TitleHeader>
                    <TitleHeader>Giá Vốn</TitleHeader>
                    <TitleHeader>Tồn Kho</TitleHeader>
                    <TitleHeader>Loại Hàng</TitleHeader>
                </HeaderBody> : <Alert>Không Có Sản Phẩm Nào</Alert>}
                 
                {data.data?.map(item => (
                    <BodyBody key={item._id} onClick={() => {onOpenDetailForm(item)}}>
                    <ContentBodyP>
                        <Image src={`http://localhost:14722/${item.image_url}`}/>
                    </ContentBodyP>
                    <ContentBodyP>{item.product_name}</ContentBodyP>
                    <ContentBodyP>{item.sale_price}</ContentBodyP>
                    <ContentBodyP>{item.cost_price}</ContentBodyP>
                    <ContentBodyP>{item.quantity}</ContentBodyP>
                    <ContentBodyP>{item.category.category_name}</ContentBodyP>
                </BodyBody>
                ))}
            </PBody>
            <BtnDiv>
                {(page > 1) && <BtnPrevious onClick={onPrevious} page={page}>Previous</BtnPrevious>}
                {(data.data?.length === 5) && <BtnNext onClick={onNext} data={data.length}>Next</BtnNext>}
            </BtnDiv>
            {(isOpenDetailForm || isOpenUpdateForm) && <OverLay/>}
            {(isOpenDetailForm) && <DetailProduct page={page} onTurnOffDetailForm={onTurnOffDetailForm} onOpenUpdateForm={onOpenUpdateForm} product={product}/>}
            {(isOpenUpdateForm) && <UpdateProduct onTurnOffUpdateForm={onTurnOffUpdateForm} onTurnOffDetailForm={onTurnOffDetailForm} setIsOpenDetailForm={setIsOpenDetailForm} product={product}/>}
        </section>
    );
}
export default Product;