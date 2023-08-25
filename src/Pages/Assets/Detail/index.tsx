import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const Detail = () => {
  const [ id, setId ] = useState('')
  const location = useLocation()
  useEffect(() => {
    let searchParams = new URLSearchParams(location.search)
    let id = searchParams.get('id')
    setId(JSON.stringify(id))
  }, [])
  return (
    <div>我是详情我的id是{ id }</div>
  )
}
export default Detail