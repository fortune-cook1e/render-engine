import React, { FC, useEffect } from 'react';

import { EngineContext } from '@/context';
import { useEngine } from '@/hooks/useEngine';
import useEventEmitter from '@/hooks/useEventEmitter';
import { RenderEngineProps } from '@/types';

import './styles/base.less';

const RenderEngine: FC<RenderEngineProps> = ({ dataSource }) => {
  const globalEngine = useEngine();

  const eventEmitter = useEventEmitter();

  useEffect(() => {
    if (dataSource) {
      const { cmpList = [], pageConfig = {} } = dataSource;
      globalEngine.updateCmps(cmpList);
      globalEngine.updatePageConfig(pageConfig);
    }
  }, [dataSource]);

  return (
    <EngineContext.Provider value={{ globalEngine, eventEmitter }}>
      <div>this is engine</div>
    </EngineContext.Provider>
  );
};

export default RenderEngine;
