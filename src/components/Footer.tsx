import { Link } from "react-router-dom";
import { Truck, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-lg">Vijayalakshmi</span>
                <span className="block text-xs opacity-70 -mt-1">Roadlines</span>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Your trusted partner for reliable road transportation and logistics solutions across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link>
              <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
              <Link to="/book" className="hover:opacity-100 transition-opacity">Book a Truck</Link>
              <Link to="/trucks" className="hover:opacity-100 transition-opacity">Available Trucks</Link>
              <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>Full Truck Load (FTL)</span>
              <span>Part Load (PTL)</span>
              <span>Warehousing & Storage</span>
              <span>Fleet Management</span>
              <span>Express Delivery</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>123, Transport Nagar, Hyderabad, Telangana 500001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@vijayalakshmiroadlines.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm opacity-50">
          © 2025 Vijayalakshmi Roadlines. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
