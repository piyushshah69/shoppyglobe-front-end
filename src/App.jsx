import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { Suspense } from 'react';
import PageLoader from './components/Loaders/PageLoader';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
    return (
        <>
            <Provider store={store}>
                <Header />
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
                <Footer />
            </Provider>
        </>
    )
}

export default App;
