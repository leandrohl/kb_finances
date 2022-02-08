/* eslint-disable no-undef */
import React from 'react'
import { ToastContent } from 'react-toastify'


import { IToastProps } from './types'

const ToastTypes = (params: IToastProps): ToastContent => {
  const { content, iconFirst } = params
  const toastCss = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: '8px'
  }

  const renderToast = (): ToastContent => (
    <span style={toastCss}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <span style={{ color: '#FFF', padding: 0, margin: 0, textAlign: 'left', paddingLeft: 8 }}>
          {content}
        </span>
      </div>
    </span>
  )

  return renderToast()
}

export default ToastTypes
