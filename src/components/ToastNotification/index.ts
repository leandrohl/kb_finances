import { toast, ToastContent, ToastOptions } from 'react-toastify'

import ToastTypes from './ToastTypes'
import { IToastProps } from './types'

import './style.css'

const toastList = new Set()

const ToastNotification = (params: IToastProps): void => {
  const { id, toastOptions } = params

  const component: ToastContent = ToastTypes(params)

  const defaultOptions: ToastOptions = {
    toastId: id,
    className: 'toast',
    position: 'bottom-right',
    draggable: false,
    onClose: () => {
      const toastArr = Array.from(toastList)
      const toastIndex = toastArr.indexOf(id)
      const dltToast = toastArr.splice(toastIndex, 1)
      toastList.delete(dltToast)
    },
    onOpen: () => {
      toastList.add(id)
    },
    progressStyle: undefined
  }

  interface closeOptions {
    autoClose: number | false;
    closeOnClick: boolean;
  }

  const closeToast: closeOptions = {
    autoClose: 3500,
    closeOnClick: true
  }
  toast(component, {
    ...defaultOptions, ...closeToast, ...toastOptions
  })
}

export default ToastNotification
