export interface tableFieldsType extends TableColumn {
  prop: string
  label: string
  [props: string]: any
  // fixed?: boolean
  // width?: string
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
