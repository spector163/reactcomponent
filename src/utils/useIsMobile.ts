import { useEffect, useState } from "react"

const useIsMobile = (DefaultisMobile = false): [isMobile: boolean] => {
    const [isMobile, setIsmobile] = useState(DefaultisMobile);

    useEffect(() => {
        setIsmobile(window.innerWidth < 768)
        const handleResize = () => {
            setIsmobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])
    return [isMobile]

}
export default useIsMobile
type DeviceType = 'MOBILE' | 'TABLET' | 'DESKTOP'

export const useDeviceType = (defaultDevice?: DeviceType) => {
    const [device, setDevice] = useState<DeviceType>(defaultDevice ?? 'MOBILE')
    useEffect(() => {
        function Action() {
            setDevice(window.innerWidth < 640 ? 'MOBILE' : window.innerWidth < 768 ? 'TABLET' : 'DESKTOP');
        }
        Action();
        window.addEventListener("resize", Action);
        return () => window.removeEventListener("resize", Action);
    }, []);
    return device;
}
