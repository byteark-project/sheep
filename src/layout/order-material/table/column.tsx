import { ColumnProps } from 'antd/lib/table'

import { OrderMaterial } from '../../../services'

const columns: ColumnProps<OrderMaterial>[] = [
  {
    title: '分类',
    dataIndex: 'name',
  },
  {
    title: '型号',
    dataIndex: 'callType',
  },
  {
    title: '数量',
    dataIndex: 'type',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
  },
  {
    title: '操作',
    width: 220,
  },
]

export default columns
