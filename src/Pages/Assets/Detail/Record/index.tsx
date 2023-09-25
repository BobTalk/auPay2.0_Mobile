import PublicHead from "@/Components/PublicHead";
import DepositImg from "@/Assets/images/assets/deposit.png";
import DrawImg from "@/Assets/images/assets/draw.png";
import { Picker, DatePicker, InfiniteScroll, DotLoading } from "antd-mobile";
import styleScope from "./index.module.scss";
import { useEffect, useState } from "react";
import { currencyFil } from "@/Libs/filters";
import { currencyData } from "@/Libs/publicData";
import { useLocation, useNavigate } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { FindTradeRecordList } from "@/Api";
import { timeFormate } from "@/utils/base";
import { cloneDeep } from "lodash";

const Record = () => {
  let headData = Object.assign(HeadConfig, {
    title: "交易记录",
    back: "goBack",
    className: "text-[#333]",
    style: {
      padding: ".32rem .3rem",
      height: "auto",
      borderBottom: "1px solid #C5CAD0",
    },
  });
  useLocation();
  let location = useLocation();
  console.log(location);
  let navigate = useNavigate();
  let [conditions, setConditions] = useState<any>({
    currencyChain: undefined,
    currencyId: undefined,
    beginTime: undefined,
    endTime: undefined,
  });
  let [copyConditions, setCopyConditions] = useState<any>({
    currencyChain: undefined,
    currencyId: undefined,
    beginTime: undefined,
    endTime: undefined,
  });
  let [crtPagination, setCrtpagination] = useState<any>({});
  let [dateVisible, setDateVisible] = useState(false);
  let [endDateVisible, setEndDateVisible] = useState(false);
  let [currencyVisible, setCurrencyVisible] = useState(false);
  // 交易记录分页
  let [recordPagination, setRecordPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  let [hasLoadMore, setHasLoadMore] = useState(false);
  // 资产数据
  let [capital, setCapital] = useState<any>([]);
  const [filterData, setFilterData] = useState({ date: "", currency: "" });
  const dateConfirm = (v: any) => {
    let t = timeFormate(v, "YYYY-MM-DD HH:mm:ss");
    setFilterData({ ...filterData, date: t });
    setEndDateVisible(true);
    setConditions((val: any) => ({ ...val, beginTime: t }));
  };
  const endDateConfirm = (v: any) => {
   
    let t = timeFormate(v, "YYYY-MM-DD HH:mm:ss");
    let cpTime = cloneDeep({...conditions,endTime: t});
    
    setFilterData({ ...filterData, date: t });
    setConditions((val: any) => ({ ...val, endTime: t }));
    setCopyConditions(cpTime);
    getTradeRecord({
      ...recordPagination,
      conditions: {
        ...conditions,
        endTime: t,
      },
    }).then((res) => {
      interfaceInfoFormat(res);
    });
  };
  const currencyConfirm = (v: any) => {
    setFilterData({ ...filterData, currency: currencyFil(v[0]) });
    let valSplit = v[0].split("_");
    setConditions((val: any) => ({
      ...val,
      currencyChain: valSplit[1] ?? undefined,
      currencyId: valSplit[0] ?? undefined,
    }));
    getTradeRecord({
      ...recordPagination,
      conditions: {
        ...conditions,
        currencyChain: valSplit[1] ? +valSplit[1] : undefined,
        currencyId: +valSplit[0] ?? undefined,
      },
    }).then((res) => {
      interfaceInfoFormat(res);
    });
  };
  const filter = (e: any, k: String) => {
    e.stopPropagation();
    if (k === "date") return setDateVisible(true);
    if (k === "currency") return setCurrencyVisible(true);
  };
  const close = (k: any, event: any) => {
    let filterDataT: any = JSON.parse(JSON.stringify(filterData));
    filterDataT[k] = "";
    setFilterData(filterDataT);
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };
  const getInfo = () => {
    navigate("/assets/detail/record/info");
  };
  // 交易记录
  async function getTradeRecord(obj: {
    pageNo: number;
    pageSize: number;
    conditions: Object;
  }) {
    return await FindTradeRecordList(obj);
  }
  function loadMore(): any {
    if (!hasLoadMore) return;
    setRecordPagination((val) => ({ ...val, pageNo: ++crtPagination.pageNo }));
  }
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
  useEffect(() => {
    getTradeRecord({
      ...recordPagination,
      conditions,
    }).then((res) => {
      interfaceInfoFormat(res);
    });
  }, [recordPagination]);
  return (
    <div className={styleScope["assets_record"]}>
      <PublicHead {...headData} />
      <ul className="public_filter">
        <li onClick={(e) => filter(e, "currency")} className="public_filter_i">
          <p>{filterData.currency ? filterData.currency : "货币类型"}</p>
          {filterData.currency ? (
            <i
              onClick={(event) => close("currency", event)}
              className="iconfont icon-guanbi"
            />
          ) : (
            <i className="iconfont icon-xiangyou1" />
          )}
        </li>
        <li onClick={(e) => filter(e, "date")} className="public_filter_i">
          <p>
            {conditions.beginTime && conditions.endTime
              ? timeFormate(conditions.beginTime, "YYYY/MM/DD") +
                " -- " +
                timeFormate(conditions.endTime, "YYYY/MM/DD")
              : "时间"}
          </p>
          {filterData.date ? (
            <i
              onClick={(event) => close("date", event)}
              className="iconfont icon-guanbi"
            />
          ) : (
            <i className="iconfont icon-xiangyou1" />
          )}
        </li>
      </ul>
      <Picker
        columns={[currencyData]}
        visible={currencyVisible}
        onClose={() => {
          setCurrencyVisible(false);
        }}
        onConfirm={currencyConfirm}
      />
      {/* 开始时间 */}
      <DatePicker
        title="开始时间"
        max={new Date()}
        closeOnMaskClick={false}
        visible={dateVisible}
        onClose={() => {
          setDateVisible(false);
        }}
        onCancel={() => {
          console.log('copyConditions',copyConditions)
          setConditions(copyConditions)
        }}
        precision="second"
        onConfirm={dateConfirm}
      />
      {/* 结束时间 */}
      <DatePicker
        title="结束时间"
        max={new Date()}
        closeOnMaskClick={false}
        visible={endDateVisible}
        min={new Date(conditions.beginTime)}
        onClose={() => {
          setEndDateVisible(false);
        }}
        onCancel={() => {
          setConditions(copyConditions);
        }}
        precision="second"
        onConfirm={endDateConfirm}
      />
      <ul className="assets_detail_record">
        {capital?.map((item: any) => (
          <li onClick={getInfo}>
            <div className="assets_detail_record_left">
              <img src={item?.tradeType === 1 ? DepositImg : DrawImg} alt="" />
              <div className="assets_detail_record_left_order">
                <p>{item.id}</p>
                <span>
                  {timeFormate(item.createTime, "YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
            </div>
            <div className="assets_detail_record_right">
              <p>{item.amount} USDT</p>
              <span></span>
            </div>
          </li>
        ))}
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
    </div>
  );
};
export default Record;
