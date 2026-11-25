import EditProductPage from "../../../../components/edit-product-form";
import { Suspense } from "react";



export default function EditProductPageWrapper(){
    return(
        <Suspense fallback={<h1>Loading...</h1>}>
            <EditProductPage />
        </Suspense>
    )
}