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
import Image from "../../images/kiotViett.jpg";
import productApi from "../../redux/api/product-api.slice";
const DetailProduct = ({page, onTurnOffDetailForm, onOpenUpdateForm, product}) => {
    const [deleteProduct] = productApi.useDeleteProductMutation();
    const [getProducts] = productApi.useLazyGetProductsQuery();
    const onDeleteProduct = async() => {
        const response = await deleteProduct(product._id);
        if(response.data) {
            getProducts({page});
            alert('Xóa Thành Công!');
            onTurnOffDetailForm();
        }
        else {
            alert('Xóa Thất Bại!');
        }
    }
    return (
        <Form>
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
                <BtnEmp onClick={onOpenUpdateForm}>Cập Nhật</BtnEmp>
                <BtnEmp onClick={onDeleteProduct}>Xóa Mặt Hàng</BtnEmp>
            </Footer>
        </Form>
    );
}
export default DetailProduct;