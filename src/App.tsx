
import { HashRouter } from 'react-router-dom'
import Routers from './Routers'
import '@/Style/reset.css'
import '@/Assets/icon/iconfont.css'

function App() {
  return (
    <HashRouter>
      <Routers />
    </HashRouter>
  );
}

export default App;
