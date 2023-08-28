import PublicHead from '@/Components/PublicHead'
import { useState } from 'react'
// import {  }
import './index.scss'

const Info = () => {
  const [ headData, setHeadData ] = useState({ title: '资产', back: 'goBack', textColor: 'white' })

  return (
    <div className='assets_info'>
      <PublicHead { ...headData } />
      <div className='assets_info_form'>
        <div className="assets_info_form_head">
          <div className='assets_info_form_head_status'><i className="iconfont icon-top"></i></div>
          <p><i className='iconfont icon-USDT' style={{ 'color' :'#17a37a' }}></i>87,823.00 USDT</p>
          <span>¥123,302.09</span>
        </div>
        <div className='public_w'>
          <ul className="assets_info_form_ul">
            <li><p>创建时间</p><span>2023-06-30 18:17:47</span></li>
            <li><p>完成时间</p><span>2023-06-30 18:17:47</span></li>
            <li><p>货币类型</p><span>USDT-TRC20</span></li>
            <li><p>充币数量</p><span className='assets_info_form_li_money'>23</span></li>
          </ul>
          <ul className="assets_info_form_ul">
            <li><p>付款地址</p><span>0x885ce91cd2bf32983464f4</span></li>
            <li><p>交易ID</p><span>0x885ce91cd2bf32983464f4</span></li>
            <li><p>收款地址</p><span>0x885ce91cd2bf32983464f4</span></li>
            <li><p>交易确认数</p><span><i className="assets_info_form_li_number">5</i>/6</span></li>
            <li>
              <p>交易状态</p>
              <span>5/6</span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Info