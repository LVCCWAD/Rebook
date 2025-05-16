import { usePage } from "@inertiajs/react";
import react from "react";
import PassPropTest from "./PassPropTest"; // ipasok mo sa prop na ito

function ReactTest(){

    const {
        users,
        products,
        categories,
        reviews,
        shops,
     } = usePage().props

    // console.log(users)
    console.log('products --->',products)
    console.log('categories --->',categories)
    console.log('reviews --->',(reviews))
    console.log('shops --->',shops)

    return(
        <>
            {/* {users} ---> napaka mali nito dahil object to*/}

            {/* {users.map(user => (
                // {user} ---> mali parin ito kasi object my id to
                // ganito ang tamang pag retrieve ng data
                <li key={user.id}>
                    {user.name} - {user.email}
                </li>
            ))} */}

            <PassPropTest
                users={users}
                products={products}
                categories={categories}
                reviews={reviews}
                shops={shops}
            /> {/** ganito mag pasa sa components */}

        </>
    )


}

export default ReactTest
