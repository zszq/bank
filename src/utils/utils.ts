// 涨跌，收支颜色
export function getColor(value: number) {
  if (value > 0) return '#67c23a'
  return '#f56c6c'
}

// 将数字格式化为千分位分隔符的字符串
export function formatNumberWithCommas(number: string) {
  const parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
