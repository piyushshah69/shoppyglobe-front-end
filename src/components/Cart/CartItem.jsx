/* eslint-disable react/prop-types */
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux"
import { addToCart, decreaseQuantity, removeFromCart } from "../../app/cart/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState } from "react";
import { Link } from "react-router-dom";

const CartItem = ({product}) => {
    const dispatch = useDispatch();
    const [showMinus, setShowMinus] = useState(product.quantity > 1);

    // Handle increase quantity click
    const handleAddClick = (product) => {
        setShowMinus(true);
        dispatch(addToCart(product));
    }

    // Handle decrease quantity click
    const handleRemoveClick = (id, quantity) => {
        if (quantity == 2) {
            setShowMinus(false);
        }
        if (quantity > 1) {
            dispatch(decreaseQuantity(id));
        } else {
            dispatch(removeFromCart(id));
        }
    }

    // Handle remove product from cart
    const handleRemoveProduct = (id) => {
        dispatch(removeFromCart(id));
    }
    
    return (
        <div key={product.id} className="flex gap-4 md:gap-6 p-2 border border-gray-300 w-full">
            <Link to={`/products/${product.id}`} className="w-[25%]">
                <div className="w-full h-full object-contain grid grid-cols-1 bg-blue-50">
                    <LazyLoadImage src={product.product.thumbnail} className="bg-blue-50 w-fill h-full object-contain" effect="blur" />
                </div>
            </Link>
            <div className="relative w-[75%] flex flex-col items-start justify-center">
                <button className="btn btn-sm btn-circle btn-ghost absolute top-[-5px] right-[-5px]" onClick={() => document.getElementById('my_modal_2').showModal()}><span className="text-lg">✕</span></button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box max-w-[400px]">
                        <h3 className="font-bold text-lg">Remove from Cart</h3>
                        <p className="py-1 mb-1">Are you sure you want to remove the item from cart?</p>
                        <form method="dialog">
                            <button onClick={() => handleRemoveProduct(product.id)} className="btn btn-sm btn-error bg-red-600 text-white mr-1">Remove</button>
                            <button className="btn btn-sm btn-primary">Cancel</button>
                        </form>
                    </div>
                </dialog>
                <h3 className="font-semibold">{product.product.brand}</h3>
                <h2 className="text-lg mb-2">{product.product.title}</h2>
                <div className="flex items-center gap-2 mb-1">
                    <button className="p-1 cursor-pointer border disabled:opacity-30" onClick={() => { handleRemoveClick(product.id, product.quantity) }} disabled={!showMinus}>
                        <AiOutlineMinus />
                    </button>
                    <p className="text-lg">{product.quantity}</p>
                    <button className="p-1 cursor-pointer border" onClick={() => { handleAddClick(product.product) }}>
                        <AiOutlinePlus />
                    </button>
                </div>
                <div className="flex items-center gap-2 ">
                    <p className="text-xl md:text-2xl text-primary">${((product.product.price - (product.product.discountPercentage / 100) * product.product.price) * product.quantity).toFixed(2)}</p>
                    <p className="italic text-md md:text-lg"><span className="line-through">${product.product.price * product.quantity}</span> ({product.product.discountPercentage}% <span className="text-orange-700">OFF</span>)</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem;