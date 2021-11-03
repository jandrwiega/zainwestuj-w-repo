import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({children}) => {

    const [repoList, setRepoList] = useState([])
    const [isRepoListLoaded, setIsRepoListLoaded] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/getRepoList')
        .then(response => response.json())
        .then(data => {
            setRepoList(data);
            setIsRepoListLoaded(true)
        })
    }, [])

    const [lastPageOpened, setLastPageOpened] = useState(0)
    const handleSetLastPageOpened = (index) => {
        setLastPageOpened(index)
    }
    
    return ( 
        <AppContext.Provider value={{ repoList, isRepoListLoaded, lastPageOpened, handleSetLastPageOpened }}>
            {children}
        </AppContext.Provider>
     );
}
 
export default AppProvider;

