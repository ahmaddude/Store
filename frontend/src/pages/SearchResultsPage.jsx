import { useProductsStore } from '../store/productsStore';
import FlipCard from '../components/productCard'; 
import { useEffect } from 'react';


    const SearchResultsPage = () => {
        const { searchProducts,searchResults } = useProductsStore();

        useEffect(() => {
            searchProducts()
        },[searchProducts,searchResults]
        )


            return (
                <div className="p-4 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
                {searchResults.map((product) => (
                <FlipCard key={product._id} product={product} />
                ))}
                </div>
            )
        }
        export default SearchResultsPage;