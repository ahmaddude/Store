import { useOrderStore } from "../store/orderStore"
import { useEffect } from "react";


const OrderPage = () => {
    const{getOrders,orders}=useOrderStore()
    useEffect(() => {
        getOrders();
      }, [getOrders]); 
      if (!orders || orders.length === 0) {return <div className="text-white text-center">Your order is empty</div>;}
  return (
    <div>
      <div className=" p-4 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
        {orders.map((order) => (
            <div key={order._id} className="bg-gray-800 p-4 rounded">
            <p className="text-white font-semibold">
  {order.items.map((item, index) => (
    <span key={index}>
      {item.product.name} {item.quantity} piece<br />
    </span>
  ))}
</p>

            <h2 className="text-white font-semibold">Total Price: {order.totalAmount}</h2>
            <p className="text-white font-semibold">{order.createdAt}</p>
            <p className="text-white font-semibold">{order.status}</p>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default OrderPage
