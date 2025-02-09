import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
    const products = useSelector(state => state.cart);

    return (
        <div className="p-4 sm:p-8 min-h-[80vh] flex items-center justify-center">
            <div className="pr-3 max-w-[700px] w-full h-[80vh] overflow-auto flex flex-col gap-2">
                {
                    products.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Cart
