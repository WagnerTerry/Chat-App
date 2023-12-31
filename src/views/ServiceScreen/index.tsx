import { useLocation } from "react-router-dom"

import './style.scss'

export const ServiceScreen = () => {
    const location = useLocation();

    return (
        <div id="service">

            <h1>Tela de atendimento</h1>

            <header>
                <strong>{location && location.state && location.state.name}</strong>
                <button>Desconectar</button>

            </header>
        </div>
    )
}