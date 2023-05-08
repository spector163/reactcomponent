import { useEffect, useState } from "react"

const useIsMobile = (DefaultisMobile = false): [isMobile: boolean] => {
    const [isMobile, setIsmobile] = useState(DefaultisMobile);

    useEffect(() => {
        setIsmobile(window.innerWidth < 720)
        const handleResize = () => {
            setIsmobile(window.innerWidth < 720)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])
    return [isMobile]

}
export default useIsMobile