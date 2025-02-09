/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [productsSkipNumber, setProductsSkipNumber] = useState(0);
    const [baseUrl, setBaseUrl] = useState(`https://dummyjson.com/products?&limit=12`);
    const [fetchUrl, setFetchUrl] = useState(`${baseUrl}&skip=0`);
    const [searchInput, setSearchInput] = useState("");
    const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(fetchUrl);
            const data = await response.json();
            setProducts(data.products);
            console.log(data.products);
            console.log(data);
            if (productsSkipNumber + 12 >= data.total) {
                setIsNextDisabled(true);
            } else {
                setIsNextDisabled(false);
            }
        } catch (error) {
            setIsError(true);
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput === "") {
            setIsPreviousDisabled(true);
            setBaseUrl(`https://dummyjson.com/products?&limit=12`)
            setFetchUrl(`https://dummyjson.com/products/?limit=12&skip=0`)
            return;
        }
        setIsPreviousDisabled(true);
        setProductsSkipNumber(0);
        setBaseUrl(`https://dummyjson.com/products/search?limit=12&q=${searchInput}`);
        setFetchUrl(`https://dummyjson.com/products/search?limit=12&q=${searchInput}&skip=0`)
    }

    const handlePreviousClick = () => {
        setIsNextDisabled(false);
        if (productsSkipNumber == 12) {
            setIsPreviousDisabled(true); 
        }
        setFetchUrl(`${baseUrl}&skip=${productsSkipNumber - 12}`);
        setProductsSkipNumber(productsSkipNumber - 12);
    }

    const handleNextClick = () => {
        setIsPreviousDisabled(false);
        setFetchUrl(`${baseUrl}&skip=${productsSkipNumber + 12}`);
        setProductsSkipNumber(productsSkipNumber + 12);
    }

    useEffect(() => {
        fetchProducts();
        console.log(productsSkipNumber);
    }, [fetchUrl])

    return (
        <div className="min-h-[80vh]">
            <div className="px-4 py-2 md:px-8 md:py-3 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="breadcrumbs text-sm">
                        <ul>
                            <li>
                                <Link to='/'>
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li>Products</li>
                        </ul>
                    </div>
                    <form onSubmit={(e)=>{handleSearch(e)}} className="flex gap-2">
                        <input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder="Search Products, Brands & More" className="input input-bordered w-65 sm:w-80 focus:outline-0"></input>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
                {isLoading && 
                    <div className="flex justify-center">
                        <span className="text-xl">Loading...</span>
                    </div>
                }
                {
                    (!isLoading && !isError) && (products.length > 0 ?
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {products.map((product) => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </div> :
                        <div className="flex flex-col items-center">
                            <h3 className="text-3xl">Sorry, no results found!</h3>
                            <p>Try searching something else</p>
                        </div>
                    )
                }
                {isError &&
                    <div className="flex flex-col items-center">
                        <h3 className="text-3xl">Sorry, error occured!</h3>
                    </div>
                }

                <div className="flex justify-center mt-8">
                    <div className="join grid grid-cols-2">
                        <button className="join-item btn btn-outline" onClick={handlePreviousClick} disabled={isPreviousDisabled}>Previous</button>
                        <button className="join-item btn btn-outline" onClick={handleNextClick} disabled={isNextDisabled}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;