import { useLocation } from "react-router-dom"
import Card from "../../Components/Card";
import ChatIcon from '@mui/icons-material/Chat';

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

            <h2>Atendimento</h2>

            <main>
                <div className="chat-list">
                    <Card
                        icon={ChatIcon}
                        title="Título do Card"
                        subtitle="Subtítulo do Card"
                        word="12:40"
                    />
                </div>
            </main>


        </div>
    )
}