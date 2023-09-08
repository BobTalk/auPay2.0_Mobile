import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PublicHead from "@/Components/PublicHead";
import styleScope from "./index.module.scss";
import DepositImg from "@/Assets/images/assets/deposit.png";
import DrawImg from "@/Assets/images/assets/draw.png";
import { encrypt } from "@/utils/base";
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
  const headData = { title: "BTC", back: "/assets", textColor: "white" };
  const nav = [
    { label: "全部", value: "all" },
    { label: "充币", value: "deposit" },
    { label: "提币", value: "draw" },
    { label: "交易记录", value: "record" },
  ];
  const [navK, setNavK] = useState("all");
  // eslint-disable-next-line
  const [id, setId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const params: any = useParams();

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
  useEffect(() => {
    // eslint-disable-next-line
    setId(params.id ?? ""); // 用这个id获取数据
    // eslint-disable-next-line
  }, []);
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
    ["all", AllFn]
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
  return (
    <div>
      <div className={styleScope["assets_detail_banner"] + " public_w"}>
        <PublicHead {...headData} />
        <div className={styleScope["assets_detail_banner_top"]}>
          <i className={styleScope["icon"] + " iconfont icon-BTC"}></i>
          <div className={styleScope["assets_detail_banner_top_txt"]}>
            <p>87,823.00</p>
            <span>¥123,302.09</span>
          </div>
        </div>
        <div className={styleScope["assets_detail_banner_foo"]}>
          <p onClick={toDeposit}>充币</p>
          <p>提币</p>
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
        <ul className="assets_detail_record">
          <OrderItem orderData={capital} />
        </ul>
      </div>
    </div>
  );
};
// 订单项
const OrderItem = (props: any) => {
  let { orderData } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const toInfo = (crt:ExtractAndRechargeType) => {
    encrypt(crt.type+'').then(type =>  navigate(location.pathname + `/info?module=${type}`))
  };
  return orderData.map((item: ExtractAndRechargeType) => (
    <li key={item.id} onClick={()=>toInfo(item)}>
      <div className="assets_detail_record_left">
        <img src={item.type == 1 ? DepositImg : DrawImg} alt="" />
        <div className="assets_detail_record_left_order">
          <p>{item.order}</p>
          <span>{item.time}</span>
        </div>
      </div>
      <div className="assets_detail_record_right">
        <p>
          {item.money} {item.currency}
        </p>
        <span>{item.rmb}</span>
      </div>
    </li>
  ));
};
export default Detail;
