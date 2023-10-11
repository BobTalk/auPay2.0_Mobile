import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PublicHead from "@/Components/PublicHead";
import styleScope from "./index.module.scss";
import DepositImg from "@/Assets/images/assets/deposit.png";
import DrawImg from "@/Assets/images/assets/draw.png";
import { encrypt, thousands, timeFormate } from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
import {
  FindRechargeRecordList,
  FindTradeRecordList,
  FindWithdrawRecordList,
} from "@/Api";
import { useRMBConversion } from "@/Hooks/RMBConversion";
import { InfiniteScroll } from "antd-mobile";
type ExtractAndRechargeType = {
  id: string;
  type: number | string;
  order: string;
  time: string;
  money: string;
  currency: string;
  rmb: string;
  [key: string]: any;
};
const Detail = () => {
  let location = useLocation();
  let { currencyChain, currencyId,title } = location.state;
  let [hasLoadMore, setHasLoadMore] = useState(false);
  let headData = Object.assign(HeadConfig, {
    title,
    back: "goBack",
    className: "text-[#fff] mx-[.3rem] w-[inherit] overflow-hidden py-[.32rem] h-[auto] border-b-[0]",
    // style: {
    //   padding: ".32rem 0",
    //   height: "auto",
    //   borderBottom: 0,
    // },
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
  let [crtPagination, setCrtpagination] = useState<any>({});

  // 资产数据
  let [capital, setCapital] = useState<any>([]);
  // 充币
  const DepositFn = (): any => {
    setDepositPagination({
      pageNo: 1,
      pageSize: 10,
    });
    setHasLoadMore(false);
    setCapital(() => []);
  };
  // 提币
  const DrawFn = (): any => {
    setDrawPagination({
      pageNo: 1,
      pageSize: 10,
    });
    setHasLoadMore(false);
    setCapital(() => []);
  };

  // 全部
  const AllFn = (): any => {
    setAllPagination({
      pageNo: 1,
      pageSize: 10,
    });
    setHasLoadMore(false);
    setCapital(() => []);
  };
  const FnMap = new Map([
    ["deposit", DepositFn],
    ["draw", DrawFn],
    ["all", AllFn],
  ]);
  const clickNav = (k: string) => {
    if (k === "record")
      return navigate(location.pathname + "/record", {
        state: { currencyChain, currencyId },
      });
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
    navigate("/draw",{state:{title}});
  };
  //充币函数
  async function getDepositInfo(obj: {
    pageNo: number;
    pageSize: number;
    conditions: Object;
  }) {
    return await FindRechargeRecordList(obj);
  }
  // 提币函数
  async function getDrawInfo(obj: {
    pageNo: number;
    pageSize: number;
    conditions: Object;
  }) {
    return await FindWithdrawRecordList(obj);
  }
  // 交易记录
  async function getTradeRecord(obj: {
    pageNo: number;
    pageSize: number;
    conditions: Object;
  }) {
    return await FindTradeRecordList(obj);
  }
  // // 充币
  useEffect(() => {
    if (navK == "deposit") {
      getDepositInfo({
        ...depositPagination,
        conditions: {
          currencyChain,
          currencyId,
        },
      }).then((res) => {
        let { pageNo, pageSize, total } = res.data;
        setCapital((val: any[]) => val.concat(res.data));
        setCrtpagination(() => ({ pageNo, pageSize, total }));
        setHasLoadMore(() => pageSize * pageNo < total);
      });
    }
  }, [depositPagination]);
  // 提币
  useEffect(() => {
    if (navK == "draw") {
      getDrawInfo({
        ...drawPagination,
        conditions: {
          currencyChain,
          currencyId,
        },
      }).then((res) => {
        let { pageNo, pageSize, total } = res.data;
        setCapital((val: any[]) => val.concat(res.data));
        setCrtpagination(() => ({ pageNo, pageSize, total }));
        setHasLoadMore(() => pageSize * pageNo < total);
      });
    }
  }, [drawPagination]);
  // 全部
  useEffect(() => {
    let params = {
      ...allPagination,
      conditions: {
        currencyChain,
        currencyId,
      },
    };
    Promise.all([
      getDepositInfo(params),
      getDrawInfo(params),
      getTradeRecord(params),
    ]).then((res) => {
      let paginationTotal = res.reduce(
        (prv, next) => (prv.total > next.total ? prv : next),
        {
          total: 0,
        }
      );
      console.log(paginationTotal);
      let allInfo = res
        .map((item) => item.data)
        .filter(Boolean)
        .flat();
      console.log("allInfo,", allInfo);
      setCapital((val: any[]) => val.concat(allInfo));
      setCrtpagination(() => paginationTotal);
      let { total, pageSize, pageNo } = paginationTotal;
      console.log(" b", pageSize * pageNo < total);
      setHasLoadMore(() => pageSize * pageNo < total);
    });
  }, [allPagination]);

  function loadMore(): any {
    console.log(crtPagination);
    if (!hasLoadMore) return;
    if (navK == "draw") {
      setDrawPagination((val) => ({ ...val, pageNo: ++crtPagination.pageNo }));
    } else if (navK === "deposit") {
      setDepositPagination((val) => ({
        ...val,
        pageNo: ++crtPagination.pageNo,
      }));
    } else {
      setAllPagination((val) => ({ ...val, pageNo: ++crtPagination.pageNo }));
    }
  }
  return (
    <div>
      <div className={styleScope["assets_detail_banner"]}>
        <PublicHead {...headData} />
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
            <InfiniteScroll
              loadMore={loadMore}
              threshold={30}
              hasMore={hasLoadMore}
            />
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
  let [, setRMBConversion] = useRMBConversion();
  const toInfo = (crt: ExtractAndRechargeType) => {
    let type = encrypt(crt.recordType+"");
    let currency = encrypt(crt.currency ?? "USDT");
    navigate(location.pathname + `/info`, {
      state: { ...crt, module: type, currency },
    });
  };
  return orderData?.map((item: ExtractAndRechargeType) => (
    <li
      key={item.id + "_" + item.recordType}
      onClick={() => toInfo(item)}
      className={styleScope["item-list"]}
    >
      <div className={styleScope["assets_detail_record_left"]}>
        <img src={item.recordType == 1 ? DepositImg : DrawImg} alt="" />
        <div className={styleScope["assets_detail_record_left_order"]}>
          <p className="text-[.3rem] text-[#333] leading-none">{item.id}</p>
          <span className="text-[.24rem] text-[#999] leading-none">
            {timeFormate(item.createTime)}
          </span>
        </div>
      </div>
      <div className={styleScope["assets_detail_record_right"]}>
        <p className="text-[.32rem] text-[#333] font-[700] leading-none">
          {item.amount} {item.currency || "USDT"}
        </p>
        <span className="text-[.24rem] text-[#999] font-[700] leading-none">
          ￥{thousands(setRMBConversion(item.currencyId, item.amount))}
        </span>
      </div>
    </li>
  ));
};
export default Detail;
