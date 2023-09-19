import PublicHead from "@/Components/PublicHead";
import DepositImg from "@/Assets/images/assets/deposit.png";
import DrawImg from "@/Assets/images/assets/draw.png";
import { Picker, DatePicker } from "antd-mobile";
import styleScope from "./index.module.scss";
import { useState } from "react";
import { dateFil, currencyFil } from "@/Libs/filters";
import { currencyData } from "@/Libs/publicData";
import { useNavigate } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";

const Record = () => {
  let headData = Object.assign(HeadConfig, {
    title: "交易记录",
    back: "goBack",
    style: {
      padding: ".32rem .3rem",
      height: "auto",
      borderBottom: "1px solid #C5CAD0",
    },
  });
  const navigate = useNavigate();
  const [dateVisible, setDateVisible] = useState(false);
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [filterData, setFilterData] = useState({ date: "", currency: "" });
  const dateConfirm = (v: any) => {
    setFilterData({ ...filterData, date: dateFil(v) });
  };
  const currencyConfirm = (v: any) => {
    setFilterData({ ...filterData, currency: currencyFil(v[0]) });
  };
  const filter = (k: String) => {
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
    navigate("/assets/detail/:id/record/info/123");
  };
  return (
    <div className={styleScope["assets_record"]}>
      <PublicHead {...headData} />
      <ul className="public_filter">
        <li onClick={() => filter("currency")} className="public_filter_i">
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
        <li onClick={() => filter("date")} className="public_filter_i">
          <p>{filterData.date ? filterData.date : "时间"}</p>
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
      <DatePicker
        visible={dateVisible}
        onClose={() => {
          setDateVisible(false);
        }}
        precision="minute"
        onConfirm={dateConfirm}
      />
      <ul className="assets_detail_record">
        <li onClick={getInfo}>
          <div className="assets_detail_record_left">
            <img src={DepositImg} alt="" />
            <div className="assets_detail_record_left_order">
              <p>payme…9500001</p>
              <span>2023-06-30 18:17:47</span>
            </div>
          </div>
          <div className="assets_detail_record_right">
            <p>20,935.89 USDT</p>
            <span></span>
          </div>
        </li>
        <li>
          <div className="assets_detail_record_left">
            <img src={DrawImg} alt="" />
            <div className="assets_detail_record_left_order">
              <p>payme…9500001</p>
              <span>2023-06-30 18:17:47</span>
            </div>
          </div>
          <div className="assets_detail_record_right">
            <p>20,935.89 USDT</p>
            <span></span>
          </div>
        </li>
        <li>
          <div className="assets_detail_record_left">
            <img src={DepositImg} alt="" />
            <div className="assets_detail_record_left_order">
              <p>payme…9500001</p>
              <span>2023-06-30 18:17:47</span>
            </div>
          </div>
          <div className="assets_detail_record_right">
            <p>20,935.89 USDT</p>
            <span></span>
          </div>
        </li>
        <li>
          <div className="assets_detail_record_left">
            <img src={DrawImg} alt="" />
            <div className="assets_detail_record_left_order">
              <p>payme…9500001</p>
              <span>2023-06-30 18:17:47</span>
            </div>
          </div>
          <div className="assets_detail_record_right">
            <p>20,935.89 USDT</p>
            <span></span>
          </div>
        </li>
        <li>
          <div className="assets_detail_record_left">
            <img src={DepositImg} alt="" />
            <div className="assets_detail_record_left_order">
              <p>payme…9500001</p>
              <span>2023-06-30 18:17:47</span>
            </div>
          </div>
          <div className="assets_detail_record_right">
            <p>20,935.89 USDT</p>
            <span></span>
          </div>
        </li>
        <li>
          <div className="assets_detail_record_left">
            <img src={DrawImg} alt="" />
            <div className="assets_detail_record_left_order">
              <p>payme…9500001</p>
              <span>2023-06-30 18:17:47</span>
            </div>
          </div>
          <div className="assets_detail_record_right">
            <p>20,935.89 USDT</p>
            <span></span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Record;
