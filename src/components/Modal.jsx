import React, { useEffect } from 'react';
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux';
import { alertHandler } from '../services/store/slices/authSlice';
import { createPortal } from 'react-dom';

function Overlays() {
  const {popUpAlert} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (popUpAlert.show) {
      const timer = setTimeout(() => {
        dispatch(alertHandler({show:false,msg:""}));
      }, 2000)

      return () => {
        clearTimeout(timer);
      }
    }
  }, [popUpAlert.show])
  
  return (
    <div role="alert" className="alert bg-yellow-300 w-72 absolute top-5 right-5 z-10">
      <InformationCircleIcon className='w-6 h-6' />
      <span>{popUpAlert.msg}</span>
    </div>
  )
}
function Modal(){
  return(
    createPortal(<Overlays/>,document.querySelector("#modal"))
  )
}
export function Loader(){
  return(
    createPortal(<span className="loading loading-dots loading-lg absolute top-6 left-1/2 z-10"></span>, document.querySelector("#modal"))
  )
}

export default Modal