import { Button as AntdButton } from 'antd'
import React from 'react'

import { EngineComponentSchema } from '@/types'
import { EngineButtonProps } from '@/types/attr'

const Button = (props: EngineComponentSchema): JSX.Element => {
  const { values, style } = props
  const { text = '', type, disabled, onClick } = values as EngineButtonProps

  const onBtnClick = (event: MouseEvent) => {
    event.stopPropagation()
    onClick?.(event as any)
  }

  return (
    <AntdButton style={style} type={type} disabled={disabled} onClick={(e: any) => onBtnClick(e)}>
      {text}
    </AntdButton>
  )
}

export default Button
