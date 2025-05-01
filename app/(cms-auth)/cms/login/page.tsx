import CMSLoginPage from "@/app/ui/cms/auth/login"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập CMS',
};

export default function Page() {
  return (
    <CMSLoginPage />
  );
}