import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";

const Cart = () => {
    const products = useSelector(state => state.cart);

    return (
        <div className="p-4 sm:p-8 min-h-[80vh] flex items-center justify-center">
            <div className="pr-3 max-w-[700px] w-full h-[80vh] overflow-auto flex flex-col items-start gap-2">
                {(products.length > 0) && 
                    <Link to='/checkout' className="btn btn-sm mb-2">Checkout</Link>
                }
                {
                    (products.length > 0) ?
                    products.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))
                        :
                        <div className="flex flex-col items-center gap-1 pt-4 text-center w-full">
                            <GiShoppingCart className="text-8xl md:text-9xl text-primary mb-4" />
                            <p className="text-2xl md:text-3xl">Cart is currently empty...</p>
                            <p className="text-lg md:text-xl">Seems like you have not added anything yet.</p>
                        <Link to='/products' className="btn font-normal text-lg mt-2">Add Items</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart
