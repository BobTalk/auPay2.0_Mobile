import PublicHead from '@/Components/PublicHead'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
} from 'antd-mobile'
const User = () => {
  const headData = { title: '', back: '/login' }
  const navigate = useNavigate()
  const onFinish = (values: Object) => {
    console.log('登陆提交数据' + values)
    navigate('/reset/verify')
  }
  return (
    <div className='w login_wrap'>
      <PublicHead { ...headData } />
      <p className='reset_tit'>重置登录密码</p>
      <Form className='login_form' layout='horizontal' onFinish={onFinish}>
        <Form.Item>
          <p className='login_form_label'>用户名</p>
          <Form.Item noStyle name='username' rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input className='login_form_input' placeholder='请输入用户名' />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button className='login_form_btn' block type='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default User