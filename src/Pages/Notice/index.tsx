import PublicHead from "@/Components/PublicHead";
import styleScope from "./index.module.scss";
import { HeadConfig } from "@/Assets/config/head";
import { mergeClassName } from "@/utils/base";
const Notice = () => {
  let headData = Object.assign(HeadConfig, { title: "公告列表", back: "/" });
  return (
    <div>
      <div className="px-[.3rem]">
        <PublicHead {...headData} />
      </div>
      <div className={mergeClassName(styleScope["notice_w"],"px-[.3rem]")}>
        <ul className={styleScope["notice_list"]}>
          <li>
            <div className={styleScope["notice_list_tit"]}>
              <p>转账记录通知</p>
              <i>2023-7-19</i>
            </div>
            <span>
              尊敬的客户：您好！为向您提供更优质的服务，我司对感谢您一直以来的支持和理解，我们会不断提高业务的专业性尊敬的客户：您好！为向您提供更优质的服务，我司对感谢您一直以来的支持和理解，我们会不断提高业务的专业性。
            </span>
          </li>
          <li>
            <div className={styleScope["notice_list_tit"]}>
              <p>转账记录通知</p>
              <i>2023-7-19</i>
            </div>
            <span>尊敬的客户：您好！为向您提供更优质的服务，我对…</span>
          </li>
          <li>
            <div className={styleScope["notice_list_tit"]}>
              <p>转账记录通知</p>
              <i>2023-7-19</i>
            </div>
            <span>尊敬的客户：您好！为向您提供更优质的服务，我对…</span>
          </li>
          <li>
            <div className={styleScope["notice_list_tit"]}>
              <p>转账记录通知</p>
              <i>2023-7-19</i>
            </div>
            <span>尊敬的客户：您好！为向您提供更优质的服务，我对…</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Notice;
