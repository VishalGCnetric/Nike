import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductById } from '../redux/slices/productSlices';
import { useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { ShoppingBag } from '@mui/icons-material';
import ShoppingLoader from '../Component/Loader/ShoppingLoader';

const ProductDetails = () => {
    const [productData, setProductData] = useState({});
    const [variantData, setVariantData] = useState({})
    const [mainImage, setMainImage] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const params = useParams();

    const containerRef = useRef(null);

    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = 100; // Adjust scroll amount as needed
            containerRef.current.scrollBy({
                top: direction === 'down' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getProductById(params.id));
                setProductData(response.payload.product);
                setVariantData(response.payload.product.variants[0])
                setMainImage(response.payload.product.variants?.[0].images[0].url)
            } catch (err) {
                setError('Failed to fetch product details');
                toast.error('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, params.id]);

    if (loading) return <ShoppingLoader/> ;
    if (error) return <div>{error}</div>;


    return (
        <>
            <Toaster />
            <div className="container mx-auto w-full px-28 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Images */}
                    <div className="col-span-1">
                        <div className="flex">
                            {/* Thumbnail Images */}
                            <div className="relative">
                                <div
                                    className="flex flex-col space-y-2 overflow-hidden"
                                    style={{ maxHeight: '500px' }}
                                    ref={containerRef}
                                >
                                    {variantData?.images?.map((image, index) => (
                                        <img
                                            onClick={() => setMainImage(image.url)}
                                            key={index}
                                            src={image.url}
                                            alt={`Thumbnail ${index}`}
                                            className={`w-20 h-20 border ${mainImage === image.url ? 'border-red-500' : ''} cursor-pointer object-cover`}
                                        />
                                    ))}
                                </div>
                                {/* Scroll Buttons */}
                                <button
                                    onClick={() => scroll('up')}
                                    className="absolute top-0 left-0 w-full py-2 bg-gray-200 hover:bg-gray-300"
                                // style={{ display: containerRef.current?.scrollTop > 0 ? 'block' : 'none' }}
                                >
                                    &uarr;
                                </button>
                                <button
                                    onClick={() => scroll('down')}
                                    className="absolute bottom-0 left-0 w-full py-2 bg-gray-200 hover:bg-gray-300"
                                    style={{ display: containerRef.current?.scrollHeight > containerRef.current?.clientHeight ? 'block' : 'none' }}
                                >
                                    &darr;
                                </button>
                            </div>
                            {/* Main Image */}
                            <div className="flex-1 ml-4">
                                <img
                                    src={mainImage}
                                    alt="Main Product"
                                    className="w-full h-full object-cover border"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="col-span-1 space-y-4">
                        <h1 className="text-2xl font-semibold">{productData?.name}</h1>
                        <p className="text-gray-500">{variantData?.name}</p>
                        <p className="text-xl font-bold">MRP: ₹ {variantData?.price?.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-400">Incl. of taxes</p>
                        <div className="space-y-4">
                            <div className="flex space-x-2">
                                {productData?.variants?.map((variant) => (
                                    <span
                                        onClick={() => { setVariantData(variant); setMainImage(variant.images[0].url) }}
                                        key={variant.id}
                                        className={`px-3 py-1 border rounded ${variantData.id === variant.id ? 'bg-gray-200' : ''}`}
                                    >
                                        {variant.attributes.size||variant.attributes.Size}
                                    </span>


                                ))}
                            </div>
                            <button className="w-full bg-black text-white py-3 rounded">
                                Add to Bag
                            </button>
                            <button className="w-full border py-3 rounded flex items-center justify-center space-x-2">
                                <span>Favourite</span>
                                <span>♡</span>
                            </button>
                            <p className="text-sm text-gray-500">{productData?.description}</p>
                        </div>

                        <ul className="text-gray-700">
                            <li>• Colour Shown: Multi-Colour/Multi-Colour</li>
                            <li>• Style: FZ8753-900</li>
                            <li>• Country/Region of Origin: Vietnam</li>
                        </ul>
                        <div className="space-y-2">
                            <p className="text-black font-semibold cursor-pointer">View Product Details</p>
                            <p className="text-black font-semibold cursor-pointer">Delivery & Returns</p>
                            <p className="text-black font-semibold cursor-pointer">Reviews (1)</p>
                            <p className="text-black font-semibold cursor-pointer">Product Information</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
