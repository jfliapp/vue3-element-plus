export interface tableFieldsType extends TableColumn {
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

export const partnertype = {
  0: '运营中心',
  1: '席位会员',
  2: '会员下属代理商'
}
