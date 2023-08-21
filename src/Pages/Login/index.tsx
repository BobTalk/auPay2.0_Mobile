import PublicHead from '@/Components/PublicHead'
import Logo from '@/Assets/images/logo.png'
import {
  Form,
  Input,
  Button,
} from 'antd-mobile'
import './index.scss'
const Login = () => {
  const headData = {
    title: 'auPay用户登录',
    back: '',
  }
  return (
    <div className='login_wrap w'>
      <PublicHead { ...headData } />
      <img className='logo' src={ Logo } alt="" />
      <Form className='login_form' layout='horizontal'>
        <Form.Item
          name='name'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <p className='login_form_label'>用户名</p>
          <Input className='login_form_input' placeholder='请输入姓名' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: '登陆密码不能为空' }]}
        >
          <p className='login_form_label'>登陆密码</p>
          <Input type='password' className='login_form_input' placeholder='请输入登陆密码' />
        </Form.Item>

        <Form.Item
          name='code'
          rules={[{ required: true, message: '邮箱验证码不能为空' }]}
        >
          <p className='login_form_label'>邮箱验证码</p>
          <Input type='password' className='login_form_input' placeholder='请输入邮箱验证码' />
        </Form.Item>

      </Form>
    </div>
  )
}

export default Login