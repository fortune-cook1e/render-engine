import { useUpdate } from 'ahooks'
import React, { FC, useEffect } from 'react'

import { RenderEngineProps } from './types'

import DroppableArea from '@/components/DroppableArea'
import { EngineContext } from '@/context'
import { useEngine } from '@/hooks/useEngine'
import useEventEmitter from '@/hooks/useEventEmitter'

import './styles/base.less'

const RenderEngine: FC<RenderEngineProps> = ({ dataSource }) => {
  const globalEngine = useEngine()
  const eventEmitter = useEventEmitter()
  const update = useUpdate()

  useEffect(() => {
    if (dataSource) {
      const { cmpList = [], pageConfig = {} } = dataSource
      globalEngine.updateCmps(cmpList)
      globalEngine.updatePageConfig(pageConfig)
      update()
    }
  }, [dataSource])

  return (
    <EngineContext.Provider value={{ globalEngine, eventEmitter }}>
      <DroppableArea />
    </EngineContext.Provider>
  )
}

export default RenderEngine
