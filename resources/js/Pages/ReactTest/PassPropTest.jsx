import react from "react";

function PassPropTest({
    carts,
    cartItems,
    categories,
    orders,
    orderItems,
    payments,
    products,
    reviews,
    shippings,
    shops,
    users,
}){ // mag lagay ka dito kung gusto mo ipasa ang data

    return(
        <>
            <p className="font-bold text-2xl mt-10">USERS</p>
            <hr />
            {users && users.map(user => (
                <li key={user.id}>
                    {user.id} - {user.name} - {user.email} - {user.role}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">PRODUCTS</p>
            <hr />
            {products && products.map(product => (
                <li key={product.id}>
                    {product.id} - {product.name} - {product.description} - {product.price}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">CATEGORIES</p>
            <hr />
            {categories && categories.map(cateogry => (
                <li key={cateogry.id}>
                    {cateogry.id} - {cateogry.name}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">REVIEWS</p>
            <hr />
            {reviews && reviews.map(review => (
                <li key={review.id}>
                    {review.id} - {review.rating} - {review.comment}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">SHOPS</p>
            <hr />
            {shops && shops.map(shop => (
                <li key={shop.id}>
                    {shop.id} - {shop.shop_name} - {shop.description} - Seller ID: [{shop.seller_id}]
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">CARTS</p>
            <hr />
            {carts && carts.map(cart => (
                <li key={cart.id}>
                    {cart.id} - {cart.user_id}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">CARTITEMS</p>
            <hr />
            {cartItems && cartItems.map(cartItem => (
                <li key={cartItem.id}>
                    {cartItem.id} - {cartItem.quantity} - {cartItem.product_id} - {cartItem.cart_id}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">ORDERS</p>
            <hr />
            {orders && orders.map(order => (
                <li key={order.id}>
                    {order.id} - {order.status} - {order.total} - {order.user_id}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">ORDERITEMS</p>
            <hr />
            {orderItems && orderItems.map(orderItem => (
                <li key={orderItem.id}>
                    {orderItem.id} - {orderItem.quantity} - {orderItem.price} - {orderItem.product_id} - {orderItem.order_id}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">PAYMENTS</p>
            <hr />
            {payments && payments.map(payment => (
                <li key={payment.id}>
                    {payment.id} - {payment.amount} - {payment.status} - {payment.transaction_id} - {payment.order_id} - {payment.user_id}
                </li>
            ))}

            <p className="font-bold text-2xl mt-10">SHIPPINGS</p>
            <hr />
            {shippings && shippings.map(shipping => (
                <li key={shipping.id}>
                    {shipping.id} - {shipping.city_name} - {shipping.zip_code} - {shipping.address} - {shipping.country} - {shipping.order_id} - {shipping.user_id}
                </li>
            ))}
        </>
    )
}

export default PassPropTest
