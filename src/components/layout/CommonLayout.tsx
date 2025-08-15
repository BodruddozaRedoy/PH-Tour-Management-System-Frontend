import React, { type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function CommonLayout({ children }: { children: ReactNode }) {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    )
}