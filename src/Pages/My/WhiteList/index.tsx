import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Card, CenterPopup, Popup, Switch } from "antd-mobile";
import { memo, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WhiteListInfo } from "../../Enum";
import { getSession, setSession } from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
import { DeleteWithdrawAddress, GetUserWithdrawAddress } from "@/Api";

const WhiteList = (props: any) => {
  const HeaderEl = useRef<any>({});
  const Navigate = useNavigate();
  let [headerH, setHeaderH] = useState<number>(0);
  let { state } = useLocation();
  const [isOpen] = useState<boolean>(getSession("isOpenWhiteList"));
  let headInfo = Object.assign(HeadConfig, {
    title: props.headTitle ?? state.headTitle,
    back: "goBack",
    className: "text-[#333]",
  });
  // 获取白名单地址
  async function getPageInfo() {
    let addr = await GetUserWithdrawAddress();
    console.log("addr>> ", addr);
  }

  useEffect(() => {
    let { height } = HeaderEl.current?.getBoundingClientRect?.();
    setHeaderH(() => height);
    getPageInfo();
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
  let [visible, setVisible] = useState<boolean>(false);
  let [deleteItemCrt, setDeleteItemCrt] = useState<object>({});
  function addWhiteList(e: any, crt: { val: string }) {
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
  function deleteWhiteListUrl(e: any, crt: any) {
    e.stopPropagation();
    setVisible(() => !visible);
    setDeleteItemCrt(() => crt);
  }
  // 删除白名单地址
  async function deleteItem() {
    let deleteRes = await DeleteWithdrawAddress("");
    console.log("deleteRes>> ", deleteRes);
    setVisible(() => !visible)
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
            title: <span className="text-[.28rem] text-[#666]">我的地址2</span>,
            vertical: true,
            subTitle: (
              <p className="flex">
                <span className="text-[.28rem] text-[#666] mr-[.4rem]">
                  0x32983464f44i0sdwd4f44i0sdwd4f40x32983464f44i0sdwd4f44i0sdwd4f4
                </span>
                <i
                  onClick={(e) =>
                    deleteWhiteListUrl(e, {
                      title: "USDT-ERC20",
                      addr: "我的地址",
                    })
                  }
                  className="iconfont icon-shanchu text-[.3rem] text-[#878787]"
                ></i>
              </p>
            ),
          },
        ]}
      />
      <PopupComp
        visible={visible}
        crt={deleteItemCrt}
        ok={deleteItem}
        cancel={() => setVisible(() => !visible)}
      />
    </>
  );
};
const PopupComp = memo(
  (props: any) => {
    return (
      <Popup
        visible={props.visible}
        onMaskClick={(e) => {
          e.stopPropagation();
          props.cancel?.();
        }}
        bodyStyle={{
          borderRadius: ".34rem .34rem 0 0",
          overflow: "hidden",
          backgroundColor: "#f6f6f6",
        }}
      >
        <ul>
          <li className="grid h-[1.24rem] bg-[#fff] text-[.24rem] text-[#666]  place-items-center border-b-[1px] border-b-[#dbdbdb]">
            删除{props?.crt?.title ?? "--"}白名单地址:【
            {props?.crt?.addr ?? "--"}】
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              props.ok?.();
            }}
            className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#E84335] font-[700] place-items-center"
          >
            删除
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              props.cancel?.();
            }}
            className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#333] font-[700]  place-items-center mt-[.15rem]"
          >
            取消
          </li>
        </ul>
      </Popup>
    );
  },
  (prv, next) => {
    return prv.visible == next.visible;
  }
);
export default WhiteList;
