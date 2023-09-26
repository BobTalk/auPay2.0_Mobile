import PublicHead from "@/Components/PublicHead";
import { HeadTitle } from "../../Enum";
import PublicCopy from "@/Components/PublicCopy";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { encrypt, timeFormate } from "@/utils/base";
import DepositImg from "@/Assets/images/assets/deposit.png";
import DrawImg from "@/Assets/images/assets/draw.png";
import { HeadConfig } from "@/Assets/config/head";
import { FindTradeRecordList } from "@/Api";
import { DotLoading, InfiniteScroll } from "antd-mobile";
const BussionRecords = () => {
  let headerInfo = Object.assign(HeadConfig, {
    title: HeadTitle["bussionRecord"],
    back: "goBack",
    style: {
      padding: ".32rem .3rem",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  });
  let [recordPagination, setRecordPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  let [conditions, setConditions] = useState({
    currencyChain: undefined,
    currencyId: undefined,
    beginTime: undefined,
    endTime: undefined,
  });
  let [hasLoadMore, setHasLoadMore] = useState(false);
  let [crtPagination, setCrtpagination] = useState<any>({});
  // 资产数据
  let [capital, setCapital] = useState<any>([]);
  let getPageInfo = async () => {
    let tradeRecord = await FindTradeRecordList({
      ...recordPagination,
      conditions,
    });
    interfaceInfoFormat(tradeRecord);
  };
  function interfaceInfoFormat(res: {
    pageNo: any;
    pageSize: any;
    total: any;
    data: any;
  }) {
    let { pageNo, pageSize, total, data } = res;
    setCapital((val: any[]) => val.concat(data));
    setCrtpagination(() => ({ pageNo, pageSize, total }));
    setHasLoadMore(() => pageSize * pageNo < total);
  }
  function loadMore(): any {
    if (!hasLoadMore) return;
    setRecordPagination((val) => ({ ...val, pageNo: ++crtPagination.pageNo }));
  }
  useEffect(() => {
    getPageInfo();
  }, [recordPagination]);
  return (
    <>
      <PublicHead {...headerInfo} />
      <div className="grid gap-x-[.15rem] grid-cols-3 mx-[.3rem] mt-[.3rem]">
        <PublicCopy
          className="px-[.2rem] py-[.16rem grid-cols-[76%_20%] justify-between gap-0"
          textClassName="text-[#333] text-[.26rem]"
          info={"货币类型"}
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
          info={conditions.beginTime && conditions.endTime
            ? timeFormate(conditions.beginTime, "YYYY/MM/DD") +
              " -- " +
              timeFormate(conditions.endTime, "YYYY/MM/DD")
            : "时间"}
          iconBoxClassName="border-[0] text-[.24rem]  w-[auto] h-[auto]"
        >
          <i className="iconfont icon-zhankai" />
        </PublicCopy>
      </div>
      <ul className="w-full px-[.3rem]">
        <OrderItem orderData={capital} />
        <InfiniteScroll
          loadMore={loadMore}
          threshold={30}
          hasMore={hasLoadMore}
        >
          {hasLoadMore ? (
            <>
              <span>加载中</span>
              <DotLoading />
            </>
          ) : (
            <span>--- {capital.length ? "我是有底线的" : "暂无数据"} ---</span>
          )}
        </InfiniteScroll>
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
    console.log(crt);
    return;
    let type = encrypt(crt.type + "");
    let currency = encrypt(crt.currency);
    navigate("records-detail", {
      state: { module: type, currency },
    });
  };
  return orderData.map((item: any, index:number) => (
    <li
      className="flex justify-between py-[.29rem] border-solid border-b-[1px] border-b-[#DBDBDB]"
      key={item.id+"_"+index}
      onClick={() => toInfo(item)}
    >
      <div className="flex items-center gap-x-[.24rem]">
        <img
          className="w-[.6rem] h-[.6rem] aspect-square"
          src={item.tradeType == 1 ? DepositImg : DrawImg}
          alt=""
        />
        <div>
          <p className="text-[.3rem] text-[#333]">{item.id}</p>
          <p className="text-[.24rem] text-[#999]">
            {timeFormate(item.createTime, "YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      </div>
      <p className="text-[.32rem] text-[#333] font-[700]">
        {item.amount ?? "--"} USDT
      </p>
    </li>
  ));
};
export default BussionRecords;
