import clsx from 'clsx'
import React, { FC } from 'react'
import { BallTriangle } from 'react-loader-spinner'

import styles from './triangle-loader.module.scss'

type Props = {
  fullScreen?: boolean
}

export const TriangleLoader: FC<Props> = ({ fullScreen }) => {
  return (
    <div className={clsx(styles.wrapper, { [styles.fullScreen]: fullScreen })}>
      <BallTriangle color='#00BFFF' height={80} width={80} />
    </div>
  )
}
