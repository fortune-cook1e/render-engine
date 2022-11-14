import { useRequest } from 'ahooks'
import React, { useEffect } from 'react'

import { login } from './apis/login'
import styles from './emulator.module.less'
import { MOCK_DATA } from './mock'
import RenderEngine from './RenderEngine'

const Emulator = () => {
  useRequest(login, {
    defaultParams: [
      {
        username: '767077147',
        password: '123456'
      }
    ]
  })

  return (
    <div className={styles.emulator}>
      <div className={styles.content}>
        <RenderEngine dataSource={MOCK_DATA} />
      </div>
    </div>
  )
}

export default Emulator
