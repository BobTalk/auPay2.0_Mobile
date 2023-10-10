import { Input } from "antd-mobile";
import styleScope from "./index.module.scss";
import { dataType, mergeClassName } from "@/utils/base";
import { debounce } from "lodash";
import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";

type propsVolit = {
  top?: any;
  prefix?: any;
  bottom?: any;
  children?: any;
  style?: Object;
  placeholder?: string | undefined;
  value?: string | undefined;
  disabled?: boolean;
  inputStyle?: Object;
  input?: Function;
  className?: string | undefined;
  isSelect?: boolean;
  clearable?: boolean;
  inputBoxStyle?: Object;
  inputBoxClassName?: string;
  clearStyle?: Object;
  inputClassName?: string;
  click?: Function;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  name?: string | undefined;
  rules?: Array<object>;
  [key: string]: any;
  type: string;
};
const PublicInputPwd = forwardRef((props: propsVolit, ref: any): any => {
   // 暴露给父级
   useImperativeHandle(
    ref,
    () => ({
      newPwd: "",
      confirmPwd: "",
    })
  );
  const [visible, setVisible] = useState(false);
  return (
    <div className={styleScope.password}>
      <Input
        ref={ref}
        className={mergeClassName(
          `${styleScope.input},${props.inputClassName}`
        )}
        style={props.inputStyle}
        autoComplete="new-password"
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        defaultValue={props["value"]}
        disabled={props.disabled}
        type={visible ? "text" : "password"}
      />
      <div className={styleScope.eye}>
        {!visible ? (
          <EyeInvisibleOutline onClick={() => setVisible(true)} />
        ) : (
          <EyeOutline onClick={() => setVisible(false)} />
        )}
      </div>
    </div>
  );
});
export default memo(PublicInputPwd, (prv, next) => {
  console.log(prv);
  console.log(next);
  console.log("--input----");

  if (prv.isRender) {
    return false;
  } else if (prv.type == "password") {
    return prv.type == next.type;
  } else {
    return prv.value == next.value;
  }
});
