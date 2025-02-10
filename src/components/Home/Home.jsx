import { useEffect, useState } from "react";
import heroImage from "../../assets/images/hero-image.png"
import { PiTruckDuotone } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import TopProducts from "./TopProducts";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetching products
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products?sortBy=rating&order=desc&limit=12');
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            setIsError(true);
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>
            {/* Hero Section  */}
            <div className="hero bg-blue-100 py-8 min-h-[50vh]">
                <div className="hero-content flex-col gap-8 md:gap-18 md:flex-row-reverse">
                    <img className="w-60 lg:w-90"
                        src={heroImage} />
                    <div className="lg:w-[40%] flex flex-col items-center text-center md:items-start md:text-start">
                        <h1 className="text-3xl md:atext-5xl font-bold capitalize">
                            A perfect place where the shopaholic shops</h1>
                        <p className="py-3 lg:py-6 text-sm md:text-lg">
                            Shoppy Globe is your one-stop online marketplace for discovering unique and trending products from around the world. We curate a diverse selection of items, offering everything from handmade crafts to innovative gadgets and everyday essentials.
                        </p>
                        <Link to='/products'>
                            <button className="btn btn-primary">Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section  */}
            <div className="px-4 py-4 md:px-8 md:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                <div className="flex items-center gap-4 p-3 md:p-5 bg-gray-100">
                    <div>
                        <PiTruckDuotone className="text-5xl" />
                    </div>
                    <div>
                        <p className="text-xl">Free Delivery</p>
                        <p>On all the products</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-3 md:p-5 bg-gray-100">
                    <div>
                        <GiTakeMyMoney className="text-5xl" />
                    </div>
                    <div>
                        <p className="text-xl">Refunds</p>
                        <p>Quick and hassle-free.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-3 md:p-5 bg-gray-100">
                    <div>
                        <RiDiscountPercentLine className="text-5xl" />
                    </div>
                    <div>
                        <p className="text-xl">Discounts</p>
                        <p>Discounts on products</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-3 md:p-5 bg-gray-100">
                    <div>
                        <PiTruckDuotone className="text-5xl" />
                    </div>
                    <div>
                        <p className="text-xl">24/7 Support</p>
                        <p>Call anytime for support</p>
                    </div>
                </div>
            </div>

            {/* Top rated products section*/}
            <TopProducts isError={isError} isLoading={isLoading} products={products} />

            {/* Banner section */}
            <div className="flex px-4 py-2 md:px-8 md:py-3 gap-6">
                <div className="flex flex-col items-center bg-gray-100 w-full px-8 py-8 md:px-16 md:py-12 gap-4 text-center">
                    <h1 className="text-2xl">
                        {`Don't miss out on all the amazing offers`}
                    </h1>
                    <Link to='/products'>
                        <button className="btn btn-primary">Explore Now</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;