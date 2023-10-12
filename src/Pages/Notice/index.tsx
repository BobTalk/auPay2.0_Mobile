import PublicHead from "@/Components/PublicHead";
import styleScope from "./index.module.scss";
import { HeadConfig } from "@/Assets/config/head";
import { mergeClassName, timeFormate } from "@/utils/base";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ViewAnnouncement } from "@/Api";
import { Ellipsis, InfiniteScroll } from "antd-mobile";
import PublicScroll from "@/Components/PublicScroll";
const Notice = () => {
  let headData = Object.assign(HeadConfig, {
    title: "公告列表",
    back: "goBack",
    className: "p-[.32rem_.3rem] text-[#333]",
  });
  const JHeaderRef = useRef<any>({});
  const [contentHeight, setContentHeight] = useState(0);
  let [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  let [notice, setNotice] = useState<any>({});
  async function InitPageInfo() {
    let notice = await ViewAnnouncement(pagination);
    setNotice(notice);
  }
  useEffect(() => {
    let {height} = JHeaderRef.current.getBoundingClientRect();
    let contentH = window.innerHeight;
    console.log("contentH: ", contentH);
    setContentHeight(contentH - height);
  }, []);
  useEffect(() => {
    InitPageInfo();
  }, []);
  return (
    <PublicScroll>
      <PublicHead {...headData} ref={JHeaderRef} />
      <div
        style={{
          height: `calc(${contentHeight}px)`,
        }}
        className={mergeClassName(styleScope["notice_w"], "px-[.3rem]")}
      >
        <ul className={styleScope["notice_list"]}>
          <ItemComp list={notice?.data} />
          {pagination.pageNo < notice.pageTotal ? (
            <InfiniteScroll
              hasMore={pagination.pageNo < notice.pageTotal}
              loadMore={(isRetry: boolean): any => {
                if (isRetry) {
                  setPagination({
                    ...pagination,
                    pageNo: ++pagination.pageNo,
                  });
                }
              }}
              threshold={35}
            ></InfiniteScroll>
          ) : null}
        </ul>
      </div>
    </PublicScroll>
  );
};
const ItemComp = ({ list }: any) =>
  list?.map(
    (item: {
      title: string;
      createTime: string;
      content: string;
      isRoll: boolean;
      id: string;
    }) => (
      <li key={item.id}>
        <div className={styleScope["notice_list_tit"]}>
          <p>{item.title}</p>
          <i>{timeFormate(item.createTime)}</i>
        </div>
        <span>
          {item.isRoll ? (
            <Ellipsis content={item.content} rows={1} />
          ) : (
            <>{item.content}</>
          )}
        </span>
      </li>
    )
  );
export default Notice;
