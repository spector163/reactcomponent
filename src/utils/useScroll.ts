import { useEffect, useState } from "react"

const useScroll = () => {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        function Scroll() {
            document.documentElement.scrollTop > 50 ? setScrolled(true) : setScrolled(false)
        }
        window.addEventListener('scroll', Scroll)
        return () => window.removeEventListener('scroll', Scroll)
    }, [])

    return scrolled;
}

export default useScroll