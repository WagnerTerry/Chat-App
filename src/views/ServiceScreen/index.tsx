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


            <main>
                <div className="chat-list">
                    <h2>Atendimento</h2>
                    <Card
                        icon={ChatIcon}
                        title="Título do Card"
                        subtitle="Subtítulo do Card"
                        word="12:40"
                    />
                </div>
                <div className="chat-information">
                    <h3>Chamada selecionada</h3>

                    <span>
                        CallId: 123121 <br />
                        Midia: CHAT <br />
                        Data Inicial: 20/12/2023 13:30:10 <br />
                        Serviço: Nova matrícula <br />
                        Origem: Lucas <br />
                    </span>

                    <div className="end-chat">
                        <button>Finalizar</button>
                    </div>

                </div>
            </main>


        </div>
    )
}