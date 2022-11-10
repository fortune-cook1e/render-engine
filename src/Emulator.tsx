import React from 'react';

import { MOCK_DATA } from './mock';
import RenderEngine from './RenderEngine';

const Emulator = () => {
  return (
    <div>
      <RenderEngine dataSource={MOCK_DATA} />
    </div>
  );
};

export default Emulator;
