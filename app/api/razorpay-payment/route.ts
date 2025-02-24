// import { NextRequest, NextResponse } from 'next/server';
// //import Razorpay from 'razorpay';

// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID || '',
// //   key_secret: process.env.RAZORPAY_KEY_SECRET || '',
// // });

// export async function POST(req: NextRequest) {
//   try {
//     const { cart } = await req.json();

//     const order = await razorpay.orders.create({
//       amount: cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) * 100, // Amount in paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     });

//     return NextResponse.json({ orderId: order.id }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }