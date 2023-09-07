
import { HashRouter } from 'react-router-dom'
import Routers from './Routers'
import '@/Style/reset.css'
import '@/Style/theme.scss'
import '@/Style/font.scss'
import '@/Style/public.scss'
import '@/Assets/icon/iconfont.css'
import '@/Assets/ali-icon/iconfont.css'
function App() {
  return (
    <HashRouter>
      <Routers />
    </HashRouter>
  );
}

export default App;
