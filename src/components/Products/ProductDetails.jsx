/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FiTruck } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { addToCart, removeFromCart } from "../../app/cart/cartSlice";
import PageLoader from "../Loaders/PageLoader"
import { Bounce, toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [isSimilarProductLoading, setIsSimilarProductLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const cart = useSelector(state => state.cart);
    const [isItemInCart, setIsItemInCart] = useState(cart.some(item => item.id === id));
    const dispatch = useDispatch();

    // Fetching products data
    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            setProduct(data);

        } catch (error) {
            setIsError(true);
            console.log(error.message);
        } finally {
            setIsProductLoading(false);
        }
    }

    // Fetching similar products data 
    const fetchSimilarProducts = async () => {
        try {
            const response2 = await fetch(`https://dummyjson.com/products/category/${product.category}`);
            const similarData = await response2.json();
            setSimilarProducts(similarData.products);
            console.log(similarData.products);
        } catch (error) {
            // setIsError(true);
            console.log(error.message);
        } finally {
            setIsSimilarProductLoading(false);
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [id])
    useEffect(() => {
        fetchSimilarProducts();
    }, [product])

    // Handle click on image
    const handleImageClick = (idx) => {
        setCurrentImageIndex(idx);
    }

    // Handle add to cart click
    const handleAddClick = () => {
        toast.success('Added Successfully!', {
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
        dispatch(addToCart(product));
        setIsItemInCart(true);
    }

    // Handle remove from cart click
    const handleRemoveClick = () => {
        toast.success('Removed Successfully!', {
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
        dispatch(removeFromCart(id));
        setIsItemInCart(false);
    }

    return (
        <div className="p-4 sm:p-8 min-h-screen">
            {
                isProductLoading &&
                <PageLoader />
            }
            {
                (!isProductLoading && !isError) &&
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className="md:w-[45%] flex flex-col gap-2">
                        <div className="w-full grid grid-cols-1">
                            <LazyLoadImage src={product.images[currentImageIndex]} className="bg-blue-50 cursor-pointer transition-all w-full aspect-square object-contain"
                                effect="blur"
                            />
                        </div>
                        <div className="w-full grid grid-cols-5 gap-2">
                            {
                                product.images.map((img, idx) => (
                                    <LazyLoadImage key={idx} src={img} className={`bg-blue-50 cursor-pointer aspect-square object-contain hover:animate-pulse ${currentImageIndex == idx && 'border border-gray-300'}`}
                                        onClick={() => handleImageClick(idx)}
                                        effect="blur"
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-full md:w-[55%]">
                        <h2 className="text-lg uppercase font-semibold">{product.brand}</h2>
                        <h1 className="text-xl sm:text-2xl text-gray-700">{product.title}</h1>
                        <div className="join grid grid-cols-2 mt-2">
                            <div className="join-item px-1 border border-gray-300 flex items-center justify-center gap-1">{product.rating} <IoMdStar className="text-yellow-400 text-xl" /></div>
                            <div className="join-item px-1 border border-gray-300 flex items-center justify-center gap-1">{product.reviews.length} Ratings</div>
                        </div>
                        <div className="divider w-full"></div>
                        <div className="flex items-center gap-2 mb-4">
                            <p className="text-3xl md:text-4xl text-primary">${(product.price - (product.discountPercentage / 100) * product.price).toFixed(2)}</p>
                            <p className="italic text-xl md:text-2xl"><span className="line-through">${product.price}</span> ({product.discountPercentage}% <span className="text-orange-700">OFF</span>)</p>
                        </div>
                        {
                            isItemInCart ?
                                <button onClick={handleRemoveClick} className="btn bg-red-500 text-white font-normal">Remove from Cart</button>
                                :
                                <button onClick={handleAddClick} className="btn btn-primary font-normal">Add to Cart</button>
                        }
                        <div className="border border-gray-300 py-2 px-4 flex flex-col gap-2 rounded mt-4">
                            <p className="flex items-center gap-2"><VscWorkspaceTrusted /> {product.warrantyInformation}</p>
                            <p className="flex items-center gap-2"><FaPeopleCarryBox /> {product.returnPolicy}</p>
                            <p className="flex items-center gap-2"> <FiTruck /> {product.shippingInformation}</p>
                        </div>
                        <div className="divider"></div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold mb-2">Product Details</h3>
                            <p>{product.description}</p>
                            <p className="capitalize"><span className="italic">Category</span> - {product.category}</p>
                        </div>
                        <div className="divider"></div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold mb-2">Customer Reviews</h3>
                            {
                                product.reviews.map((review, idx) => (
                                    <div key={idx}>
                                        <div>
                                            <p className="flex items-center gap-2">{review.reviewerName}
                                                <span className="flex items-center gap-1 bg-gray-100 px-1"><IoMdStar className="text-yellow-500 text-xl" /> {review.rating}</span>
                                                {new Date(review.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <p className="my-1 italic">{`"${review.comment}"`}</p>
                                        <hr className="text-gray-200 my-4" />
                                    </div>
                                ))
                            }
                        </div>
                        <h3 className="font-semibold my-2">Similar Products -</h3>
                        {
                            (!isSimilarProductLoading && !isError) &&
                            similarProducts.map((product) => (
                                <Link key={product.id} className="flex flex-col items-center underline" to={`/products/${product.id}`}>
                                    <p>{product.title}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails;