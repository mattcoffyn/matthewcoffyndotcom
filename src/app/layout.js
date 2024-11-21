import Nav from '@/components/Nav';
import Background from '@/components/Background';
import '@/styles/globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'matthewcoffyndotcom',
  description: 'Home Page for Matthew Coffyn',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <div className="pageContainer">
          <div className="page">
            <Header />
            <Nav />
            <main className="content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
