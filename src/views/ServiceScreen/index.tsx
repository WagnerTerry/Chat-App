import { useLocation } from "react-router-dom"

export const ServiceScreen = () => {
    const location = useLocation();

    return (
        <div>

            <h1>atendimento</h1>
            <h2>{location && location.state && location.state.name}</h2>
        </div>
    )
}