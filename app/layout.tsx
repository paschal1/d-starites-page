import { Toaster } from 'react-hot-toast';
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata = {
  title: 'D-Starite Technologies',
  description: 'D-Starite Technologies – IT solutions and services', 
  icons: {
    icon: 'https://i.imgur.com/4CA3YuG.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KGH2499N" />
      <body>
        {/* Mount the toast provider */}
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}