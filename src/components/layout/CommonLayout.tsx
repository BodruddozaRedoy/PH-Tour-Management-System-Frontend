import React, { type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function CommonLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
