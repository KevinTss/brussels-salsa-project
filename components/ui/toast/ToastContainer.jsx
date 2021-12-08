import { ToastContainer, toast } from 'react-toastify';

export const triggerToast = toast;
export const ToastContainerEl = (props) => <ToastContainer {...props} />;

ToastContainerEl.defaultProps = {
  position: 'top-center',
  autoClose: 5000,
  className: 'custom-toast-container',
  progressClassName: 'custom-progress',
  bodyClassName: 'custom-body',
};
