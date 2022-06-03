import React, {useState} from 'react'
import Loading from './Loading'

const usePageLoader = () => {
    const [loadingPage, setLoadingPage] = useState(false)
    
    return [
        loadingPage ? <Loading /> : null,
        () => setLoadingPage(true), //show
        () => setLoadingPage(false) //hide
    ]
}

export default usePageLoader
