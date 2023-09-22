import PublicHead from "@/Components/PublicHead";
import { HeadTitle } from "../../Enum";
import PublicCopy from "@/Components/PublicCopy";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { encrypt } from "@/utils/base";
import DepositImg from "@/Assets/images/assets/deposit.png";
import DrawImg from "@/Assets/images/assets/draw.png";
const BussionRecords = () => {
  let headerInfo = {
    title: HeadTitle["bussionRecord"],
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem .3rem",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  };
  // 提取 充值
  const ExtractAndRecharge: Array<Object> = [
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
  return (
    <>
      <PublicHead {...headerInfo} />
      <div className="grid gap-x-[.15rem] grid-cols-3 mx-[.3rem] mt-[.3rem]">
        <PublicCopy
          className="px-[.2rem] py-[.16rem grid-cols-[76%_20%] justify-between gap-0"
          textClassName="text-[#333] text-[.26rem]"
          info="货币交易"
          iconBoxClassName="border-[0] text-[.24rem]  w-[auto] h-[auto]"
        >
          <i className="iconfont icon-zhankai" />
        </PublicCopy>
        <PublicCopy
          className="px-[.2rem] py-[.16rem] grid-cols-[76%_20%] justify-between gap-0"
          textClassName="text-[#333] text-[.26rem]"
          info="交易类型"
          iconBoxClassName="border-[0] text-[.24rem]  w-[auto] h-[auto]"
        >
          <i className="iconfont icon-zhankai" />
        </PublicCopy>
        <PublicCopy
          className="px-[.2rem] py-[.16rem] grid-cols-[76%_20%] justify-between gap-0"
          textClassName="text-[#333] text-[.26rem]"
          info="时间"
          iconBoxClassName="border-[0] text-[.24rem]  w-[auto] h-[auto]"
        >
          <i className="iconfont icon-zhankai" />
        </PublicCopy>
      </div>
      <ul className="w-full px-[.3rem]">
        <OrderItem orderData={capital} />
      </ul>
    </>
  );
};
// 订单项
const OrderItem = (props: any) => {
  let { orderData } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const toInfo = (crt: any) => {
    let type = encrypt(crt.type + "");
    let currency = encrypt(crt.currency);
    navigate('records-detail', {
      state: { module: type, currency },
    });
  };
  return orderData.map((item: any) => (
    <li
      className="flex justify-between py-[.29rem] border-solid border-b-[1px] border-b-[#DBDBDB]"
      key={item.id}
      onClick={() => toInfo(item)}
    >
      <div className="flex items-center gap-x-[.24rem]">
        <img
          className="w-[.6rem] h-[.6rem] aspect-square"
          src={item.type == 1 ? DepositImg : DrawImg}
          alt=""
        />
        <div>
          <p className="text-[.3rem] text-[#333]">{item.order}</p>
          <p className="text-[.24rem] text-[#999]">{item.time}</p>
        </div>
      </div>
      <p className="text-[.32rem] text-[#333] font-[700]">
        {item.money} {item.currency}
      </p>
    </li>
  ));
};
export default BussionRecords;
