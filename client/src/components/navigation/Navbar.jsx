import { useEffect, useRef, useState } from "react";
import { Bug, FileSearch, History, Home, Menu, Search, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import ThemeMenu from "../theme/ThemeMenu";
import MobileNavbar from "./MobileNavbar";
import NavItem from "./NavItem";
import UniversalSearch from "./UniversalSearch";
import UserMenu from "./UserMenu";
import { useUniversalSearch } from "../../hooks/useUniversalSearch";

function Navbar({ currentView, currentAnalysis, onNavigate, onLogin, onSignup, onSearchNavigate }) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const handleSearchNavigate = (result) => {
    onSearchNavigate?.({
      view: result.view,
      targetId: result.targetId || null,
      historyId: result.historyId || null,
    });
  };

  const search = useUniversalSearch(handleSearchNavigate, currentAnalysis);

  useEffect(() => {
    if (!mobileMenuOpen && !search.open) return undefined;

    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        search.closeSearch();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [mobileMenuOpen, search.open]);

  const navigate = (destination) => {
    onNavigate(destination);
    setMobileMenuOpen(false);
    search.closeSearch();
  };

  const handleLogin = () => {
    onLogin();
    setMobileMenuOpen(false);
    search.closeSearch();
  };

  const handleSignup = () => {
    onSignup();
    setMobileMenuOpen(false);
    search.closeSearch();
  };

  return (
    <header className="sticky top-4 z-50 flex justify-center">
      <nav ref={navbarRef} className="navbar-glass relative flex min-h-[62px] w-full max-w-5xl items-center justify-between gap-2 rounded-full px-2 py-2 sm:px-3">
        <button type="button" onClick={() => navigate("home")} className="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-2 transition sm:px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Bug size={18} /></div>
          <span className="hidden text-sm font-bold tracking-tight sm:block">BugLens</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          <NavItem icon={<Home size={16} />} label="Home" active={currentView === "home"} onClick={() => navigate("home")} />
          <NavItem icon={<History size={16} />} label="History" active={currentView === "history"} onClick={() => navigate("history")} />
          <NavItem icon={<FileSearch size={16} />} label="Docs" active={currentView === "docs"} onClick={() => navigate("docs")} />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (search.open) search.closeSearch();
              else { search.openSearch(); setMobileMenuOpen(false); }
            }}
            className={`navbar-icon-button ${search.open ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : ""}`}
            aria-label="Search BugLens"
            aria-expanded={search.open}
            title="Search"
          >
            {search.open ? <X size={18} /> : <Search size={18} />}
          </button>

          <ThemeMenu />
          {user ? (
            <UserMenu />
          ) : (
            <>
              <button
                type="button"
                onClick={handleLogin}
                className="login-button hidden sm:flex"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={handleSignup}
                className="signup-button hidden sm:flex"
              >
                Sign up
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => { setMobileMenuOpen((value) => !value); search.closeSearch(); }}
            className="mobile-menu-trigger"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        <UniversalSearch search={search} />

        {mobileMenuOpen && (
          <MobileNavbar currentView={currentView} onNavigate={navigate} onLogin={handleLogin} onSignup={handleSignup} onClose={() => setMobileMenuOpen(false)} />
        )}
      </nav>
    </header>
  );
}

export default Navbar;
