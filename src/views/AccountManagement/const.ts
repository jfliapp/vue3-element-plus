import { getLabel } from '@/utils/tsxHelper'
import { tableFieldsType } from './types'
import { formatTime } from '@/utils'
import { h } from 'vue'
const statusOption = [
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
    label: '待审核'
  }
]
// 认证状态
const authStatusOption = [
  {
    value: 0,
    label: '未认证'
  },
  {
    value: 1,
    label: '已认证'
  },
  {
    value: 2,
    label: '已拒绝'
  }
]
const subTreeOptions = [
  {
    value: true,
    label: '是'
  },
  {
    value: false,
    label: '否'
  }
]
const onlineOption = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 1,
    label: '在线'
  },
  {
    value: 2,
    label: '离线'
  }
]
const honestNameStatusOption = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: '审核中'
  },
  {
    value: 1,
    label: '已认证'
  },
  {
    value: 2,
    label: '已拒绝'
  }
]
const authOption = [
  {
    value: 1,
    label: '开'
  },
  {
    value: 0,
    label: '关'
  }
]

export const addUserInfoParams: tableFieldsType[] = [
  {
    field: 'invitecode',
    label: '邀请码',
    colProps: {
      span: 24
    },
    component: 'Input',
    componentProps: {
      clearable: false
    }
  },
  {
    field: 'country',
    label: '国家',
    component: 'Select',
    colProps: {
      span: 24
    },
    componentProps: {
      clearable: false,
      options: [{ value: '中国', label: 'chain' }]
    }
  },

  {
    field: 'tel',
    label: '手机号',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      clearable: false
    }
  },
  {
    field: 'mail',
    label: '邮箱',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      clearable: false
    }
  },
  {
    field: 'pwd',
    label: '登录密码',
    colProps: {
      span: 24
    },
    component: 'Input',
    componentProps: {
      type: 'password',
      clearable: false
    }
  },
  {
    field: 'pwd2',
    label: '确认密码',
    colProps: {
      span: 24
    },
    component: 'Input',
    componentProps: {
      type: 'password',
      clearable: false
    }
  }
]

export const searchUserListParams: tableFieldsType[] = [
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
    value: [],
    componentProps: {
      options: subTreeOptions
    }
  },
  {
    field: 'euterm',
    value: '',
    prop: 'euterm',
    label: '关键字',
    labelWidth: 0,
    component: 'Input'
  },
  {
    field: 'acctstatus',
    prop: 'acctstatus',
    label: '用户状态',
    component: 'Select',
    value: [],
    componentProps: {
      options: statusOption
    }
  },
  {
    field: 'online',
    prop: 'online',
    label: '在线状态',
    component: 'Select',
    value: [],
    componentProps: {
      options: onlineOption
    }
  },
  {
    field: 'veri',
    prop: 'veri',
    label: '实名认证状态',
    component: 'Select',
    value: [],
    componentProps: {
      options: honestNameStatusOption
    }
  },
  {
    field: 'hedge',
    prop: 'hedge',
    label: '是否对冲',
    component: 'Select',
    value: [],
    componentProps: {
      options: subTreeOptions
    }
  },
  {
    field: 'country',
    prop: 'country',
    label: '国家',
    component: 'Select',
    value: [],
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
    field: '__dateRange',
    value: '',
    label: '注册时间',
    rangeSeparator: 'To',
    component: 'DatePicker',
    componentProps: {
      type: 'daterange'
    }
  }
]

export const userInfoTableColumns: TableColumn[] = [
  {
    field: 'index',
    type: 'index',
    label: '序号'
  },
  {
    field: 'id',
    label: '用户ID'
  },
  {
    field: 'truename',
    label: '真实姓名'
  },
  {
    field: 'Caption',
    label: '昵称'
  },
  {
    field: '',
    label: '邀请人'
  },
  {
    field: '__a',
    label: '所属机构',
    formatter: function (row) {
      return `${row.UplineDirect}(${row.UplineCaption})${row.UplineRoot}`
    }
  },
  {
    field: '__a',
    label: '国家/区号',
    formatter: function (row) {
      return `${row.CountryCode}/${row.TelPath}`
    }
  },
  {
    field: 'BindTel',
    label: '手机号'
  },
  {
    field: 'BindMail',
    label: '邮箱'
  },
  {
    field: 'Status',
    label: '用户状态',
    formatter: function (row) {
      const flag = row.Status === 0
      return h('span', { style: { color: flag ? 'green' : 'red' } }, flag ? '正常' : '冻结')
    }
  },
  {
    field: 'online',
    label: '在线状态',
    formatter: function (row) {
      return h(
        'span',
        { style: { color: row.online ? '' : 'rgb(140, 140, 140)' } },
        row.online ? '在线' : '离线'
      )
    }
  },
  {
    field: 'veri',
    label: '实名认证',
    formatter: function (row) {
      return getLabel(honestNameStatusOption, row.veri)
    }
  },
  {
    field: '__a',
    label: '商户管理员',
    formatter: function (row) {
      return row.BizCode && `${row.BizCode}(${row.BizOperator})`
    }
  },
  {
    field: 'Tagline',
    label: '成本'
  },
  {
    field: 'createdat',
    label: '注册时间',
    formatter: function (row) {
      return formatTime(row.createdat, 'yyyy/MM/dd')
    }
  },
  {
    field: 'action',
    label: '操作'
  }
]

// -------------------- start --- 用户详情--------------------
export const params1: tableFieldsType[] = [
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
export const params2: tableFieldsType[] = [
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
      options: authStatusOption
    }
  },
  {
    field: 'partnerterm',
    value: 0,
    prop: 'partnerterm',
    label: '平台信用认证状态',
    component: 'Radio',
    colProps: {
      span: 24
    },
    isDisable: true,
    componentProps: {
      disabled: true,
      options: authStatusOption
    }
  }
]
export const params3: tableFieldsType[] = [
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
export const params4: tableFieldsType[] = [
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

export const tableColumnsPayments: TableColumn[] = [
  {
    field: 'id',
    label: 'ID'
  },
  {
    field: 'id1',
    label: '通道'
  },
  {
    field: 'Name',
    label: '姓名'
  },
  {
    field: 'Bank',
    label: '开户行'
  },
  {
    field: 'AcctNo',
    label: '账号'
  },
  {
    field: 'Branch',
    label: '附加信息'
  },
  {
    field: 'Desc',
    label: '备注'
  },
  {
    field: 'QrCode',
    label: '图片'
  },
  {
    field: 'action',
    label: '操作'
  }
]

export const tableColumnsSacs: TableColumn[] = [
  {
    field: 'ID',
    label: '账户类型'
  },
  {
    field: 'id',
    label: '账号'
  },
  {
    field: 'CurCode',
    label: '币种'
  },
  {
    field: 'Balance',
    label: '余额'
  },
  {
    field: 'available', // 自己算余额减去冻结
    label: '可用'
  },
  {
    field: 'Frozen',
    label: '冻结'
  },
  {
    field: 'a',
    label: '入金状态'
  },
  {
    field: 'a',
    label: '出金状态'
  },
  {
    field: 'a',
    label: '最低出金额度'
  },
  {
    field: 'Status',
    label: '账户状态'
  },
  {
    field: 'action',
    label: '操作'
  }
]

export const tableColumns3: TableColumn[] = [
  {
    field: 'ID',
    label: '账户类型'
  },
  {
    field: 'id',
    label: '账号'
  },
  {
    field: 'CurCode',
    label: '币种'
  },
  {
    field: 'Balance',
    label: '余额'
  },
  {
    field: 'available', // 自己算余额减去冻结
    label: '可用'
  },
  {
    field: 'Frozen',
    label: '冻结'
  },
  {
    field: 'Status',
    label: '账户状态'
  },
  {
    field: 'action',
    label: '操作'
  }
]

export const tableColumns5: TableColumn[] = [
  {
    field: 'id',
    label: '账号'
  },
  {
    field: 'CurCode',
    label: '币种'
  },
  {
    field: 'id',
    label: '真实模拟'
  },
  {
    field: 'Balance',
    label: '余额'
  },
  {
    field: 'available', // 自己算余额减去冻结
    label: '可用'
  },
  {
    field: 'Frozen',
    label: '冻结'
  },
  {
    field: 'a',
    label: '买开仓'
  },
  {
    field: 'a',
    label: '卖开仓'
  },
  {
    field: 'a',
    label: '平仓'
  },
  {
    field: 'a',
    label: '预警风险率'
  },
  {
    field: 'a',
    label: '爆仓风险率'
  },
  {
    field: 'a',
    label: '是否对冲'
  },
  {
    field: 'Status',
    label: '账户状态'
  },
  {
    field: 'a',
    label: '对手方账户ID'
  },
  {
    field: 'action',
    label: '操作'
  }
]
// -------------------- end --- 用户详情--------------------
