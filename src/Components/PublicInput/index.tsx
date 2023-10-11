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
const PublicInput = forwardRef((props: propsVolit, ref: any): any => {
  const inputRef: any = useRef();
  // 暴露给父级
  useImperativeHandle(ref, () => ({
    getVal: () => inputRef.current.nativeElement.value,
    setVal: (val: string | undefined | number) =>
      (inputRef.current.nativeElement.value = val),
  }));
  const [isClear, setIsClear] = useState(false);
  const [visible, setVisible] = useState(false);

  const inputCompRef: any = useRef();
  const valChange = (val:any) => {
    if (dataType(props.onChange) === "function") {
      props.onChange?.(val, val);
    } else {
      dataType(props.input) === "function" && props.input?.(val, val);
    }
    setIsClear(() => !!val);
  }
  const pwdChange = (value: string) => {
    if (!props["name"]) return;
    props?.formRef?.current?.setFieldValue(props["name"], value);
    props?.formRef?.current?.validateFields([props["name"]]);
  };

  const selectChange = (e: any) => {
    e.stopPropagation();
    props.click?.(e);
  };
  const inputFocus = () => {
    inputRef.current.nativeElement.value && setIsClear(() => true);
  };
  const inputBlur = () => {
    setTimeout(() => {
      setIsClear(() => false);
    }, 0);
  };
  const clearInput = (e: any) => {
    e.stopPropagation();
    inputRef.current.clear();
  };
  return (
    <div
      ref={inputCompRef}
      className={mergeClassName(
        styleScope["input-module"],
        `${props?.className ?? ""}`
      )}
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
          props.type === "password" ? (
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
                onChange={pwdChange}
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
          ) : (
            <Input
              onFocus={inputFocus}
              onBlur={inputBlur}
              ref={inputRef}
              className={mergeClassName("mr-[8px]", `${props.inputClassName}`)}
              style={props.inputStyle}
              placeholder={props.placeholder}
              value={props["value"]}
              maxLength={props.maxLength}
              minLength={props.minLength}
              onChange={valChange}
              disabled={props.disabled}
            />
          )
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
            onClick={(e) => clearInput(e)}
            style={props.clearStyle}
            className="iconfont icon-guanbi ml-[.15rem]"
          />
        )}
      </div>
      {props.bottom}
    </div>
  );
});

export default memo(PublicInput, (prv, next) => {
  if (prv.isRender) {
    return false;
  }
  return prv.value == next.value;
});
