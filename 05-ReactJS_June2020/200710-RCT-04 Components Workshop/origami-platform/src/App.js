import React from 'react'
import Header from './components/header';
import Aside from './components/aside';
import Footer from './components/footer';
import './App.css'
import Origamis from './components/origamis';

const App = () => {
    return (
        <div className="app">
            <Header />
            <div className="container">
                <Aside />
                <Origamis />
            </div>
            <Footer />
        </div>
    );
}

export default App