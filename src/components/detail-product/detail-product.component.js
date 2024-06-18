import { useState } from "react";
import { 
    Form,
    Header,
    ButtonTurnOff,
    Body,
    NameProduct,
    ImageProduct,
    DivContent,
    ContentSub,
    ContentInfor,
    Footer,
    BtnEmp
} from "./detail-product.styles";
import productApi from "../../redux/api/product-api.slice";
const DetailProduct = ({page, onTurnOffDetailForm, onOpenUpdateForm, product}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [deleteProduct] = productApi.useDeleteProductMutation();
    const [getProducts] = productApi.useLazyGetProductsQuery();
    const onDeleteProduct = async() => {
        const response = await deleteProduct(product._id);
        if(response.data) {
            const inputCart = JSON.parse(localStorage.getItem('inputCart'));
            const cart = JSON.parse(localStorage.getItem('cart'));
            const newInputCart = inputCart.filter(item => {
                if(item._id !== response.data.data._id) {
                    return item;
                }
            });
            const newCart = cart.filter(cartItem => {
                if(cartItem._id !== response.data.data._id) {
                    return cartItem;
                }
            });
            localStorage.setItem('inputCart',JSON.stringify(newInputCart));
            localStorage.setItem('cart',JSON.stringify(newCart));
            getProducts({page});
            alert('Xóa Thành Công!');
            onTurnOffDetailForm();
        }
        else {
            alert('Xóa Thất Bại!');
        }
    }
    return (
        <Form open={isOpen}>
            <Header>Thông Tin Chi Tiết Của Mặt Hàng {product.product_name}</Header>
            <ButtonTurnOff onClick={onTurnOffDetailForm}>X</ButtonTurnOff>
            <Body>
                <div>
                    <NameProduct>{product.product_name}</NameProduct>
                    <ImageProduct src={`http://localhost:14722/${product.image_url}`}></ImageProduct>
                </div>
                <div>
                    <DivContent>
                        <ContentSub>Mã Hàng:</ContentSub>
                        <ContentInfor>{product.category._id}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Tên Hàng:</ContentSub>
                        <ContentInfor>{product.product_name}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Nhóm Hàng:</ContentSub>
                        <ContentInfor>{product.category.category_name}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Giá vốn:</ContentSub>
                        <ContentInfor>{product.cost_price}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Giá Bán:</ContentSub>
                        <ContentInfor>{product.sale_price}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Tồn Kho:</ContentSub>
                        <ContentInfor>{product.quantity}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Đơn Vị Tính:</ContentSub>
                        <ContentInfor>{product.unit}</ContentInfor>
                    </DivContent>
                </div>
            </Body>
            <Footer>
                <BtnEmp onClick={()=>{onOpenUpdateForm();onTurnOffDetailForm()}}>Cập Nhật</BtnEmp>
                <BtnEmp onClick={onDeleteProduct}>Xóa Mặt Hàng</BtnEmp>
            </Footer>
        </Form>
    );
}
export default DetailProduct;