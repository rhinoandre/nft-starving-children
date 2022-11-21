import Footer from './footer'
import Header from './Header'

export default function PageLayout({ children }) {
  return (
    <>
      <div class="m-auto w-11/12 max-w-[1200px] text-white">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
