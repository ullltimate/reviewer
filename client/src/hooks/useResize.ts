import { useEffect, useState } from "react"

export const useResize = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {

        function handleWindowResize() {
            setWindowSize(window.innerWidth);
          }
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        
    },[])

    return {windowSize}
}