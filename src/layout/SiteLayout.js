import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

const SiteLayout = ({children}) => {
    return <div className={`bg-wrapper`}>
        <div className={`container`}>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    </div>
}

export default SiteLayout
