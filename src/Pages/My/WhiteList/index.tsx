import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Card, CenterPopup, Popup, Switch, Toast } from "antd-mobile";
import { memo, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrencyTypeEnum, WhiteListInfo } from "../../Enum";
import {
  formatUnit,
  getSession,
  mergeClassName,
  setSession,
} from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
import { DeleteWithdrawAddress, GetUserWithdrawAddress } from "@/Api";
import { useStopPropagation } from "@/Hooks/StopPropagation";

const WhiteList = (props: any) => {
  const HeaderEl = useRef<any>({});
  const Navigate = useNavigate();
  let [headerH, setHeaderH] = useState<number>(0);
  let { state } = useLocation();
  const [isOpen] = useState<boolean>(getSession("isOpenWhiteList"));
  let headInfo = Object.assign(HeadConfig, {
    title: props?.headTitle ?? state?.headTitle,
    back: "goBack",
    className: "text-[#333] p-[.32rem_.3rem]",
  });
  let [infoKeyList, setInfoKeyList] = useState<Array<string>>([]);
  let [infoList, setInfoList] = useState<{ [key: string]: Array<any> }>({});
  // 获取白名单地址
  async function getPageInfo() {
    let addrList: any = await GetUserWithdrawAddress();
    let res = (addrList.value as Array<any>).reduce((prv, next) => {
      let { unit } = formatUnit(next.currencyId, next.currencyChain);
      if (!prv[unit]) {
        prv[unit] = [];
      }
      prv[unit].push(next);
      return prv;
    }, {});
    let type = Object.keys(CurrencyTypeEnum);
    let keyList = Object.assign(type, Object.keys(res));
    console.log("keyList: ");
    let unique = Array.from(new Set(keyList))?.map((item:string) => item + "");
    setInfoKeyList(unique);
    setInfoList(res);
  }
  function refreshCb() {
    getPageInfo();
  }
  useEffect(() => {
    let { height } = HeaderEl.current?.getBoundingClientRect?.();
    setHeaderH(() => height);
    getPageInfo();
  }, []);
  function switchChangeCb(val: boolean) {
    // setSession("isOpenWhiteList", val);
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
          height: `calc(100% - ${headerH}px)`,
        }}
      >
        <Card
          className="p-[0] rounded-bl-[0] rounded-br-[0]"
          headerClassName="p-[.3rem] border-b-[1px]"
          bodyClassName="py-[0] px-[.3rem]"
          title={<span className="text-[.3rem] text-[#222]">提币白名单</span>}
          extra={<Switch onChange={switchChangeCb} checked={isOpen} />}
        ></Card>
        <>
          {infoKeyList.map((key: string, index: number, arr: Array<string>) => (
            <Card
              key={key}
              className={mergeClassName(
                "p-[0]",
                `${
                  index === 0
                    ? "rounded-[0]"
                    : index + 1 === arr.length
                    ? "rounded-tl-[0] rounded-tr-[0] mt-[.15rem]"
                    : "rounded-[0] mt-[.15rem]"
                }`
              )}
              headerClassName="p-[.3rem] "
              bodyClassName="py-[0] px-[.3rem]"
            >
              <DrawalMoney
                parentInfo={state}
                refreshe={refreshCb}
                attrKey={key}
                data={infoList[key]}
              />
            </Card>
          ))}
        </>
      </main>
    </>
  );
};
const DrawalMoney = memo(
  (props: any) => {
    let { attrKey, data, parentInfo } = props;
    let Navigate = useNavigate();
    let [stop] = useStopPropagation();
    let [visible, setVisible] = useState<boolean>(false);
    let [deleteItemCrt, setDeleteItemCrt] = useState<object>({});
    let [list, setList] = useState<any>([]);
    function addWhiteList(e: any, crt: { val: string }) {
      let typeEnum = JSON.parse(JSON.stringify(CurrencyTypeEnum));
      let [currencyId, currencyChain] = typeEnum[crt.val].split("-");
      stop(e, () => {
        Navigate(`add`, {
          state: {
            headTitle: `新增白名单地址${crt?.val}`,
            crt: {
              type: WhiteListInfo["add"],
              parentInfo: parentInfo,
              currencyId: currencyId * 1,
              currencyChain: currencyChain ? currencyChain * 1 : undefined,
            },
          },
        });
      });
    }
    // 删除白名单地址
    function deleteItem(e: any, crt: object) {
      stop(e, () => {
        setDeleteItemCrt(crt);
        setVisible(() => !visible);
      });
    }
    // 删除确认
    function deleteItemSubmit(crt: { id: string }) {
      DeleteWithdrawAddress(crt.id).then((res) => {
        Toast.show({
          content: res.message,
        });
        if (res.status) {
          setVisible(() => !visible);
          props?.refreshe?.();
        }
      });
    }
    useEffect(() => {
      let arr = [
        {
          id: "001",
          title: (
            <span className="text-[.32rem] text-[#222] font-[700]">
              {attrKey}
            </span>
          ),
          vertical: false,
          subTitle: (
            <p
              className="flex items-center"
              onClick={(e) => addWhiteList(e, { val: attrKey })}
            >
              <i className="iconfont icon-plus text-[#1C63FF] text-[.26rem]" />
              <span className="text-[.28rem] text-[#222] ml-[.14rem]">
                新增
              </span>
            </p>
          ),
        },
      ];
      data?.map((item: { [key: string]: any }) => {
        arr.push({
          id: item.id,
          title: (
            <span className="text-[.28rem] text-[#666]">
              {item.note ?? "--"}
            </span>
          ),
          vertical: true,
          subTitle: (
            <p className="flex justify-between">
              <span className="text-[.28rem] text-[#666] mr-[.4rem]">
                {item.address}
              </span>
              <i
                onClick={(e) => deleteItem(e, { ...item, title: attrKey })}
                className="iconfont icon-shanchu text-[.3rem] text-[#878787]"
              ></i>
            </p>
          ),
        });
      });
      setList(arr);
    }, [data]);
    return (
      <>
        <PublicList
          style={{
            "--padding-right": 0,
            "--padding-left": 0,
          }}
          list={list}
        />
        <PopupComp
          visible={visible}
          crt={deleteItemCrt}
          ok={deleteItemSubmit}
          cancel={() => setVisible(() => !visible)}
        />
      </>
    );
  },
  (prv, next) => {
    return prv?.data?.length === next?.data?.length;
  }
);
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
            {props?.crt?.note ?? "--"}】
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              props.ok?.(props.crt);
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
