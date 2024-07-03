import { useState } from "react";
import { 
    Form,
    Header,
    ButtonTurnOff,
    Footer,
    BtnEmp
} from "../detail-product/detail-product.styles";
import { 
  PBody,
  ContentBodyP,
  Image
} from "../../pages/product/product.styles";
import { 
  HeaderBody,
  TitleHeader,
  BodyBody,
  Alert,
} from "../../pages/employee/employee.styles";
import productApi from "../../redux/api/product-api.slice";
import orderApi from "../../redux/api/order-api-slice";
const DetailOrder = ({page, onTurnOffDetailForm, order}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [deleteProduct] = productApi.useDeleteProductMutation();
    const [getProducts] = productApi.useLazyGetProductsQuery();
    const {data = []} = orderApi.useGetOrderDetailsQuery(order._id);
    const [deleteOrder] = orderApi.useDeleteOrderMutation();
    const onDeleteProduct = async() => {
        const res = await deleteOrder({id:order._id,page});
        if(res.data) {
            alert(res.data.message);
            onTurnOffDetailForm();
        } else {
            alert('Delete Order Fail');
        }
    }
    return (
        <Form open={isOpen}>
            <Header>Thông Tin Chi Tiết Của Hóa Đơn</Header>
            <ButtonTurnOff onClick={onTurnOffDetailForm}>X</ButtonTurnOff>
            <PBody>
                {(data.data?.length !== 0) ? <HeaderBody>
                    <TitleHeader>Ảnh</TitleHeader>
                    <TitleHeader>Tên Hàng</TitleHeader>
                    <TitleHeader>Tổng Giá</TitleHeader>
                    <TitleHeader>Tổng Số Lượng</TitleHeader>
                </HeaderBody> : <Alert>Không Có Sản Phẩm Nào</Alert>}
                 
                {data.data?.map(item => (
                    <BodyBody key={item._id}>
                    <ContentBodyP>
                        <Image src={`http://localhost:14722/${item?.image_url}`}/>
                    </ContentBodyP>
                    <ContentBodyP>{item?.product_name}</ContentBodyP>
                    <ContentBodyP>{item?.price}</ContentBodyP>
                    <ContentBodyP>{item?.quantity}</ContentBodyP>
                </BodyBody>
                ))}
            </PBody>
            <Footer>
                <BtnEmp onClick={onDeleteProduct}>Xóa Hóa Đơn</BtnEmp>
            </Footer>
        </Form>
    );
}
export default DetailOrder;