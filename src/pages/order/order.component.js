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
} from "./order.styles";
import { 
    useState,
    useEffect
} from "react";
import productApi from "../../redux/api/product-api.slice";
const Order = () => {
    const [isOpenPopup,setIsOpenPopup] = useState('false');
    const [cart,setCart] = useState([]);
    const [getProducts,{data:productList = []}] = productApi.useLazyGetProductsQuery();
    const [orderProducts] = productApi.useOrderProductsMutation();
    const today = new Date();
    useEffect(()=>{
        getProducts();
        if(localStorage.getItem('inputCart')) {
            setCart(JSON.parse(localStorage.getItem('inputCart')));
        }
    },[]);
    const onAddCart = (product) => {
        const findProduct = cart.find(item => item.maHang === product.maHang);
        if(findProduct) {
            alert('Sản Phẩm Này Đã Tồn Tại Trong Giỏ Hàng !');
        }
        else {
            let newCart = [...cart];
            newCart.push(product);
            setCart(newCart);
            localStorage.setItem('inputCart',JSON.stringify(newCart));
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
        localStorage.setItem('inputCart',JSON.stringify(newCart));
    }
    const totalQuantity = (cart) => {
        let total = 0;
        for(let i = 0; i < cart.length; i += 1) {
            total = total + 50;
        }
        return total;
    }
    const totalPrice = (cart) => {
        let total = 0;
        for(let i = 0; i < cart.length; i += 1) {
            total = total + Number(cart[i].giaVon)*50;
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
            const response = await orderProducts(cart);
            if(response.data) {
                alert('Thanh Toán Thành Công !');
                setCart([]);
                localStorage.setItem('inputCart','[]');
            }
            else {
                alert('Thanh Toán Thất Bại !');
            }
        }
    }
    return (
        <Container>
            <LeftContainer>
                <HeaderLeftContainer>
                    <PLeftContainer>Tìm Kiếm Hàng Hóa:</PLeftContainer>
                    <InputLeftContainer onFocus={() => setIsOpenPopup('true')} onBlur={() => {
                        setTimeout(()=>{setIsOpenPopup('false')},150);
                    }} placeholder="Tìm Kiếm Hàng Hóa "/>
                    <Popup isfocus={isOpenPopup}>
                        {productList.map(item => (
                            <ItemPopup key={item.maHang} onClick={()=>onAddCart(item)}>{item.tenHang}</ItemPopup>
                        ))}
                    </Popup>
                </HeaderLeftContainer>
                <BodyLeftContainer>
                    <HeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer></TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Mã Hàng</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Tên Hàng</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>ĐVT</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Số Lượng</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Đơn Giá</TittleHeaderBodyLeftContainer>
                        <TittleHeaderBodyLeftContainer>Thành Tiền</TittleHeaderBodyLeftContainer>
                    </HeaderBodyLeftContainer>
                    {cart.map(item => (
                        <BodyBodyLeftContainer key={item.maHang}>
                            <ContentBodyLeftContainer><DeleteBtn onClick={()=>onDelete(item)}>Delete</DeleteBtn></ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.maHang}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.tenHang}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.donViTinh}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>50</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.giaVon}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{Number(item.giaVon)*50}</ContentBodyLeftContainer>
                        </BodyBodyLeftContainer>
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
                            <RowBodyRightContainer key={item.maHang}>
                                <p>{item.tenHang}</p>
                                <p>50</p>
                                <p>{Number(item.giaVon)*50}</p>
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
        </Container>
    );
}
export default Order;