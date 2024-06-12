import { useState } from "react";
import {
  BodyBodyLeftContainer,
  ContentBodyLeftContainer,
  DeleteBtn,
  InputQuantity
} from "../../pages/import/import.styles";
const ProductImport = ({item,cart,setCart}) => {
  const [product, setProduct] = useState({...item});
  const onChangeQuantity = (e) => {
    if(Number(e.target.value) < 1) {
      const newProduct = {...product,quantity: 1};
      setProduct(newProduct);
      let findProduct = cart.find(item => item._id === newProduct._id);
      findProduct.quantity = newProduct.quantity;
    } else {
      const newProduct = {...product, quantity: Number(e.target.value)};
      setProduct(newProduct);
      let findProduct = cart.find(item => item._id === newProduct._id);
      findProduct.quantity = newProduct.quantity;
    }
    setCart([...cart]);
    localStorage.setItem('inputCart',JSON.stringify(cart));
  }
  const onDelete = () => {
    const findIndex = cart.findIndex(item => item._id === product._id);
    cart.splice(findIndex,1);
    setCart([...cart]);
    localStorage.setItem('inputCart',JSON.stringify(cart));
}
  return (
    <BodyBodyLeftContainer>
      <ContentBodyLeftContainer><DeleteBtn onClick={onDelete}>Delete</DeleteBtn></ContentBodyLeftContainer>
      <ContentBodyLeftContainer>{product.category.category_name}</ContentBodyLeftContainer>
      <ContentBodyLeftContainer>{product.product_name}</ContentBodyLeftContainer>
      <ContentBodyLeftContainer>{product.unit}</ContentBodyLeftContainer>
      <ContentBodyLeftContainer><InputQuantity type="number" value={product.quantity} onChange={(e)=>{onChangeQuantity(e)}} /></ContentBodyLeftContainer>
      <ContentBodyLeftContainer>{product.cost_price}</ContentBodyLeftContainer>
      <ContentBodyLeftContainer>{Number(product.cost_price) * product.quantity}</ContentBodyLeftContainer>
    </BodyBodyLeftContainer>
  );
}
export default ProductImport;