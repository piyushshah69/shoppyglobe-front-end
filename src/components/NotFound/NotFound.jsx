import { Link } from "react-router-dom";

function NotFound(){
    return (
        <div className="p-8 flex flex-col justify-center items-center gap-2 text-center">
            <h1 className="text-9xl text-gray-400">Error</h1>
            <p className="text-2xl">404, not found!</p>
            <p>Unfortunately the page you are looking for has been moved or deleted.</p>
            <Link to='/' className="btn font-normal mt-2">GO TO HOMEPAGE</Link>
        </div>
    )
}

export default NotFound;
