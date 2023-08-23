import { useRef, useState, useEffect } from 'react'
import PublicHead from '@/Components/PublicHead'
import Logo from '@/Assets/images/logo.png'
import CloseImg from '@/Assets/images/close.png'
import {
  Form,
  Input,
  Button,
  Checkbox,
} from 'antd-mobile'
import { Link } from 'react-router-dom'
const Register = () => {
  const headData = { title: 'auPay用户注册', back: '/' }
  let codeTimer: any = null
  const [ codeData, setCodeData ] = useState({ timer: null, status: false, time: 60 })
  const formRef: any = useRef(null)
  const closePassword = (key: String) => {
    if (!key) return
    formRef && formRef.current && formRef.current.setFieldValue(key, '')
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
    console.log('注册提交数据' + value)
  }
  return (
    <div className='login_wrap w'>
      <PublicHead { ...headData } />
      <img className='logo' src={ Logo } alt="" />
      <Form className='login_form register_form' onFinish={onFinish} ref={ formRef }>
        <Form.Item>
          <p className='login_form_label'>用户名</p>
          <Form.Item noStyle name='username'
            rules={[
              { required: true, message: '用户名不能为空' },
              { pattern: /^[^0-9]\w{5,9}$/, message: '6-10位字母加数字组合，且首位不为数字' },
            ]}>
            <Input className='login_form_input' placeholder='6-10位字母加数字组合，且首位不为数字' />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <p className='login_form_label'>设置登陆密码</p>
          <div className='register_form_flex'>
            <Form.Item noStyle name='password'
              rules={[
                { required: true, message: '登陆密码不能为空' },
                { type: 'string', min: 6, max: 20, message: '密码长度在6-20个字符之间' },
              ]}>
              <Input type='password' className='login_form_input' placeholder='密码长度在6-20个字符之间' />
            </Form.Item>
            <img onClick={ () => closePassword('password') } className='login_form_close' src={ CloseImg } alt="" />
          </div>
        </Form.Item>

        <Form.Item>
          <p className='login_form_label'>确认登陆密码</p>
          <div className='register_form_flex'>
            <Form.Item noStyle name='newPassword' 
              rules={[
                { required: true, message: '请确认您的密码!', },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('您输入的两次密码不一致!'));
                  },
                }),
              ]}
            >
              <Input type='password' className='login_form_input' placeholder='重复输入登录密码' />
            </Form.Item>
            <img onClick={ () => closePassword('newPassword') } className='login_form_close' src={ CloseImg } alt="" />
          </div>
        </Form.Item>

        <Form.Item>
          <p className='login_form_label'>邮箱</p>
          <div className='register_form_flex'>
            <Form.Item noStyle name='email'
              rules={[
                { required: true, message: '邮箱不能为空' },
                { type: 'email', message: '请正确输入邮箱' }
              ]}>
              <Input className='login_form_input' placeholder='请输入邮箱地址' />
            </Form.Item>
            <img onClick={ () => closePassword('email') } className='login_form_close' src={ CloseImg } alt="" />
          </div>
        </Form.Item>

        <Form.Item>
          <p className='login_form_label'>邮箱验证码</p>
          <div className="register_form_flex">
            <Form.Item noStyle name='code' rules={[{ required: true, message: '邮箱验证码不能为空' }]}>
              <Input className='login_form_input' placeholder='请输入邮箱验证码' />
            </Form.Item>
            {
              codeData.status ? <p className='login_form_get_code'>{ codeData.time } s</p> : <p onClick={ getEmailCode } className='login_form_get_code'>获取验证码</p>
            }
          </div>
        </Form.Item>

        <Form.Item className='login_form_item' name='checkbox' rules={[{ required: true, message: '请选择同意《auPay用户协议》' }]}>
          <Checkbox>我同意《auPay用户协议》</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button className='login_form_btn' block type='submit' color='primary'>
            注册
          </Button>
        </Form.Item>
      </Form>
      <p className='foo_tips'>还没账号, <Link to='/login'>去登录</Link></p>
    </div>
  )
}

export default Register