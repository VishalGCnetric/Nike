import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [cartItemAdded, setCartItemAdded] = useState(false);
  const [btn, setBtn] = useState(false);

  // Mock data (replace with actual API calls if needed)
  const mockProductData = {
    product: {
      id: "70",
      name: "Air Jordan XXXIX PF 'Sol'",
      description:
        "<p>If you want to play on MJ's level, you have to put in the work to master the fundamentals: footwork, dribbling, passing, shooting. We're getting back to basics and celebrating the foundation of essential skills behind all of MJ's iconic moments with a crisp colourway that puts simplicity front and centre. Packed with court-ready tech, this AJ39 is here to help you focus on laying the groundwork for your own game.</p>",
      images: [
        {
          id: "airjordanxxxixpf__02__preview.png",
          url: "http://106.51.242.196:52344/assets/preview/81/airjordanxxxixpf__02__preview.png",
        },
      ],
      variants: [
        {
          id: "153",
          name: "Air Jordan XXXIX PF 'Sol' White/Black/University Red UK 9",
          price: 18395,
          currencyCode: "INR",
          images: [
            {
              id: "airjordanxxxixpf__02__preview.png",
              url: "http://106.51.242.196:52344/assets/preview/81/airjordanxxxixpf__02__preview.png",
            },
            {
              id: "airjordanxxxixpf-5__preview.png",
              url: "http://106.51.242.196:52344/assets/preview/e8/airjordanxxxixpf-5__preview.png",
            },
            {
              id: "airjordanxxxixpf-6__preview.png",
              url: "http://106.51.242.196:52344/assets/preview/88/airjordanxxxixpf-6__preview.png",
            },
            {
              id: "airjordanxxxixpf-7__preview.png",
              url: "http://106.51.242.196:52344/assets/preview/92/airjordanxxxixpf-7__preview.png",
            },
            {
              id: "airjordanxxxixpf-2__preview.png",
              url: "http://106.51.242.196:52344/assets/preview/ad/airjordanxxxixpf-2__preview.png",
            },
            {
              id: "airjordanxxxixpf-3__preview.png",
              url: "http://106.51.242.196:52344/assets/preview/21/airjordanxxxixpf-3__preview.png",
            },
            {
              id: "airjordanxxxixpf-4__02__preview.png",
              url: "http://106.51.242.196:52344/assets/preview/21/airjordanxxxixpf-4__02__preview.png",
            },
          ],
          attributes: {
            Size: "UK 9",
            Color: "White/Black/University Red",
          },
        },
      ],
    },
  };

  useEffect(() => {
    // Simulating product fetch
    setProductDetails(mockProductData.product);
    setSelectedVariant(mockProductData.product.variants[0]);
  }, []);

  const handleAddToCart = () => {
    // Simulating add to cart logic
    setBtn(!btn);
    setCartItemAdded(true); // Assuming item is added
  };

  const decrementQty = () => {
    setQty((prev) => Math.max(prev - 1, 1));
  };

  const incrementQty = () => {
    setQty((prev) => prev + 1);
  };

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faceShapeGuide =
    "https://india.ray-ban.com/pub/media/wysiwyg/Rb_PDP_opti/eyeglasses_faceshapeguide-min.jpg";

  return (
    <div className="p-4">
      <Toaster />
      <div className="flex items-center ml-5">
        <div className="mr-2 underline text-gray-700">Home</div>
        <div className="text-gray-700">
          <MdArrowForwardIos />
        </div>
        <div className="ml-2 font-bold">{productDetails?.name}</div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row p-5">
        <div className="flex flex-col gap-5 w-full md:w-2/3">
          <div>
            <img
              src={selectedVariant?.images[0]?.url}
              alt="Main Product"
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            {selectedVariant?.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 cursor-pointer"
              />
            ))}
          </div>
          <div className="sticky top-0 flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-bold">{selectedVariant?.name}</h1>
              <p className="text-gray-600">New Arrivals</p>
            </div>
            <div className="flex justify-between items-center">
              <div>SIZE:</div>
              <span className="text-lg">{selectedVariant?.attributes?.Size}</span>
            </div>
            <div className="flex items-center justify-between">
              <button
                disabled={qty === 1}
                onClick={decrementQty}
                className="px-4 py-2 text-lg bg-gray-300 rounded"
              >
                -
              </button>
              <span className="px-4 py-2 text-lg">{qty}</span>
              <button
                onClick={incrementQty}
                className="px-4 py-2 text-lg bg-gray-300 rounded"
              >
                +
              </button>
            </div>
            <div className="flex justify-between">
              <a href="#" className="text-blue-600 underline">
                Size Guide
              </a>
              <a href="#" className="text-blue-600 underline">
                Face Guide
              </a>
            </div>
            <div>
              <div>FRAME {selectedVariant?.attributes?.Color}</div>
            </div>
            <div className="flex gap-2">
              <div>{productDetails?.variants?.length} COLOR</div>
              {productDetails?.variants?.map((variant, index) => (
                <img
                  key={index}
                  onClick={() => setSelectedVariant(variant)}
                  src={variant.images[0].url}
                  alt="Color Option"
                  className="w-10 h-10 cursor-pointer"
                />
              ))}
            </div>
            <div>
              <div className="divide-y">
                <div
                  onClick={() => handleToggle(0)}
                  className="flex justify-between items-center py-3 cursor-pointer"
                >
                  <div>MANUFACTURING, PACKAGING AND IMPORT INFO</div>
                  <div>
                    {activeIndex === 0 ? <IoIosArrowDown /> : <MdArrowForwardIos />}
                  </div>
                </div>
                {activeIndex === 0 && (
                  <div className="p-3">
                    Here is some information about manufacturing, packaging, and import.
                  </div>
                )}
              </div>
              <div className="divide-y">
                <div
                  onClick={() => handleToggle(1)}
                  className="flex justify-between items-center py-3 cursor-pointer"
                >
                  <div>SIZE</div>
                  <div>
                    {activeIndex === 1 ? <IoIosArrowDown /> : <MdArrowForwardIos />}
                  </div>
                </div>
                {activeIndex === 1 && (
                  <div className="p-3">Here is some information about size.</div>
                )}
              </div>
              <div className="flex items-center py-3">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/delivery.png"
                  alt="Fast Delivery Icon"
                  width="24"
                  height="24"
                />
                <span className="ml-2">FAST DELIVERY</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <button
                onClick={handleAddToCart}
                className={`w-full px-6 py-3 bg-gray-800 text-white rounded-lg ${
                  btn ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={btn}
              >
                ADD TO CART
              </button>
              <button className="w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-lg">
                BUY NOW
              </button>
              {cartItemAdded && (
                <div className="text-green-600">Item added to cart successfully!</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div>
            <div className="text-lg text-gray-700">PRODUCT DETAILS</div>
            <div
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: productDetails?.description }}
            />
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold">Other Details</h3>
            <ul>
              <li>Brand: Nike</li>
              <li>Category: Shoes</li>
              <li>Material: Leather</li>
              <li>Product ID: {productDetails.id}</li>
            </ul>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold">RELATED PRODUCTS</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Render related products here */}
              <div className="border p-2">
                <img
                  src={selectedVariant?.images[1]?.url}
                  alt="Related Product"
                  className="w-full"
                />
                <div className="text-center mt-2">Product Name</div>
              </div>
              <div className="border p-2">
                <img
                  src={selectedVariant?.images[2]?.url}
                  alt="Related Product"
                  className="w-full"
                />
                <div className="text-center mt-2">Product Name</div>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold">REVIEWS</h3>
            <div>
              {/* Example review */}
              <div className="border-b pb-2 mb-2">
                <div className="text-gray-600">John Doe</div>
                <div className="text-sm text-gray-500">"Great product, highly recommend!"</div>
              </div>
            </div>
            <Link to="/write-review" className="text-blue-600 underline">
              Write a Review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
