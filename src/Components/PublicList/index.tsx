import { dataType, mergeClassName } from "@/utils/base";
import { List } from "antd-mobile";
import styleScope from "./index.module.scss";
import styled from "styled-components";
import { ReactNode } from "react";
const ListComp = styled.div`
  .adm-list-item-content-arrow {
    .iconfont {
      font-size: ${(props: any) => {
        return props.arrowStyle?.fontSize ?? "1em"
      }};
    }
  }
`;
type itemType = {
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
  extra?: any;
  showArrow?: boolean;
};
type publicListType = {
  className?: string;
  itemClass?: string;
  itemStyle?: Object;
  style?: Object;
  arrowComp?: boolean | ReactNode;
  list: Array<itemType>;
  click?: Function;
  arrowStyle?: Object;
};
type listItemType = {
  itemInfo: itemType;
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
        <ListItem
          click={(crt: listItemType) => props.click?.(crt)}
          key={item.id}
          arrowStyle={props.arrowStyle}
          arrowComp={props.arrowComp}
          itemInfo={item}
        />
      ))}
    </List>
  );
};
const ListItem = (props: listItemType) => {
  const listItemClick = (event: any, crt: Object) => {
    event.stopPropagation();
    props.click(crt);
  };
  return (
    <ListComp {...props} className={mergeClassName("flex items-center")}>
      {dataType(props.itemInfo.icon) === "object" ? (
        <>{props.itemInfo.icon}</>
      ) : props.itemInfo.icon?.startsWith("icon") ? (
        <i
          style={props.itemInfo?.iconStyle}
          className={mergeClassName("iconfont", `${props.itemInfo.icon}`)}
        ></i>
      ) : (
        props.itemInfo.icon && (
          <img
            className={props.itemInfo.imgClass}
            style={props.itemInfo.imgStyle}
            src={props.itemInfo.icon}
            alt=""
          />
        )
      )}
      <List.Item
        clickable={false}
        arrow={props.itemInfo.showArrow ? props.arrowComp : false}
        className={mergeClassName(
          "flex-1",
          `${props.itemInfo.itemClass ?? ""}`
        )}
        style={props.itemInfo.itemStyle}
        extra={props.itemInfo.extra}
        onClick={(e) => listItemClick(e, props.itemInfo)}
      >
        {props.itemInfo.title}
      </List.Item>
    </ListComp>
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
    extra: <></>,
  },
};
PublicList.defaultProps = {
  className: "",
  itemClass: "",
  itemStyle: {},
  arrowStyle: { fontSize: "1em" },
  style: {},
  click: () => {},
  list: [
    {
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
      showArrow: false,
    },
  ],
};
export default PublicList;
