export type Language = "en" | "hi" | "mr" | "kn";

export const languageLabels: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
  kn: "ಕನ್ನಡ",
};

type TranslationKeys = {
  // Navbar
  nav_home: string;
  nav_about: string;
  nav_services: string;
  nav_book: string;
  nav_trucks: string;
  nav_tracking: string;
  nav_contact: string;
  nav_book_now: string;
  nav_dashboard: string;

  // Home
  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_desc: string;
  hero_book: string;
  hero_services: string;
  stat_trucks: string;
  stat_states: string;
  stat_deliveries: string;
  stat_clients: string;
  home_services_title: string;
  home_services_desc: string;
  home_ftl_title: string;
  home_ftl_desc: string;
  home_ptl_title: string;
  home_ptl_desc: string;
  home_warehouse_title: string;
  home_warehouse_desc: string;
  home_express_title: string;
  home_express_desc: string;
  learn_more: string;
  why_choose_title: string;
  why_choose_desc: string;
  safe_secure: string;
  safe_secure_desc: string;
  on_time: string;
  on_time_desc: string;
  best_rates: string;
  best_rates_desc: string;
  testimonials_title: string;
  ready_to_ship: string;
  ready_to_ship_desc: string;
  book_truck_now: string;

  // About
  about_title: string;
  about_subtitle: string;
  our_story: string;
  about_story_1: string;
  about_story_2: string;
  experience: string;
  clients: string;
  on_time_rate: string;
  certified: string;
  our_mission: string;
  mission_text: string;
  our_vision: string;
  vision_text: string;
  core_values: string;
  reliability: string;
  reliability_desc: string;
  speed: string;
  speed_desc: string;
  safety: string;
  safety_desc: string;
  leadership_team: string;
  founder_md: string;
  operations_head: string;
  fleet_manager: string;
  customer_relations: string;

  // Services
  services_title: string;
  services_subtitle: string;
  road_transport: string;
  road_transport_desc: string;
  ftl: string;
  ftl_desc: string;
  ptl: string;
  ptl_desc: string;
  warehousing: string;
  warehousing_desc: string;
  fleet_mgmt: string;
  fleet_mgmt_desc: string;
  express: string;
  express_desc: string;
  get_quote: string;
  custom_solution: string;
  custom_solution_desc: string;
  contact_us: string;

  // Book Truck
  book_truck_title: string;
  book_truck_subtitle: string;
  booking_details: string;
  pickup_location: string;
  drop_location: string;
  truck_type: string;
  select_truck_type: string;
  load_weight: string;
  pickup_date: string;
  calculate_rate: string;
  submit_booking: string;
  rate_estimate: string;
  estimated_cost_note: string;
  transport_charges: string;
  loading_charges: string;
  total: string;
  rate_placeholder: string;

  // Trucks Available
  trucks_title: string;
  trucks_subtitle: string;
  all_locations: string;
  all_types: string;
  trucks_found: string;
  capacity: string;
  available: string;
  booked: string;

  // Contact
  contact_title: string;
  contact_subtitle: string;
  send_message: string;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  send: string;
  get_in_touch: string;
  office_address: string;
  business_hours: string;
  address_text: string;
  phone_text: string;
  email_text: string;
  hours_text: string;

  // Footer
  footer_desc: string;
  quick_links: string;
  services_label: string;
  contact_info: string;
  copyright: string;

  // 404
  page_not_found: string;
  return_home: string;

  // Toast messages
  toast_fill_fields: string;
  toast_booking_success: string;
  toast_select_truck_weight: string;
  toast_valid_weight: string;
  toast_fill_required: string;
  toast_message_sent: string;

  // Auth
  auth_login: string;
  auth_signup: string;
  auth_subtitle: string;
  auth_password: string;
  auth_loading: string;
  auth_login_success: string;
  auth_signup_success: string;
  auth_no_account: string;
  auth_have_account: string;

  // Tracking
  tracking_title: string;
  tracking_subtitle: string;
  tracking_enter_id: string;
  tracking_track: string;
  tracking_not_found: string;
  tracking_shipment_details: string;
  tracking_id_label: string;
  tracking_status: string;
  tracking_timeline: string;
  tracking_live_location: string;
  tracking_map_unavailable: string;

  // Admin
  admin_panel: string;
  admin_dashboard: string;
  admin_overview: string;
  admin_trucks: string;
  admin_bookings: string;
  admin_logout: string;
  admin_no_access: string;
  admin_logged_out: string;
  admin_total_trucks: string;
  admin_total_bookings: string;
  admin_delivered: string;
  admin_pending: string;
  admin_recent_bookings: string;
  admin_no_bookings: string;
  admin_manage_trucks: string;
  admin_add_truck: string;
  admin_edit_truck: string;
  admin_truck_name: string;
  admin_status: string;
  admin_price_km: string;
  admin_location: string;
  admin_actions: string;
  admin_save_changes: string;
  admin_truck_updated: string;
  admin_truck_added: string;
  admin_truck_deleted: string;
  admin_confirm_delete: string;
  admin_maintenance: string;
  admin_manage_bookings: string;
  admin_all_status: string;
  admin_update_status: string;
  admin_new_status: string;
  admin_event_location: string;
  admin_event_desc: string;
  admin_booking_updated: string;

  // Customer Dashboard
  dashboard_title: string;
  dashboard_bookings: string;
  dashboard_tracking: string;
  dashboard_invoices: string;
  dashboard_no_bookings: string;
  dashboard_invoice: string;
  dashboard_download_invoice: string;
  dashboard_back_to_bookings: string;
  dashboard_select_booking: string;
};

const en: TranslationKeys = {
  nav_home: "Home",
  nav_about: "About Us",
  nav_services: "Services",
  nav_book: "Book a Truck",
  nav_trucks: "Trucks",
  nav_tracking: "Tracking",
  nav_contact: "Contact",
  nav_book_now: "Book Now",

  hero_badge: "India's Trusted Logistics Partner",
  hero_title_1: "Reliable Logistics,",
  hero_title_2: "Delivered.",
  hero_desc: "End-to-end transportation solutions with a fleet of 15+ trucks covering 28+ states. Your cargo, our commitment.",
  hero_book: "Book a Truck",
  hero_services: "Our Services",
  stat_trucks: "Trucks",
  stat_states: "States Covered",
  stat_deliveries: "Deliveries/Month",
  stat_clients: "Happy Clients",
  home_services_title: "Our Services",
  home_services_desc: "Comprehensive logistics solutions tailored to your business needs.",
  home_ftl_title: "Full Truck Load",
  home_ftl_desc: "Dedicated trucks for your large shipments across India.",
  home_ptl_title: "Part Load (PTL)",
  home_ptl_desc: "Cost-effective shared transportation for smaller loads.",
  home_warehouse_title: "Warehousing",
  home_warehouse_desc: "Secure storage solutions with easy access and management.",
  home_express_title: "Express Delivery",
  home_express_desc: "Time-critical deliveries with guaranteed timelines.",
  learn_more: "Learn More",
  why_choose_title: "Why Choose Us?",
  why_choose_desc: "Trusted by 2000+ businesses across India for reliable logistics.",
  safe_secure: "Safe & Secure",
  safe_secure_desc: "GPS-tracked fleet with insurance coverage for every shipment.",
  on_time: "On-Time Delivery",
  on_time_desc: "98% on-time delivery rate with real-time tracking updates.",
  best_rates: "Best Rates",
  best_rates_desc: "Competitive pricing with transparent billing, no hidden charges.",
  testimonials_title: "What Our Clients Say",
  ready_to_ship: "Ready to Ship?",
  ready_to_ship_desc: "Get an instant quote and book your truck in minutes.",
  book_truck_now: "Book a Truck Now",

  about_title: "About Vijayalakshmi Roadlines",
  about_subtitle: "Over 15 years of excellence in road transportation and logistics across India.",
  our_story: "Our Story",
  about_story_1: "Founded in 2008, Vijayalakshmi Roadlines started with a small fleet of 5 trucks serving local routes in Maharashtra. Through dedication to reliability and customer satisfaction, we've grown into one of the most trusted logistics companies in South India.",
  about_story_2: "Today, with a fleet of 15+ trucks and presence across 28 states, we deliver over 10,000 consignments monthly while maintaining our core promise — reliability, safety, and on-time delivery.",
  experience: "Experience",
  clients: "Clients",
  on_time_rate: "On-Time Rate",
  certified: "Certified",
  our_mission: "Our Mission",
  mission_text: "To provide reliable, efficient, and cost-effective logistics solutions that empower businesses across India to move goods seamlessly and grow confidently.",
  our_vision: "Our Vision",
  vision_text: "To be India's most trusted and technology-driven road logistics company, setting new standards for speed, safety, and customer experience.",
  core_values: "Core Values",
  reliability: "Reliability",
  reliability_desc: "Consistent, dependable service you can count on every time.",
  speed: "Speed",
  speed_desc: "Efficient routes and processes for fastest possible delivery.",
  safety: "Safety",
  safety_desc: "GPS tracking, insured cargo, and trained drivers for every trip.",
  leadership_team: "Leadership Team",
  founder_md: "Founder & MD",
  operations_head: "Operations Head",
  fleet_manager: "Fleet Manager",
  customer_relations: "Customer Relations",

  services_title: "Our Services",
  services_subtitle: "Comprehensive logistics solutions designed to keep your business moving.",
  road_transport: "Road Transportation",
  road_transport_desc: "Comprehensive road transport solutions connecting all major cities and towns across India with our modern fleet.",
  ftl: "Full Truck Load (FTL)",
  ftl_desc: "Dedicated trucks exclusively for your cargo. Ideal for large shipments requiring direct, non-stop delivery.",
  ptl: "Part Load (PTL)",
  ptl_desc: "Cost-effective shared transportation for smaller consignments. Pay only for the space you use.",
  warehousing: "Warehousing & Storage",
  warehousing_desc: "Secure, climate-controlled warehousing facilities with inventory management and easy accessibility.",
  fleet_mgmt: "Fleet Management",
  fleet_mgmt_desc: "End-to-end fleet management solutions including maintenance, driver management, and route optimization.",
  express: "Express Delivery",
  express_desc: "Time-critical deliveries with guaranteed timelines. Perfect for urgent shipments and perishable goods.",
  get_quote: "Get Quote",
  custom_solution: "Need a Custom Solution?",
  custom_solution_desc: "Contact us to discuss tailored logistics solutions for your business.",
  contact_us: "Contact Us",

  book_truck_title: "Book a Truck",
  book_truck_subtitle: "Fill in the details below to get an instant rate estimate and book your truck.",
  booking_details: "Booking Details",
  pickup_location: "Pickup Location",
  drop_location: "Drop Location",
  truck_type: "Truck Type",
  select_truck_type: "Select truck type",
  load_weight: "Load Weight (Tons)",
  pickup_date: "Pickup Date",
  calculate_rate: "Calculate Rate",
  submit_booking: "Submit Booking",
  rate_estimate: "Rate Estimate",
  estimated_cost_note: "*Estimated cost including loading charges. Final rate may vary based on route and availability.",
  transport_charges: "Transport charges",
  loading_charges: "Loading charges",
  total: "Total",
  rate_placeholder: "Fill in truck type and weight, then click \"Calculate Rate\" to see your estimate.",

  trucks_title: "Available Trucks",
  trucks_subtitle: "Browse our fleet and find the right truck for your shipment.",
  all_locations: "All Locations",
  all_types: "All Types",
  trucks_found: "trucks found",
  capacity: "Capacity",
  available: "Available",
  booked: "Booked",

  contact_title: "Contact Us",
  contact_subtitle: "Have questions? Reach out to us anytime. We're here to help.",
  send_message: "Send us a Message",
  full_name: "Full Name",
  email: "Email",
  phone: "Phone",
  message: "Message",
  send: "Send Message",
  get_in_touch: "Get in Touch",
  office_address: "Office Address",
  business_hours: "Business Hours",
  address_text: "Solapur, Maharashtra 413001",
  phone_text: "+91 98765 43210",
  email_text: "info@vijayalakshmiroadlines.com",
  hours_text: "Mon - Sat: 8:00 AM - 8:00 PM | Sun: 9:00 AM - 5:00 PM",

  footer_desc: "Your trusted partner for reliable road transportation and logistics solutions across India.",
  quick_links: "Quick Links",
  services_label: "Services",
  contact_info: "Contact Info",
  copyright: "© 2025 Vijayalakshmi Roadlines. All rights reserved.",

  page_not_found: "Oops! Page not found",
  return_home: "Return to Home",

  toast_fill_fields: "Please fill in all fields.",
  toast_booking_success: "Booking request submitted! We'll contact you shortly.",
  toast_select_truck_weight: "Please select truck type and enter weight.",
  toast_valid_weight: "Please enter a valid weight.",
  toast_fill_required: "Please fill in all required fields.",
  toast_message_sent: "Message sent! We'll get back to you within 24 hours.",

  auth_login: "Login",
  auth_signup: "Sign Up",
  auth_subtitle: "Access your admin dashboard to manage trucks and bookings.",
  auth_password: "Password",
  auth_loading: "Loading...",
  auth_login_success: "Logged in successfully!",
  auth_signup_success: "Account created! Please check your email to verify.",
  auth_no_account: "Don't have an account? Sign up",
  auth_have_account: "Already have an account? Login",

  tracking_title: "Track Your Shipment",
  tracking_subtitle: "Enter your tracking ID to see real-time shipment status and location.",
  tracking_enter_id: "Enter Tracking ID",
  tracking_track: "Track",
  tracking_not_found: "No shipment found with this tracking ID.",
  tracking_shipment_details: "Shipment Details",
  tracking_id_label: "Tracking ID",
  tracking_status: "Status",
  tracking_timeline: "Status Timeline",
  tracking_live_location: "Live Location",
  tracking_map_unavailable: "Location data not available yet.",

  admin_panel: "Admin Panel",
  admin_dashboard: "Dashboard",
  admin_overview: "Overview",
  admin_trucks: "Trucks",
  admin_bookings: "Bookings",
  admin_logout: "Logout",
  admin_no_access: "You don't have admin access.",
  admin_logged_out: "Logged out successfully.",
  admin_total_trucks: "Total Trucks",
  admin_total_bookings: "Total Bookings",
  admin_delivered: "Delivered",
  admin_pending: "Pending",
  admin_recent_bookings: "Recent Bookings",
  admin_no_bookings: "No bookings yet.",
  admin_manage_trucks: "Manage Trucks",
  admin_add_truck: "Add Truck",
  admin_edit_truck: "Edit Truck",
  admin_truck_name: "Truck Name",
  admin_status: "Status",
  admin_price_km: "Price/km (₹)",
  admin_location: "Location",
  admin_actions: "Actions",
  admin_save_changes: "Save Changes",
  admin_truck_updated: "Truck updated successfully!",
  admin_truck_added: "Truck added successfully!",
  admin_truck_deleted: "Truck deleted.",
  admin_confirm_delete: "Are you sure you want to delete this?",
  admin_maintenance: "Maintenance",
  admin_manage_bookings: "Manage Bookings",
  admin_all_status: "All Status",
  admin_update_status: "Update Booking Status",
  admin_new_status: "New Status",
  admin_event_location: "Event Location",
  admin_event_desc: "Description",
  admin_booking_updated: "Booking updated!",
  nav_dashboard: "My Dashboard",
  dashboard_title: "My Dashboard",
  dashboard_bookings: "Bookings",
  dashboard_tracking: "Tracking",
  dashboard_invoices: "Invoices",
  dashboard_no_bookings: "No bookings yet. Book a truck to get started!",
  dashboard_invoice: "Invoice",
  dashboard_download_invoice: "Download Invoice",
  dashboard_back_to_bookings: "Back to Bookings",
  dashboard_select_booking: "Select a booking from the Bookings tab to track it.",
};

const hi: TranslationKeys = {
  nav_home: "होम",
  nav_about: "हमारे बारे में",
  nav_services: "सेवाएँ",
  nav_book: "ट्रक बुक करें",
  nav_trucks: "ट्रक",
  nav_contact: "संपर्क",
  nav_book_now: "अभी बुक करें",

  hero_badge: "भारत का विश्वसनीय लॉजिस्टिक्स पार्टनर",
  hero_title_1: "विश्वसनीय लॉजिस्टिक्स,",
  hero_title_2: "डिलीवर।",
  hero_desc: "15+ ट्रकों के बेड़े और 28+ राज्यों की कवरेज के साथ संपूर्ण परिवहन समाधान। आपका माल, हमारी प्रतिबद्धता।",
  hero_book: "ट्रक बुक करें",
  hero_services: "हमारी सेवाएँ",
  stat_trucks: "ट्रक",
  stat_states: "राज्य कवर",
  stat_deliveries: "डिलीवरी/माह",
  stat_clients: "खुश ग्राहक",
  home_services_title: "हमारी सेवाएँ",
  home_services_desc: "आपके व्यवसाय की जरूरतों के अनुसार व्यापक लॉजिस्टिक्स समाधान।",
  home_ftl_title: "पूर्ण ट्रक लोड",
  home_ftl_desc: "भारत भर में आपके बड़े शिपमेंट के लिए समर्पित ट्रक।",
  home_ptl_title: "पार्ट लोड (PTL)",
  home_ptl_desc: "छोटे लोड के लिए किफायती साझा परिवहन।",
  home_warehouse_title: "वेयरहाउसिंग",
  home_warehouse_desc: "आसान पहुँच और प्रबंधन के साथ सुरक्षित भंडारण समाधान।",
  home_express_title: "एक्सप्रेस डिलीवरी",
  home_express_desc: "गारंटीड समयसीमा के साथ समय-महत्वपूर्ण डिलीवरी।",
  learn_more: "और जानें",
  why_choose_title: "हमें क्यों चुनें?",
  why_choose_desc: "विश्वसनीय लॉजिस्टिक्स के लिए भारत भर में 2000+ व्यवसायों द्वारा विश्वसनीय।",
  safe_secure: "सुरक्षित और संरक्षित",
  safe_secure_desc: "हर शिपमेंट के लिए बीमा कवरेज के साथ GPS-ट्रैक्ड बेड़ा।",
  on_time: "समय पर डिलीवरी",
  on_time_desc: "रियल-टाइम ट्रैकिंग अपडेट के साथ 98% समय पर डिलीवरी दर।",
  best_rates: "सर्वोत्तम दरें",
  best_rates_desc: "पारदर्शी बिलिंग के साथ प्रतिस्पर्धी मूल्य निर्धारण, कोई छिपे शुल्क नहीं।",
  testimonials_title: "हमारे ग्राहक क्या कहते हैं",
  ready_to_ship: "शिप करने के लिए तैयार?",
  ready_to_ship_desc: "तुरंत कोटेशन प्राप्त करें और मिनटों में अपना ट्रक बुक करें।",
  book_truck_now: "अभी ट्रक बुक करें",

  about_title: "विजयलक्ष्मी रोडलाइन्स के बारे में",
  about_subtitle: "भारत भर में सड़क परिवहन और लॉजिस्टिक्स में 15 वर्षों से अधिक की उत्कृष्टता।",
  our_story: "हमारी कहानी",
  about_story_1: "2008 में स्थापित, विजयलक्ष्मी रोडलाइन्स ने तेलंगाना में स्थानीय मार्गों पर सेवा देने वाले 5 ट्रकों के छोटे बेड़े के साथ शुरुआत की। विश्वसनीयता और ग्राहक संतुष्टि के प्रति समर्पण के माध्यम से, हम दक्षिण भारत की सबसे विश्वसनीय लॉजिस्टिक्स कंपनियों में से एक बन गए हैं।",
  about_story_2: "आज, 15+ ट्रकों के बेड़े और 28 राज्यों में उपस्थिति के साथ, हम मासिक 10,000 से अधिक कंसाइनमेंट डिलीवर करते हैं — विश्वसनीयता, सुरक्षा और समय पर डिलीवरी का वादा बनाए रखते हुए।",
  experience: "अनुभव",
  clients: "ग्राहक",
  on_time_rate: "समय पर दर",
  certified: "प्रमाणित",
  our_mission: "हमारा मिशन",
  mission_text: "विश्वसनीय, कुशल और किफायती लॉजिस्टिक्स समाधान प्रदान करना जो भारत भर में व्यवसायों को सामान को सहजता से स्थानांतरित करने और आत्मविश्वास से बढ़ने में सक्षम बनाता है।",
  our_vision: "हमारा विज़न",
  vision_text: "भारत की सबसे विश्वसनीय और प्रौद्योगिकी-संचालित सड़क लॉजिस्टिक्स कंपनी बनना, गति, सुरक्षा और ग्राहक अनुभव के लिए नए मानक स्थापित करना।",
  core_values: "मूल मूल्य",
  reliability: "विश्वसनीयता",
  reliability_desc: "निरंतर, भरोसेमंद सेवा जिस पर आप हर बार भरोसा कर सकते हैं।",
  speed: "गति",
  speed_desc: "सबसे तेज़ संभव डिलीवरी के लिए कुशल मार्ग और प्रक्रियाएँ।",
  safety: "सुरक्षा",
  safety_desc: "हर यात्रा के लिए GPS ट्रैकिंग, बीमित माल और प्रशिक्षित ड्राइवर।",
  leadership_team: "नेतृत्व टीम",
  founder_md: "संस्थापक और एमडी",
  operations_head: "ऑपरेशन्स प्रमुख",
  fleet_manager: "फ्लीट मैनेजर",
  customer_relations: "ग्राहक संबंध",

  services_title: "हमारी सेवाएँ",
  services_subtitle: "आपके व्यवसाय को गतिशील रखने के लिए डिज़ाइन किए गए व्यापक लॉजिस्टिक्स समाधान।",
  road_transport: "सड़क परिवहन",
  road_transport_desc: "हमारे आधुनिक बेड़े के साथ भारत भर के सभी प्रमुख शहरों को जोड़ने वाले व्यापक सड़क परिवहन समाधान।",
  ftl: "पूर्ण ट्रक लोड (FTL)",
  ftl_desc: "विशेष रूप से आपके माल के लिए समर्पित ट्रक। बड़े शिपमेंट के लिए आदर्श जिन्हें सीधी, नॉन-स्टॉप डिलीवरी की आवश्यकता है।",
  ptl: "पार्ट लोड (PTL)",
  ptl_desc: "छोटे कंसाइनमेंट के लिए किफायती साझा परिवहन। केवल उतनी जगह के लिए भुगतान करें जितनी आप उपयोग करते हैं।",
  warehousing: "वेयरहाउसिंग और स्टोरेज",
  warehousing_desc: "इन्वेंट्री प्रबंधन और आसान पहुँच के साथ सुरक्षित, जलवायु-नियंत्रित वेयरहाउसिंग सुविधाएँ।",
  fleet_mgmt: "फ्लीट प्रबंधन",
  fleet_mgmt_desc: "रखरखाव, ड्राइवर प्रबंधन और मार्ग अनुकूलन सहित संपूर्ण फ्लीट प्रबंधन समाधान।",
  express: "एक्सप्रेस डिलीवरी",
  express_desc: "गारंटीड समयसीमा के साथ समय-महत्वपूर्ण डिलीवरी। तत्काल शिपमेंट और नाशवान वस्तुओं के लिए उत्तम।",
  get_quote: "कोटेशन प्राप्त करें",
  custom_solution: "कस्टम समाधान चाहिए?",
  custom_solution_desc: "अपने व्यवसाय के लिए अनुकूलित लॉजिस्टिक्स समाधानों पर चर्चा करने के लिए हमसे संपर्क करें।",
  contact_us: "संपर्क करें",

  book_truck_title: "ट्रक बुक करें",
  book_truck_subtitle: "तत्काल दर अनुमान प्राप्त करने और अपना ट्रक बुक करने के लिए नीचे विवरण भरें।",
  booking_details: "बुकिंग विवरण",
  pickup_location: "पिकअप स्थान",
  drop_location: "ड्रॉप स्थान",
  truck_type: "ट्रक प्रकार",
  select_truck_type: "ट्रक प्रकार चुनें",
  load_weight: "लोड वजन (टन)",
  pickup_date: "पिकअप तारीख",
  calculate_rate: "दर गणना करें",
  submit_booking: "बुकिंग जमा करें",
  rate_estimate: "दर अनुमान",
  estimated_cost_note: "*लोडिंग शुल्क सहित अनुमानित लागत। अंतिम दर मार्ग और उपलब्धता के आधार पर भिन्न हो सकती है।",
  transport_charges: "परिवहन शुल्क",
  loading_charges: "लोडिंग शुल्क",
  total: "कुल",
  rate_placeholder: "ट्रक प्रकार और वजन भरें, फिर अपना अनुमान देखने के लिए \"दर गणना करें\" पर क्लिक करें।",

  trucks_title: "उपलब्ध ट्रक",
  trucks_subtitle: "हमारे बेड़े को ब्राउज़ करें और अपने शिपमेंट के लिए सही ट्रक खोजें।",
  all_locations: "सभी स्थान",
  all_types: "सभी प्रकार",
  trucks_found: "ट्रक मिले",
  capacity: "क्षमता",
  available: "उपलब्ध",
  booked: "बुक",

  contact_title: "संपर्क करें",
  contact_subtitle: "कोई प्रश्न? कभी भी हमसे संपर्क करें। हम मदद के लिए यहाँ हैं।",
  send_message: "हमें संदेश भेजें",
  full_name: "पूरा नाम",
  email: "ईमेल",
  phone: "फ़ोन",
  message: "संदेश",
  send: "संदेश भेजें",
  get_in_touch: "संपर्क में रहें",
  office_address: "कार्यालय का पता",
  business_hours: "व्यापारिक घंटे",
  address_text: "सोलापूर, महाराष्ट्र 413001",
  phone_text: "+91 98765 43210",
  email_text: "info@vijayalakshmiroadlines.com",
  hours_text: "सोम - शनि: सुबह 8:00 - रात 8:00 | रवि: सुबह 9:00 - शाम 5:00",

  footer_desc: "भारत भर में विश्वसनीय सड़क परिवहन और लॉजिस्टिक्स समाधान के लिए आपका विश्वसनीय भागीदार।",
  quick_links: "त्वरित लिंक",
  services_label: "सेवाएँ",
  contact_info: "संपर्क जानकारी",
  copyright: "© 2025 विजयलक्ष्मी रोडलाइन्स। सर्वाधिकार सुरक्षित।",

  page_not_found: "उफ़! पृष्ठ नहीं मिला",
  return_home: "होम पर लौटें",

  toast_fill_fields: "कृपया सभी फ़ील्ड भरें।",
  toast_booking_success: "बुकिंग अनुरोध जमा! हम शीघ्र ही आपसे संपर्क करेंगे।",
  toast_select_truck_weight: "कृपया ट्रक प्रकार चुनें और वजन दर्ज करें।",
  toast_valid_weight: "कृपया एक वैध वजन दर्ज करें।",
  toast_fill_required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
  toast_message_sent: "संदेश भेजा गया! हम 24 घंटे के भीतर आपसे संपर्क करेंगे।",

  nav_tracking: "ट्रैकिंग",
  auth_login: "लॉगिन",
  auth_signup: "साइन अप",
  auth_subtitle: "ट्रक और बुकिंग प्रबंधित करने के लिए अपने एडमिन डैशबोर्ड तक पहुँचें।",
  auth_password: "पासवर्ड",
  auth_loading: "लोड हो रहा है...",
  auth_login_success: "सफलतापूर्वक लॉगिन हो गया!",
  auth_signup_success: "खाता बनाया गया! सत्यापन के लिए अपना ईमेल जाँचें।",
  auth_no_account: "खाता नहीं है? साइन अप करें",
  auth_have_account: "पहले से खाता है? लॉगिन करें",
  tracking_title: "अपना शिपमेंट ट्रैक करें",
  tracking_subtitle: "रीयल-टाइम शिपमेंट स्थिति और स्थान देखने के लिए अपनी ट्रैकिंग ID दर्ज करें।",
  tracking_enter_id: "ट्रैकिंग ID दर्ज करें",
  tracking_track: "ट्रैक करें",
  tracking_not_found: "इस ट्रैकिंग ID से कोई शिपमेंट नहीं मिला।",
  tracking_shipment_details: "शिपमेंट विवरण",
  tracking_id_label: "ट्रैकिंग ID",
  tracking_status: "स्थिति",
  tracking_timeline: "स्थिति समयरेखा",
  tracking_live_location: "लाइव स्थान",
  tracking_map_unavailable: "स्थान डेटा अभी उपलब्ध नहीं है।",
  admin_panel: "एडमिन पैनल",
  admin_dashboard: "डैशबोर्ड",
  admin_overview: "अवलोकन",
  admin_trucks: "ट्रक",
  admin_bookings: "बुकिंग",
  admin_logout: "लॉगआउट",
  admin_no_access: "आपके पास एडमिन एक्सेस नहीं है।",
  admin_logged_out: "सफलतापूर्वक लॉगआउट हो गया।",
  admin_total_trucks: "कुल ट्रक",
  admin_total_bookings: "कुल बुकिंग",
  admin_delivered: "डिलीवर किया गया",
  admin_pending: "लंबित",
  admin_recent_bookings: "हाल की बुकिंग",
  admin_no_bookings: "अभी कोई बुकिंग नहीं।",
  admin_manage_trucks: "ट्रक प्रबंधित करें",
  admin_add_truck: "ट्रक जोड़ें",
  admin_edit_truck: "ट्रक संपादित करें",
  admin_truck_name: "ट्रक का नाम",
  admin_status: "स्थिति",
  admin_price_km: "मूल्य/km (₹)",
  admin_location: "स्थान",
  admin_actions: "कार्रवाई",
  admin_save_changes: "परिवर्तन सहेजें",
  admin_truck_updated: "ट्रक सफलतापूर्वक अपडेट किया गया!",
  admin_truck_added: "ट्रक सफलतापूर्वक जोड़ा गया!",
  admin_truck_deleted: "ट्रक हटाया गया।",
  admin_confirm_delete: "क्या आप वाकई इसे हटाना चाहते हैं?",
  admin_maintenance: "रखरखाव",
  admin_manage_bookings: "बुकिंग प्रबंधित करें",
  admin_all_status: "सभी स्थिति",
  admin_update_status: "बुकिंग स्थिति अपडेट करें",
  admin_new_status: "नई स्थिति",
  admin_event_location: "घटना स्थान",
  admin_event_desc: "विवरण",
  admin_booking_updated: "बुकिंग अपडेट हो गई!",
  nav_dashboard: "मेरा डैशबोर्ड",
  dashboard_title: "मेरा डैशबोर्ड",
  dashboard_bookings: "बुकिंग",
  dashboard_tracking: "ट्रैकिंग",
  dashboard_invoices: "चालान",
  dashboard_no_bookings: "अभी कोई बुकिंग नहीं। शुरू करने के लिए ट्रक बुक करें!",
  dashboard_invoice: "चालान",
  dashboard_download_invoice: "चालान डाउनलोड करें",
  dashboard_back_to_bookings: "बुकिंग पर वापस",
  dashboard_select_booking: "ट्रैक करने के लिए बुकिंग टैब से एक बुकिंग चुनें।",
};

const mr: TranslationKeys = {
  nav_home: "मुख्यपृष्ठ",
  nav_about: "आमच्याबद्दल",
  nav_services: "सेवा",
  nav_book: "ट्रक बुक करा",
  nav_trucks: "ट्रक",
  nav_contact: "संपर्क",
  nav_book_now: "आता बुक करा",

  hero_badge: "भारताचा विश्वासू लॉजिस्टिक्स भागीदार",
  hero_title_1: "विश्वासार्ह लॉजिस्टिक्स,",
  hero_title_2: "वितरित.",
  hero_desc: "15+ ट्रकचा ताफा आणि 28+ राज्यांचे कव्हरेज असलेले संपूर्ण वाहतूक उपाय. तुमचा माल, आमची बांधिलकी.",
  hero_book: "ट्रक बुक करा",
  hero_services: "आमच्या सेवा",
  stat_trucks: "ट्रक",
  stat_states: "राज्ये कव्हर",
  stat_deliveries: "वितरण/महिना",
  stat_clients: "आनंदी ग्राहक",
  home_services_title: "आमच्या सेवा",
  home_services_desc: "तुमच्या व्यवसायाच्या गरजांनुसार सर्वसमावेशक लॉजिस्टिक्स उपाय.",
  home_ftl_title: "पूर्ण ट्रक लोड",
  home_ftl_desc: "भारतभर तुमच्या मोठ्या शिपमेंटसाठी समर्पित ट्रक.",
  home_ptl_title: "पार्ट लोड (PTL)",
  home_ptl_desc: "लहान लोडसाठी किफायतशीर सामायिक वाहतूक.",
  home_warehouse_title: "वेअरहाउसिंग",
  home_warehouse_desc: "सोपे प्रवेश आणि व्यवस्थापनासह सुरक्षित साठवण उपाय.",
  home_express_title: "एक्सप्रेस वितरण",
  home_express_desc: "हमी दिलेल्या मुदतीसह वेळ-गंभीर वितरण.",
  learn_more: "अधिक जाणून घ्या",
  why_choose_title: "आम्हाला का निवडावे?",
  why_choose_desc: "विश्वासार्ह लॉजिस्टिक्ससाठी भारतभरात 2000+ व्यवसायांचा विश्वास.",
  safe_secure: "सुरक्षित आणि संरक्षित",
  safe_secure_desc: "प्रत्येक शिपमेंटसाठी विमा कव्हरेजसह GPS-ट्रॅक केलेला ताफा.",
  on_time: "वेळेवर वितरण",
  on_time_desc: "रिअल-टाइम ट्रॅकिंग अपडेट्ससह 98% वेळेवर वितरण दर.",
  best_rates: "सर्वोत्तम दर",
  best_rates_desc: "पारदर्शक बिलिंगसह स्पर्धात्मक किंमती, कोणतेही छुपे शुल्क नाही.",
  testimonials_title: "आमचे ग्राहक काय म्हणतात",
  ready_to_ship: "शिप करायला तयार?",
  ready_to_ship_desc: "त्वरित कोटेशन मिळवा आणि मिनिटांत तुमचा ट्रक बुक करा.",
  book_truck_now: "आता ट्रक बुक करा",

  about_title: "विजयलक्ष्मी रोडलाइन्सबद्दल",
  about_subtitle: "भारतभर रस्ते वाहतूक आणि लॉजिस्टिक्समध्ये 15 वर्षांपेक्षा जास्त उत्कृष्टता.",
  our_story: "आमची कथा",
  about_story_1: "2008 मध्ये स्थापित, विजयलक्ष्मी रोडलाइन्सने तेलंगणातील स्थानिक मार्गांवर सेवा देणाऱ्या 5 ट्रकांच्या छोट्या ताफ्यापासून सुरुवात केली. विश्वासार्हता आणि ग्राहक समाधानासाठी समर्पणामुळे, आम्ही दक्षिण भारतातील सर्वात विश्वासू लॉजिस्टिक्स कंपन्यांपैकी एक बनलो.",
  about_story_2: "आज, 15+ ट्रकांचा ताफा आणि 28 राज्यांमध्ये उपस्थिती असलेले, आम्ही दरमहा 10,000 पेक्षा जास्त कंसाइनमेंट वितरित करतो — विश्वासार्हता, सुरक्षा आणि वेळेवर वितरणाचे वचन कायम ठेवत.",
  experience: "अनुभव",
  clients: "ग्राहक",
  on_time_rate: "वेळेवर दर",
  certified: "प्रमाणित",
  our_mission: "आमचे ध्येय",
  mission_text: "विश्वासार्ह, कार्यक्षम आणि किफायतशीर लॉजिस्टिक्स उपाय प्रदान करणे जे भारतभरातील व्यवसायांना माल सहजतेने हलवण्यास आणि आत्मविश्वासाने वाढण्यास सक्षम करतात.",
  our_vision: "आमची दृष्टी",
  vision_text: "भारतातील सर्वात विश्वासू आणि तंत्रज्ञान-चालित रस्ते लॉजिस्टिक्स कंपनी बनणे, वेग, सुरक्षा आणि ग्राहक अनुभवासाठी नवीन मानके स्थापित करणे.",
  core_values: "मूलभूत मूल्ये",
  reliability: "विश्वासार्हता",
  reliability_desc: "सातत्यपूर्ण, विश्वासार्ह सेवा ज्यावर तुम्ही प्रत्येक वेळी विश्वास ठेवू शकता.",
  speed: "वेग",
  speed_desc: "सर्वात जलद वितरणासाठी कार्यक्षम मार्ग आणि प्रक्रिया.",
  safety: "सुरक्षा",
  safety_desc: "प्रत्येक सफरीसाठी GPS ट्रॅकिंग, विमित माल आणि प्रशिक्षित चालक.",
  leadership_team: "नेतृत्व संघ",
  founder_md: "संस्थापक आणि MD",
  operations_head: "ऑपरेशन्स प्रमुख",
  fleet_manager: "फ्लीट व्यवस्थापक",
  customer_relations: "ग्राहक संबंध",

  services_title: "आमच्या सेवा",
  services_subtitle: "तुमचा व्यवसाय चालू ठेवण्यासाठी डिझाइन केलेले सर्वसमावेशक लॉजिस्टिक्स उपाय.",
  road_transport: "रस्ते वाहतूक",
  road_transport_desc: "आमच्या आधुनिक ताफ्यासह भारतभरातील सर्व प्रमुख शहरे जोडणारे सर्वसमावेशक रस्ते वाहतूक उपाय.",
  ftl: "पूर्ण ट्रक लोड (FTL)",
  ftl_desc: "विशेषत: तुमच्या मालासाठी समर्पित ट्रक. थेट, नॉन-स्टॉप वितरणासाठी आदर्श.",
  ptl: "पार्ट लोड (PTL)",
  ptl_desc: "लहान कंसाइनमेंटसाठी किफायतशीर सामायिक वाहतूक. फक्त तुम्ही वापरत असलेल्या जागेसाठी पैसे द्या.",
  warehousing: "वेअरहाउसिंग आणि स्टोरेज",
  warehousing_desc: "इन्व्हेंटरी व्यवस्थापन आणि सोप्या प्रवेशासह सुरक्षित, हवामान-नियंत्रित वेअरहाउसिंग सुविधा.",
  fleet_mgmt: "फ्लीट व्यवस्थापन",
  fleet_mgmt_desc: "देखभाल, चालक व्यवस्थापन आणि मार्ग अनुकूलनासह संपूर्ण फ्लीट व्यवस्थापन उपाय.",
  express: "एक्सप्रेस वितरण",
  express_desc: "हमी दिलेल्या मुदतीसह वेळ-गंभीर वितरण. तातडीच्या शिपमेंट आणि नाशवंत मालासाठी उत्तम.",
  get_quote: "कोटेशन मिळवा",
  custom_solution: "सानुकूल उपाय हवा?",
  custom_solution_desc: "तुमच्या व्यवसायासाठी अनुकूलित लॉजिस्टिक्स उपायांवर चर्चा करण्यासाठी आमच्याशी संपर्क साधा.",
  contact_us: "संपर्क साधा",

  book_truck_title: "ट्रक बुक करा",
  book_truck_subtitle: "त्वरित दर अंदाज मिळवण्यासाठी आणि तुमचा ट्रक बुक करण्यासाठी खालील तपशील भरा.",
  booking_details: "बुकिंग तपशील",
  pickup_location: "पिकअप ठिकाण",
  drop_location: "ड्रॉप ठिकाण",
  truck_type: "ट्रक प्रकार",
  select_truck_type: "ट्रक प्रकार निवडा",
  load_weight: "लोड वजन (टन)",
  pickup_date: "पिकअप तारीख",
  calculate_rate: "दर गणना करा",
  submit_booking: "बुकिंग सबमिट करा",
  rate_estimate: "दर अंदाज",
  estimated_cost_note: "*लोडिंग शुल्कासह अंदाजित खर्च. अंतिम दर मार्ग आणि उपलब्धतेनुसार बदलू शकतो.",
  transport_charges: "वाहतूक शुल्क",
  loading_charges: "लोडिंग शुल्क",
  total: "एकूण",
  rate_placeholder: "ट्रक प्रकार आणि वजन भरा, नंतर तुमचा अंदाज पाहण्यासाठी \"दर गणना करा\" वर क्लिक करा.",

  trucks_title: "उपलब्ध ट्रक",
  trucks_subtitle: "आमचा ताफा ब्राउझ करा आणि तुमच्या शिपमेंटसाठी योग्य ट्रक शोधा.",
  all_locations: "सर्व ठिकाणे",
  all_types: "सर्व प्रकार",
  trucks_found: "ट्रक सापडले",
  capacity: "क्षमता",
  available: "उपलब्ध",
  booked: "बुक",

  contact_title: "संपर्क साधा",
  contact_subtitle: "प्रश्न आहेत? कधीही आमच्याशी संपर्क साधा. आम्ही मदतीसाठी येथे आहोत.",
  send_message: "आम्हाला संदेश पाठवा",
  full_name: "पूर्ण नाव",
  email: "ईमेल",
  phone: "फोन",
  message: "संदेश",
  send: "संदेश पाठवा",
  get_in_touch: "संपर्कात रहा",
  office_address: "कार्यालयाचा पत्ता",
  business_hours: "व्यवसायाचे तास",
  address_text: "सोलापूर, महाराष्ट्र 413001",
  phone_text: "+91 98765 43210",
  email_text: "info@vijayalakshmiroadlines.com",
  hours_text: "सोम - शनि: सकाळी 8:00 - रात्री 8:00 | रवि: सकाळी 9:00 - संध्या 5:00",

  footer_desc: "भारतभर विश्वासार्ह रस्ते वाहतूक आणि लॉजिस्टिक्स उपायांसाठी तुमचा विश्वासू भागीदार.",
  quick_links: "त्वरित लिंक्स",
  services_label: "सेवा",
  contact_info: "संपर्क माहिती",
  copyright: "© 2025 विजयलक्ष्मी रोडलाइन्स. सर्व हक्क राखीव.",

  page_not_found: "अरेरे! पृष्ठ सापडले नाही",
  return_home: "मुख्यपृष्ठावर परत जा",

  toast_fill_fields: "कृपया सर्व फील्ड भरा.",
  toast_booking_success: "बुकिंग विनंती सबमिट! आम्ही लवकरच तुमच्याशी संपर्क करू.",
  toast_select_truck_weight: "कृपया ट्रक प्रकार निवडा आणि वजन प्रविष्ट करा.",
  toast_valid_weight: "कृपया वैध वजन प्रविष्ट करा.",
  toast_fill_required: "कृपया सर्व आवश्यक फील्ड भरा.",
  toast_message_sent: "संदेश पाठवला! आम्ही 24 तासांत तुमच्याशी संपर्क करू.",

  nav_tracking: "ट्रॅकिंग",
  auth_login: "लॉगिन",
  auth_signup: "साइन अप",
  auth_subtitle: "ट्रक आणि बुकिंग व्यवस्थापित करण्यासाठी तुमच्या एडमिन डॅशबोर्डवर प्रवेश करा.",
  auth_password: "पासवर्ड",
  auth_loading: "लोड होत आहे...",
  auth_login_success: "यशस्वीरित्या लॉगिन झाले!",
  auth_signup_success: "खाते तयार झाले! सत्यापनासाठी तुमचा ईमेल तपासा.",
  auth_no_account: "खाते नाही? साइन अप करा",
  auth_have_account: "आधीच खाते आहे? लॉगिन करा",
  tracking_title: "तुमचे शिपमेंट ट्रॅक करा",
  tracking_subtitle: "रिअल-टाइम शिपमेंट स्थिती आणि स्थान पाहण्यासाठी तुमची ट्रॅकिंग ID प्रविष्ट करा.",
  tracking_enter_id: "ट्रॅकिंग ID प्रविष्ट करा",
  tracking_track: "ट्रॅक करा",
  tracking_not_found: "या ट्रॅकिंग ID ने कोणतेही शिपमेंट सापडले नाही.",
  tracking_shipment_details: "शिपमेंट तपशील",
  tracking_id_label: "ट्रॅकिंग ID",
  tracking_status: "स्थिती",
  tracking_timeline: "स्थिती टाइमलाइन",
  tracking_live_location: "लाइव्ह स्थान",
  tracking_map_unavailable: "स्थान डेटा अजून उपलब्ध नाही.",
  admin_panel: "एडमिन पॅनेल",
  admin_dashboard: "डॅशबोर्ड",
  admin_overview: "आढावा",
  admin_trucks: "ट्रक",
  admin_bookings: "बुकिंग",
  admin_logout: "लॉगआउट",
  admin_no_access: "तुमच्याकडे एडमिन प्रवेश नाही.",
  admin_logged_out: "यशस्वीरित्या लॉगआउट झाले.",
  admin_total_trucks: "एकूण ट्रक",
  admin_total_bookings: "एकूण बुकिंग",
  admin_delivered: "वितरित",
  admin_pending: "प्रलंबित",
  admin_recent_bookings: "अलीकडील बुकिंग",
  admin_no_bookings: "अजून कोणतीही बुकिंग नाही.",
  admin_manage_trucks: "ट्रक व्यवस्थापित करा",
  admin_add_truck: "ट्रक जोडा",
  admin_edit_truck: "ट्रक संपादित करा",
  admin_truck_name: "ट्रकचे नाव",
  admin_status: "स्थिती",
  admin_price_km: "किंमत/km (₹)",
  admin_location: "ठिकाण",
  admin_actions: "कृती",
  admin_save_changes: "बदल जतन करा",
  admin_truck_updated: "ट्रक यशस्वीरित्या अपडेट झाला!",
  admin_truck_added: "ट्रक यशस्वीरित्या जोडला गेला!",
  admin_truck_deleted: "ट्रक हटवला गेला.",
  admin_confirm_delete: "तुम्हाला हे खरोखर हटवायचे आहे का?",
  admin_maintenance: "देखभाल",
  admin_manage_bookings: "बुकिंग व्यवस्थापित करा",
  admin_all_status: "सर्व स्थिती",
  admin_update_status: "बुकिंग स्थिती अपडेट करा",
  admin_new_status: "नवीन स्थिती",
  admin_event_location: "घटना ठिकाण",
  admin_event_desc: "वर्णन",
  admin_booking_updated: "बुकिंग अपडेट झाली!",
  nav_dashboard: "माझा डॅशबोर्ड",
  dashboard_title: "माझा डॅशबोर्ड",
  dashboard_bookings: "बुकिंग",
  dashboard_tracking: "ट्रॅकिंग",
  dashboard_invoices: "चलन",
  dashboard_no_bookings: "अजून कोणतीही बुकिंग नाही. सुरुवात करण्यासाठी ट्रक बुक करा!",
  dashboard_invoice: "चलन",
  dashboard_download_invoice: "चलन डाउनलोड करा",
  dashboard_back_to_bookings: "बुकिंगवर परत",
  dashboard_select_booking: "ट्रॅक करण्यासाठी बुकिंग टॅबमधून एक बुकिंग निवडा.",
};

const kn: TranslationKeys = {
  nav_home: "ಮುಖಪುಟ",
  nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
  nav_services: "ಸೇವೆಗಳು",
  nav_book: "ಟ್ರಕ್ ಬುಕ್ ಮಾಡಿ",
  nav_trucks: "ಟ್ರಕ್‌ಗಳು",
  nav_contact: "ಸಂಪರ್ಕ",
  nav_book_now: "ಈಗ ಬುಕ್ ಮಾಡಿ",

  hero_badge: "ಭಾರತದ ವಿಶ್ವಾಸಾರ್ಹ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪಾಲುದಾರ",
  hero_title_1: "ವಿಶ್ವಾಸಾರ್ಹ ಲಾಜಿಸ್ಟಿಕ್ಸ್,",
  hero_title_2: "ವಿತರಿಸಲಾಗಿದೆ.",
  hero_desc: "15+ ಟ್ರಕ್‌ಗಳ ಫ್ಲೀಟ್ ಮತ್ತು 28+ ರಾಜ್ಯಗಳ ವ್ಯಾಪ್ತಿಯೊಂದಿಗೆ ಸಮಗ್ರ ಸಾರಿಗೆ ಪರಿಹಾರಗಳು. ನಿಮ್ಮ ಸರಕು, ನಮ್ಮ ಬದ್ಧತೆ.",
  hero_book: "ಟ್ರಕ್ ಬುಕ್ ಮಾಡಿ",
  hero_services: "ನಮ್ಮ ಸೇವೆಗಳು",
  stat_trucks: "ಟ್ರಕ್‌ಗಳು",
  stat_states: "ರಾಜ್ಯಗಳು",
  stat_deliveries: "ವಿತರಣೆ/ತಿಂಗಳು",
  stat_clients: "ಸಂತೋಷ ಗ್ರಾಹಕರು",
  home_services_title: "ನಮ್ಮ ಸೇವೆಗಳು",
  home_services_desc: "ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾದ ಸಮಗ್ರ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪರಿಹಾರಗಳು.",
  home_ftl_title: "ಪೂರ್ಣ ಟ್ರಕ್ ಲೋಡ್",
  home_ftl_desc: "ಭಾರತದಾದ್ಯಂತ ನಿಮ್ಮ ದೊಡ್ಡ ಸಾಗಣೆಗಳಿಗಾಗಿ ಮೀಸಲಾದ ಟ್ರಕ್‌ಗಳು.",
  home_ptl_title: "ಭಾಗ ಲೋಡ್ (PTL)",
  home_ptl_desc: "ಸಣ್ಣ ಲೋಡ್‌ಗಳಿಗೆ ಕೈಗೆಟುಕುವ ಹಂಚಿಕೆ ಸಾರಿಗೆ.",
  home_warehouse_title: "ಗೋದಾಮು",
  home_warehouse_desc: "ಸುಲಭ ಪ್ರವೇಶ ಮತ್ತು ನಿರ್ವಹಣೆಯೊಂದಿಗೆ ಸುರಕ್ಷಿತ ಸಂಗ್ರಹ ಪರಿಹಾರಗಳು.",
  home_express_title: "ಎಕ್ಸ್‌ಪ್ರೆಸ್ ವಿತರಣೆ",
  home_express_desc: "ಖಾತರಿಪಡಿಸಿದ ಸಮಯಾವಧಿಯೊಂದಿಗೆ ಸಮಯ-ನಿರ್ಣಾಯಕ ವಿತರಣೆ.",
  learn_more: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
  why_choose_title: "ನಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
  why_choose_desc: "ವಿಶ್ವಾಸಾರ್ಹ ಲಾಜಿಸ್ಟಿಕ್ಸ್‌ಗಾಗಿ ಭಾರತದಾದ್ಯಂತ 2000+ ವ್ಯಾಪಾರಗಳ ವಿಶ್ವಾಸ.",
  safe_secure: "ಸುರಕ್ಷಿತ ಮತ್ತು ಭದ್ರ",
  safe_secure_desc: "ಪ್ರತಿ ಸಾಗಣೆಗೆ ವಿಮಾ ಕವರೇಜ್‌ನೊಂದಿಗೆ GPS-ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ಫ್ಲೀಟ್.",
  on_time: "ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ವಿತರಣೆ",
  on_time_desc: "ನೈಜ-ಸಮಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಅಪ್‌ಡೇಟ್‌ಗಳೊಂದಿಗೆ 98% ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ವಿತರಣೆ.",
  best_rates: "ಅತ್ಯುತ್ತಮ ದರಗಳು",
  best_rates_desc: "ಪಾರದರ್ಶಕ ಬಿಲ್ಲಿಂಗ್‌ನೊಂದಿಗೆ ಸ್ಪರ್ಧಾತ್ಮಕ ಬೆಲೆ, ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲ.",
  testimonials_title: "ನಮ್ಮ ಗ್ರಾಹಕರು ಏನು ಹೇಳುತ್ತಾರೆ",
  ready_to_ship: "ಕಳುಹಿಸಲು ಸಿದ್ಧವೇ?",
  ready_to_ship_desc: "ತಕ್ಷಣ ಕೋಟ್ ಪಡೆಯಿರಿ ಮತ್ತು ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ ಟ್ರಕ್ ಬುಕ್ ಮಾಡಿ.",
  book_truck_now: "ಈಗ ಟ್ರಕ್ ಬುಕ್ ಮಾಡಿ",

  about_title: "ವಿಜಯಲಕ್ಷ್ಮಿ ರೋಡ್‌ಲೈನ್ಸ್ ಬಗ್ಗೆ",
  about_subtitle: "ಭಾರತದಾದ್ಯಂತ ರಸ್ತೆ ಸಾರಿಗೆ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್‌ನಲ್ಲಿ 15 ವರ್ಷಗಳಿಗೂ ಹೆಚ್ಚಿನ ಶ್ರೇಷ್ಠತೆ.",
  our_story: "ನಮ್ಮ ಕಥೆ",
  about_story_1: "2008 ರಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ, ವಿಜಯಲಕ್ಷ್ಮಿ ರೋಡ್‌ಲೈನ್ಸ್ ತೆಲಂಗಾಣದಲ್ಲಿ ಸ್ಥಳೀಯ ಮಾರ್ಗಗಳಲ್ಲಿ ಸೇವೆ ಸಲ್ಲಿಸುವ 5 ಟ್ರಕ್‌ಗಳ ಸಣ್ಣ ಫ್ಲೀಟ್‌ನೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಯಿತು. ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ಗ್ರಾಹಕ ತೃಪ್ತಿಗೆ ಸಮರ್ಪಣೆಯ ಮೂಲಕ, ನಾವು ದಕ್ಷಿಣ ಭಾರತದ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಕಂಪನಿಗಳಲ್ಲಿ ಒಂದಾಗಿ ಬೆಳೆದಿದ್ದೇವೆ.",
  about_story_2: "ಇಂದು, 15+ ಟ್ರಕ್‌ಗಳ ಫ್ಲೀಟ್ ಮತ್ತು 28 ರಾಜ್ಯಗಳಲ್ಲಿ ಉಪಸ್ಥಿತಿಯೊಂದಿಗೆ, ನಾವು ಪ್ರತಿ ತಿಂಗಳು 10,000 ಕ್ಕೂ ಹೆಚ್ಚು ಕನ್ಸೈನ್‌ಮೆಂಟ್‌ಗಳನ್ನು ವಿತರಿಸುತ್ತೇವೆ — ವಿಶ್ವಾಸಾರ್ಹತೆ, ಸುರಕ್ಷತೆ ಮತ್ತು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ವಿತರಣೆಯ ವಚನವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳುತ್ತಾ.",
  experience: "ಅನುಭವ",
  clients: "ಗ್ರಾಹಕರು",
  on_time_rate: "ಸಮಯಕ್ಕೆ ದರ",
  certified: "ಪ್ರಮಾಣೀಕೃತ",
  our_mission: "ನಮ್ಮ ಧ್ಯೇಯ",
  mission_text: "ಭಾರತದಾದ್ಯಂತ ವ್ಯಾಪಾರಗಳಿಗೆ ಸರಕುಗಳನ್ನು ಸುಗಮವಾಗಿ ಸಾಗಿಸಲು ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಬೆಳೆಯಲು ಸಶಕ್ತಗೊಳಿಸುವ ವಿಶ್ವಾಸಾರ್ಹ, ಸಮರ್ಥ ಮತ್ತು ಕೈಗೆಟುಕುವ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪರಿಹಾರಗಳನ್ನು ಒದಗಿಸುವುದು.",
  our_vision: "ನಮ್ಮ ದೃಷ್ಟಿ",
  vision_text: "ಭಾರತದ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ-ಚಾಲಿತ ರಸ್ತೆ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಕಂಪನಿಯಾಗುವುದು, ವೇಗ, ಸುರಕ್ಷತೆ ಮತ್ತು ಗ್ರಾಹಕ ಅನುಭವಕ್ಕೆ ಹೊಸ ಮಾನದಂಡಗಳನ್ನು ಹೊಂದಿಸುವುದು.",
  core_values: "ಮೂಲ ಮೌಲ್ಯಗಳು",
  reliability: "ವಿಶ್ವಾಸಾರ್ಹತೆ",
  reliability_desc: "ಪ್ರತಿ ಬಾರಿ ನೀವು ನಂಬಬಹುದಾದ ಸ್ಥಿರ, ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ.",
  speed: "ವೇಗ",
  speed_desc: "ಅತ್ಯಂತ ವೇಗದ ವಿತರಣೆಗಾಗಿ ಸಮರ್ಥ ಮಾರ್ಗಗಳು ಮತ್ತು ಪ್ರಕ್ರಿಯೆಗಳು.",
  safety: "ಸುರಕ್ಷತೆ",
  safety_desc: "ಪ್ರತಿ ಪ್ರಯಾಣಕ್ಕೆ GPS ಟ್ರ್ಯಾಕಿಂಗ್, ವಿಮೆ ಮಾಡಿದ ಸರಕು ಮತ್ತು ತರಬೇತಿ ಪಡೆದ ಚಾಲಕರು.",
  leadership_team: "ನಾಯಕತ್ವ ತಂಡ",
  founder_md: "ಸಂಸ್ಥಾಪಕ ಮತ್ತು MD",
  operations_head: "ಕಾರ್ಯಾಚರಣೆ ಮುಖ್ಯಸ್ಥ",
  fleet_manager: "ಫ್ಲೀಟ್ ಮ್ಯಾನೇಜರ್",
  customer_relations: "ಗ್ರಾಹಕ ಸಂಬಂಧ",

  services_title: "ನಮ್ಮ ಸೇವೆಗಳು",
  services_subtitle: "ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಚಲಿಸುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸಮಗ್ರ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪರಿಹಾರಗಳು.",
  road_transport: "ರಸ್ತೆ ಸಾರಿಗೆ",
  road_transport_desc: "ನಮ್ಮ ಆಧುನಿಕ ಫ್ಲೀಟ್‌ನೊಂದಿಗೆ ಭಾರತದಾದ್ಯಂತ ಎಲ್ಲಾ ಪ್ರಮುಖ ನಗರಗಳನ್ನು ಸಂಪರ್ಕಿಸುವ ಸಮಗ್ರ ರಸ್ತೆ ಸಾರಿಗೆ ಪರಿಹಾರಗಳು.",
  ftl: "ಪೂರ್ಣ ಟ್ರಕ್ ಲೋಡ್ (FTL)",
  ftl_desc: "ನಿಮ್ಮ ಸರಕಿಗಾಗಿ ಮೀಸಲಾದ ಟ್ರಕ್‌ಗಳು. ನೇರ, ನಿಲ್ಲದ ವಿತರಣೆಗೆ ಆದರ್ಶ.",
  ptl: "ಭಾಗ ಲೋಡ್ (PTL)",
  ptl_desc: "ಸಣ್ಣ ಕನ್ಸೈನ್‌ಮೆಂಟ್‌ಗಳಿಗೆ ಕೈಗೆಟುಕುವ ಹಂಚಿಕೆ ಸಾರಿಗೆ. ನೀವು ಬಳಸುವ ಜಾಗಕ್ಕೆ ಮಾತ್ರ ಪಾವತಿಸಿ.",
  warehousing: "ಗೋದಾಮು ಮತ್ತು ಸಂಗ್ರಹ",
  warehousing_desc: "ಇನ್ವೆಂಟರಿ ನಿರ್ವಹಣೆ ಮತ್ತು ಸುಲಭ ಪ್ರವೇಶದೊಂದಿಗೆ ಸುರಕ್ಷಿತ, ಹವಾಮಾನ-ನಿಯಂತ್ರಿತ ಗೋದಾಮು ಸೌಲಭ್ಯಗಳು.",
  fleet_mgmt: "ಫ್ಲೀಟ್ ನಿರ್ವಹಣೆ",
  fleet_mgmt_desc: "ನಿರ್ವಹಣೆ, ಚಾಲಕ ನಿರ್ವಹಣೆ ಮತ್ತು ಮಾರ್ಗ ಅತ್ಯುತ್ತಮೀಕರಣ ಸೇರಿದಂತೆ ಸಮಗ್ರ ಫ್ಲೀಟ್ ನಿರ್ವಹಣೆ ಪರಿಹಾರಗಳು.",
  express: "ಎಕ್ಸ್‌ಪ್ರೆಸ್ ವಿತರಣೆ",
  express_desc: "ಖಾತರಿಪಡಿಸಿದ ಸಮಯಾವಧಿಯೊಂದಿಗೆ ಸಮಯ-ನಿರ್ಣಾಯಕ ವಿತರಣೆ. ತುರ್ತು ಸಾಗಣೆ ಮತ್ತು ಕೊಳೆಯುವ ಸರಕುಗಳಿಗೆ ಪರಿಪೂರ್ಣ.",
  get_quote: "ಕೋಟ್ ಪಡೆಯಿರಿ",
  custom_solution: "ಕಸ್ಟಮ್ ಪರಿಹಾರ ಬೇಕೇ?",
  custom_solution_desc: "ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ಅನುಕೂಲಿತ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪರಿಹಾರಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
  contact_us: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",

  book_truck_title: "ಟ್ರಕ್ ಬುಕ್ ಮಾಡಿ",
  book_truck_subtitle: "ತಕ್ಷಣ ದರ ಅಂದಾಜು ಪಡೆಯಲು ಮತ್ತು ನಿಮ್ಮ ಟ್ರಕ್ ಬುಕ್ ಮಾಡಲು ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
  booking_details: "ಬುಕಿಂಗ್ ವಿವರಗಳು",
  pickup_location: "ಪಿಕಪ್ ಸ್ಥಳ",
  drop_location: "ಡ್ರಾಪ್ ಸ್ಥಳ",
  truck_type: "ಟ್ರಕ್ ಪ್ರಕಾರ",
  select_truck_type: "ಟ್ರಕ್ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
  load_weight: "ಲೋಡ್ ತೂಕ (ಟನ್)",
  pickup_date: "ಪಿಕಪ್ ದಿನಾಂಕ",
  calculate_rate: "ದರ ಲೆಕ್ಕ ಹಾಕಿ",
  submit_booking: "ಬುಕಿಂಗ್ ಸಲ್ಲಿಸಿ",
  rate_estimate: "ದರ ಅಂದಾಜು",
  estimated_cost_note: "*ಲೋಡಿಂಗ್ ಶುಲ್ಕ ಸೇರಿದಂತೆ ಅಂದಾಜು ವೆಚ್ಚ. ಅಂತಿಮ ದರ ಮಾರ್ಗ ಮತ್ತು ಲಭ್ಯತೆಯ ಆಧಾರದ ಮೇಲೆ ಬದಲಾಗಬಹುದು.",
  transport_charges: "ಸಾರಿಗೆ ಶುಲ್ಕ",
  loading_charges: "ಲೋಡಿಂಗ್ ಶುಲ್ಕ",
  total: "ಒಟ್ಟು",
  rate_placeholder: "ಟ್ರಕ್ ಪ್ರಕಾರ ಮತ್ತು ತೂಕ ಭರ್ತಿ ಮಾಡಿ, ನಂತರ ನಿಮ್ಮ ಅಂದಾಜು ನೋಡಲು \"ದರ ಲೆಕ್ಕ ಹಾಕಿ\" ಕ್ಲಿಕ್ ಮಾಡಿ.",

  trucks_title: "ಲಭ್ಯವಿರುವ ಟ್ರಕ್‌ಗಳು",
  trucks_subtitle: "ನಮ್ಮ ಫ್ಲೀಟ್ ಬ್ರೌಸ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಸಾಗಣೆಗೆ ಸರಿಯಾದ ಟ್ರಕ್ ಹುಡುಕಿ.",
  all_locations: "ಎಲ್ಲಾ ಸ್ಥಳಗಳು",
  all_types: "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
  trucks_found: "ಟ್ರಕ್‌ಗಳು ಕಂಡುಬಂದವು",
  capacity: "ಸಾಮರ್ಥ್ಯ",
  available: "ಲಭ್ಯ",
  booked: "ಬುಕ್",

  contact_title: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
  contact_subtitle: "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ಯಾವಾಗ ಬೇಕಾದರೂ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಾವು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ.",
  send_message: "ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ",
  full_name: "ಪೂರ್ಣ ಹೆಸರು",
  email: "ಇಮೇಲ್",
  phone: "ಫೋನ್",
  message: "ಸಂದೇಶ",
  send: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
  get_in_touch: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
  office_address: "ಕಚೇರಿ ವಿಳಾಸ",
  business_hours: "ವ್ಯಾಪಾರ ಸಮಯ",
  address_text: "ಸೊಲ್ಲಾಪುರ, ಮಹಾರಾಷ್ಟ್ರ 413001",
  phone_text: "+91 98765 43210",
  email_text: "info@vijayalakshmiroadlines.com",
  hours_text: "ಸೋಮ - ಶನಿ: ಬೆಳಿಗ್ಗೆ 8:00 - ರಾತ್ರಿ 8:00 | ಭಾನು: ಬೆಳಿಗ್ಗೆ 9:00 - ಸಂಜೆ 5:00",

  footer_desc: "ಭಾರತದಾದ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ರಸ್ತೆ ಸಾರಿಗೆ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪರಿಹಾರಗಳಿಗಾಗಿ ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಪಾಲುದಾರ.",
  quick_links: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
  services_label: "ಸೇವೆಗಳು",
  contact_info: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
  copyright: "© 2025 ವಿಜಯಲಕ್ಷ್ಮಿ ರೋಡ್‌ಲೈನ್ಸ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

  page_not_found: "ಅಯ್ಯೋ! ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ",
  return_home: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",

  toast_fill_fields: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
  toast_booking_success: "ಬುಕಿಂಗ್ ವಿನಂತಿ ಸಲ್ಲಿಸಲಾಗಿದೆ! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",
  toast_select_truck_weight: "ದಯವಿಟ್ಟು ಟ್ರಕ್ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ತೂಕ ನಮೂದಿಸಿ.",
  toast_valid_weight: "ದಯವಿಟ್ಟು ಮಾನ್ಯ ತೂಕವನ್ನು ನಮೂದಿಸಿ.",
  toast_fill_required: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
  toast_message_sent: "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ! ನಾವು 24 ಗಂಟೆಗಳಲ್ಲಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",

  nav_tracking: "ಟ್ರ್ಯಾಕಿಂಗ್",
  auth_login: "ಲಾಗಿನ್",
  auth_signup: "ಸೈನ್ ಅಪ್",
  auth_subtitle: "ಟ್ರಕ್‌ಗಳು ಮತ್ತು ಬುಕಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಲು ನಿಮ್ಮ ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅನ್ನು ಪ್ರವೇಶಿಸಿ.",
  auth_password: "ಪಾಸ್‌ವರ್ಡ್",
  auth_loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
  auth_login_success: "ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದೆ!",
  auth_signup_success: "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ! ಪರಿಶೀಲನೆಗಾಗಿ ನಿಮ್ಮ ಇಮೇಲ್ ತಪಾಸಿಸಿ.",
  auth_no_account: "ಖಾತೆ ಇಲ್ಲವೇ? ಸೈನ್ ಅಪ್ ಮಾಡಿ",
  auth_have_account: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್ ಮಾಡಿ",
  tracking_title: "ನಿಮ್ಮ ಸಾಗಣೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
  tracking_subtitle: "ನೈಜ-ಸಮಯ ಸಾಗಣೆ ಸ್ಥಿತಿ ಮತ್ತು ಸ್ಥಳವನ್ನು ನೋಡಲು ನಿಮ್ಮ ಟ್ರ್ಯಾಕಿಂಗ್ ID ನಮೂದಿಸಿ.",
  tracking_enter_id: "ಟ್ರ್ಯಾಕಿಂಗ್ ID ನಮೂದಿಸಿ",
  tracking_track: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
  tracking_not_found: "ಈ ಟ್ರ್ಯಾಕಿಂಗ್ ID ಯೊಂದಿಗೆ ಯಾವುದೇ ಸಾಗಣೆ ಕಂಡುಬಂದಿಲ್ಲ.",
  tracking_shipment_details: "ಸಾಗಣೆ ವಿವರಗಳು",
  tracking_id_label: "ಟ್ರ್ಯಾಕಿಂಗ್ ID",
  tracking_status: "ಸ್ಥಿತಿ",
  tracking_timeline: "ಸ್ಥಿತಿ ಟೈಮ್‌ಲೈನ್",
  tracking_live_location: "ಲೈವ್ ಸ್ಥಳ",
  tracking_map_unavailable: "ಸ್ಥಳ ಡೇಟಾ ಇನ್ನೂ ಲಭ್ಯವಿಲ್ಲ.",
  admin_panel: "ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್",
  admin_dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  admin_overview: "ಅವಲೋಕನ",
  admin_trucks: "ಟ್ರಕ್‌ಗಳು",
  admin_bookings: "ಬುಕಿಂಗ್‌ಗಳು",
  admin_logout: "ಲಾಗ್‌ಔಟ್",
  admin_no_access: "ನಿಮಗೆ ಅಡ್ಮಿನ್ ಪ್ರವೇಶ ಇಲ್ಲ.",
  admin_logged_out: "ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್‌ಔಟ್ ಆಗಿದೆ.",
  admin_total_trucks: "ಒಟ್ಟು ಟ್ರಕ್‌ಗಳು",
  admin_total_bookings: "ಒಟ್ಟು ಬುಕಿಂಗ್‌ಗಳು",
  admin_delivered: "ವಿತರಿಸಲಾಗಿದೆ",
  admin_pending: "ಬಾಕಿ ಇದೆ",
  admin_recent_bookings: "ಇತ್ತೀಚಿನ ಬುಕಿಂಗ್‌ಗಳು",
  admin_no_bookings: "ಇನ್ನೂ ಯಾವುದೇ ಬುಕಿಂಗ್‌ಗಳಿಲ್ಲ.",
  admin_manage_trucks: "ಟ್ರಕ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
  admin_add_truck: "ಟ್ರಕ್ ಸೇರಿಸಿ",
  admin_edit_truck: "ಟ್ರಕ್ ಸಂಪಾದಿಸಿ",
  admin_truck_name: "ಟ್ರಕ್ ಹೆಸರು",
  admin_status: "ಸ್ಥಿತಿ",
  admin_price_km: "ಬೆಲೆ/km (₹)",
  admin_location: "ಸ್ಥಳ",
  admin_actions: "ಕ್ರಿಯೆಗಳು",
  admin_save_changes: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
  admin_truck_updated: "ಟ್ರಕ್ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ!",
  admin_truck_added: "ಟ್ರಕ್ ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!",
  admin_truck_deleted: "ಟ್ರಕ್ ಅಳಿಸಲಾಗಿದೆ.",
  admin_confirm_delete: "ಇದನ್ನು ನಿಜವಾಗಿಯೂ ಅಳಿಸಬೇಕೇ?",
  admin_maintenance: "ನಿರ್ವಹಣೆ",
  admin_manage_bookings: "ಬುಕಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
  admin_all_status: "ಎಲ್ಲಾ ಸ್ಥಿತಿ",
  admin_update_status: "ಬುಕಿಂಗ್ ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ",
  admin_new_status: "ಹೊಸ ಸ್ಥಿತಿ",
  admin_event_location: "ಘಟನೆ ಸ್ಥಳ",
  admin_event_desc: "ವಿವರಣೆ",
  admin_booking_updated: "ಬುಕಿಂಗ್ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ!",
  nav_dashboard: "ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  dashboard_title: "ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  dashboard_bookings: "ಬುಕಿಂಗ್‌ಗಳು",
  dashboard_tracking: "ಟ್ರ್ಯಾಕಿಂಗ್",
  dashboard_invoices: "ಇನ್‌ವಾಯ್ಸ್‌ಗಳು",
  dashboard_no_bookings: "ಇನ್ನೂ ಯಾವುದೇ ಬುಕಿಂಗ್‌ಗಳಿಲ್ಲ. ಪ್ರಾರಂಭಿಸಲು ಟ್ರಕ್ ಬುಕ್ ಮಾಡಿ!",
  dashboard_invoice: "ಇನ್‌ವಾಯ್ಸ್",
  dashboard_download_invoice: "ಇನ್‌ವಾಯ್ಸ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
  dashboard_back_to_bookings: "ಬುಕಿಂಗ್‌ಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
  dashboard_select_booking: "ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಬುಕಿಂಗ್‌ಗಳ ಟ್ಯಾಬ್‌ನಿಂದ ಒಂದು ಬುಕಿಂಗ್ ಆಯ್ಕೆಮಾಡಿ.",
};

export const translations: Record<Language, TranslationKeys> = { en, hi, mr, kn };
