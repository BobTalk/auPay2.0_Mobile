import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Card, Switch } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WhiteListInfo } from "../Enum";
import { getSession, setSession } from "@/utils/base";

const WhiteList = (props: any) => {
  const HeaderEl = useRef<any>({});
  const Navigate = useNavigate();
  let [headerH, setHeaderH] = useState<number>(0);
  let { state } = useLocation();
  const [isOpen] = useState<boolean>(getSession("isOpenWhiteList"));
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
  function switchChangeCb(val: boolean) {
    setSession("isOpenWhiteList", val);
    Navigate(`${val}`, {
      state: {
        headTitle: (val ? "开启" : "关闭") + "白名单",
        crt: {
          type: val ? WhiteListInfo["open"] : WhiteListInfo["close"],
        },
      },
    });
    if (val) {
      // 关闭白名单
    } else {
      // 开启白名单
    }
  }
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
            extra={<Switch onChange={switchChangeCb} checked={isOpen} />}
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
  let Navigate = useNavigate();
  function addWhiteList(e: any, crt: { val: string }) {
    console.log(e);
    e.stopPropagation();
    Navigate(`add`, {
      state: {
        headTitle: `新增白名单地址${crt?.val}`,
        crt: {
          type: WhiteListInfo["add"],
        },
      },
    });
  }
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
              <p
                className="flex items-center"
                onClick={(e) => addWhiteList(e, { val: "USDT-ERC20" })}
              >
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
                <i className="iconfont icon-shanchu text-[.3rem] text-[#878787]"></i>
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
                <i className="iconfont icon-shanchu text-[.3rem] text-[#878787]"></i>
              </p>
            ),
          },
        ]}
      />
    </>
  );
};
export default WhiteList;
