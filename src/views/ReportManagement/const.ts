import { tableFieldsType } from './types'
import { getLabel } from '@/utils/tsxHelper'
const realdemoOptions = [
  {
    value: 0,
    label: '真实'
  },
  {
    value: 1,
    label: '模拟'
  }
]
const bsOptions = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: '买'
  },
  {
    value: 1,
    label: '卖'
  }
]
export const tabPanes = [
  { name: '0', label: '持仓单(用户)' },
  { name: '1', label: '委托单(用户)' },
  { name: '2', label: '平仓单(用户)' },
  { name: '3', label: '交易明细(用户)' },
  { name: '4', label: '持仓单(交易商)' },
  { name: '5', label: '委托单(交易商)' },
  { name: '6', label: '平仓单(交易商)' },
  { name: '7', label: '交易明细(交易商)' },
  { name: '8', label: '持仓单(中央对手方)' },
  { name: '9', label: '平仓单(中央对手方)' }
]
export const commonsParams: tableFieldsType[] = [
  {
    field: 'realdemo',
    value: '',
    prop: 'realdemo',
    label: '数据',
    component: 'Select',
    componentProps: {
      options: realdemoOptions
    }
  },
  {
    field: 'partnerterm',
    value: '',
    prop: 'partnerterm',
    label: '所属机构',
    component: 'Input',
    componentProps: {
      placeholder: '用户ID/手机号/邮箱/姓名'
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '是否包含下级',
    component: 'Select',
    componentProps: {
      options: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ]
    }
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '用户ID/手机号/邮箱/姓名'
    }
  },
  {
    field: 'acctid',
    prop: 'acctid',
    label: '交易账户',
    component: 'Input'
  },
  {
    field: 'tkt',
    prop: 'tkt',
    label: '订单ID',
    component: 'Input'
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '交易品种',
    component: 'Input'
  },
  {
    field: 'bs',
    prop: 'bs',
    label: '交易类型',
    component: 'Select',
    componentProps: {
      options: bsOptions
    }
  }
]

export const commonsTableColumns: TableColumn[] = [
  {
    field: 'ID',
    label: '持仓单ID'
  },
  {
    field: 'TrueName',
    label: '真实姓名'
  },
  {
    field: 'Acct',
    label: '交易账号'
  },
  {
    field: 'Upline',
    label: '所属机构'
  },
  {
    field: 'Code',
    label: '交易品种'
  },
  {
    field: 'bs',
    label: '交易类型',
    formatter: (row) => {
      return getLabel(bsOptions, row.bs)
    }
  },
  {
    field: 'Opendat',
    label: '开仓时间'
  },
  {
    field: 'PriceOpen',
    label: '开仓价格'
  },
  {
    field: 'Lot',
    label: '开仓数量'
  },
  {
    field: 'img',
    label: '止盈'
  },
  {
    field: 'img',
    label: '止损'
  },
  {
    field: 'Margin',
    label: '占用保证金'
  },
  {
    field: 'img',
    label: '持仓价格'
  },
  {
    field: 'img',
    label: '持仓盈亏'
  },
  {
    field: 'img',
    label: '综合服务费'
  },
  {
    field: 'img',
    label: '延期费'
  },
  {
    field: 'CP',
    label: '对手单号'
  },
  {
    field: 'CptAcct',
    label: '对手交易账号'
  },
  {
    field: 'img',
    label: '是否自动递延'
  },
  {
    field: 'img',
    label: '是否自动追加保证金'
  },
  {
    field: 'img',
    label: '操作类型'
  },
  {
    field: 'img',
    label: '操作IP'
  }
]

export const otherTableColumns: TableColumn[] = [
  {
    field: 'Code',
    label: '商品代码'
  },
  {
    field: 'Caption',
    label: '商品名称'
  },
  {
    field: 'BuyLot',
    label: '买持仓数量'
  },
  {
    field: 'BuyAvgPriceOpen',
    label: '买开仓均价'
  },
  {
    field: 'ShellLot',
    label: '卖持仓数量'
  },
  {
    field: 'ShellAvgPriceOpen',
    label: '卖开仓均价'
  },
  {
    field: 'EquityLot',
    label: '净持仓数量'
  },
  {
    field: 'EquityPnl',
    label: '持仓盈亏'
  },
  {
    field: 'BuyProgress',
    label: '多空对比'
  }
]
