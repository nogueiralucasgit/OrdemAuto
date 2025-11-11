import React from 'react';
import MainContent from './MainContent';
import FlashMessage from '../ui/FlashMessage';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="d-flex">
            <Sidebar />

            {/* Conteúdo ao lado da sidebar */}
            <MainContent>
                <FlashMessage />
                {children}
            </MainContent>
        </div>
    );
};

export default Layout;
