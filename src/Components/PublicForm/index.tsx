import { dataType } from "@/utils/base";
import { Form } from "antd-mobile";
import { forwardRef } from "react";
import styled from "styled-components";

const PublicForm = (props: any, ref: any) => {
  console.log(props?.children);
  const defaultProps = {
    disabled: false,
    initialValues: {},
    footer: <></>,
    layout: "horizontal", // 'vertical' | 'horizontal'
    mode: "default", // 'default' | 'card'
    onFinish: () => {},
  };
  props = Object.assign(defaultProps, props);
  function validataCb(obj: Object): void {
    console.log(obj);
    console.log(props.children);
    console.log("-------form-----");
    props?.finish(obj);
  }
  const Box = styled.div`
    .adm-list-item-content-main {
      padding: 0;
    }
    .adm-form .adm-list-default .adm-list-body {
      border-top: 0;
      border-bottom: 0;
    }
    .adm-list-item-content {
      border-top: 0;
    }
  `;
  return (
    <Box>
      <Form
        ref={ref}
        style={props.style}
        disabled={props.disabled}
        initialValues={props.initialValues}
        footer={props.footer}
        layout={props.layout}
        onFinish={(values) => validataCb({ values })}
        onFinishFailed={({ values, errorFields, outOfDate }) =>
          validataCb({ values, errorFields, outOfDate })
        }
      >
        {dataType(props?.children) === "object" ? (
          <>
            <Form.Item
              // disabled={props.children.props.disabled}
              name={props.children.props.name}
              rules={props.children.props.rules}
            >
              {props.children}
            </Form.Item>
          </>
        ) : (
          <>
            {props?.children?.map((comp: any, idx: number) =>
              comp ? (
                <Form.Item
                  key={comp._owner.mode + idx}
                  // disabled={comp.props.disabled}
                  name={comp?.props?.name}
                  rules={comp?.props?.rules}
                >
                  {comp}
                </Form.Item>
              ) : null
            )}
          </>
        )}
      </Form>
    </Box>
  );
};
// PublicForm.defaultProps = {
//   disabled: false,
//   initialValues: {},
//   footer: <></>,
//   layout: "horizontal", // 'vertical' | 'horizontal'
//   mode: "default", // 'default' | 'card'
//   onFinish: () => {},
// };
export default forwardRef(PublicForm);
