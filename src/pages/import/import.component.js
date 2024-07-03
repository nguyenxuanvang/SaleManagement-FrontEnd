import { 
    Container,
    LeftContainer,
    HeaderLeftContainer,
    PLeftContainer,
    InputLeftContainer,
    Popup,
    ItemPopup,
    BodyLeftContainer,
    HeaderBodyLeftContainer,
    InputQuantity,
    DeleteBtn,
    TittleHeaderBodyLeftContainer,
    BodyBodyLeftContainer,
    ContentBodyLeftContainer,
    RightContainer,
    HeaderRightContainer,
    BodyRightContainer,
    HeaderBodyRightContainer,
    BodyBodyRightContainer,
    RowBodyRightContainer,
    FooterBodyRightContainer,
    FooterRightContainer,
    Notice
} from "./import.styles";
import {
    BtnAddEmp,
} from "../employee/employee.styles";
import { 
    useState,
    useEffect
} from "react";
import AddProduct from "../../components/add-product/add-product.component";
import ProductImport from "../../components/product-import/product-import.component";
import productApi from "../../redux/api/product-api.slice";
import catagoryApi from "../../redux/api/catagory-api-slice";
import importApi from "../../redux/api/import-api-slice";
const Import = () => {
    const [isOpenPopup,setIsOpenPopup] = useState('false');
    const [cart,setCart] = useState([]);
    const [isOpenAddForm, setIsOpenAddForm] = useState(false);
    const [getProducts,{data:productList = []}] = productApi.useLazyGetProductsQuery();
    const {data: categories = []} = catagoryApi.useGetCategoriesQuery();
    const [importProducts] = importApi.useImportProductsMutation();
    const today = new Date();
    useEffect(()=>{
        getProducts();
        if(localStorage.getItem('inputCart')) {
            setCart(JSON.parse(localStorage.getItem('inputCart')));
        }
    },[]);
    const onOpenAddForm = () => {
        setIsOpenAddForm(true);
    }
    const onSearch = (e) => {
        getProducts({search: e.target.value})
    }
    const onAddCart = (product) => {
        const findProduct = cart.find(item => item._id === product._id);
        if(findProduct) {
            alert('Sản Phẩm Này Đã Tồn Tại Trong Giỏ Hàng !');
        }
        else {
            let newCart = [...cart];
            newCart.push({...product,quantity: 1});
            setCart(newCart);
            localStorage.setItem('inputCart',JSON.stringify(newCart));
        }
    }
    
    const totalQuantity = (cart) => {
        let total = 0;
        for(let i = 0; i < cart.length; i += 1) {
            total = total + cart[i].quantity;
        }
        return total;
    }
    const totalPrice = (cart) => {
        let total = 0;
        for(let i = 0; i < cart.length; i += 1) {
            total = total + Number(cart[i].cost_price)*cart[i].quantity;
        }
        return total;
    }
    const onCancel = () => {
        setCart([]);
        localStorage.setItem('inputCart','[]');
    }
    const onOrder = async () => {
        if(cart.length === 0) {
            alert('Giỏ Hàng Trống !');
        }
        else {
            const response = await importProducts({cart,totalQuantity:totalQuantity(cart),totalPrice:totalPrice(cart)});
            if(response.data) {
                alert(response.data.message);
                setCart([]);
                localStorage.setItem('inputCart','[]');
            }
            else {
                alert(response.error.data.message);
            }
        }
    }
    return (
        <Container>
            <LeftContainer>
                <HeaderLeftContainer>
                    <BtnAddEmp onClick={onOpenAddForm}>Thêm Hàng</BtnAddEmp>
                    <PLeftContainer>Tìm Kiếm Hàng Hóa:</PLeftContainer>
                    <InputLeftContainer onFocus={() => setIsOpenPopup('true')} onBlur={() => {
                        setTimeout(()=>{setIsOpenPopup('false')},150);
                    }} placeholder="Tìm Kiếm Hàng Hóa " onChange={(e) => {onSearch(e)}}/>
                    <Popup isfocus={isOpenPopup}>
                        {productList?.data?.map(item => (
                            <ItemPopup key={item._id} onClick={()=>onAddCart(item)}>{item.product_name}</ItemPopup>
                        ))}
                    </Popup>
                </HeaderLeftContainer>
                <BodyLeftContainer>
                    <HeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer></TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Loại Hàng</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Tên Hàng</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>ĐVT</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Số Lượng</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Đơn Giá</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Thành Tiền</TittleHeaderBodyLeftContainer>
                    </HeaderBodyLeftContainer>
                    {cart.map(item => (
                        <ProductImport item={item} key={item._id} cart={cart} setCart={setCart}/>
                    ))}
                </BodyLeftContainer>
            </LeftContainer>
            <RightContainer>
                <HeaderRightContainer>
                    <p>Admin</p>
                    <p>{String(today.getDate()) +'/'+ String(today.getMonth()+1) +'/'+ String(today.getFullYear())}</p>
                    <p>{String(today.getHours()) +':'+ String(today.getMinutes())}</p>
                </HeaderRightContainer>
                <BodyRightContainer>
                    <HeaderBodyRightContainer>Hóa Đơn Nhập Hàng</HeaderBodyRightContainer>
                    <BodyBodyRightContainer>
                        {(cart.length === 0) ? <Notice>Chưa Có Gì Trong Giỏ Hàng</Notice> : cart.map(item => (
                            <RowBodyRightContainer key={item._id}>
                                <p>{item.product_name}</p>
                                <p>{item.quantity}</p>
                                <p>{Number(item.cost_price)*item.quantity}</p>
                        </RowBodyRightContainer>
                        ))}
                    </BodyBodyRightContainer>
                    <FooterBodyRightContainer>
                        <p>Tổng Tiền Hàng:</p>
                        <p>{totalQuantity(cart)}</p>
                        <p>{totalPrice(cart)}</p>
                    </FooterBodyRightContainer>
                </BodyRightContainer>
                <FooterRightContainer>
                    <button onClick={onCancel}>Hủy Giỏ Hàng</button>
                    <button onClick={onOrder}>Thanh Toán</button>
                </FooterRightContainer>
            </RightContainer>
            {(isOpenAddForm) && <AddProduct listCategory={categories.data} setIsOpenAddForm={setIsOpenAddForm}/>}
        </Container>
    );
}
export default Import;