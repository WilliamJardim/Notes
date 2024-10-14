import { Outlet } from "react-router-dom";

function BasePage() {
    return (
        <main>
           <Outlet />
        </main>
    )
}

export default BasePage;