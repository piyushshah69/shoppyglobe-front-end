    import { useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { Link } from "react-router-dom";
    import { addToCart, removeFromCart } from "../../app/cart/cartSlice";

    /* eslint-disable react/prop-types */
    const ProductItem = (props) => {
        const { id, title, category, rating, price, discountPercentage, thumbnail } = props.product;
        const cart = useSelector(state => state.cart);
        const [isItemInCart, setIsItemInCart] = useState(cart.some(item => item.id === id));
        const dispatch = useDispatch();

        const handleAddClick = () => {
            dispatch(addToCart(props.product));
            setIsItemInCart(true);
        }

        const handleRemoveClick = () => {
            dispatch(removeFromCart(id));
            setIsItemInCart(false);
        }

        return (
            <div className="flex flex-col items-center gap-2">
                <Link to={`/products/${id}`} className="group relative cursor-pointer bg-blue-50 w-full">
                    <img src={thumbnail} className="transition-all w-full group-hover:opacity-30 bg-blue-50 group-hover:blur-sm" />
                    <div className="absolute top-0 scale-[0.1] flex justify-center items-center w-full h-full opacity-0 transition-all group-hover:opacity-100 group-hover:scale-[1]">
                        <div className="p-4 flex flex-col items-center text-center">
                            <p className="text-primary capitalize">{category}</p>
                            <div className="flex items-center gap-2">
                                <p>Ratings - <span className="text-green-800">{rating}</span></p>
                            </div>
                            <h3 className="text-xl sm:text-2xl">{title}</h3>
                            <p className="text-4xl text-primary mt-4">${(price - (discountPercentage / 100) * price).toFixed(2)}</p>
                            <p className="italic"><span className="line-through">${price}</span> -{discountPercentage}%</p>
                        </div>
                    </div>
                </Link>
                {
                    isItemInCart ?
                        <button onClick={handleRemoveClick} className="btn btn-sm btn-error bg-red-500 text-white font-normal">Remove from Cart</button>
                        :
                        <button onClick={handleAddClick} className="btn btn-sm btn-primary font-normal">Add to Cart</button>
                }
            </div>
        )
    }

    export default ProductItem;