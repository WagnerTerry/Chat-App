import { Routes, Route, BrowserRouter as Router, } from 'react-router-dom';

import AgentConnection from './views/AgentConnection'
import { ServiceScreen } from './views/ServiceScreen';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgentConnection />} />
        <Route path="/ServiceScreen" element={<ServiceScreen />} />
      </Routes>
    </Router>
  )
}

export default App
