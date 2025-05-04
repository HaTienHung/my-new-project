import { User } from "@/app/lib/definitions";
import { useState } from "react";

interface UpdateUserFormProps {
  user: User;
  onSubmit: (updatedData: User) => void;
  onClose: () => void;
  error: string
  loading: boolean;
}

export default function UpdateUserForm({ user, onSubmit, onClose, error, loading }: UpdateUserFormProps) {
  const [form, setForm] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number ?? "",
    address: user.address ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Cập nhật thông tin</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Tên</label>
          <input
            id="name"
            type="text"
            placeholder="Tên"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone_number">Số điện thoại</label>
          <input
            id="phone_number"
            type="text"
            placeholder="Số điện thoại"
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            className="w-full border p-2 rounded text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">Địa chỉ</label>
          <input
            id="address"
            type="text"
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border p-2 rounded text-base"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button className="w-full  bg-primary text-white p-2 rounded" type="submit" disabled={loading}>
        {loading ? "Đang cập nhật..." : "Cập nhật"}
      </button>
      <button type="button" className="w-full bg-gray-300 text-primary p-2 rounded" onClick={onClose}>Huỷ</button>
    </form>
  );
}
