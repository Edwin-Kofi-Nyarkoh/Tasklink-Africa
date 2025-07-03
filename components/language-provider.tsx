"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr" | "sw" | "ha" | "yo" | "ig"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.findWorkers": "Find Workers",
    "nav.howItWorks": "How It Works",
    "nav.help": "Help",
    "nav.blog": "Blog",
    "nav.dashboard": "Dashboard",
    "nav.myBookings": "My Bookings",
    "nav.messages": "Messages",
    "nav.settings": "Settings",
    "nav.navigation": "Navigation",
    "nav.account": "Account",
    "nav.preferences": "Preferences",
    "nav.language": "Language",
    "nav.lightMode": "Light Mode",
    "nav.darkMode": "Dark Mode",
    "nav.search": "Search",

    // Authentication
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.signOut": "Sign Out",
    "auth.signInWithGoogle": "Sign in with Google",
    "auth.signUpWithGoogle": "Sign up with Google",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.name": "Full Name",
    "auth.phone": "Phone Number",
    "auth.createAccount": "Create Account",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.forgotPassword": "Forgot Password?",

    // Hero Section
    "hero.title": "Find Trusted Professionals Near You",
    "hero.subtitle": "Connect with verified skilled workers for all your home and business needs across Africa",
    "hero.ctaBook": "Book a Service",
    "hero.ctaWorker": "Become a Worker",

    // Errors
    "error.accountExists": "Account Already Exists",
    "error.accountExistsDesc": "An account with this email already exists using a different sign-in method.",
    "error.tryDifferentMethod": "Please try signing in with the method you originally used.",
    "error.goBack": "Go Back",
    "error.contactSupport": "Contact Support",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.findWorkers": "Trouver des Travailleurs",
    "nav.howItWorks": "Comment ça Marche",
    "nav.help": "Aide",
    "nav.blog": "Blog",
    "nav.dashboard": "Tableau de Bord",
    "nav.myBookings": "Mes Réservations",
    "nav.messages": "Messages",
    "nav.settings": "Paramètres",
    "nav.navigation": "Navigation",
    "nav.account": "Compte",
    "nav.preferences": "Préférences",
    "nav.language": "Langue",
    "nav.lightMode": "Mode Clair",
    "nav.darkMode": "Mode Sombre",
    "nav.search": "Rechercher",

    // Authentication
    "auth.signIn": "Se Connecter",
    "auth.signUp": "S'inscrire",
    "auth.signOut": "Se Déconnecter",
    "auth.signInWithGoogle": "Se connecter avec Google",
    "auth.signUpWithGoogle": "S'inscrire avec Google",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.confirmPassword": "Confirmer le mot de passe",
    "auth.name": "Nom complet",
    "auth.phone": "Numéro de téléphone",
    "auth.createAccount": "Créer un compte",
    "auth.alreadyHaveAccount": "Vous avez déjà un compte?",
    "auth.dontHaveAccount": "Vous n'avez pas de compte?",
    "auth.forgotPassword": "Mot de passe oublié?",

    // Hero Section
    "hero.title": "Trouvez des Professionnels de Confiance Près de Chez Vous",
    "hero.subtitle":
      "Connectez-vous avec des travailleurs qualifiés vérifiés pour tous vos besoins domestiques et professionnels en Afrique",
    "hero.ctaBook": "Réserver un Service",
    "hero.ctaWorker": "Devenir Travailleur",

    // Errors
    "error.accountExists": "Compte Déjà Existant",
    "error.accountExistsDesc": "Un compte avec cet email existe déjà en utilisant une méthode de connexion différente.",
    "error.tryDifferentMethod":
      "Veuillez essayer de vous connecter avec la méthode que vous avez utilisée à l'origine.",
    "error.goBack": "Retour",
    "error.contactSupport": "Contacter le Support",
  },
  sw: {
    // Navigation
    "nav.home": "Nyumbani",
    "nav.services": "Huduma",
    "nav.findWorkers": "Tafuta Wafanyakazi",
    "nav.howItWorks": "Jinsi Inavyofanya Kazi",
    "nav.help": "Msaada",
    "nav.blog": "Blogu",
    "nav.dashboard": "Dashibodi",
    "nav.myBookings": "Miadi Yangu",
    "nav.messages": "Ujumbe",
    "nav.settings": "Mipangilio",
    "nav.navigation": "Urambazaji",
    "nav.account": "Akaunti",
    "nav.preferences": "Mapendeleo",
    "nav.language": "Lugha",
    "nav.lightMode": "Hali ya Mwanga",
    "nav.darkMode": "Hali ya Giza",
    "nav.search": "Tafuta",

    // Authentication
    "auth.signIn": "Ingia",
    "auth.signUp": "Jisajili",
    "auth.signOut": "Toka",
    "auth.signInWithGoogle": "Ingia na Google",
    "auth.signUpWithGoogle": "Jisajili na Google",
    "auth.email": "Barua pepe",
    "auth.password": "Nenosiri",
    "auth.confirmPassword": "Thibitisha nenosiri",
    "auth.name": "Jina kamili",
    "auth.phone": "Nambari ya simu",
    "auth.createAccount": "Unda akaunti",
    "auth.alreadyHaveAccount": "Una akaunti tayari?",
    "auth.dontHaveAccount": "Huna akaunti?",
    "auth.forgotPassword": "Umesahau nenosiri?",

    // Hero Section
    "hero.title": "Pata Wataalamu wa Kuaminika Karibu Nawe",
    "hero.subtitle":
      "Unganisha na wafanyakazi wenye ujuzi waliothibitishwa kwa mahitaji yako yote ya nyumbani na biashara Afrika",
    "hero.ctaBook": "Agiza Huduma",
    "hero.ctaWorker": "Kuwa Mfanyakazi",

    // Errors
    "error.accountExists": "Akaunti Tayari Ipo",
    "error.accountExistsDesc": "Akaunti na barua pepe hii tayari ipo kwa kutumia njia tofauti ya kuingia.",
    "error.tryDifferentMethod": "Tafadhali jaribu kuingia kwa njia uliyotumia awali.",
    "error.goBack": "Rudi Nyuma",
    "error.contactSupport": "Wasiliana na Msaada",
  },
  ha: {
    // Navigation
    "nav.home": "Gida",
    "nav.services": "Ayyuka",
    "nav.findWorkers": "Nemo Ma'aikata",
    "nav.howItWorks": "Yadda Yake Aiki",
    "nav.help": "Taimako",
    "nav.blog": "Blog",
    "nav.dashboard": "Dashboard",
    "nav.myBookings": "Ajiyena",
    "nav.messages": "Saƙonni",
    "nav.settings": "Saitunan",
    "nav.navigation": "Kewayawa",
    "nav.account": "Asusun",
    "nav.preferences": "Zaɓuɓɓuka",
    "nav.language": "Harshe",
    "nav.lightMode": "Yanayin Haske",
    "nav.darkMode": "Yanayin Duhu",
    "nav.search": "Bincike",

    // Authentication
    "auth.signIn": "Shiga",
    "auth.signUp": "Yi Rajista",
    "auth.signOut": "Fita",
    "auth.signInWithGoogle": "Shiga da Google",
    "auth.signUpWithGoogle": "Yi rajista da Google",
    "auth.email": "Imel",
    "auth.password": "Kalmar sirri",
    "auth.confirmPassword": "Tabbatar da kalmar sirri",
    "auth.name": "Cikakken suna",
    "auth.phone": "Lambar waya",
    "auth.createAccount": "Ƙirƙiri asusun",
    "auth.alreadyHaveAccount": "Kuna da asusun?",
    "auth.dontHaveAccount": "Ba ku da asusun?",
    "auth.forgotPassword": "Kun manta da kalmar sirri?",

    // Hero Section
    "hero.title": "Nemo Kwararrun Ma'aikata Kusa da Ku",
    "hero.subtitle": "Haɗa da tabbatattu ƙwararrun ma'aikata don duk bukatun gida da kasuwanci a Afrika",
    "hero.ctaBook": "Yi Ajiya Sabis",
    "hero.ctaWorker": "Zama Ma'aikaci",

    // Errors
    "error.accountExists": "Asusun Ya Riga Ya Wanzu",
    "error.accountExistsDesc": "Asusun da wannan imel ya riga ya wanzu ta amfani da wata hanyar shiga.",
    "error.tryDifferentMethod": "Da fatan za ku gwada shiga da hanyar da kuka fara amfani da ita.",
    "error.goBack": "Koma Baya",
    "error.contactSupport": "Tuntuɓi Tallafi",
  },
  yo: {
    // Navigation
    "nav.home": "Ile",
    "nav.services": "Awọn iṣẹ",
    "nav.findWorkers": "Wa Awọn Oṣiṣẹ",
    "nav.howItWorks": "Bi o ṣe n ṣiṣẹ",
    "nav.help": "Iranlọwọ",
    "nav.blog": "Blog",
    "nav.dashboard": "Dashboard",
    "nav.myBookings": "Awọn ifiṣura mi",
    "nav.messages": "Awọn ifiranṣẹ",
    "nav.settings": "Awọn eto",
    "nav.navigation": "Lilọ kiri",
    "nav.account": "Akọọlẹ",
    "nav.preferences": "Awọn ayanfẹ",
    "nav.language": "Ede",
    "nav.lightMode": "Ipo Imọlẹ",
    "nav.darkMode": "Ipo Okunkun",
    "nav.search": "Wa",

    // Authentication
    "auth.signIn": "Wọle",
    "auth.signUp": "Forukọsilẹ",
    "auth.signOut": "Jade",
    "auth.signInWithGoogle": "Wọle pẹlu Google",
    "auth.signUpWithGoogle": "Forukọsilẹ pẹlu Google",
    "auth.email": "Imeeli",
    "auth.password": "Ọrọ igbaniwọle",
    "auth.confirmPassword": "Jẹrisi ọrọ igbaniwọle",
    "auth.name": "Orukọ kikun",
    "auth.phone": "Nọmba foonu",
    "auth.createAccount": "Ṣẹda akọọlẹ",
    "auth.alreadyHaveAccount": "Ṣe o ni akọọlẹ tẹlẹ?",
    "auth.dontHaveAccount": "Ko ni akọọlẹ?",
    "auth.forgotPassword": "Gbagbe ọrọ igbaniwọle?",

    // Hero Section
    "hero.title": "Wa Awọn Alamọdaju Nitosi Rẹ",
    "hero.subtitle": "Sopọ pẹlu awọn oṣiṣẹ ti o ni ẹri fun gbogbo awọn iwulo ile ati iṣowo rẹ ni Afrika",
    "hero.ctaBook": "Ṣe agbekalẹ Iṣẹ",
    "hero.ctaWorker": "Di Oṣiṣẹ",

    // Errors
    "error.accountExists": "Akọọlẹ Ti Wa Tẹlẹ",
    "error.accountExistsDesc": "Akọọlẹ pẹlu imeeli yii ti wa tẹlẹ nipa lilo ọna wiwọle ti o yatọ.",
    "error.tryDifferentMethod": "Jọwọ gbiyanju lati wọle pẹlu ọna ti o lo ni akọkọ.",
    "error.goBack": "Pada Sẹhin",
    "error.contactSupport": "Kan si Atilẹyin",
  },
  ig: {
    // Navigation
    "nav.home": "Ụlọ",
    "nav.services": "Ọrụ",
    "nav.findWorkers": "Chọta Ndị Ọrụ",
    "nav.howItWorks": "Otú Ọ Na-arụ Ọrụ",
    "nav.help": "Enyemaka",
    "nav.blog": "Blog",
    "nav.dashboard": "Dashboard",
    "nav.myBookings": "Ndekọ m",
    "nav.messages": "Ozi",
    "nav.settings": "Ntọala",
    "nav.navigation": "Njem",
    "nav.account": "Akaụntụ",
    "nav.preferences": "Mmasị",
    "nav.language": "Asụsụ",
    "nav.lightMode": "Ọnọdụ Ìhè",
    "nav.darkMode": "Ọnọdụ Ọchịchịrị",
    "nav.search": "Chọọ",

    // Authentication
    "auth.signIn": "Banye",
    "auth.signUp": "Debanye aha",
    "auth.signOut": "Pụọ",
    "auth.signInWithGoogle": "Banye na Google",
    "auth.signUpWithGoogle": "Debanye aha na Google",
    "auth.email": "Ozi-e",
    "auth.password": "Okwuntughe",
    "auth.confirmPassword": "Kwenye okwuntughe",
    "auth.name": "Aha zuru oke",
    "auth.phone": "Nọmba ekwentị",
    "auth.createAccount": "Mepụta akaụntụ",
    "auth.alreadyHaveAccount": "Ị nwere akaụntụ?",
    "auth.dontHaveAccount": "Ị nweghị akaụntụ?",
    "auth.forgotPassword": "Chefuru okwuntughe?",

    // Hero Section
    "hero.title": "Chọta Ndị Ọkachamara a Pụrụ Ịtụkwasị Obi na Nso Gị",
    "hero.subtitle": "Jikọọ na ndị ọrụ nwere nkà ekwenyere maka mkpa ụlọ na azụmahịa gị niile na Afrika",
    "hero.ctaBook": "Debe Ọrụ",
    "hero.ctaWorker": "Bụrụ Onye Ọrụ",

    // Errors
    "error.accountExists": "Akaụntụ Adịlarị",
    "error.accountExistsDesc": "Akaụntụ nwere ozi-e a adịlarị site n'iji ụzọ ịbanye dị iche.",
    "error.tryDifferentMethod": "Biko nwaa ịbanye site n'ụzọ ị ji mbu.",
    "error.goBack": "Laghachi Azụ",
    "error.contactSupport": "Kpọtụrụ Nkwado",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("tasklink-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("tasklink-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
