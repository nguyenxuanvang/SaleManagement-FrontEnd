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
import productApi from "../../redux/api/product-api.slice";
import { ContentSubP } from "./add-product.style";
const AddProduct = ({onTurnOffAddForm}) => {
    const [addProduct] = productApi.useAddProductMutation();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onAddProduct = async (product) => {
        const response = await addProduct(product);
        if(response.data) {
            alert('Thêm Thành Công!');
            onTurnOffAddForm();
        }
        else {
            alert('Thêm Thất Bại!');  
        }
    }
    return (
        <Form onSubmit={handleSubmit(onAddProduct)}>
        <Header>
            Thêm Mới Mặt Hàng
        </Header>
        <ButtonTurnOff onClick={onTurnOffAddForm}>X</ButtonTurnOff>
        <Body>
            <DivContent>
                <ContentSub isError={errors.tenHang}>Tên Hàng:</ContentSub>
                <ContentInput {...register("tenHang", { required: true })}/>
                {(errors.tenHang) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.giaVon}>Giá Vốn:</ContentSub>
                <ContentInput type='number' {...register("giaVon", { required: true })}/>
                {(errors.giaVon) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.nhomHang}>Nhóm Hàng:</ContentSub>
                    <select {...register("nhomHang", { required: true })}>
                        <option></option>
                        <option>TV</option>
                        <option>Đồ Gia Dụng</option>
                        <option>Thời Trang</option>
                    </select>
                {(errors.nhomHang) ? <Notice>!</Notice> : ``}
                <ContentSubP isError={errors.giaBan}>Giá Bán:</ContentSubP>
                <ContentInput type='number' {...register("giaBan", { required: true })}/>
                {(errors.giaBan) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.anh}>Ảnh:</ContentSub>
                <ContentInput {...register("anh", { required: true})}/>
                {(errors.anh) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.tonKho}>Tồn Kho:</ContentSub>
                <ContentInput type='number' {...register("tonKho", { required: true })}/>
                {(errors.tonKho) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.donViTinh}>Đơn Vị Tính:</ContentSub>
                <ContentInput {...register("donViTinh", { required: true })}/>
                {(errors.donViTinh) ? <Notice>!</Notice> : ``}
            </DivContent>
        </Body>
        <Footer>
            <ComeBack onClick={onTurnOffAddForm}>Quay Lại</ComeBack>
            <BtnEmp>Lưu</BtnEmp>
        </Footer>
    </Form>
    );
}
export default AddProduct;