import axios from "axios"
import { useContext,  useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import "./categoryList.css"
import { useNavigate } from "react-router-dom";

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

    if(myCats.length === 0) {
        return(<>
        <h1 className="text-center">category list is empty</h1>
        </>)
    }

    

    return(<>
    <div className="categories align-items-center">
    <div className="col ">
          { 
                    myCats?.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.catName}</p>
                            <div>
                        <DeleteButon id={category._id} />
                               
                            </div>
                        </div>
                    ))
                }
        </div> 




    </div>
    
    
    </>)
}

const DeleteButon = ({id}) => {

    const state = useContext(GlobalState);
    const token = state.token;
    const navigate = useNavigate()

    const deleteButton = async() => {
        await axios.delete(`/admin/delete_category/${id}`, {headers: {
            Authorization: `Bearer ${token}`
        }})

        navigate('/category_list')
    }

return(<>
 <button onClick={deleteButton} >Delete</button>

</>)

}

export default CategoryList