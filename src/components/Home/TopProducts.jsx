/* eslint-disable react/prop-types */
import ProductItem from '../Products/ProductItem'

const TopProducts = ({ isLoading, isError, products }) => {

    return (
        <div className="px-4 py-2 md:px-8 md:py-3 flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">Highly Rated</h2>
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
        </div>
    )
}

export default TopProducts