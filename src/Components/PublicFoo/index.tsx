import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mergeClassName } from "@/utils/base";

const PublicFoo = (props: any) => {
  const [curK, setCurK] = useState("/");
  const clientW = document.documentElement.clientWidth;
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
    <div
      className={mergeClassName(
        "footer-nav_box",
        `${clientW > 750 && "left-[50%] translate-x-[-50%]"}`
      )}
      style={props.style}
    >
      <ul
        className="public_foo_nav"
        style={{
          width: clientW > 750 ? "750px" : `${clientW}px`,
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
