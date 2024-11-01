// import Header from './components/Header';
import './styles/global.css';

export const metadata = {
  title: 'matthewcoffyndotcom',
  description: 'Home Page for Matthew Coffyn',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        {/* <main className="main">{children}</main> */}
        {children}
      </body>
    </html>
  );
}
