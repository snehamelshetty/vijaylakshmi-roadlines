import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Truck, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageLabels, Language } from "@/i18n/translations";

const navLinks = [
  { to: "/", key: "nav_home" },
  { to: "/about", key: "nav_about" },
  { to: "/services", key: "nav_services" },
  { to: "/book", key: "nav_book" },
  { to: "/trucks", key: "nav_trucks" },
  { to: "/tracking", key: "nav_tracking" },
  { to: "/dashboard", key: "nav_dashboard" },
  { to: "/contact", key: "nav_contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Truck className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-foreground text-lg">Vijayalakshmi</span>
            <span className="block text-xs text-muted-foreground -mt-1">Roadlines</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-secondary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              {languageLabels[language]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[140px] py-1">
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      language === lang ? "text-secondary font-semibold" : "text-foreground"
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/auth">{t("auth_login")}</Link>
          </Button>
          <Button variant="blue" size="sm" asChild>
            <Link to="/book">{t("nav_book_now")}</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-secondary font-semibold bg-muted"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
            {/* Mobile Language Selector */}
            <div className="flex items-center gap-2 px-3 py-2 flex-wrap">
              <Globe className="w-4 h-4 text-muted-foreground" />
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); }}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    language === lang
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
            <Button variant="blue" size="sm" asChild className="mt-2">
              <Link to="/book" onClick={() => setMobileOpen(false)}>{t("nav_book_now")}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
