import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PublicHead from "@/Components/PublicHead";
import styleScope from "./index.module.scss";
import DepositImg from "@/Assets/images/assets/deposit.png";
import DrawImg from "@/Assets/images/assets/draw.png";
import { encrypt } from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
import {
  FindRechargeRecordList,
  FindTradeRecordList,
  FindWithdrawRecordList,
} from "@/Api";
type ExtractAndRechargeType = {
  id: string;
  type: number | string;
  order: string;
  time: string;
  money: string;
  currency: string;
  rmb: string;
};
const Detail = () => {
  let location = useLocation();
  let headData = Object.assign(HeadConfig, {
    title: location.state.title,
    back: "goBack",
    textColor: "white",
  });
  let nav = [
    { label: "全部", value: "all" },
    { label: "充币", value: "deposit" },
    { label: "提币", value: "draw" },
    { label: "交易记录", value: "record" },
  ];
  let [navK, setNavK] = useState("all");
  let navigate = useNavigate();
  let params: any = useParams();
  // 充币分页
  let [depositPagination, setDepositPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  // 提币分页
  let [drawPagination, setDrawPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  // 交易记录分页
  let [recordPagination, setRecordPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  // 全部分页
  let [allPagination, setAllPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  // 提取 充值
  const ExtractAndRecharge: Array<ExtractAndRechargeType> = [
    {
      id: "002",
      type: 1,
      order: "payme…9500001",
      time: "2023-06-30 18:17:47",
      money: "20,935.89",
      currency: "USDT",
      rmb: "￥3,760.08",
    },
    {
      id: "001",
      type: 2,
      order: "payme…9500001",
      time: "2023-06-29 18:17:47",
      money: "20,935.89",
      currency: "USDT",
      rmb: "￥3,760.08",
    },
  ];
  // 资产数据
  let [capital, setCapital] = useState(ExtractAndRecharge);
  // 充币
  const DepositFn = (): any => {
    const DepositData = ExtractAndRecharge.filter((item) => item.type == 1);
    return setCapital(DepositData);
  };
  // 提币
  const DrawFn = (): any => {
    const DrawData = ExtractAndRecharge.filter((item) => item.type == 2);
    return setCapital(DrawData);
  };

  // 全部
  const AllFn = (): any => {
    return setCapital(ExtractAndRecharge);
  };
  const FnMap = new Map([
    ["deposit", DepositFn],
    ["draw", DrawFn],
    ["all", AllFn],
  ]);
  const clickNav = (k: string) => {
    if (k === "record") return navigate(location.pathname + "/record");
    if (FnMap.has(k)) {
      FnMap.get(k)?.();
    }
    // 这里还要加上获取数据的操作
    return setNavK(k);
  };
  const toDeposit = () => {
    navigate(location.pathname + "/deposit");
  };
  const toDraw = () => {
    navigate("/draw");
  };
  //充币函数
  async function getDepositInfo(obj: { pageNo: number; pageSize: number }) {
    return await FindRechargeRecordList(obj);
  }
  // 提币函数
  async function getDrawInfo(obj: { pageNo: number; pageSize: number }) {
    return await FindWithdrawRecordList(obj);
  }
  // 交易记录
  async function getRecordInfo(obj: { pageNo: number; pageSize: number }) {
    return await FindTradeRecordList(obj);
  }
  // // 充币
  // useEffect(() => {}, []);
  // // 提币
  // useEffect(() => {}, []);
  // // 交易记录
  // useEffect(() => {}, []);
  // 全部
  useEffect(() => {
    Promise.all([
      getDepositInfo(allPagination),
      getDrawInfo(allPagination),
      getRecordInfo(allPagination),
    ]).then((res) => {
      let allInfo = res.map((item) => item.data);
      setCapital(() => allInfo);
    });
  }, [allPagination]);

  return (
    <div>
      <div className={styleScope["assets_detail_banner"]}>
        <PublicHead
          {...headData}
          className="mx-[.3rem] w-[inherit] overflow-hidden"
        />
        <div className="p-[0_.3rem_.3rem]">
          <div className={styleScope["assets_detail_banner_top"]}>
            <i className={styleScope["icon"] + " iconfont icon-BTC"}></i>
            <div className={styleScope["assets_detail_banner_top_txt"]}>
              <p className="text-[.62rem]">{location.state.realM}</p>
              <span className="text-[.32rem]">≈ ¥{location.state.rmbM}</span>
            </div>
          </div>
          <div className={styleScope["assets_detail_banner_foo"]}>
            <p onClick={toDeposit}>充币</p>
            <p onClick={toDraw}>提币</p>
          </div>
        </div>

        <div className={styleScope["assets_detail_content"]}>
          <ul className={styleScope["assets_detail_nav"]}>
            {nav.map((item) => {
              return (
                <li
                  onClick={() => clickNav(item.value)}
                  key={item.value}
                  className={navK === item.value ? styleScope["cur"] : ""}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
          <ul className={styleScope["assets_detail_record"]}>
            <OrderItem orderData={capital} />
          </ul>
        </div>
      </div>
    </div>
  );
};
// 订单项
const OrderItem = (props: any) => {
  let { orderData } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const toInfo = (crt: ExtractAndRechargeType) => {
    let type = encrypt(crt.type + "");
    let currency = encrypt(crt.currency);
    navigate(location.pathname + `/info`, {
      state: { module: type, currency },
    });
  };
  return orderData.map((item: ExtractAndRechargeType) => (
    <li
      key={item.id}
      onClick={() => toInfo(item)}
      className={styleScope["item-list"]}
    >
      <div className={styleScope["assets_detail_record_left"]}>
        <img src={item.type == 1 ? DepositImg : DrawImg} alt="" />
        <div className={styleScope["assets_detail_record_left_order"]}>
          <p className="text-[.3rem] text-[#333] leading-none">{item.order}</p>
          <span className="text-[.24rem] text-[#999] leading-none">
            {item.time}
          </span>
        </div>
      </div>
      <div className={styleScope["assets_detail_record_right"]}>
        <p className="text-[.32rem] text-[#333] font-[700] leading-none">
          {item.money} {item.currency}
        </p>
        <span className="text-[.24rem] text-[#999] font-[700] leading-none">
          {item.rmb}
        </span>
      </div>
    </li>
  ));
};
export default Detail;
