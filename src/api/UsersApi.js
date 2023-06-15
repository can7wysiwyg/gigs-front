import { useEffect, useState } from "react"
import axios from "axios"


function UsersApi() {
    const[users, setUsers] = useState([])

    useEffect(() => {

        const showUsers = async() => {
            const res = await axios.get('https://apigigs.onrender.com/auth/users')

            setUsers(res.data)
            

        }

        showUsers()


    }, [])

    return{
        users: [users, setUsers]
    }


}

export default UsersApi