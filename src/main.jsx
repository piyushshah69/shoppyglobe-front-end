import { createRoot } from 'react-dom/client'
import CustomRoutes from './routes/CustomRoutes.jsx'
import { StrictMode } from 'react';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CustomRoutes />
    </StrictMode>
);
