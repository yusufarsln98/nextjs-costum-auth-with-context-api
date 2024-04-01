import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up Page',
  description: 'Sign up to access the vending machines!',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
