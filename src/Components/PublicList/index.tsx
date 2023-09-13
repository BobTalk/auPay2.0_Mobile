import { dataType, mergeClassName } from "@/utils/base";
import { List } from "antd-mobile";
import styleScope from "./index.module.scss";
import styled from "styled-components";
import { ReactNode } from "react";
const ListComp = styled.div`
  .adm-list-item-content-arrow {
    .iconfont {
      font-size: ${(props: any) => {
        return props.arrowstyle?.fontSize ?? "1em";
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
  iteminfo: itemType;
  [key: string]: any;
};
const PublicList = (props: Omit<publicListType, "itemInfo">) => {
  console.log(props.list,'props.list')
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
          onClick={(crt: listItemType) => props.click?.(crt)}
          key={item.id}
          arrowstyle={props.arrowStyle}
          arrowcomp={props.arrowComp}
          iteminfo={item}
        />
      ))}
    </List>
  );
};
const ListItem = (props: listItemType) => {
  const listItemClick = (event: any, crt: Object) => {
    event.stopPropagation();
    props.onClick?.(crt);
  };
  return (
    <ListComp {...props} className={mergeClassName("flex items-center")}>
      {dataType(props.iteminfo?.icon) === "object" ? (
        <>{props.iteminfo?.icon}</>
      ) : props.iteminfo?.icon?.startsWith("icon") ? (
        <i
          style={props.iteminfo?.iconStyle}
          className={mergeClassName("iconfont", `${props.iteminfo?.icon}`)}
        ></i>
      ) : (
        props.iteminfo?.icon && (
          <img
            className={props.iteminfo.imgClass}
            style={props.iteminfo.imgStyle}
            src={props.iteminfo?.icon}
            alt=""
          />
        )
      )}
      <List.Item
        clickable={false}
        arrow={props.iteminfo.showArrow ? props.arrowcomp : false}
        className={mergeClassName(
          "flex-1",
          `${props.iteminfo.itemClass ?? ""}`
        )}
        style={props.iteminfo.itemStyle}
        extra={props.iteminfo.extra}
        onClick={(e) => listItemClick(e, props.iteminfo)}
      >
        {props.iteminfo.title}
      </List.Item>
    </ListComp>
  );
};
ListItem.defaultProps = {
  iteminfo: {
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
