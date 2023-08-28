import './index.scss'
import { useNavigate } from 'react-router-dom'

const PublicHead = (props: any) => {
  const navigate = useNavigate()
  const clickBack = () => {
    if (props.back === 'goBack') return window.history.back()
    return navigate(props.back)
  }
  return (
    <div className={ props.textColor === 'white' ? 'public_head public_head_white' : 'public_head' }>
      {
        props.back && <i onClick={ clickBack } className="iconfont icon-icon-arrow-right2"></i>
      }
      <p className='public_head_tit'>{ props.title }</p>
    </div>
  )
}

export default PublicHead