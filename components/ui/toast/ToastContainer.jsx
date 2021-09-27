import { ToastContainer } from 'react-toastify'

import './style.css'

export const ToastContainerEl = props => <ToastContainer {...props} />

ToastContainerEl.defaultProps = {
  position: 'top-center',
  autoClose: 5000,
  className: 'compliment-toast-container',
  progressClassName: 'compliment-progress',
  bodyClassName: 'compliment-body',
}
