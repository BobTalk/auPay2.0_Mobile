import { dataType, mergeClassName } from "@/utils/base";
import { List } from "antd-mobile";
import styleScope from "./index.module.scss";
import styled from "styled-components";
import { ReactNode, memo, useCallback } from "react";
const ListComp = styled.div`
  .adm-list-item-content-arrow {
    .iconfont {
      font-size: ${(props: any) => {
        return props.arrowstyle?.fontSize ?? "1em";
      }};
    }
  }
  .adm-list-item-content {
    flex: 1;
    padding-right: var(--padding-right);
    padding-left: var(--padding-left);
    margin-left: var(--margin-left);
    border-bottom-width: var(--border-b-w);
    border-bottom-style: var(--border-b-style);
    border-bottom-color: var(--border-b-color);
  }
  .adm-list-item-content-main {
    display: flex;
    flex-direction: ${(props: any) =>
      props.iteminfo.vertical ? "column" : "inherit"};
    justify-content: ${(props: any) => {
      return props.iteminfo.vertical
        ? ""
        : props.iteminfo.subTitle
        ? "space-between"
        : "flex-start";
    }};
  }
`;
type itemType = {
  icon?: any;
  id: string | number;
  title: ReactNode | string;
  subTitle?: ReactNode | string;
  subTitleStyle?: Object;
  subTitleClassName?: string;
  style?: Object;
  className?: string;
  itemStyle?: Object;
  itemClass?: string;
  iconStyle?: Object;
  imgStyle?: Object;
  imgClass?: string;
  extra?: any;
  showArrow?: boolean;
  vertical?: boolean;
};
type publicListType = {
  isRender:boolean;
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
  let listItemCb = useCallback((crt: any) => {
    props.click?.(crt);
  }, []);
  return (
    <List
      className={mergeClassName(
        `${props.className} ${styleScope["list-box"]}`,
        "rounded-[.24rem] overflow-hidden"
      )}
      style={props.style}
    >
      {props.list.map((item: itemType) => (
        <ListItem
          onClick={(crt: listItemType) => listItemCb(crt)}
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
      ) : props.iteminfo?.icon ? (
        <img
          className={props.iteminfo.imgClass}
          style={props.iteminfo.imgStyle}
          src={props.iteminfo?.icon}
          alt=""
        />
      ) : null}
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
        <span>{props.iteminfo.title}</span>
        {props.iteminfo.subTitle ? (
          <span
            className={props.iteminfo.subTitleClassName}
            style={props.iteminfo.subTitleStyle}
          >
            {props.iteminfo.subTitle}
          </span>
        ) : null}
      </List.Item>
    </ListComp>
  );
};
ListItem.defaultProps = {
  iteminfo: {
    icon: "",
    id: "",
    title: "",
    subTitle: "",
    subTitleStyle: {},
    subTitleClassName: "",
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
  isRender:false,
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
      subTitle: "",
      subTitleStyle: {},
      subTitleClassName: "",
      style: {},
      className: "",
      itemStyle: {},
      itemClass: "",
      iconStyle: {},
      imgStyle: {},
      imgClass: "",
      showArrow: false,
      vertical: false,
    },
  ],
};
export default memo(PublicList, (prv, next) => {
  if(prv.isRender){
    return false
  }
  return prv.list.length == next.list.length;
});
