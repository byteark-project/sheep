import React from 'react'
import { Select, Form } from 'antd'

import { useMaterialsQuery, useCommodityTypesSelectQuery, useWarehousesSelectQuery } from '../../services'
import styles from './index.module.scss'

const { Option } = Select

interface SelectBaseProps {
  name?: string
  required?: boolean
  className?: string
  label?: string
  noLabel?: boolean
  style?: React.CSSProperties
  initialValue?: unknown
}

// ! 某些地方需要获取对象数据，因此将 id name 手动拼接成 id__name

// 材料分类选择
function MaterialsSelect({ name, required, className, label, noLabel, style, initialValue }: SelectBaseProps) {
  const { data, loading } = useMaterialsQuery({ fetchPolicy: 'network-only' })

  return (
    <Form.Item
      label={noLabel ? undefined : label ?? '选择分类'}
      name={name ?? 'type'}
      colon={false}
      rules={required ? [{ required: true, message: '请选择分类' }] : []}
      className={`${styles.item} ${className ?? ''}`}
      style={style}
      initialValue={initialValue}
    >
      <Select loading={loading} placeholder='请选择分类' disabled={loading} allowClear>
        {data?.materials
          ?.filter(m => m && m?.id)
          .map(material => (
            <Option key={material?.id ?? ''} value={`${material?.id?.trim() ?? ''}__${material?.name?.trim() ?? ''}`}>
              {material?.name}
            </Option>
          ))}
      </Select>
    </Form.Item>
  )
}

function CommodityTypeSelect({ name, required, className, label, noLabel, style, initialValue }: SelectBaseProps) {
  const { data, loading } = useCommodityTypesSelectQuery({ fetchPolicy: 'network-only' })

  return (
    <Form.Item
      label={noLabel ? undefined : label ?? '选择商品分类'}
      name={name ?? 'commodity_type'}
      colon={false}
      rules={required ? [{ required: true, message: '请选择商品分类' }] : []}
      className={`${styles.item} ${className ?? ''}`}
      style={style}
      initialValue={initialValue}
    >
      <Select loading={loading} placeholder='请选择商品分类' disabled={loading} allowClear>
        {data?.types
          ?.filter(t => t && t?.id)
          .map(t => (
            <Option key={t?.id ?? ''} value={`${t?.id?.trim() ?? ''}__${t?.name?.trim() ?? ''}`}>
              {t?.name}
            </Option>
          ))}
      </Select>
    </Form.Item>
  )
}

function WarehousesSelect({ name, required, className, label, noLabel, style, initialValue }: SelectBaseProps) {
  const { data, loading } = useWarehousesSelectQuery({ fetchPolicy: 'network-only' })

  return (
    <Form.Item
      label={noLabel ? undefined : label ?? '选择商品分类'}
      name={name ?? 'warehouse'}
      colon={false}
      rules={required ? [{ required: true, message: '请选择商品分类' }] : []}
      className={`${styles.item} ${className ?? ''}`}
      style={style}
      initialValue={initialValue}
    >
      <Select loading={loading} placeholder='请选择商品分类' disabled={loading} allowClear>
        {data?.pos
          ?.filter(p => p && p?.id)
          .map(p => (
            <Option key={p?.id ?? ''} value={`${p?.id?.trim() ?? ''}__${p?.name?.trim() ?? ''}`}>
              {p?.name}
            </Option>
          ))}
      </Select>
    </Form.Item>
  )
}

// ! 重新获取数据
function getRealValue(val: string | null | undefined, flag = '__') {
  if (`${val}`.includes(flag)) {
    return `${val}`.split(flag) ?? []
  }
  return []
}

export { MaterialsSelect, CommodityTypeSelect, WarehousesSelect, getRealValue }
