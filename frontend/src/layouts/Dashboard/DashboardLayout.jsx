import "./DashboardLayout.css";

import Navbar from "../../components/Dashboard/common/Navbar";
import Sidebar from "../../components/Dashboard/common/Sidebar";
import Footer from "../../components/Dashboard/common/Footer";
import Main from "../../components/Dashboard/common/Main";

function DashboardLayout({ role = "student" }) {

    return (
        <>


            <div className="dashboardContainer">
                {/* TOP NAVBAR WITH LOGO */}
                <Navbar role={role} />

                <div id="sideMain">
                    {/* SIDEBAR */}
                    <Sidebar role={role} />

                    {/* MAIN CONTENT AREA */}
                    <Main />
                </div>

                {/* FOOTER */}
            <Footer />
            </div>
        </>
    );
}

export default DashboardLayout;