import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'Login to access the vending machines',
};

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
