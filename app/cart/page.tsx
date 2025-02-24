// 'use client';

// import { useCart } from '../../context/CartContext';
// import { useState } from 'react';

// export default function Cart() {
//   const { cart, dispatch } = useCart();
//   const [clientSecret, setClientSecret] = useState<string>('');

//   const handleCheckout = async () => {
//     const response = await fetch('/api/stripe-payment', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ cart }),
//     });
//     const { id }: { id: string } = await response.json();
//     // Handle Stripe Checkout redirect here
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div>
//       <h1>Cart</h1>
//       {cart.map(item => (
//         <div key={item._id}>
//           <h3>{item.name}</h3>
//           <p>Quantity: {item.quantity}</p>
//           <p>${item.price * item.quantity}</p>
//           <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item._id })}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <p>Total: ${total}</p>
//       <button onClick={handleCheckout}>Checkout</button>
//     </div>
//   );
// }

'use client';

import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} className="border p-4 mb-2">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item._id })}
                className="bg-red-500 text-white px-2 py-1"
              >
                Remove
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item._id, quantity: item.quantity + 1 },
                  })
                }
                className="bg-blue-500 text-white px-2 py-1 ml-2"
              >
                +
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item._id, quantity: Math.max(1, item.quantity - 1) },
                  })
                }
                className="bg-blue-500 text-white px-2 py-1 ml-2"
              >
                -
              </button>
            </div>
          ))}
          <p className="font-bold">Total: ${total.toFixed(2)}</p>
          <p className="text-gray-600">
            To place an order, please contact us at support@yourstore.com with your cart details.
          </p>
        </>
      )}
    </div>
  );
}