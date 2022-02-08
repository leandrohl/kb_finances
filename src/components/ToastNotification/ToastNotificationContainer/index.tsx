import React from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const ToastNotificationContainer: React.FC = () => (
  <ToastContainer
    newestOnTop
    hideProgressBar
  />
)

export default ToastNotificationContainer
