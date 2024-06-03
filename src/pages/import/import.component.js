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
} from "./import.styles";
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
        const findProduct = cart.find(item => item._id === product._id);
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
            if(newCart[i]._id === product._id) {
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
            total = total + Number(cart[i].cost_price)*50;
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
                        <BodyBodyLeftContainer key={item._id}>
                            <ContentBodyLeftContainer><DeleteBtn onClick={()=>onDelete(item)}>Delete</DeleteBtn></ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.category.category_name}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.product_name}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.unit}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>50</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{item.cost_price}</ContentBodyLeftContainer>
                            <ContentBodyLeftContainer>{Number(item.cost_price)*50}</ContentBodyLeftContainer>
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
                            <RowBodyRightContainer key={item._id}>
                                <p>{item.product_name}</p>
                                <p>50</p>
                                <p>{Number(item.cost_price)*50}</p>
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