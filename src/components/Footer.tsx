import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import vrLogo from "@/assets/vr-logo.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={vrLogo} alt="Vijayalaxmi Roadlines logo" width={40} height={40} className="w-10 h-10 object-contain bg-background rounded-lg p-1" />
              <div className="leading-tight">
                <span className="font-bold text-lg">Vijayalaxmi Roadlines</span>
                <span className="block text-xs opacity-70 -mt-1">Suppliers of Container</span>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              {t("footer_desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("quick_links")}</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/about" className="hover:opacity-100 transition-opacity">{t("nav_about")}</Link>
              <Link to="/services" className="hover:opacity-100 transition-opacity">{t("nav_services")}</Link>
              <Link to="/book" className="hover:opacity-100 transition-opacity">{t("nav_book")}</Link>
              <Link to="/trucks" className="hover:opacity-100 transition-opacity">{t("nav_trucks")}</Link>
              <Link to="/contact" className="hover:opacity-100 transition-opacity">{t("contact_us")}</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("services_label")}</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>{t("ftl")}</span>
              <span>{t("ptl")}</span>
              <span>{t("warehousing")}</span>
              <span>{t("fleet_mgmt")}</span>
              <span>{t("express")}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact_info")}</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{t("address_text")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{t("phone_text")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>{t("email_text")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm opacity-50">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
