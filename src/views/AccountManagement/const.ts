import { tableFieldsType } from './types'
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
