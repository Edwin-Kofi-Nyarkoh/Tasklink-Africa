export const languages = {
  en: "English",
  ha: "Hausa",
  yo: "Yoruba",
  ig: "Igbo",
  fr: "Français",
  ar: "العربية",
  sw: "Kiswahili",
  pt: "Português",
  am: "አማርኛ",
}

export const translations = {
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.workers": "Find Workers",
    "nav.how_it_works": "How It Works",
    "nav.dashboard": "Dashboard",
    "nav.messages": "Messages",
    "nav.settings": "Settings",
    "nav.sign_in": "Sign In",
    "nav.sign_up": "Get Started",

    // Homepage
    "hero.title": "Find Trusted Professionals Near You",
    "hero.subtitle":
      "Connect with verified skilled workers across Africa. Book plumbers, electricians, carpenters, hairdressers, and more with confidence.",
    "hero.search_placeholder": "What service do you need?",
    "hero.location_placeholder": "Select location",
    "hero.search_button": "Search Workers",

    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.success": "Success!",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view_all": "View All",
    "common.book_now": "Book Now",
    "common.hire_now": "Hire Now",
    "common.chat": "Chat",
    "common.call": "Call",
    "common.email": "Email",
    "common.phone": "Phone",
    "common.address": "Address",
    "common.date": "Date",
    "common.time": "Time",
    "common.price": "Price",
    "common.rating": "Rating",
    "common.reviews": "Reviews",
    "common.experience": "Experience",
    "common.verified": "Verified",
    "common.available": "Available",
    "common.unavailable": "Unavailable",
  },
  ha: {
    // Navigation
    "nav.services": "Ayyuka",
    "nav.workers": "Nemo Ma'aikata",
    "nav.how_it_works": "Yadda Yake Aiki",
    "nav.dashboard": "Dashboard",
    "nav.messages": "Saƙonni",
    "nav.settings": "Saitunan",
    "nav.sign_in": "Shiga",
    "nav.sign_up": "Fara",

    // Homepage
    "hero.title": "Nemo Kwararrun Ma'aikata Kusa da Kai",
    "hero.subtitle":
      "Haɗu da tabbatattu ƙwararrun ma'aikata a duk faɗin Afirka. Yi booking plumbers, electricians, carpenters, masu gyaran gashi, da sauransu da kwarin gwiwa.",
    "hero.search_placeholder": "Wane irin sabis kake bukata?",
    "hero.location_placeholder": "Zaɓi wuri",
    "hero.search_button": "Nemo Ma'aikata",

    // Common
    "common.loading": "Ana ɗaukar hoto...",
    "common.error": "Wani abu ya ɓace",
    "common.success": "Nasara!",
    "common.cancel": "Soke",
    "common.save": "Ajiye",
    "common.edit": "Gyara",
    "common.delete": "Share",
    "common.view_all": "Duba Duka",
    "common.book_now": "Yi Booking Yanzu",
    "common.hire_now": "Ɗauka Yanzu",
    "common.chat": "Hira",
    "common.call": "Kira",
    "common.email": "Imel",
    "common.phone": "Waya",
    "common.address": "Adireshi",
    "common.date": "Kwanan wata",
    "common.time": "Lokaci",
    "common.price": "Farashi",
    "common.rating": "Kimanta",
    "common.reviews": "Sharhi",
    "common.experience": "Gogewa",
    "common.verified": "An tabbatar",
    "common.available": "Akwai",
    "common.unavailable": "Babu",
  },
  // Add more languages as needed
}

export function useTranslation(locale = "en") {
  const t = (key: string): string => {
    const translation = translations[locale as keyof typeof translations]
    if (!translation) return key

    return translation[key as keyof typeof translation] || key
  }

  return { t }
}

export function getAvailableLocales() {
  return Object.keys(languages)
}

export function getLanguageName(locale: string) {
  return languages[locale as keyof typeof languages] || locale
}
