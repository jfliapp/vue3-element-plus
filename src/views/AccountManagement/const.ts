import { tableFieldsType } from './types'
// -------------------- start --- 用户详情--------------------
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
