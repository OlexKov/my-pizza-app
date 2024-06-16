import React from 'react'
import Footer from '../Footer/Footer'
import Content from '../Content/Content'
import Header from '../Header/Header'

const Layout: React.FC = () => {
    return (
        <div>
            <Header />
            <Content />
            <Footer />
        </div>
    )
}

export default Layout

