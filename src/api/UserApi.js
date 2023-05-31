import { useEffect, useState } from "react"
import axios from "axios"



function UserApi() {

    const [isLogged, setIsLogged] = useState(false)
    const [isUser, setIsUser] = useState(false)
    // const[isSuspended, setIsSuspended] = useState(false)
    const [isAdmin, setIsadmin] = useState(false)
    const [owner, setOwner] = useState('')


    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')))

    useEffect(() => {

        if(token) {
         
            const getUser = async() => {
                const res = await axios.get('/auth/user', {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setIsLogged(true)

                res.data.admin === 1 ? setIsadmin(true) : setIsadmin(false)
                res.data.admin === 0 ? setIsUser(true) : setIsUser(false)
                // res.data.role === 1 ? setIsSuspended(true) : setIsSuspended(false)
                setOwner(res.data.fullname)


            }

            getUser()

        }


    }, [token, owner])

    

    return{
        isLogged: [isLogged, setIsLogged],
        owner: [owner, setOwner],
        isAdmin: [isAdmin, setIsadmin],
        isUser: [isUser, setIsUser],
        // isSuspended: [isSuspended, setIsSuspended]

    }
}

export default UserApi

