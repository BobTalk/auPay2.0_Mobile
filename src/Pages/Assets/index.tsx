import PublicHead from '@/Components/PublicHead'
import PublicFoo from '@/Components/PublicFoo'
import './index.scss'
import { useNavigate } from 'react-router-dom'
const Assets = () => {
  const headData = { title: '资产', back: '' }
  const navigate = useNavigate()
  const toDetail = () => {
    // navigate('/assets/detail?id=123')
    navigate('/assets/detail/123')
  }
  return (
    <div className='public_w assets_w nav_h'>
      <PublicHead { ...headData } />
      <div className='assets_banner'>
        <p className='assets_banner_tit'>auPay资产余额(USDT)</p>
        <div className='assets_banner_money'><p>87,823.00</p> <i>¥123,302.09</i></div>
        <i className='assets_banner_line'></i>
        <span className='assets_banner_record'>最近交易：2020-09-17 09:29:08 充币13USDT-TRC20</span>
      </div>
      <ul className='currency_list'>
        <li onClick={ toDetail }>
          <div className='currency_icon'>
            <i className="iconfont icon-BTC"></i>
            {/* <img src="" alt="" /> */}
            <p>BTC</p>
          </div>
          <div className='currency_money'><p>10,781,57 USDT</p><span>¥76,901.35</span></div>
        </li>
        <li>
          <div className='currency_icon'>
            <i className="iconfont icon-ETH"></i>
            {/* <img src="" alt="" /> */}
            <p>BTC</p>
          </div>
          <div className='currency_money'><p>10,781,57 USDT</p><span>¥76,901.35</span></div>
        </li>
        <li>
          <div className='currency_icon'>
            <i className="iconfont icon-USDT"></i>
            {/* <img src="" alt="" /> */}
            <p>BTC</p>
          </div>
          <div className='currency_money'><p>10,781,57 USDT</p><span>¥76,901.35</span></div>
        </li>
        <li>
          <div className='currency_icon'>
            <i className="iconfont icon-ETH"></i>
            {/* <img src="" alt="" /> */}
            <p>BTC</p>
          </div>
          <div className='currency_money'><p>10,781,57 USDT</p><span>¥76,901.35</span></div>
        </li>
        <li>
          <div className='currency_icon'>
            <i className="iconfont icon-USDT"></i>
            {/* <img src="" alt="" /> */}
            <p>BTC</p>
          </div>
          <div className='currency_money'><p>10,781,57 USDT</p><span>¥76,901.35</span></div>
        </li>
      </ul>
      <PublicFoo />
    </div>
  )
}

export default Assets