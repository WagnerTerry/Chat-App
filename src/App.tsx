import React ,{useState, ChangeEvent} from 'react'
// import {useNavigate} from 'react-router-dom'

const App: React.FC = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState('')
  const [maxCalls, setMaxCalls] = useState('')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  } 

  const handleMaxCallsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxCalls(e.target.value)
  }

  const handleJoinRoom = () => {
    if(name.trim() !== '' && maxCalls.trim() !== ''){
      console.log("entrar")
      // navigate(`/chat?name=${encodeURIComponent(name)}&maxCalls=${encodeURIComponent(maxCalls)}`);

    }
  }

  return (
    <div>
      <h1>Tela de conexão do agente</h1>

      <div>
        <label htmlFor="name">Usuário</label>
        <input type="text" value={name} placeholder='Usuário' onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="maxCalls">Máximo de chamadas</label>
        <input type="text" value={maxCalls} placeholder='Máximo de chamadas' onChange={handleMaxCallsChange} />
      </div>
      <button onClick={handleJoinRoom}>Conectar</button>

    </div>
  );
};

export default App
