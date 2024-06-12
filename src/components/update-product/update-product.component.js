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
import {
    Image,
    ContentUpload,
    ButtonUpload
} from "../add-product/add-product.style";
import { ContentSubP } from "../add-product/add-product.style";
import { MaHang } from "./update-product.style";
import productApi from "../../redux/api/product-api.slice";
import catagoryApi from "../../redux/api/catagory-api-slice";
const UpdateProduct = ({onTurnOffUpdateForm,onTurnOffDetailForm,setIsOpenDetailForm,product}) => {
    const [updateProduct] = productApi.useUpdateProductMutation();
    const {data: category = {}} = catagoryApi.useGetCategoriesQuery();
    const fileRef = useRef(null);
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const [isOpen, setIsOpen] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    useEffect(()=>{
        if(file) {
            const previewUrl = URL.createObjectURL(file);
            setUrl(previewUrl);
        }
    },[file]);
    const onUpdateProduct = async (newProduct) => {
        const formData = new FormData();
        if(file) {
            if(file.type.split('/')[0] !== 'image') {
                alert('Ảnh Không Đúng Định Dạng !');
                return;
            }
            formData.append('image',file);
        }
        const changeProduct = {...newProduct,_id:product._id,image_url: product.image_url,quantity: product.quantity};
        formData.append('product',JSON.stringify(changeProduct));
        const response = await updateProduct(formData);
        if(response.data) {
            const cart = JSON.parse(localStorage.getItem('inputCart'));
            const newCart = cart.map(item => {
                if(item._id === response.data.data._id) {
                    return {...response.data.data,quantity:(response.data.data.quantity===0)?1:response.data.data.quantity}
                }
                return item;
            })
            localStorage.setItem('inputCart',JSON.stringify(newCart));
            alert('Cập Nhật Thành Công!');
            onTurnOffUpdateForm();
            onTurnOffDetailForm();
        }
        else {
            alert('Cập Nhật Thất Bại!');
        }
    }
    return (
        <Form onSubmit={handleSubmit(onUpdateProduct)} open={isOpen}>
        <Header>
            Cập Nhật Mặt Hàng {product.product_name}
        </Header>
        <ButtonTurnOff onClick={onTurnOffUpdateForm}>X</ButtonTurnOff>
        <Body>
            <DivContent>
                <ContentSub isError={errors._id}>Mã Hàng:</ContentSub>
                <MaHang>{product._id}</MaHang>
                {(errors._id) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.cost_price}>Giá Vốn:</ContentSub>
                <ContentInput {...register("cost_price", { required: true })} defaultValue={product.cost_price} type="number"/>
                {(errors.cost_price) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.product_name}>Tên Hàng:</ContentSub>
                <ContentInput {...register("product_name", { required: true })} defaultValue={product.product_name}/>
                {(errors.product_name) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.sale_price}>Giá Bán:</ContentSub>
                <ContentInput {...register("sale_price", { required: true })} defaultValue={product.sale_price} type="number"/>
                {(errors.sale_price) ? <Notice>!</Notice> : ``}
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.category}>Nhóm Hàng:</ContentSub>
                <select {...register("category", { required: true })} defaultValue={product.category._id}>
                    {category?.data?.map(item => (
                        <option key={item._id} value={item._id}>{item.category_name}</option>
                    ))}
                </select>
                {(errors.category) ? <Notice>!</Notice> : ``}
                <ContentSubP>Tồn Kho:</ContentSubP>
                <ContentInput defaultValue={product.quantity} disabled/>
            </DivContent>
            <DivContent>
                <ContentSub isError={errors.image_url}>Ảnh:</ContentSub>
                <Image src={(!url) ? `http://localhost:14722/${product.image_url}`: url}/>
                <ContentUpload ref={fileRef} type='file' accept="image/*" onChange={(e)=>(e.target.files[0])&&setFile(e.target.files[0])}/>
                <ButtonUpload onClick={(e)=>{e.preventDefault();fileRef.current.click()}}>Upload Ảnh</ButtonUpload>
                {(errors.image_url) ? <Notice>!</Notice> : ``}
                <ContentSub isError={errors.unit}>Đơn Vị Tính:</ContentSub>
                <ContentInput {...register("unit", { required: true })} defaultValue={product.unit}/>
                {(errors.unit) ? <Notice>!</Notice> : ``}
            </DivContent>
        </Body>
        <Footer>
            <ComeBack onClick={()=>{onTurnOffUpdateForm();setIsOpenDetailForm(true)}}>Quay Lại</ComeBack>
            <BtnEmp>Lưu</BtnEmp>
        </Footer>
    </Form>
    );
}
export default UpdateProduct;