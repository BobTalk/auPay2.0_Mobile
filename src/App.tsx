import { BrowserRouter as Router } from "react-router-dom";
import RouterConfigComp from "./Routers";
import "@/Style/reset.css";
import "@/Style/theme.scss";
import "@/Style/font.scss";
import "@/Style/public.scss";
import "@/Assets/icon/iconfont.css";
import "@/Assets/ali-icon/iconfont.css";
import ErrorBoundary from "./error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <RouterConfigComp />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
