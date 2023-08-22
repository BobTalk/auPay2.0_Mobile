import { useRef, useState, useEffect } from 'react'
import PublicHead from '@/Components/PublicHead'
import Logo from '@/Assets/images/logo.png'
import CloseImg from '@/Assets/images/close.png'
import {
  Form,
  Input,
  Button,
} from 'antd-mobile'
import './index.scss'
const Login = () => {
  const headData = { title: 'auPay用户登录', back: '' }
  let codeTimer: any = null
  const [ codeData, setCodeData ] = useState({ timer: null, status: false, time: 60 })
  const formRef: any = useRef(null)
  const closePassword = () => {
    formRef && formRef.current && formRef.current.setFieldValue('password', '')
  }
  const getEmailCode = () => { codeTimer = setInterval(codeTime, 1000) }
  const codeTime = () => { setCodeData(codeData => ({ ...codeData, status: true, time: codeData.time - 1 })) }
  useEffect(() => {
    if (codeData.time < 1) return closeCodeTime()
  }, [codeData])
  useEffect(() => { return () => { closeCodeTime() } }, [])
  const closeCodeTime = () => {
    clearInterval(codeTimer)
    setCodeData({
      timer: null,
      status: false,
      time: 60
    })
  }
  const onFinish = (value: any) => {
    console.log('登陆提交数据' + value)
  }
  const forget = () => {
    console.log('忘记密码')
  }
  return (
    <div className='login_wrap w'>
      <PublicHead { ...headData } />
      <img className='logo' src={ Logo } alt="" />
      <Form className='login_form' layout='horizontal' onFinish={onFinish} ref={ formRef }>
        <Form.Item>
          <p className='login_form_label'>用户名</p>
          <Form.Item noStyle name='username' rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input className='login_form_input' placeholder='请输入姓名' />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <p className='login_form_label'>登陆密码</p>
          <Form.Item noStyle name='password' rules={[{ required: true, message: '登陆密码不能为空' }]}>
            <Input type='password' className='login_form_input' placeholder='请输入登陆密码' />
          </Form.Item>
          <img onClick={ closePassword } className='login_form_close' src={ CloseImg } alt="" />
        </Form.Item>

        <Form.Item>
          <p className='login_form_label'>邮箱验证码</p>
          <Form.Item noStyle name='code' rules={[{ required: true, message: '邮箱验证码不能为空' }]}>
            <Input className='login_form_input' placeholder='请输入邮箱验证码' />
          </Form.Item>
          {
            codeData.status ? <p className='login_form_get_code'>{ codeData.time } s</p> : <p onClick={ getEmailCode } className='login_form_get_code'>获取验证码</p>
          }
        </Form.Item>

        <div onClick={ forget } className='login_form_forget'><p>忘记密码</p></div>

        <Form.Item>
          <Button className='login_form_btn' block type='submit' color='primary'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login