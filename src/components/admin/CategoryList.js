import axios from "axios"
import { useContext,  useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";

import "./categoryList.css"

function CategoryList() {

    const state = useContext(GlobalState);
    const token = state.token;
    const[myCats, setMyCats] = useState([])


    useEffect(() => {

        const getCats = async() => {

            const res = await axios.get("/admin/show_categories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setMyCats(res.data.results)

        }

        getCats()

    }, [token])

const deleteCategory = async (item) => {

    



}
    

    return(<>
    <div className="categories align-items-center">
    <div className="col ">
          { 
                    myCats?.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.catName}</p>
                            <div>
                        
                                <button >Delete</button>
                            </div>
                        </div>
                    ))
                }
        </div> 




    </div>
    
    
    </>)
}

export default CategoryList