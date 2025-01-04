import { useProductCart } from "../store/CartProduct";
import CustomButton from "./CustomButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
const CartPage = () => {
  const products = useProductCart((state) => state.productsForCart);
  const removeFromCart = useProductCart((state) => state.removeProductFromCart);
  const increaseQuantity = useProductCart((state) => state.increaseQuantity);
  const decreaseQuantity = useProductCart((state) => state.decreaseQuantity);
  console.log("products is", products);

  
  const totalPrice = products.reduce(
    (total, product) => total + product.price * (product.amount ?? 1),
    0
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {products.length === 0 ? (
        <div style={{padding: "0 10px"}}>
          <h1>OOPs!... Your cart is empty</h1>
          <img width={"90%"} src="/empty-cart.png" alt="Empty Cart" />
        </div>
      ) : (
        <>
          <h1>Cart</h1>

          {products.map((product) => (
            <div
              key={product.id}
              style={{
                marginBottom: "16px",
                border: "1px solid #c6c7c8",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <img src={product.images[0]} width="300px" alt={product.title} />
              <h2>{product.title}</h2>
              <p>
                Price: ${(product.price * (product.amount ?? 1)).toFixed(2)}
              </p>
              <p>Quantity: {product.amount ?? 1}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <CustomButton
                  onClick={() => increaseQuantity(product.id)}
                  color="primary"
                  size="small"
                  icon={<AddIcon />}
                ></CustomButton>
                <CustomButton
                  onClick={() => decreaseQuantity(product.id)}
                  color="secondary"
                  size="small"
                  icon={<RemoveIcon />}
                ></CustomButton>
                <CustomButton
                  onClick={() => removeFromCart(product.id)}
                  color="danger"
                  size="small"
                  icon={<DeleteIcon />}
                ></CustomButton>
              </div>
            </div>
          ))}
          
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
