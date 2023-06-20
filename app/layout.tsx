export const metadata = {
  title: 'QR Code Scanner',
  description: 'QR code scanner built using React and Zxing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
