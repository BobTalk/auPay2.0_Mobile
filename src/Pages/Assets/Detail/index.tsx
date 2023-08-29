import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import PublicHead from '@/Components/PublicHead'
import './index.scss'
import DepositImg from '@/Assets/images/assets/deposit.png'
import DrawImg from '@/Assets/images/assets/draw.png'

const Detail = () => {
  const headData = { title: 'BTC', back: '/assets', textColor: 'white' }
  const nav = [
    { label: '全部', value: 'all' },
    { label: '充币', value: 'deposit' },
    { label: '提币', value: 'draw' },
    { label: '交易记录', value: 'record' },
  ]
  const [ navK, setNavK ] = useState('all')
  const [ id, setId ] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  useEffect(() => {
    setId(String(params.id)) // 用这个id获取数据
  }, [])
  const clickNav = (k: any) => {
    if (k === 'record') return navigate(location.pathname + '/record')
    // 这里还要加上获取数据的操作
    return setNavK(k)
  }
  const toInfo = () => { navigate(location.pathname + '/info') }
  return (
    <div>
      <div className="assets_detail_banner public_w">
        <PublicHead { ...headData } />
        <div className="assets_detail_banner_top">
          <i className="iconfont icon-BTC"></i>
          <div className="assets_detail_banner_top_txt">
            <p>87,823.00</p>
            <span>¥123,302.09</span>
          </div>
        </div>
        <div className="assets_detail_banner_foo">
          <p>充币</p>
          <p>提币</p>
        </div>
      </div>
      <div className="assets_detail_content">
        <ul className="assets_detail_nav">
          {
            nav.map(item => {
              return <li onClick={ () => clickNav(item.value) } key={ item.value } className={ navK === item.value ? 'cur' : '' }>{ item.label }</li>
            })
          }
        </ul>
        <ul className="assets_detail_record">
          <li onClick={ toInfo }>
            <div className="assets_detail_record_left">
              <img src={ DepositImg } alt="" />
              <div className="assets_detail_record_left_order">
                <p>payme…9500001</p>
                <span>2023-06-30 18:17:47</span>
              </div>
            </div>
            <div className="assets_detail_record_right">
              <p>20,935.89 USDT</p>
              <span>¥3,760.08</span>
            </div>
          </li>
          <li>
            <div className="assets_detail_record_left">
              <img src={ DrawImg } alt="" />
              <div className="assets_detail_record_left_order">
                <p>payme…9500001</p>
                <span>2023-06-30 18:17:47</span>
              </div>
            </div>
            <div className="assets_detail_record_right">
              <p>20,935.89 USDT</p>
              <span>¥3,760.08</span>
            </div>
          </li>
          <li>
            <div className="assets_detail_record_left">
              <img src={ DepositImg } alt="" />
              <div className="assets_detail_record_left_order">
                <p>payme…9500001</p>
                <span>2023-06-30 18:17:47</span>
              </div>
            </div>
            <div className="assets_detail_record_right">
              <p>20,935.89 USDT</p>
              <span>¥3,760.08</span>
            </div>
          </li>
          <li>
            <div className="assets_detail_record_left">
              <img src={ DrawImg } alt="" />
              <div className="assets_detail_record_left_order">
                <p>payme…9500001</p>
                <span>2023-06-30 18:17:47</span>
              </div>
            </div>
            <div className="assets_detail_record_right">
              <p>20,935.89 USDT</p>
              <span>¥3,760.08</span>
            </div>
          </li>
          <li>
            <div className="assets_detail_record_left">
              <img src={ DepositImg } alt="" />
              <div className="assets_detail_record_left_order">
                <p>payme…9500001</p>
                <span>2023-06-30 18:17:47</span>
              </div>
            </div>
            <div className="assets_detail_record_right">
              <p>20,935.89 USDT</p>
              <span>¥3,760.08</span>
            </div>
          </li>
          <li>
            <div className="assets_detail_record_left">
              <img src={ DrawImg } alt="" />
              <div className="assets_detail_record_left_order">
                <p>payme…9500001</p>
                <span>2023-06-30 18:17:47</span>
              </div>
            </div>
            <div className="assets_detail_record_right">
              <p>20,935.89 USDT</p>
              <span>¥3,760.08</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Detail