import { useForm } from "react-hook-form";
import {
    Form,
    Header,
    ButtonTurnOff,
    Body,
    DivContent,
    ContentSub,
    ContentInput,
    Footer,
    ComeBack,
    BtnEmp,
    Notice
} from "../add-employee/add-employee.styles";
import { ContentSubP } from "../add-product/add-product.style";
import { MaHang } from "./update-product-style";
import productApi from "../../redux/api/product-api.slice";
const UpdateProduct = ({onTurnOffUpdateForm,onTurnOffDetailForm, product}) => {
    const [updateProduct] = productApi.useUpdateProductMutation();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onUpdateProduct = async (newProduct) => {
        newProduct.maHang = product.maHang;
        const response = await updateProduct(newProduct);
        if(response.data) {
            alert('Cập Nhật Thành Công!');
            onTurnOffUpdateForm();
            onTurnOffDetailForm();
        }
        else {
            alert('Cập Nhật Thất Bại!');
        }
    }
    return (
        <Form onSubmit={handleSubmit(onUpdateProduct)}>
        <Header>
            Cập Nhật Mặt Hàng {product.tenHang}
        </Header>
        <ButtonTurnOff onClick={onTurnOffUpdateForm}>X</ButtonTurnOff>
        <Body>
            <DivContent>
                <ContentSub isError={errors.maHang}>Mã Hàng:</ContentSub>
                <MaHang>{product.maHang}</MaHang>
                {(errors.maHang) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.giaVon}>Giá Vốn:</ContentSub>
                <ContentInput {...register("giaVon", { required: true })} defaultValue={product.giaVon}/>
                {(errors.giaVon) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.tenHang}>Tên Hàng:</ContentSub>
                <ContentInput {...register("tenHang", { required: true })} defaultValue={product.tenHang}/>
                {(errors.tenHang) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.giaBan}>Giá Bán:</ContentSub>
                <ContentInput {...register("giaBan", { required: true })} defaultValue={product.giaBan}/>
                {(errors.giaBan) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.nhomHang}>Nhóm Hàng:</ContentSub>
                <select {...register("nhomHang", { required: true })} defaultValue={product.nhomHang}>
                    <option></option>
                    <option>TV</option>
                    <option>Đồ Gia Dụng</option>
                    <option>Thời Trang</option>
                </select>
                {(errors.nhomHang) ? <Notice>!</Notice> : ``}
                <ContentSubP isError={errors.tonKho}>Tồn Kho:</ContentSubP>
                <ContentInput {...register("tonKho", { required: true })} defaultValue={product.tonKho}/>
                {(errors.tonKho) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.anh}>Ảnh:</ContentSub>
                <ContentInput {...register("anh", { required: true})} defaultValue={product.anh}/>
                {(errors.anh) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.donViTinh}>Đơn Vị Tính:</ContentSub>
                <ContentInput {...register("donViTinh", { required: true })} defaultValue={product.donViTinh}/>
                {(errors.donViTinh) ? <Notice>!</Notice> : ``}
            </DivContent>
        </Body>
        <Footer>
            <ComeBack onClick={onTurnOffUpdateForm}>Quay Lại</ComeBack>
            <BtnEmp>Lưu</BtnEmp>
        </Footer>
    </Form>
    );
}
export default UpdateProduct;