/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table, Input, Form, Button, Select } from 'antd'
import type { FormInstance } from 'antd/lib/form'

import styles from './index.module.scss'
import { Svg, OrderMaterialsSelect } from '../../../components'

import { Material } from '../material'

interface EditableCellProps extends React.EmbedHTMLAttributes<HTMLElement> {
  editing?: boolean
  dataIndex?: string
  title?: string
  inputType?: 'text' | 'type' | 'action'
  record: Material
  index?: number
  children?: React.ReactNode
  initialValue?: any
}
const { Option } = Select
function EditableCell({
  editing,
  children,
  inputType,
  dataIndex,
  title,
  initialValue,
  ...restProps
}: EditableCellProps) {
  let cell: React.ReactNode
  switch (inputType) {
    case 'type':
      cell = <OrderMaterialsSelect name='material' noLabel style={{ margin: 0 }} initialValue={initialValue} />
      break
    case 'action':
      cell = (
        <Form.Item name='action' style={{ margin: 0 }} initialValue={initialValue}>
          <Select placeholder='请选择行为'>
            <Option value={1}>增货</Option>
            <Option value={2}>退货</Option>
            <Option value={3}>换货</Option>
          </Select>
        </Form.Item>
      )
      break

    default:
      cell = (
        <Form.Item name={dataIndex} style={{ margin: 0 }} initialValue={initialValue}>
          <Input placeholder={`请输入${title}`} />
        </Form.Item>
      )
      break
  }
  return <td {...restProps}>{editing ? cell : children}</td>
}

const isEditing = (record: Material, key: string | undefined) => record?.id === key

export type CellEmit = (type: 'edit' | 'cancel' | 'save' | 'del', id?: string, record?: Material) => void

const generateColumns = (emit?: CellEmit, key?: string | undefined): ColumnProps<Material>[] => {
  return [
    {
      title: '分类',
      dataIndex: ['material', 'name'],
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '分类',
          dataIndex: 'material',
          editing: isEditing(record, key),
          inputType: 'type',
          initialValue: `${record?.material ?? ''}`,
        } as EditableCellProps
      },
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '型号',
          dataIndex: 'model',
          editing: isEditing(record, key),
          initialValue: record?.model,
        } as EditableCellProps
      },
    },
    {
      title: '数量',
      dataIndex: 'amount',
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '数量',
          dataIndex: 'amount',
          editing: isEditing(record, key),
          initialValue: record?.amount,
        } as EditableCellProps
      },
    },
    {
      title: '行为',
      dataIndex: 'action',
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '行为',
          dataIndex: 'action',
          editing: isEditing(record, key),
          inputType: 'action',
          initialValue: record?.action,
        } as EditableCellProps
      },
    },
    {
      title: '操作',
      width: 90,
      render(_, record) {
        const editing = isEditing(record, key)

        return editing ? (
          <span className={styles['opt-btns']}>
            <Button
              type='text'
              onClick={() => {
                emit?.('save', record?.id)
              }}
              style={{
                color: '#00B2B6',
              }}
            >
              保存
            </Button>
            <Button
              type='text'
              onClick={() => {
                emit?.('cancel', record?.id)
              }}
            >
              取消
            </Button>
          </span>
        ) : (
          <span className={styles['opt-btns']}>
            <Svg
              name='btn-edit-h'
              onClick={() => {
                emit?.('edit', '', record)
              }}
            />
            <Svg
              name='btn-del-h'
              onClick={() => {
                emit?.('del', record?.id)
              }}
            />
          </span>
        )
      },
    },
  ]
}

interface EditMaterialsTableProps {
  data?: Material[]
  emit?: CellEmit
  editingKey?: string
  form?: FormInstance
}

function EditMaterialsTable({ data, editingKey, emit, form }: EditMaterialsTableProps) {
  const columns = useMemo(() => {
    return generateColumns(emit, editingKey)
  }, [emit, editingKey])

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={columns}
        pagination={false}
        className={styles.table}
        rowKey={item => item.id}
      />
    </Form>
  )
}

export default EditMaterialsTable
