import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Button, Card, Switch } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

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
    let { height } = HeaderEl.current?.getBoundingClientRect?.();
    setHeaderH(() => height);
  }, []);
  return (
    <>
      <PublicHead {...headInfo} ref={HeaderEl} />
      <main
        className="bg-[#F6F6F6] p-[.3rem] overflow-auto"
        style={{
          height: `calc(100vh - ${headerH}px)`,
        }}
      >
        <>
          <Card
            className="p-[0] rounded-bl-[0] rounded-br-[0]"
            headerClassName="p-[.3rem]"
            bodyClassName="py-[0] px-[.3rem]"
            title={<span className="text-[.3rem] text-[#222]">提币白名单</span>}
            extra={<Switch defaultChecked />}
          >
            <DrawalMoney />
          </Card>
          <Card
            className="p-[0] rounded-tl-[0] rounded-tr-[0] mt-[.15rem]"
            bodyClassName="py-[0] px-[.3rem]"
          >
            <DrawalMoney />
          </Card>
        </>
      </main>
    </>
  );
};
const DrawalMoney = (props: any) => {
  return (
    <>
      <PublicList
        style={{
          "--padding-right": 0,
          "--padding-left": 0,
        }}
        list={[
          {
            id: "001",
            title: (
              <span className="text-[.32rem] text-[#222] font-[700]">
                USDT-ERC20
              </span>
            ),
            vertical: false,
            subTitle: (
              <p className="flex items-center">
                <i className="iconfont icon-plus text-[#1C63FF] text-[.26rem]" />
                <span className="text-[.28rem] text-[#222] ml-[.14rem]">
                  新增
                </span>
              </p>
            ),
          },
          {
            id: "002",
            title: <span className="text-[.28rem] text-[#666]">我的地址</span>,
            vertical: true,
            subTitle: (
              <p className="flex">
                <span className="text-[.28rem] text-[#666] mr-[.4rem]">
                  0x32983464f44i0sdwd4f44i0sdwd4f40x32983464f44i0sdwd4f44i0sdwd4f4
                </span>
                <i className="iconfont icon-shanchu text-[.34rem] text-[#666]"></i>
              </p>
            ),
          },
          {
            id: "003",
            title: <span className="text-[.28rem] text-[#666]">我的地址</span>,
            vertical: true,
            subTitle: (
              <p className="flex">
                <span className="text-[.28rem] text-[#666] mr-[.4rem]">
                  0x32983464f44i0sdwd4f44i0sdwd4f40x32983464f44i0sdwd4f44i0sdwd4f4
                </span>
                <i className="iconfont icon-shanchu text-[.34rem] text-[#666]"></i>
              </p>
            ),
          },
        ]}
      />
    </>
  );
};
export default WhiteList;
