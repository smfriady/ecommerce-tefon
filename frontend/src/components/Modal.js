import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "@/context/ModalContext";
import { FaWindowClose } from "react-icons/fa";

const ModalComponent = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);

  if (modal) {
    return ReactDOM.createPortal(
      <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-2xl md:h-auto mx-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleModal()}
              >
                <FaWindowClose size={25} />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            {modalContent}
          </div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default ModalComponent;
