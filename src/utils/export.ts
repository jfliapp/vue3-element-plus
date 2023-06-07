import * as XLSX from 'xlsx'
import saveAs from 'file-saver'

export function exportExcel(data: any[], filters: TableColumn[], fileName = 'temp') {
  // 整理数据 只要 表格里面有的
  const exportData = data.reduce((prev, item) => {
    const t = {}
    filters.forEach((i) => {
      let v = ''
      if (i?.formatter) {
        v = i?.formatter?.(item)
      } else {
        v = item[t[i.field]]
      }
      t[i.field] = v
    })
    prev.push(t)
    return prev
  }, [])
  // 将 JSON 数据转换为工作表
  const worksheet = XLSX.utils.json_to_sheet(exportData)
  // 创建一个新的工作簿并添加工作表
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // 导出 Excel 文件
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  })

  // 使用 FileSaver 保存文件
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  // const fileName = 'ExportedData'
  saveAs(new Blob([excelBuffer], { type: fileType }), fileName + fileExtension)
}
