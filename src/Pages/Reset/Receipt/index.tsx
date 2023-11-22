import PublicHead from "@/Components/PublicHead";
import { Button } from "antd-mobile";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { HeadConfig } from "@/Assets/config/head";

const Receipt = () => {
  const headData = Object.assign(HeadConfig, { title: "", back: "/login" });
  const HeaderEl = useRef<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState("success");
  let [contentH, setContentH] = useState<number>();
  const backGo = () => {
    navigate("/login");
  };
  useEffect(() => {
    let { height } = HeaderEl.current.getBoundingClientRect();
    setContentH(() => height);
    location.state && location.state.type === "success"
      ? setType("success")
      : setType("");
  }, []);
  return (
    <div className="px-[.3rem]">
      <PublicHead {...headData} ref={HeaderEl} />
      {type === "success" ? (
        <div
          className="reset_receipt"
          style={{ height: `calc(100% - ${contentH}px)` }}
        >
          <div className="flex flex-col items-center">
            <i className="iconfont icon-zhengque text-[#52C41A]"></i>
            <p className="text-[.34rem] text-[#333]">密码重置成功</p>
            <Button className="before:bg-transparent" onClick={backGo}>
              去登录
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="reset_receipt"
          style={{ height: `calc(100% - ${contentH}px)` }}
        >
          <div className="flex flex-col items-center">
            <i className="iconfont icon-cuowu text-[#E84335]"></i>
            <p className="text-[.34rem] text-[#333]">密码重置失败</p>
            <Button className="before:bg-transparent" onClick={backGo}>
              返回
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receipt;
