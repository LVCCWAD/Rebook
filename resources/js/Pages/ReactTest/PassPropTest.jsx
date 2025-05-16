import react from "react";

function PassPropTest({ users, products, categories, reviews, shops }){ // mag lagay ka dito kung gusto mo ipasa ang data
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
        </>
    )
}

export default PassPropTest
