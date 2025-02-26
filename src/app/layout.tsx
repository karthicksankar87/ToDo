import {
  ClerkProvider,
  // SignInButton,
  SignedIn,
  // SignedOut,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut> */}
          <SignedIn>
            <div className="flex justify-end">
              <UserButton />
            </div>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
