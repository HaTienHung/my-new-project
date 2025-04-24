import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

interface User {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}


interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const { name, email, phone_number, address } = user;

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl relative">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-2xl font-semibold text-[rgb(121,100,73)]">
              Thông tin khách hàng
            </DialogTitle>
            <button onClick={onClose}>
              <FaTimes className="text-gray-600 text-xl hover:text-red-500" />
            </button>
          </div>

          <div className="space-y-4 text-base">
            <div>
              <strong>Tên khách hàng:</strong> {name}
            </div>
            <div>
              <strong>Email:</strong> {email}
            </div>
            <div>
              <strong>Số điện thoại:</strong> {phone_number}
            </div>
            <div>
              <strong>Địa chỉ:</strong> {address}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UserInfoModal;

