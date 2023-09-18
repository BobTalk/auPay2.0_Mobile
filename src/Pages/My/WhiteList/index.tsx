import PublicHead from "@/Components/PublicHead";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const WhiteList = (props: any) => {
  const HeaderEl = useRef<any>({});
  let [headerH, setHeaderH] = useState<number>(0);
  let { state } = useLocation();
  let headInfo = {
    title: props.headTitle ?? state.headTitle,
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem 0",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  };
  useEffect(() => {
    console.log(HeaderEl.current?.getBoundingClientRect?.());
    let { height } = HeaderEl.current?.getBoundingClientRect?.();
    setHeaderH(() => height);
  }, []);
  return (
    <>
      <PublicHead {...headInfo} ref={HeaderEl} />
      <main
        className="bg-[#F6F6F6] p-[.3rem]"
        style={{
          height: `calc(100vh - ${headerH}px)`,
        }}
      ></main>
    </>
  );
};
export default WhiteList;
