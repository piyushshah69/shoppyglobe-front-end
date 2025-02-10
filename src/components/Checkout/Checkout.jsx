import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { emptyCart } from "../../app/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Calculating total amount and MRP
    const { amount, mrp } = cart.reduce((acc, curr) => {
        return { 
            amount: acc.amount + (curr.amount * curr.quantity),
            mrp: acc.mrp + (curr.product.price * curr.quantity),
        };
    }, { amount: 0, mrp: 0 })

    // Handle place order button click
    const handleClick = () => {
        toast.success('Order Placed Successfully!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        dispatch(emptyCart())
        navigate('/')
    }
    
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <div className="w-full max-w-[300px] flex flex-col p-4 border border-gray-400 gap-2">
                <div>
                    <Link className="btn btn-sm font-normal" to='/cart'> ᐸ </Link>
                </div>
                <p className="mb-2 font-semibold">PRICE DETAILS ({cart.length} Items)</p>
                <div className="flex items-center justify-between">
                    <p>Total MRP</p>
                    <p>${mrp.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Discount</p>
                    <p className="text-green-600">- {(mrp - amount).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Platform fee</p>
                    <p className="text-green-600">FREE</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Shipping fee</p>
                    <p className="text-green-600">FREE</p>
                </div>
                <hr className="text-gray-400 my-2" />
                <div className="flex items-center justify-between font-semibold">
                    <p>Total Amount</p>
                    <p className="text-xl text-primary">${amount.toFixed(2)}</p>
                </div>
                <button className="btn btn-primary" onClick={handleClick}>PLACE ORDER</button>
            </div>
        </div>
    )
}

export default Checkout;