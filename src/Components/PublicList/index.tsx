import { dataType, mergeClassName } from "@/utils/base";
import { List } from "antd-mobile";
import styleScope from "./index.module.scss";
import { MouseEvent } from "react";
type publicListType = {
  className?: string;
  itemClass?: string;
  itemStyle?: Object;
  style?: Object;
  list: Array<object>;
  click?:Function
};
type listItemType = {
  itemInfo: {
    icon?: any;
    id: string | number;
    title: string;
    style?: Object;
    className?: string;
    itemStyle?: Object;
    itemClass?: string;
    iconStyle?: Object;
    imgStyle?: Object;
    imgClass?: string;
  };
  [key: string]: any;
};
const PublicList = (props: Omit<publicListType, "itemInfo">) => {
  return (
    <List
      className={mergeClassName(
        `${props.className} ${styleScope["list-box"]}`,
        "rounded-[.24rem] overflow-hidden"
      )}
      style={props.style}
    >
      {props.list.map((item: any) => (
        <ListItem click={(crt:listItemType)=> props.click?.(crt)} key={item.id} itemInfo={item} />
      ))}
    </List>
  );
};
const ListItem = (props: listItemType) => {
  const listItemClick = (event:any, crt:Object) => {
    event.stopPropagation()
    props.click(crt)
  };
  return (
    <div className={mergeClassName("flex items-center")}>
      {dataType(props.itemInfo.icon) === "object" ? (
        <>{props.itemInfo.icon}</>
      ) : props.itemInfo.icon.startsWith("icon") ? (
        <i
          style={props.itemInfo?.iconStyle}
          className={mergeClassName("iconfont", `${props.itemInfo.icon}`)}
        ></i>
      ) : (
        <img
          className={props.itemInfo.imgClass}
          style={props.itemInfo.imgStyle}
          src={props.itemInfo.icon}
          alt=""
        />
      )}
      <List.Item
        className={mergeClassName("flex-1", `${props.itemInfo.itemClass ?? ""}`)}
        style={props.itemInfo.itemStyle}
        extra=""
        onClick={(e)=>listItemClick(e,props.itemInfo)}
      >
        {props.itemInfo.title}
      </List.Item>
    </div>
  );
};
ListItem.defaultProps = {
  itemInfo: {
    icon: "",
    id: "",
    title: "",
    style: {},
    className: "",
    itemStyle: {},
    itemClass: "",
    iconStyle: {},
    imgStyle: {},
    imgClass: "",
  },
};
PublicList.defaultProps = {
  className: "",
  itemClass: "",
  itemStyle: {},
  style: {},
  click:()=>{},
  list: [{
    icon: "",
    id: "",
    title: "",
    style: {},
    className: "",
    itemStyle: {},
    itemClass: "",
    iconStyle: {},
    imgStyle: {},
    imgClass: "",
  }],
};
export default PublicList;
