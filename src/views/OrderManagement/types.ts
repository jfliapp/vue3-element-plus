export interface tableFieldsType extends TableColumn {
  prop: string
  label: string
  fixed?: boolean
  width?: string
  [props: string]: any
}
export interface tableDataFieldType {
  // orderNum: number
  Caption: number
  invite: string
  UplineDirect: number
  BindTel: number
  BindMail: string
  typeCard: number
  VerName: string
  VerIdCardNo: number
  Status: string
  createdat: number
}
