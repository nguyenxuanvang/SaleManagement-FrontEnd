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
        const response = await deleteProduct(product.maHang);
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
            <Header>Thông Tin Chi Tiết Của Mặt Hàng {product.tenHang}</Header>
            <ButtonTurnOff onClick={onTurnOffDetailForm}>X</ButtonTurnOff>
            <Body>
                <div>
                    <NameProduct>{product.tenHang}</NameProduct>
                    <ImageProduct src={product.anh}></ImageProduct>
                </div>
                <div>
                    <DivContent>
                        <ContentSub>Mã Hàng:</ContentSub>
                        <ContentInfor>{product.maHang}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Tên Hàng:</ContentSub>
                        <ContentInfor>{product.tenHang}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Nhóm Hàng:</ContentSub>
                        <ContentInfor>{product.nhomHang}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Giá Vốn:</ContentSub>
                        <ContentInfor>{product.giaVon}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Giá Bán:</ContentSub>
                        <ContentInfor>{product.giaBan}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Tồn Kho:</ContentSub>
                        <ContentInfor>{product.tonKho}</ContentInfor>
                    </DivContent>
                    <DivContent>
                        <ContentSub>Đơn Vị Tính:</ContentSub>
                        <ContentInfor>{product.donViTinh}</ContentInfor>
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