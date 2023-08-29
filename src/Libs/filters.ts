import moment from 'moment'
import { currencyData } from '@/Libs/publicData'

export function dateFil(value: Date, type = 'yyyy-MM-DD HH:MM:ss') {
  if (!value) return '-'
  if (String(new Date()).includes('0700')) { // 东七区
    return moment(new Date(value).getTime() + (60 * 60 * 1000)).format(type)
  } else { // 默认东八
    return moment(value).format(type)
  }
}

export function currencyFil(k: number, type = 'label') {
  if (!k) return '-'
  const temp = currencyData.filter(item => item.value === k)
  if (temp && temp.length) return (temp[0] as any)[type]
  // if (temp && temp.length) return temp[0][type as keyof typeof temp[0]]
}