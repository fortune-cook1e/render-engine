import React, { useMemo } from 'react'

import RemoveWrapper from '@/components/RemoveWrapper'
import { useEngineContext } from '@/context'
import Button from '@/modules/Button'
import Employee from '@/modules/Employee'
import Page from '@/modules/Page'
import { EngineComponentType, EngineComponentSchema } from '@/types'

const ENGINE_COMPONENT_MAP: Record<
  EngineComponentType,
  (props: EngineComponentSchema) => JSX.Element
> = {
  [EngineComponentType.Page]: Page,
  [EngineComponentType.Button]: Button,
  [EngineComponentType.Employee]: Employee
}

interface Props {
  canvasCmpData: EngineComponentSchema
}

const EngineComponentMap = ({ canvasCmpData }: Props): JSX.Element => {
  const { uniqueId, cmpType } = canvasCmpData

  const { globalEngine } = useEngineContext()

  const renderCanvasCmp = useMemo(() => {
    const Cmp = ENGINE_COMPONENT_MAP[cmpType]
    return Cmp ? <Cmp {...canvasCmpData} /> : null
  }, [canvasCmpData])

  const onSelectCmp = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    globalEngine.setSelectedCmp(canvasCmpData)
  }

  return (
    <div onClick={onSelectCmp}>
      <RemoveWrapper id={uniqueId}>{renderCanvasCmp}</RemoveWrapper>
    </div>
  )
}

export default EngineComponentMap
