import TopBar from "../layout/Topbar";
import NavBar from "./NavBar";

const Header = ()  => {
    return (
        <header className="border-b  border-gray-300">
        <TopBar/>
        <NavBar/>
        </header>
       
    )
}

export default Header;