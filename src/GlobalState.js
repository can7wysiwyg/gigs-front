import { createContext} from "react"
import UserApi from "./api/UserApi"
import UsersApi from "./api/UsersApi"




export const GlobalState = createContext()



export const DataProvider = ({children}) => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')))


    const state = {


        userApi: UserApi(),
        token: token,
        usersApi: UsersApi()
    }

        return(
            <GlobalState.Provider value={state}>
                {children}
            
            </GlobalState.Provider>
        )
        
        
    
    
    
    }
    





