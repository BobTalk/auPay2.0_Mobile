import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicHead from '@/Components/PublicHead'
import {
  Form,
  Input,
  Button,
} from 'antd-mobile'
const Verify = () => {
  const headData = { title: '', back: '/reset/user' }
  const navigate = useNavigate()
  let codeTimer: any = null
  const [ codeData, setCodeData ] = useState({ timer: null, status: false, time: 60 })
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
  const onFinish = (values: Object) => {
    console.log('登陆提交数据' + values)
    navigate('/reset/new')
  }
  return (
    <div className='w login_wrap'>
      <PublicHead { ...headData } />
      <p className='reset_tit'>安全验证</p>
      <Form className='login_form reset_form' layout='horizontal' onFinish={onFinish}>
        <Form.Item>
          <p className='login_form_label login_form_label_max'>js****@yeah.net</p>
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
        <Form.Item>
          <p className='login_form_label'>Google验证</p>
          <Form.Item noStyle name='username' rules={[{ required: true, message: 'Google验证码不能为空' }]}>
            <Input className='login_form_input' placeholder='请输入Google验证码' />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button className='before:bg-transparent login_form_btn' block type='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Verify