import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'Login to access the vending machines!',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
