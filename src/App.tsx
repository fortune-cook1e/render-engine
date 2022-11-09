import React, { FC } from 'react';

import RenderEngine from './components/RenderEngine';

import './styles/base.less';

const App: FC = () => {
  return (
    <div>
      <RenderEngine />
    </div>
  );
};

export default App;
