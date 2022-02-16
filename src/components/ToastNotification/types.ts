import { ToastOptions } from 'react-toastify'

export interface IToastProps {
  id: string,
  content ?: string,
  toastOptions ?: ToastOptions,
  iconFirst?: string,
}
