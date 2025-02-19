import { NavLink } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const MenuItem = ({ to, icon, label,admin=false }) => {
    const setActive = ({ isActive }) =>`w-full flex items-center justify-between text-left px-3 py-2 my-1
    ${isActive ? "text-blue-600 text-lg font-bold" : "text-yellow-400 text-base font-normal"}
    hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out
    bg-transparent focus:bg-transparent focus:text-blue-600 active:bg-transparent focus:outline-none`;


    return (
        <li>
            <NavLink to={to} className={setActive}>
                {({ isActive }) => (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            {icon && (
                                <svg
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    height="1.5em"
                                    width="1.5em"
                                    className="mr-2"
                                >
                                    {/* Directly use the path string as a prop */}
                                    <path fill="currentColor" d={icon} />
                                </svg>
                            )}
                            {label}
                        </div>
                        {(isActive && !admin) && <span className="text-blue-600 ml-2 text-xl">&gt;</span>}
                    </div>
                )}
            </NavLink>
        </li>
    );
};


export default function Menu() {
    const { user } = useAuth();

    let menuItems = [
        {
            to: "/",
            icon: "M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m0 10h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m10 0h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m7.293-14.707l-3.586-3.586a.999.999 0 0 0-1.414 0l-3.586 3.586a.999.999 0 0 0 0 1.414l3.586 3.586a.999.999 0 0 0 1.414 0l3.586-3.586a.999.999 0 0 0 0-1.414",
            label: "Dashboard",

        },
        {
            to: "/news",
            icon: "M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm2 1v14h16V5zm2 2h6v6H6zm2 2v2h2V9zm6 0h4V7h-4zm4 4h-4v-2h4zM6 15v2h12v-2z",
            label: "News",
        },
        {
            to: "/about",
            icon: "M15 4H5v16h14V8h-4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008zM11 11h2v6h-2zm0-4h2v2h-2z",
            label: "About",
        },
    ];

    if (user?.admin) {
        menuItems = [
            {
                to: "admin",
                icon: "M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m0 10h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m10 0h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m7.293-14.707l-3.586-3.586a.999.999 0 0 0-1.414 0l-3.586 3.586a.999.999 0 0 0 0 1.414l3.586 3.586a.999.999 0 0 0 1.414 0l3.586-3.586a.999.999 0 0 0 0-1.414",
                label: "Dashboard",
                admin: true,
            },
        ];
    }

    return (
        <ul className="menu w-full ">
            {menuItems.map((item) =>
                item.show !== false ? ( // Check for explicit false, not just falsy
                    <MenuItem key={item.to} to={item.to} icon={item.icon} label={item.label} admin={item.admin} />
                ) : null
            )}
        </ul>
    );
}