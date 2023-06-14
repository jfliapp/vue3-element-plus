<script setup lang="ts">
import { getCashinoutListApi } from '@/api/schedule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType, tableFieldsType } from './types'
import { getLabel } from '@/utils/tsxHelper'
import { Options } from '@/types/Options'
import { exportExcel } from '@/utils/export'
import { ElDialog, ElButton } from 'element-plus'
// import { useI18n } from '@/hooks/web/useI18n'

import { ref } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getCashinoutListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    otherList: 'statistics',
    total: 'listcount'
  }
})

methods.getList()
const CashType: Options[] = [
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
const sumColumns: TableColumn[] = [
  {
    prop: 'CurCode',
    field: 'CurCode',
    label: '币种'
  },
  {
    prop: 'InAmt',
    field: 'InAmt',
    label: '入金'
  },
  {
    prop: 'OutAmt',
    field: 'OutAmt',
    label: '出金'
  },
  {
    prop: 'InFeeTotal',
    field: 'InFeeTotal',
    label: '入金手续费'
  },
  {
    prop: 'OutFeeTotal',
    field: 'OutFeeTotal',
    label: '出金手续费'
  },
  {
    prop: 'BlockchainFeeTotal',
    field: 'BlockchainFeeTotal',
    label: '链上手续费'
  }
]
const tableColumns: TableColumn[] = [
  {
    field: 'index',
    type: 'index',
    label: '序号'
  },
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
      return getLabel(CashType, row.CashType)
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
    label: '币种'
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
const searchParams: tableFieldsType[] = [
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '用户类型',
    component: 'Select'
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
    labelWidth: 0,
    component: 'Input'
  },
  {
    field: 'term1',
    value: '',
    prop: 'term',
    label: '出入金通道',
    component: 'Select'
  },
  {
    field: 'cashtype',
    value: '',
    prop: 'cashtype',
    label: '出入金类型',
    component: 'Select',
    componentProps: {
      options: CashType
    }
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '币种',
    component: 'Input'
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

const dialogVisible = ref(false)
const sumHn = () => {
  dialogVisible.value = true
}
const getExcel = () => {
  exportExcel(tableObject.tableList, tableColumns)
}
</script>
<template>
  <ElDialog v-model="dialogVisible" title="汇总" width="30%">
    <div>
      <Table :columns="sumColumns" :data="tableObject.otherTableList" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="dialogVisible = false">Cancel</ElButton>
      </span>
    </template>
  </ElDialog>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :schema="searchParams"
      :showExportExcel="true"
      :showSum="true"
      @sum-hn="sumHn"
      @export-excel="getExcel"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
