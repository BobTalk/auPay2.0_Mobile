import { Input } from "antd-mobile";
import { Outlet } from "react-router-dom";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
import { debounce } from "lodash";
import { useRef, useState } from "react";
type propsVolit = {
  top?: any;
  prefix?: any;
  bottom?: any;
  children?: any;
  style?: Object;
  placeholder?: string | undefined;
  value: string | undefined;
  disabled?: boolean;
  inputStyle?: Object;
  input?: Function;
  className: string;
  isSelect: boolean;
  clearable: boolean;
  inputBoxStyle?: Object;
  inputBoxClassName?: string;
  clearStyle: Object;
  inputClassName?: string;
  click?: Function;
  maxLength: number | undefined;
};
const PublicInput = (props: propsVolit) => {
  const [isClear, setIsClear] = useState(false);
  const [isBlur, setIsBlur] = useState(true);
  const inputRef: any = useRef();
  const valChange = debounce((val) => {
    inputRef.current.nativeElement.value = val;
    setIsClear(!!val);
    props.input?.(val);
  }, 1000);
  const selectChange = (e: any) => {
    e.stopPropagation();
    props.click?.(e);
  };
  const inputFocus = () => {
    inputRef.current.nativeElement.value && setIsClear(true);
  };
  const inputBlur = () => {
    isBlur && setIsClear(false);
  };
  const clearInput = (e: any) => {
    e.stopPropagation();
    inputRef.current.clear();
  };
  const iconMouseEnter = (e: any) => {
    e.stopPropagation();
    setIsBlur(false);
  };
  const iconMouseLeave = (e: any) => {
    e.stopPropagation();
    setIsBlur(true);
  };
  return (
    <div
      className={mergeClassName(styleScope["input-module"], props.className)}
      style={props.style}
    >
      {props.top}
      <div
        className={mergeClassName(
          styleScope["input-box"],
          "flex items-center whitespace-nowrap",
          `${props.inputBoxClassName}`
        )}
        style={props.inputBoxStyle}
      >
        {props.prefix}
        {!props.isSelect ? (
          <Input
            onFocus={inputFocus}
            onBlur={inputBlur}
            ref={inputRef}
            className={mergeClassName("mr-[8px]", `${props.inputClassName}`)}
            style={props.inputStyle}
            placeholder={props.placeholder}
            defaultValue={props.value}
            maxLength={props.maxLength}
            onChange={valChange}
            disabled={props.disabled}
          />
        ) : (
          <div className="flex-1 mr-[8px]" onClick={(e) => selectChange(e)}>
            {props.value ? (
              <span
                style={props.inputStyle}
                className={mergeClassName(
                  "text-[#333]",
                  `${props.inputClassName}`
                )}
              >
                {props.value}
              </span>
            ) : (
              <span
                style={props.inputStyle}
                className={mergeClassName(
                  "text-[#ccc]",
                  `${props.inputClassName}`
                )}
              >
                {props.placeholder}
              </span>
            )}
          </div>
        )}
        {props.children}
        {props.clearable && isClear && (
          <i
            onMouseEnter={(e) => iconMouseEnter(e)}
            onMouseLeave={(e) => iconMouseLeave(e)}
            onClick={(e) => clearInput(e)}
            style={props.clearStyle}
            className="iconfont icon-guanbi ml-[.15rem]"
          />
        )}
      </div>
      {props.bottom}
    </div>
  );
};
PublicInput.defaultProps = {
  top: <Outlet />,
  prefix: <Outlet />,
  bottom: <Outlet />,
  children: <Outlet />,
  style: {},
  placeholder: "请输入",
  value: undefined,
  disabled: false,
  inputStyle: {},
  input: () => {},
  className: "",
  isSelect: false,
  inputBoxStyle: {},
  click: () => {},
  inputBoxClassName: "",
  inputClassName: "",
  clearable: false,
  maxLength: null,
  clearStyle: {
    fontSize: "1em",
  },
};
export default PublicInput;
