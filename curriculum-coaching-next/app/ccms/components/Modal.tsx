// components/Modal.tsx
"use client";

import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit?: () => void; // Optional submit handler for forms
  children?: React.ReactNode; // Allows passing any content into the modal
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
}) => {
  useEffect(() => {
    // Disable scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // Clean up by enabling scroll when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        {/* Modal Header */}
        <h2 className="font-semibold text-lg">{title}</h2>

        {/* Modal Content */}
        <div className="mt-2">{children}</div>

        {/* Modal Actions */}
        <div className="flex justify-end mt-4">
          {onSubmit && (
            <button
              onClick={onSubmit}
              className="bg-green-500 mr-2 px-4 py-2 rounded-lg text-white"
            >
              Submit
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
