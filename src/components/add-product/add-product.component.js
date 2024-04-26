import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
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
import { ContentSubP, ContentUpload, ButtonUpload, Image } from "./add-product.style";
const AddProduct = ({onTurnOffAddForm, categories}) => {
    const [addProduct] = productApi.useAddProductMutation();
    const [file,setFile] = useState();
    const [url, setUrl] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const fileRef = useRef(null);
    const onAddProduct = async (product) => {
        const formData = new FormData();
        if(file) {
            if(file.type.split('/')[0] !== 'image') {
                alert('Ảnh Không Đúng Định Dạng !');
                return;
            }
            formData.append('image',file);
        }
        formData.append('product',JSON.stringify(product));
        const response = await addProduct(formData);
        if(response.data) {
            alert('Thêm Thành Công!');
            onTurnOffAddForm();
        }
        else {
            alert('Thêm Thất Bại!');  
        }
    }
    useEffect(()=>{
        if(file) {
            const url = URL.createObjectURL(file);
            setUrl(url);
        }
    },[file]);
    const onUpload = (e) => {
        e.preventDefault();
        fileRef.current.click();
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
                        {categories.map(item => (
                            <option key={item._id} value={item._id}>{item.category_name}</option>
                        ))}
                        
                    </select>
                {(errors.nhomHang) ? <Notice>!</Notice> : ``}
                <ContentSubP isError={errors.giaBan}>Giá Bán:</ContentSubP>
                <ContentInput type='number' {...register("giaBan", { required: true })}/>
                {(errors.giaBan) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.anh}>Ảnh:</ContentSub>
                {(url) && <Image src={(url) ? url : ''}/>}
                <ContentUpload type="file" accept="image/*" ref={fileRef} onChange={(e)=>(e.target.files[0])&&setFile(e.target.files[0])}/>
                <ButtonUpload onClick={(e)=>onUpload(e)}>Upload Ảnh</ButtonUpload>
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