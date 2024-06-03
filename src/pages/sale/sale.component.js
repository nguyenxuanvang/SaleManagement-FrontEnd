import {
    Header,
    SearchEmp,
    BtnSearch,
    SearchIcon
} from "../employee/employee.styles";
import {
    Body,
    LeftBody,
    RightBody,
    BodyTitle,
    LeftBodyProductList,
    ProductRow,
    ProductRowContent,
    ChangeQuantity,
    BtnDelete,
    BtnChangeQuantity,
    NoticeTotal,
    Notice,
    NoticeTitle,
    NoticeInput,
    Total,
    TotalContent,
    HeaderRightBody,
    ProductContainer,
    ProductDiv,
    ProductImage,
    Image,
    ProductContent,
    Content,
    BtnCancelBuyDiv,
    BtnCancelBuy,
    Alert,
    Alert2
} from "./sale.styles";
import searchIcon from '../../icons/search.png';
import productApi from "../../redux/api/product-api.slice";
import { 
    useEffect,
    useState
} from "react";
const Sale = () => {
    const [getProducts,{data: list = []}] = productApi.useLazyGetProductsQuery();
    const [updateProducts] = productApi.useUpdateProductsMutation();
    const [cart,setCart] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(()=>{
        getProducts();
        if(localStorage.getItem('cart')){
           setCart(JSON.parse(localStorage.getItem('cart')));
        }
    },[]);
    const toTalPrice = (cart) => {
        if(cart.length > 0) {
            let total = 0;
            for(let i = 0; i < cart.length; i += 1) {
                total += cart[i].tongTien;
            }
            return total;
        }
        else {
            return 0;
        }
    }
    const totalQuantity = (cart) => {
        if(cart.length > 0) {
            let total = 0;
            for(let i = 0; i < cart.length; i += 1) {
                total += cart[i].quantity;
            }
            return total;
        }
        else {
            return 0;
        }
    }
    const checkProduct = (cart,product) => {
        const findProduct = cart.find(item => item._id === product._id);
        if(findProduct) {
            return true;
        }
        else {
            return false;
        }
    }
    const addToCart = (product) => {
        let newCart = [...cart];
        if(checkProduct(newCart,product)) {
            for(let i = 0; i < newCart.length; i += 1) {
                if(newCart[i]._id === product._id) {
                    newCart[i].quantity += 1;
                    newCart[i].tongTien += Number(newCart[i].sale_price);
                    break;
                }
            }
            setCart(newCart);
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
        else {
            let newProduct = {...product};
            newProduct.stt = newCart.length+1;
            newProduct.quantity = 1;
            newProduct.tongTien = Number(newProduct.sale_price);
            newCart.push(newProduct);
            setCart(newCart);
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
    }
    const onDelete = (product) => {
        let newCart = [...cart];
        for(let i = 0; i < newCart.length; i += 1) {
            if(newCart[i].maHang === product.maHang) {
                newCart.splice(i,1);
                break;
            }
        }
        setCart(newCart);
        localStorage.setItem('cart',JSON.stringify(newCart));
    }
    const onChangeQuantity = (product,ch) => {
        let newCart = [...cart];
        if(ch === '+') {
            for(let i = 0; i < newCart.length; i += 1) {
                if(newCart[i]._id === product._id) {
                    newCart[i].quantity += 1;
                    newCart[i].tongTien += Number(newCart[i].sale_price);
                    break;
                }
            }
            setCart(newCart);
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
        else {
            if(product.quantity > 0) {
                for(let i = 0; i < newCart.length; i += 1) {
                    if(newCart[i]._id === product._id) {
                        newCart[i].quantity -= 1;
                        newCart[i].tongTien -= Number(newCart[i].sale_price);
                        break;
                    }
                }
                setCart(newCart);
                localStorage.setItem('cart',JSON.stringify(newCart));
            }
        }
    }
    const onSearch = () => {
        getProducts({search});
    }
    const onBuy = async (cart) => {
        if(cart.length > 0) {
            const response = await updateProducts(cart);
            if(response.data) {
                setCart([]);
                localStorage.setItem('cart','[]');
                alert('Thanh Toán Thành Công !');
            }
        }
        else {
            alert('Giỏ Hàng Trống !');
        }
    }
    const onCancel = () => {
        setCart([]);
        localStorage.setItem('cart','[]');
    }
    return (
        <section>
            <Header style={{justifyContent: 'end'}}>
                <SearchEmp placeholder="Tìm Kiếm Sản Phẩm" onChange={(e) => {setSearch(e.target.value);if(e.target.value===''){getProducts()}}}/>
                <BtnSearch onClick={onSearch}>
                    <SearchIcon src={searchIcon} />
                </BtnSearch>
            </Header>
            <Body>
                <LeftBody>
                    <BodyTitle>Hóa Đơn</BodyTitle>
                    <LeftBodyProductList>
                        {(cart.length === 0) ? <Alert2>Thêm Sản Phẩm Muốn Mua vào Đây !</Alert2> : cart.map(item => {
                            return (
                                <ProductRow key={item._id}>
                                    <ProductRowContent style={{fontWeight: '700',color:'#666690'}}>Product</ProductRowContent>
                                    <BtnDelete onClick={() => onDelete(item)}>Delete</BtnDelete>
                                    <ProductRowContent>{item.category.category_name}</ProductRowContent>
                                    <ProductRowContent>{item.product_name}</ProductRowContent>
                                    <ProductRowContent>{item.unit}</ProductRowContent>
                                    <ProductRowContent>{item.sale_price}</ProductRowContent>
                                    <ChangeQuantity>
                                        <BtnChangeQuantity onClick={() => {onChangeQuantity(item,'-')}}>-</BtnChangeQuantity>
                                        <ProductRowContent>{item.quantity}</ProductRowContent>
                                        <BtnChangeQuantity onClick={() => {onChangeQuantity(item,'+')}}>+</BtnChangeQuantity>
                                    </ChangeQuantity>
                                    <ProductRowContent>{item.tongTien}</ProductRowContent>
                                </ProductRow>
                            )})}
                    </LeftBodyProductList>
                        <NoticeTotal>
                            <Notice>
                                <NoticeTitle>Ghi Chú Hóa Đơn</NoticeTitle>
                                <NoticeInput contentEditable="true"></NoticeInput>
                            </Notice>
                            <Total>
                                <TotalContent>Tổng Tiền Hàng:</TotalContent>
                                <TotalContent>{totalQuantity(cart)}</TotalContent>
                                <TotalContent>{toTalPrice(cart)} Vnđ</TotalContent>
                            </Total>
                        </NoticeTotal>
                </LeftBody>
                <RightBody>
                    <HeaderRightBody>Admin</HeaderRightBody>
                    <ProductContainer>
                        {(list?.data?.length === 0) ? <Alert>Không Có Sản Phẩm Nào !</Alert> : list?.data?.map(item => (
                            <ProductDiv key={item._id} onClick={() => addToCart(item)}>
                                <ProductImage>
                                    <Image src={`http://localhost:14722/${item.image_url}`}></Image>
                                </ProductImage>
                                <ProductContent>
                                    <Content>{item.product_name}</Content>
                                    <Content>{item.sale_price}</Content>
                                </ProductContent>
                            </ProductDiv>
                        ))}
                    </ProductContainer>
                    <BtnCancelBuyDiv>
                        <BtnCancelBuy onClick={onCancel}>Hủy Giỏ Hàng</BtnCancelBuy>
                        <BtnCancelBuy onClick={() => onBuy(cart)}>Thanh Toán</BtnCancelBuy>
                    </BtnCancelBuyDiv>
                </RightBody>
            </Body>
        </section>
    );
}
export default Sale;