import PublicHead from '@/Components/PublicHead'
import { Button } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './index.scss'

const Receipt = () => {
  const headData = { title: '', back: '/login' }
  const navigate = useNavigate()
  const location = useLocation()
  const [ type, setType ] = useState('success')
  const backGo = () => {
    navigate('/login')
  }
  useEffect(() => {
    location.state && location.state.type === 'success' ? setType('success') : setType('')
  }, [])
  return (
    <div className='w'>
      <PublicHead { ...headData } />
      {
        type === 'success' ? (
          <div className='reset_receipt'>
            <i className='iconfont icon-chenggong'></i>
            <p>密码重置成功</p>
            <Button className="before:bg-transparent" onClick={ backGo }>去登录</Button>
          </div>
        ) : (
          <div className='reset_receipt'>
            <i className='iconfont icon-shibai'></i>
            <p>密码重置失败</p>
            <Button className='before:bg-transparent' onClick={ backGo }>返回</Button>
          </div>
        )
      }
      
    </div>
  )
}

export default Receipt