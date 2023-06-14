import { tableFieldsType } from './types'
import { Options } from '@/types/Options'
import { getLabel } from '@/utils/tsxHelper'
export const partnertypeOptoins = [
  {
    value: '__a',
    label: '支付商户'
  },
  {
    value: '__b',
    label: '运营中心'
  },
  {
    value: '__c',
    label: '会员'
  },
  {
    value: '__d',
    label: '特别会员'
  },
  {
    value: '__e',
    label: '代理'
  }
]

const cashTypeOptions: Options[] = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 2,
    label: '入金'
  },
  {
    value: 3,
    label: '出金'
  }
]

const cashmodeOptions = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: 'Zeuspay平台'
  },
  {
    value: 1,
    label: '对公银行'
  },
  {
    value: 2,
    label: '区块链'
  },
  {
    value: 3,
    label: 'Radiofinance平台入金'
  },
  {
    value: 4,
    label: '对公数字币'
  }
]
const curCodeOptions: Options[] = [
  {
    value: '-1',
    label: '全部'
  },
  {
    value: 'TWD',
    label: 'TWD'
  },
  {
    value: 'USD',
    label: 'USD'
  },
  {
    value: 'USDT',
    label: 'USDT'
  }
]

export const accessSearchParams: tableFieldsType[] = [
  {
    field: 'partnertype',
    prop: 'partnertype',
    value: '',
    label: '用户类型',
    component: 'Select',
    componentProps: {
      options: partnertypeOptoins
    }
  },
  {
    field: 'partnerterm',
    value: '',
    prop: 'partnerterm',
    label: '所属机构',
    component: 'Input'
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '是否包含下级',
    labelWidth: 0,
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    }
  },
  {
    field: 'euterm',
    value: '',
    prop: 'euterm',
    label: '机构ID',
    component: 'Input'
  },
  {
    field: 'cashmode',
    value: '',
    prop: 'cashmode',
    label: '出入金通道',
    component: 'Select',
    componentProps: {
      options: cashmodeOptions
    }
  },
  {
    field: 'cashtype',
    value: '',
    prop: 'cashtype',
    label: '出入金类型',
    component: 'Select',
    componentProps: {
      options: cashTypeOptions
    }
  },
  {
    field: 'CurCode',
    value: '',
    prop: 'CurCode',
    label: '币种',
    component: 'Select',
    componentProps: {
      options: curCodeOptions
    }
  },
  {
    field: '__dateRange',
    value: '',
    prop: '__dateRange',
    label: '查询时间',
    rangeSeparator: 'To',
    component: 'DatePicker',
    componentProps: {
      type: 'daterange'
    }
  }
]

export const accessTableColumns: TableColumn[] = [
  {
    field: 'id',
    prop: 'id',
    label: '订单ID'
  },
  {
    prop: 'NickName',
    field: 'NickName',
    label: 'ID/名称'
  },
  {
    prop: 'Owner',
    field: 'Owner',
    label: '真实姓名'
  },
  {
    prop: 'UplineDirect',
    field: 'UplineDirect',
    label: '所属机构'
  },
  {
    prop: 'CashType',
    field: 'CashType',
    label: '类型',
    formatter: function (row) {
      return getLabel(cashTypeOptions, row.CashType)
    }
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '支付通道'
  },
  {
    prop: 'CurCode',
    field: 'CurCode',
    label: '币种',
    formatter: function (row) {
      return getLabel(curCodeOptions, row.CurCode)
    }
  },
  {
    prop: 'Amt',
    field: 'Amt',
    label: '金额'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '支付币种'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '提币地址'
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '支付方式'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '对公账户开户行'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '用户银行开户行'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '账号'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '姓名'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '支行'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '凭证'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '状态'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '申请时间'
  },
  {
    prop: 'Desc',
    field: 'Desc',
    label: '备注'
  }
]

export const confirmTableColumns: TableColumn[] = [
  {
    field: 'id',
    prop: 'id',
    label: '委托单ID'
  },
  {
    prop: 'NickName',
    field: 'NickName',
    label: '真实姓名'
  },
  {
    prop: 'Owner',
    field: 'Owner',
    label: '交易账号'
  },
  {
    prop: 'UplineDirect',
    field: 'UplineDirect',
    label: '所属机构'
  },
  {
    prop: 'OwnerType',
    field: 'OwnerType',
    label: '交易品种'
  },
  {
    prop: 'OwnerType',
    field: 'OwnerType',
    label: '交易品种'
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '交易类型'
  },
  {
    prop: 'CurCode',
    field: 'CurCode',
    label: '委托时间'
  },
  {
    prop: 'Amt',
    field: 'Amt',
    label: '委托价格'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '委托数量',
    formatter: (item) => {
      if (item.Status === 5) return '6'
      return item.Status
    }
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '止盈'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '止损'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '最新价格'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '有效时间'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '是否自动递延'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '是否自动追加保证金'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '操作'
  }
]
export const confirmSearchParams: tableFieldsType[] = [
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '数据',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '模拟',
          value: 0
        },
        {
          label: '真实',
          value: 1
        }
      ]
    }
  },
  {
    field: 'partnerterm',
    value: '',
    prop: 'partnerterm',
    label: '所属机构',
    component: 'Input'
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '包含下级',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: '1'
        }
      ]
    }
  },
  {
    field: 'euterm',
    value: '',
    prop: 'euterm',
    label: '用户Id',
    labelWidth: 0,
    component: 'Input'
  },
  {
    field: 'term1',
    value: '',
    prop: 'term',
    label: '交易账户',
    component: 'Input'
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '订单ID',
    component: 'Input'
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '交易类型',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '1',
          value: 1
        }
      ]
    }
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: 'IP查询',
    component: 'Input'
  }
]
