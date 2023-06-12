import { tableFieldsType } from './types'
import { Options } from '@/types/Options'
import { getLabel } from '@/utils/tsxHelper'
// -------------------- start --- 用户详情--------------------
const statusOption: Options[] = [
  {
    value: 0,
    label: '正常'
  },
  {
    value: 1,
    label: '停用'
  },
  {
    value: 2,
    label: '已拒绝'
  }
]
const authOption: Options[] = [
  {
    value: 1,
    label: '开'
  },
  {
    value: 0,
    label: '关'
  }
]
// 币种
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
// 终端列表
const partnertypeOptions: Options[] = [
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

export const params1: TableColumn[] = [
  {
    field: 'partnerterm',
    value: '',
    prop: 'partnerterm',
    label: '用户ID',
    component: 'Input',
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '昵称',
    component: 'Input',
    isDisable: true,
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'euterm',
    value: '',
    prop: 'euterm',
    label: '真实姓名',
    component: 'Input',
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '国家/地区',
    component: 'Select',
    value: [],
    componentProps: {
      disabled: true,
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
    field: 'selectall',
    prop: 'selectall',
    label: '邀请人',
    component: 'Input',
    isDisable: true,
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '所属机构',
    component: 'Input',
    isDisable: true,
    componentProps: {
      disabled: true,
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
    field: 'selectall',
    prop: 'selectall',
    label: '手机号',
    component: 'Input',
    isDisable: true,
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '邮箱',
    component: 'Input',
    isDisable: true,
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '证件类型',
    component: 'Select',
    componentProps: {
      disabled: true,
      options: [{ value: 1, label: '身份证' }]
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '证件号',
    component: 'Input',
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '注册时间',
    component: 'Input',
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '成本',
    component: 'Input',
    isDisable: true,
    componentProps: {
      disabled: true
    }
  }
]
export const params2: TableColumn[] = [
  {
    field: 'partnerterm',
    value: 0,
    prop: 'partnerterm',
    label: '用户状态',
    component: 'Radio',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true,
      options: statusOption
    }
  },
  {
    field: 'partnerterm',
    value: 0,
    prop: 'partnerterm',
    label: '实名认证状态',
    component: 'Radio',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true,
      options: statusOption
    }
  },
  {
    field: 'partnerterm',
    value: 0,
    prop: 'partnerterm',
    label: '用户状态',
    component: 'Radio',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true,
      options: statusOption
    }
  }
]
export const params3: TableColumn[] = [
  {
    field: 'partnerterm',
    value: 1,
    prop: 'partnerterm',
    label: '发布买广告',
    component: 'Radio',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true,
      options: authOption
    }
  },
  {
    field: 'partnerterm',
    value: 1,
    prop: 'partnerterm',
    label: '发布卖广告',
    component: 'Radio',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true,
      options: authOption
    }
  },
  {
    field: 'partnerterm',
    value: 1,
    prop: 'partnerterm',
    label: '平台内转账',
    component: 'Radio',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true,
      options: authOption
    }
  }
]
export const params4: TableColumn[] = [
  {
    field: 'partnerterm',
    value: '',
    prop: 'partnerterm',
    label: '登录密码',
    component: 'Input',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      type: 'password',
      disabled: true
    }
  },
  {
    field: 'partnerterm',
    value: '',
    prop: 'partnerterm',
    label: '资金密码',
    component: 'Input',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      type: 'password',
      disabled: true
    }
  }
]

export const tableColumns1: TableColumn[] = [
  {
    field: 'index',
    type: 'index',
    label: '序号'
  },
  {
    field: 'ID',
    label: '姓名'
  },
  {
    field: 'id1',
    label: '开户行'
  },
  {
    field: 'account',
    label: '账号'
  },
  {
    field: 'message',
    label: '附加信息'
  },
  {
    field: 'desc',
    label: '备注'
  },
  {
    field: 'img',
    label: '图片'
  },
  {
    field: 'action',
    label: '操作'
  }
]

export const tableColumns2: TableColumn[] = [
  {
    field: 'index',
    type: 'index',
    label: '序号'
  },
  {
    field: 'ID',
    label: '账户类型'
  },
  {
    field: 'id1',
    label: '账号'
  },
  {
    field: 'account',
    label: '币种'
  },
  {
    field: 'message',
    label: '余额'
  },
  {
    field: 'desc',
    label: '可用'
  },
  {
    field: 'img',
    label: '冻结'
  },
  {
    field: 'action',
    label: '入金状态'
  },
  {
    field: 'action',
    label: '出金状态'
  },
  {
    field: 'action',
    label: '最低出金额度'
  },
  {
    field: 'action',
    label: '账户状态'
  },
  {
    field: 'action',
    label: '操作'
  }
]

export const tableColumns3: TableColumn[] = [
  { field: 'x', label: '账户类型' },
  { field: 'x', label: '保如' },
  { field: 'x', label: '币种' },
  { field: 'x', label: '余额' },
  { field: 'x', label: '可用' },
  { field: 'x', label: '冻结' },
  { field: 'x', label: '账户状态' },
  { field: 'x', label: '操作' }
]

export const tableColumns4: TableColumn[] = [
  { field: 'x', label: '账户类型' },
  { field: 'x', label: '账号' },
  { field: 'x', label: '币种' },
  { field: 'x', label: '余额' },
  { field: 'x', label: '可用' },
  { field: 'x', label: '冻结' },
  { field: 'x', label: '入金状态' },
  { field: 'x', label: '出金状态' },
  { field: 'x', label: '最低出金额度' },
  { field: 'x', label: '账户状态' }
]

export const tableColumns5: TableColumn[] = [
  { field: 'x', label: '账号' },
  { field: 'x', label: '币种' },
  { field: 'x', label: '真实/模拟' },
  { field: 'x', label: '金期' },
  { field: 'x', label: '可用' },
  { field: 'x', label: '冻结' },
  { field: 'x', label: '卖开仓' },
  { field: 'x', label: '平仓' },
  { field: 'x', label: '预警风险率' },
  { field: 'x', label: '爆仓风险率' },
  { field: 'x', label: '是否对冲' },
  { field: 'x', label: '账户状态' },
  { field: 'x', label: '对手方账户ID' }
]
// -------------------- end --- 用户详情--------------------
// 资金管理

export const moneyColumns: TableColumn[] = [
  { field: 'CurCode', label: '币种' },
  { field: 'WithDraw', label: '入金' },
  { field: 'Deposit', label: '出金' },
  { field: 'Balance', label: '余额' }
]

export const platformWalletColumns: TableColumn[] = [
  { field: 'role', label: '角色' },
  { field: 'CurCode', label: '币种' },
  { field: 'WithDraw', label: '入金' },
  { field: 'Deposit', label: '出金' },
  { field: 'Balance', label: '余额' }
]

export const CFDColumns: TableColumn[] = [
  { field: 'Role', label: '角色' },
  { field: 'CurCode', label: '币种' },
  { field: 'CashToMake', label: '钱包转合约' },
  { field: 'MakeToCash', label: '合约转钱包' },
  { field: 'Pnl', label: '平仓盈亏' },
  { field: 'Opentax', label: '开仓手续费' },
  { field: 'Closetax', label: '平仓手续费' },
  { field: 'ROtax', label: '展期费' },
  { field: 'Spread', label: '点差' },
  { field: 'Balance', label: '余额' }
]

export const optionsColumns: TableColumn[] = [
  { field: 'Role', label: '角色' },
  { field: 'CurCode', label: '币种' },
  { field: 'CashToMake', label: '钱包转期权' },
  { field: 'MakeToCash', label: '期权转钱包' },
  { field: 'Pnl', label: '期权盈亏' },
  { field: 'Opentax', label: '期权手续费' },
  { field: 'Balance', label: '余额' }
]

export const bounsColumns: TableColumn[] = [
  { field: 'Role', label: '角色' },
  { field: 'CurCode', label: '币种' },
  { field: 'CashToMake', label: '赠金' },
  { field: 'MakeToCash', label: '利息' },
  { field: 'Pnl', label: '佣金' },
  { field: 'Opentax', label: '推荐奖金' },
  { field: 'Closetax', label: '退回' },
  { field: 'ROtax', label: '撮合认购奖励' },
  { field: 'Spread', label: '撮合推荐奖励' },
  { field: 'Balance', label: '余额' }
]

export const centralPlatformColumns: TableColumn[] = [
  { field: 'CurCode', label: '币种' },
  { field: 'Deposit', label: '充币' },
  { field: 'WithDraw', label: '提币' },
  { field: 'WithDrawFee', label: '提币手续费' },
  { field: 'Collect', label: '已归集' },
  { field: 'CollectFee', label: '归集手续费' },
  { field: 'UnCollect', label: '未归集' },
  { field: 'Balance', label: '余额' }
]

export const centralWalletColumns: TableColumn[] = [
  { field: 'role', label: '角色' },
  ...centralPlatformColumns
]

// 钱包资产
export const walletSearchParams: tableFieldsType[] = [
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
    field: 'term',
    value: '',
    prop: 'term',
    label: '关键字',
    component: 'Input'
  }
]

export const walletColumns: TableColumn[] = [
  {
    field: 'Caption',
    prop: 'Caption',
    label: '用户ID'
  },
  {
    prop: 'BindTel',
    field: 'BindTel',
    label: '用户名称'
  },
  {
    prop: 'BindTel',
    field: 'BindTel',
    label: '手机号'
  },
  {
    prop: '__subId', // 自己定义的字段
    field: '__subId',
    label: '子账号'
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
    prop: 'Balance',
    field: 'Balance',
    label: '余额'
  },
  {
    prop: 'DepositTotalAmt',
    field: 'DepositTotalAmt',
    label: '可用'
  },
  {
    prop: 'Frozen',
    field: 'Frozen',
    label: '冻结'
  },
  {
    prop: 'action',
    field: 'action',
    label: '提币权限'
  }
]

export const moneyListSearchParams: tableFieldsType[] = [
  {
    field: 'partnertype',
    value: '',
    prop: 'partnertype',
    label: '用户类型',
    component: 'Select',
    componentProps: {
      options: partnertypeOptions
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
    field: 'userterm',
    value: '',
    prop: 'userterm',
    label: '关键字',
    component: 'Input'
  }
]

export const moneyListColumns: TableColumn[] = [
  {
    field: 'OwnerCaption',
    prop: 'OwnerCaption',
    label: 'ID'
  },
  {
    prop: 'TrueName',
    field: 'TrueName',
    label: '名称'
  },
  {
    prop: 'OwnerCode',
    field: 'OwnerCode',
    label: '所属机构'
  },
  {
    prop: 'ConvertBalanceTotal',
    field: 'ConvertBalanceTotal',
    label: '总折合(USDT)'
  },
  {
    prop: 'AcctType',
    field: 'AcctType',
    label: '账号类型'
  },
  {
    prop: 'id',
    field: 'id',
    label: '账号'
  },
  {
    prop: 'BaseCurCode',
    field: 'BaseCurCode',
    label: '币种',
    formatter: function (row) {
      return getLabel(curCodeOptions, row.CurCode)
    }
  },
  {
    prop: 'Balance',
    field: 'Balance',
    label: '余额'
  },
  {
    prop: 'Available',
    field: 'Available',
    label: '可用'
  },
  {
    prop: 'Frozen',
    field: 'Frozen',
    label: '冻结'
  }
]

// 红冲蓝补
export const redBlueForm: TableColumn[] = [
  {
    field: 'id',
    value: '',
    prop: 'id',
    label: '钱包账户',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'Caption',
    value: '',
    prop: 'Caption',
    label: '用户id/名称',
    component: 'Input',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true
    }
  }
]

export const redBleListColumns: TableColumn[] = [
  {
    prop: 'id',
    field: 'id',
    label: '账号'
  },
  {
    prop: 'BaseCurCode',
    field: 'BaseCurCode',
    label: '币种',
    formatter: function (row) {
      return getLabel(curCodeOptions, row.CurCode)
    }
  },
  {
    prop: 'Balance',
    field: 'Balance',
    label: '余额'
  },
  {
    prop: 'Available',
    field: 'Available',
    label: '可用'
  },
  {
    prop: 'Frozen',
    field: 'Frozen',
    label: '冻结'
  }
]
