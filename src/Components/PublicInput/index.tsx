import { Input } from "antd-mobile";
import { Outlet } from "react-router-dom";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
import { debounce } from "lodash";
type propsVolit = {
  top?: any;
  bottom?: any;
  children?: any;
  style?: Object;
  placeholder?: string | undefined;
  value: string | undefined;
  disabled?: boolean;
  inputStyle?: Object;
  input?: Function;
  className: string;
};
const PublicInput = (props: propsVolit) => {
  const valChange = debounce((val) => {
    props.input?.(val);
  }, 1000);
  return (
    <div
      className={mergeClassName(styleScope["input-module"], props.className)}
      style={props.style}
    >
      {props.top}
      <div
        className={mergeClassName(
          styleScope["input-box"],
          "flex items-center whitespace-nowrap"
        )}
      >
        <Input
          className="mr-[8px]"
          style={props.inputStyle}
          placeholder={props.placeholder}
          value={props.value}
          onChange={valChange}
          disabled={props.disabled}
        />
        {props.children}
      </div>
      {props.bottom}
    </div>
  );
};
PublicInput.defaultProps = {
  top: <Outlet />,
  bottom: <Outlet />,
  children: <Outlet />,
  style: {},
  placeholder: "请输入",
  value: undefined,
  disabled: false,
  inputStyle: {},
  input: () => {},
  className: "",
};
export default PublicInput;
