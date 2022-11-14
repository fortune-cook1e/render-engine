import React from 'react'

import styles from './index.module.less'

import { EngineComponentSchema, PageConfig } from '@/types'

const Page = (props: EngineComponentSchema): JSX.Element => {
  const { values } = props

  const { title } = values as PageConfig

  const onPageClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  return <div className={styles.page}>{title}</div>
}

export default Page
