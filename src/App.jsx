import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { Suspense } from 'react';
import PageLoader from './components/Loaders/PageLoader';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <Provider store={store}>
                <Header />
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                    className="p-4 md:p-0"
                />
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
                <Footer />
            </Provider>
        </>
    )
}

export default App;
