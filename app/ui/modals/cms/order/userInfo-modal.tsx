import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { User } from "@/app/lib/definitions";


interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;


  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl relative">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-2xl font-semibold text-primary">
              Thông tin khách hàng
            </DialogTitle>
            <button onClick={onClose}>
              <FaTimes className="text-gray-600 text-xl hover:text-red-500" />
            </button>
          </div>

          <div className="space-y-4 text-base">
            <div>
              <strong>Tên khách hàng:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Số điện thoại:</strong> {user.phone_number}
            </div>
            <div>
              <strong>Địa chỉ:</strong> {user.address}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UserInfoModal;

