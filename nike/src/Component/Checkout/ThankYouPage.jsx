import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'; // For date formatting
import { useDispatch } from 'react-redux';
import { getOrderDetails } from '../../redux/slices/orders';
import { useParams } from 'react-router-dom';

const ThankYouPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getOrderDetails(params.orderId));
        setOrderData(response.payload.data.order);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, params.orderId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!orderData) {
    return <p>Failed to load order data</p>;
  }

  const {
    id,
    orderPlacedAt,
    subTotalWithTax,
    shippingWithTax,
    totalWithTax,
    currencyCode,
    state,
    lines,
    shippingAddress,
    billingAddress,
    deliveryType
    
  } = orderData;

//   const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
//   const billingAddress=JSON.parse(localStorage.getItem('shippingAddress'));
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Thank You Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-green-600">Thank You for Your Order!</h1>
        <div className="md:ml-4 mt-4 md:mt-0">
          <h2 className="text-xl font-semibold">Order ID: {id}</h2>
          <p className="text-gray-700">
            Placed On:{' '}
            {format(new Date(orderPlacedAt), 'MMM dd, yyyy HH:mm:ss')}
          </p>
          <p className="text-gray-700">
            Status:{' '}
            <span
              className={`font-bold ${
                state === 'Cancelled' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {state}
            </span>
          </p>
          {/* <div>deliveryType: {deliveryType}</div> */}
        </div>
      </div>

      {/* Order Summary and Items */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <p>
              Subtotal (with Tax):{' '}
              <span className="font-bold">
                {currencyCode} {subTotalWithTax.toFixed(2)}
              </span>
            </p>
            <p>
              Shipping (with Tax):{' '}
              <span className="font-bold">
                {currencyCode} {shippingWithTax.toFixed(2)}
              </span>
            </p>
            <p>
              Total (with Tax):{' '}
              <span className="font-bold">
                {currencyCode} {totalWithTax.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          {lines.map((line) => (
            <div
              key={line.id}
              className="flex items-center bg-white p-3 mb-3 rounded-md shadow"
            >
              <img
                src={line.productVariant.featuredAsset.preview}
                alt={line.productVariant.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="text-lg font-semibold">{line.productVariant.name}</p>
                <p className="text-gray-700">Quantity: {line.quantity}</p>
                <p className="text-gray-700">
                  Price (with Tax): {currencyCode}{' '}
                  {line.linePriceWithTax.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping and Billing Addresses */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Shipping Address */}
        {shippingAddress?.fullName?<div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p className="font-bold mb-1">{shippingAddress?.fullName} </p>
          <p>{shippingAddress.phoneNumber}</p>
          <p>{shippingAddress.streetLine1} {shippingAddress?.streetLine2}</p>
          <p>
            {shippingAddress?.city}, {shippingAddress?.province}{' '}
            {shippingAddress?.postalCode}
          </p>
          <p>{shippingAddress?.country}</p>
        </div>:<></>}

        {/* Billing Address */}
        {billingAddress?.fullName?<div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
          <p className="font-bold mb-1">{billingAddress?.fullName} </p>          <p>{billingAddress?.phoneNumber}</p>
          <p>{billingAddress?.streetLine1} {billingAddress?.streetLine2}</p>
          <p>
            {billingAddress?.city}, {billingAddress?.province}{' '}
            {billingAddress?.postalCode}
          </p>
          <p>{billingAddress?.country}</p>
        </div>:<></>}
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
