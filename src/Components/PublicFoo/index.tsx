import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PublicFoo = () => {
  const [curK, setCurK] = useState("/");
  const clientW = document.documentElement.clientWidth
  const location = useLocation();
  const navigate = useNavigate();
  const navList = [
    { label: "首页", icon: "icon-shouye", path: "/" },
    { label: "资产", icon: "icon-zichan", path: "/assets" },
    { label: "我的", icon: "icon-wode", path: "/my" },
  ];
  useEffect(() => {
    setCurK(location.pathname);
  }, []);
  const toPage = (path: any) => {
    navigate(path);
  };
  return (
    <div className="footer-nav_box">
      <ul
        className="public_foo_nav"
        style={{
          width: clientW > 750 ? "750px" :`${clientW}px`,
        }}
      >
        {navList.map((item) => {
          return (
            <li
              onClick={() => toPage(item.path)}
              key={item.path}
              className={curK === item.path ? "cur" : ""}
            >
              <i className={"iconfont " + item.icon}></i>
              <p>{item.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PublicFoo;
