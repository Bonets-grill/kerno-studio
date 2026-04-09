import type { Lang } from './types'

// All translation keys
export interface Translations {
  // Navbar
  nav_process: string
  nav_cases: string
  nav_pricing: string
  nav_start_free: string

  // Hero
  hero_badge: string
  hero_phrases: string[] // typewriter phrases
  hero_description: string
  hero_description_free: string
  hero_cta_primary: string
  hero_cta_secondary: string
  hero_stat_prototype: string
  hero_stat_prototype_label: string
  hero_stat_ai: string
  hero_stat_ai_label: string
  hero_stat_price: string
  hero_stat_price_label: string

  // Stats
  stats_projects: string
  stats_satisfaction: string
  stats_prototype: string
  stats_faster: string

  // Process
  process_title: string
  process_subtitle: string
  process_step1_title: string
  process_step1_desc: string
  process_step2_title: string
  process_step2_desc: string
  process_step3_title: string
  process_step3_desc: string
  process_step4_title: string
  process_step4_desc: string

  // Cases
  cases_title: string
  cases_subtitle: string

  // Pricing
  pricing_title: string
  pricing_subtitle: string
  pricing_landing: string
  pricing_landing_price: string
  pricing_landing_desc: string
  pricing_mvp: string
  pricing_mvp_price: string
  pricing_mvp_desc: string
  pricing_saas: string
  pricing_saas_price: string
  pricing_saas_desc: string
  pricing_popular: string
  pricing_cta: string
  pricing_features_landing: string[]
  pricing_features_mvp: string[]
  pricing_features_saas: string[]

  // Chat
  chat_title: string
  chat_subtitle: string
  chat_header: string
  chat_empty_greeting: string
  chat_empty_instruction: string
  chat_placeholder: string
  chat_send: string

  // Building / Prototype
  building_title: string
  building_subtitle: string
  building_generating: string
  building_tip_label: string
  building_upsell_title: string
  building_upsell_subtitle: string
  building_addon_chips_label: string
  prototype_ready_title: string
  prototype_ready_subtitle: string
  prototype_approve: string
  prototype_change: string
  prototype_extras_title: string
  prototype_new_total: string

  // Footer
  footer_description: string
  footer_product: string
  footer_legal: string
  footer_privacy: string
  footer_terms: string
  footer_cookies: string
  footer_start: string
  footer_copyright: string
  footer_made_with: string
  footer_in_canarias: string

  // Presentations
  pres_title: string
  pres_subtitle: string
  pres_chat_header: string
  pres_chat_placeholder: string
  pres_chat_empty_greeting: string
  pres_chat_empty_instruction: string
  pres_generate_btn: string
  pres_pay_btn: string
  pres_building_title: string
  pres_pitch: string
  pres_school: string
  pres_proposal: string
}

export const T: Record<Lang, Translations> = {
  es: {
    nav_process: 'Proceso',
    nav_cases: 'Casos',
    nav_pricing: 'Pricing',
    nav_start_free: 'Empezar gratis',

    hero_badge: 'Prototipo gratis en 24h',
    hero_phrases: [
      'Tu idea, hecha realidad.',
      'Un SaaS completo en días.',
      'De concepto a prototipo, gratis.',
      'IA + Equipo experto = Magia.',
    ],
    hero_description: 'Describe tu proyecto, nuestra IA genera un prototipo funcional',
    hero_description_free: 'gratis',
    hero_cta_primary: 'Describe tu idea',
    hero_cta_secondary: 'Ver cómo funciona',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Prototipo listo',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'IA-powered',
    hero_stat_price: '0€',
    hero_stat_price_label: 'Para empezar',

    stats_projects: 'Proyectos entregados',
    stats_satisfaction: 'Clientes satisfechos',
    stats_prototype: 'Prototipo listo',
    stats_faster: 'Más rápido que agencias',

    process_title: 'Cómo',
    process_subtitle: 'De la idea al producto en 4 pasos simples',
    process_step1_title: 'Describe tu idea',
    process_step1_desc: 'Escribe o habla. Nuestra IA te hace las preguntas correctas para entender tu proyecto.',
    process_step2_title: 'Prototipo IA gratis',
    process_step2_desc: 'En menos de 48h recibes un prototipo funcional con tu marca, navegable y con datos reales.',
    process_step3_title: 'Aprueba y paga',
    process_step3_desc: 'Si te gusta, aprueba el prototipo. Pagas 50% al inicio y 50% a la entrega.',
    process_step4_title: 'Lo construimos',
    process_step4_desc: 'Nuestro equipo + IA desarrollan tu proyecto real. Tú ves el progreso en tiempo real.',

    cases_title: 'Proyectos que',
    cases_subtitle: 'Desde startups hasta empresas establecidas, transformamos ideas en productos reales',

    pricing_title: 'Precios',
    pricing_subtitle: 'Paga 50% al inicio, 50% cuando estés satisfecho. Sin sorpresas.',
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'Desde 990€',
    pricing_landing_desc: 'Presencia online profesional con diseño premium.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'Desde 2.990€',
    pricing_mvp_desc: 'Tu producto mínimo viable listo para validar con usuarios reales.',
    pricing_saas: 'Sistema / SaaS',
    pricing_saas_price: 'Desde 7.990€',
    pricing_saas_desc: 'Plataforma completa multi-tenant lista para escalar.',
    pricing_popular: 'Popular',
    pricing_cta: 'Empezar ahora',
    pricing_features_landing: [
      'Diseño personalizado',
      'Responsive perfecto',
      'SEO optimizado',
      'Animaciones premium',
      'Hosting 1 año incluido',
      'Entrega en 5-7 días',
    ],
    pricing_features_mvp: [
      'Todo de Landing +',
      'Auth y base de datos',
      'Panel de administración',
      'Integraciones (pagos, email...)',
      'IA integrada (si aplica)',
      'Entrega en 15-20 días',
    ],
    pricing_features_saas: [
      'Todo de MVP +',
      'Multi-tenant / multi-rol',
      'API completa',
      'Dashboard analytics',
      'Automatizaciones IA',
      'Soporte 3 meses incluido',
    ],

    chat_title: 'Cuéntanos tu',
    chat_subtitle: 'Escribe lo que quieres construir. Nuestra IA hará el resto.',
    chat_header: 'Kerno Studio AI',
    chat_empty_greeting: 'Hola, soy el asistente de Kerno Studio.',
    chat_empty_instruction: 'Describe tu proyecto y generaremos un prototipo gratis.',
    chat_placeholder: 'Describe tu proyecto... (ej: una app para gestionar reservas)',
    chat_send: 'Enviar',

    building_title: 'Construyendo tu prototipo',
    building_subtitle: 'El sistema que cambiará todo en',
    building_generating: 'Generando pantallas...',
    building_tip_label: '¿Sabías que...',
    building_upsell_title: 'Mejora tu proyecto',
    building_upsell_subtitle: 'añade extras',
    building_addon_chips_label: 'Añade extras a tu proyecto:',
    prototype_ready_title: 'Tu prototipo está listo',
    prototype_ready_subtitle: 'pantallas generadas con IA',
    prototype_approve: 'Me gusta, aprobar',
    prototype_change: 'Cambiar cosas',
    prototype_extras_title: 'Extras incluidos',
    prototype_new_total: 'Nuevo total del proyecto',

    footer_description: 'Transformamos ideas en productos digitales reales usando inteligencia artificial y un equipo experto de desarrollo.',
    footer_product: 'Producto',
    footer_legal: 'Legal',
    footer_privacy: 'Privacidad',
    footer_terms: 'Términos',
    footer_cookies: 'Cookies',
    footer_start: 'Empezar',
    footer_copyright: 'Todos los derechos reservados.',
    footer_made_with: 'Hecho con',
    footer_in_canarias: 'en Canarias',

    pres_title: 'Presentaciones premium con IA',
    pres_subtitle: 'Describe tu idea y genera una presentación profesional en minutos',
    pres_chat_header: 'Kerno Presentations — Describe tu presentación',
    pres_chat_placeholder: 'Describe tu presentación...',
    pres_chat_empty_greeting: '¿Qué presentación necesitas?',
    pres_chat_empty_instruction: 'Pitch deck, trabajo escolar, propuesta comercial... describe tu idea.',
    pres_generate_btn: 'Generar Presentación',
    pres_pay_btn: 'Pagar y Descargar',
    pres_building_title: 'Generando tu presentación...',
    pres_pitch: 'Pitch Deck',
    pres_school: 'Trabajo Académico',
    pres_proposal: 'Propuesta Comercial',
  },

  en: {
    nav_process: 'Process',
    nav_cases: 'Cases',
    nav_pricing: 'Pricing',
    nav_start_free: 'Start free',

    hero_badge: 'Free prototype in 24h',
    hero_phrases: [
      'Your idea, made real.',
      'A complete SaaS in days.',
      'From concept to prototype, free.',
      'AI + Expert team = Magic.',
    ],
    hero_description: 'Describe your project, our AI generates a functional prototype',
    hero_description_free: 'for free',
    hero_cta_primary: 'Describe your idea',
    hero_cta_secondary: 'See how it works',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Prototype ready',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'AI-powered',
    hero_stat_price: '€0',
    hero_stat_price_label: 'To get started',

    stats_projects: 'Projects delivered',
    stats_satisfaction: 'Client satisfaction',
    stats_prototype: 'Prototype ready',
    stats_faster: 'Faster than agencies',

    process_title: 'How it',
    process_subtitle: 'From idea to product in 4 simple steps',
    process_step1_title: 'Describe your idea',
    process_step1_desc: 'Write or speak. Our AI asks the right questions to understand your project.',
    process_step2_title: 'Free AI prototype',
    process_step2_desc: 'In under 48h you receive a functional prototype with your brand, navigable and with real data.',
    process_step3_title: 'Approve and pay',
    process_step3_desc: 'If you like it, approve the prototype. Pay 50% upfront and 50% on delivery.',
    process_step4_title: 'We build it',
    process_step4_desc: 'Our team + AI develop your real project. You see progress in real time.',

    cases_title: 'Projects that',
    cases_subtitle: 'From startups to established companies, we turn ideas into real products',

    pricing_title: 'Transparent',
    pricing_subtitle: 'Pay 50% upfront, 50% when satisfied. No surprises.',
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'From €990',
    pricing_landing_desc: 'Professional online presence with premium design.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'From €2,990',
    pricing_mvp_desc: 'Your minimum viable product ready to validate with real users.',
    pricing_saas: 'System / SaaS',
    pricing_saas_price: 'From €7,990',
    pricing_saas_desc: 'Complete multi-tenant platform ready to scale.',
    pricing_popular: 'Popular',
    pricing_cta: 'Start now',
    pricing_features_landing: [
      'Custom design',
      'Pixel-perfect responsive',
      'SEO optimized',
      'Premium animations',
      '1 year hosting included',
      'Delivery in 5-7 days',
    ],
    pricing_features_mvp: [
      'Everything in Landing +',
      'Auth and database',
      'Admin panel',
      'Integrations (payments, email...)',
      'AI integrated (if applicable)',
      'Delivery in 15-20 days',
    ],
    pricing_features_saas: [
      'Everything in MVP +',
      'Multi-tenant / multi-role',
      'Complete API',
      'Analytics dashboard',
      'AI automations',
      '3 months support included',
    ],

    chat_title: 'Tell us your',
    chat_subtitle: 'Write what you want to build. Our AI will do the rest.',
    chat_header: 'Kerno Studio AI',
    chat_empty_greeting: "Hi, I'm Kerno Studio's assistant.",
    chat_empty_instruction: 'Describe your project and we\'ll generate a free prototype.',
    chat_placeholder: 'Describe your project... (e.g.: an app to manage bookings)',
    chat_send: 'Send',

    building_title: 'Building your prototype',
    building_subtitle: 'The system that will change everything at',
    building_generating: 'Generating screens...',
    building_tip_label: 'Did you know...',
    building_upsell_title: 'Improve your project',
    building_upsell_subtitle: 'add extras',
    building_addon_chips_label: 'Add extras to your project:',
    prototype_ready_title: 'Your prototype is ready',
    prototype_ready_subtitle: 'screens generated with AI',
    prototype_approve: 'I like it, approve',
    prototype_change: 'Make changes',
    prototype_extras_title: 'Extras included',
    prototype_new_total: 'New project total',

    footer_description: 'We turn ideas into real digital products using artificial intelligence and an expert development team.',
    footer_product: 'Product',
    footer_legal: 'Legal',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
    footer_cookies: 'Cookies',
    footer_start: 'Get started',
    footer_copyright: 'All rights reserved.',
    footer_made_with: 'Made with',
    footer_in_canarias: 'in Canarias',

    pres_title: "Presentaciones premium con IA",
    pres_subtitle: "Describe tu idea y genera una presentación profesional en minutos",
    pres_chat_header: "Kerno Presentations — Describe tu presentación",
    pres_chat_placeholder: "Describe tu presentación...",
    pres_chat_empty_greeting: "¿Qué presentación necesitas?",
    pres_chat_empty_instruction: "Pitch deck, trabajo escolar, propuesta comercial... describe tu idea.",
    pres_generate_btn: "Generar Presentación",
    pres_pay_btn: "Pagar y Descargar",
    pres_building_title: "Generando tu presentación...",
    pres_pitch: "Pitch Deck",
    pres_school: "Trabajo Académico",
    pres_proposal: "Propuesta Comercial",
  },

  fr: {
    nav_process: 'Processus',
    nav_cases: 'Cas',
    nav_pricing: 'Tarifs',
    nav_start_free: 'Commencer gratuit',

    hero_badge: 'Prototype gratuit en 24h',
    hero_phrases: [
      'Votre idée, réalisée.',
      'Un SaaS complet en quelques jours.',
      'Du concept au prototype, gratuit.',
      'IA + Équipe experte = Magie.',
    ],
    hero_description: 'Décrivez votre projet, notre IA génère un prototype fonctionnel',
    hero_description_free: 'gratuitement',
    hero_cta_primary: 'Décrivez votre idée',
    hero_cta_secondary: 'Voir comment ça marche',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Prototype prêt',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'IA-powered',
    hero_stat_price: '0€',
    hero_stat_price_label: 'Pour commencer',

    stats_projects: 'Projets livrés',
    stats_satisfaction: 'Satisfaction clients',
    stats_prototype: 'Prototype prêt',
    stats_faster: 'Plus rapide que les agences',

    process_title: 'Comment ça',
    process_subtitle: "De l'idée au produit en 4 étapes simples",
    process_step1_title: 'Décrivez votre idée',
    process_step1_desc: 'Écrivez ou parlez. Notre IA pose les bonnes questions pour comprendre votre projet.',
    process_step2_title: 'Prototype IA gratuit',
    process_step2_desc: 'En moins de 48h, recevez un prototype fonctionnel avec votre marque, navigable et avec des données réelles.',
    process_step3_title: 'Approuvez et payez',
    process_step3_desc: "Si ça vous plaît, approuvez le prototype. Payez 50% au départ et 50% à la livraison.",
    process_step4_title: 'On le construit',
    process_step4_desc: 'Notre équipe + IA développent votre projet réel. Vous voyez la progression en temps réel.',

    cases_title: 'Des projets qui',
    cases_subtitle: 'Des startups aux entreprises établies, nous transformons les idées en produits réels',

    pricing_title: 'Prix',
    pricing_subtitle: 'Payez 50% au départ, 50% quand vous êtes satisfait. Sans surprises.',
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'À partir de 990€',
    pricing_landing_desc: 'Présence en ligne professionnelle avec design premium.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'À partir de 2 990€',
    pricing_mvp_desc: 'Votre produit minimum viable prêt à valider avec de vrais utilisateurs.',
    pricing_saas: 'Système / SaaS',
    pricing_saas_price: 'À partir de 7 990€',
    pricing_saas_desc: 'Plateforme complète multi-tenant prête à évoluer.',
    pricing_popular: 'Populaire',
    pricing_cta: 'Commencer',
    pricing_features_landing: [
      'Design personnalisé',
      'Responsive parfait',
      'SEO optimisé',
      'Animations premium',
      'Hébergement 1 an inclus',
      'Livraison en 5-7 jours',
    ],
    pricing_features_mvp: [
      'Tout de Landing +',
      'Auth et base de données',
      "Panneau d'administration",
      'Intégrations (paiements, email...)',
      'IA intégrée (si applicable)',
      'Livraison en 15-20 jours',
    ],
    pricing_features_saas: [
      'Tout de MVP +',
      'Multi-tenant / multi-rôle',
      'API complète',
      'Dashboard analytics',
      'Automatisations IA',
      'Support 3 mois inclus',
    ],

    chat_title: 'Parlez-nous de votre',
    chat_subtitle: 'Décrivez ce que vous voulez construire. Notre IA fera le reste.',
    chat_header: 'Kerno Studio IA',
    chat_empty_greeting: "Bonjour, je suis l'assistant de Kerno Studio.",
    chat_empty_instruction: 'Décrivez votre projet et nous générerons un prototype gratuit.',
    chat_placeholder: 'Décrivez votre projet... (ex: une app pour gérer les réservations)',
    chat_send: 'Envoyer',

    building_title: 'Construction de votre prototype',
    building_subtitle: 'Le système qui changera tout chez',
    building_generating: 'Génération des écrans...',
    building_tip_label: 'Le saviez-vous...',
    building_upsell_title: 'Améliorez votre projet',
    building_upsell_subtitle: 'ajoutez des extras',
    building_addon_chips_label: 'Ajoutez des extras à votre projet :',
    prototype_ready_title: 'Votre prototype est prêt',
    prototype_ready_subtitle: 'écrans générés par IA',
    prototype_approve: "J'aime, approuver",
    prototype_change: 'Modifier',
    prototype_extras_title: 'Extras inclus',
    prototype_new_total: 'Nouveau total du projet',

    footer_description: "Nous transformons les idées en produits numériques réels grâce à l'intelligence artificielle et une équipe experte de développement.",
    footer_product: 'Produit',
    footer_legal: 'Légal',
    footer_privacy: 'Confidentialité',
    footer_terms: 'Conditions',
    footer_cookies: 'Cookies',
    footer_start: 'Commencer',
    footer_copyright: 'Tous droits réservés.',
    footer_made_with: 'Fait avec',
    footer_in_canarias: 'aux Canaries',

    pres_title: "Premium AI Presentations",
    pres_subtitle: "Describe your idea and generate a professional presentation in minutes",
    pres_chat_header: "Kerno Presentations — Describe your presentation",
    pres_chat_placeholder: "Describe your presentation...",
    pres_chat_empty_greeting: "What presentation do you need?",
    pres_chat_empty_instruction: "Pitch deck, school project, business proposal... describe your idea.",
    pres_generate_btn: "Generate Presentation",
    pres_pay_btn: "Pay & Download",
    pres_building_title: "Generating your presentation...",
    pres_pitch: "Pitch Deck",
    pres_school: "Academic Project",
    pres_proposal: "Business Proposal",
  },

  de: {
    nav_process: 'Prozess',
    nav_cases: 'Projekte',
    nav_pricing: 'Preise',
    nav_start_free: 'Kostenlos starten',

    hero_badge: 'Kostenloser Prototyp in 24h',
    hero_phrases: [
      'Deine Idee, verwirklicht.',
      'Ein komplettes SaaS in Tagen.',
      'Vom Konzept zum Prototyp, kostenlos.',
      'KI + Expertenteam = Magie.',
    ],
    hero_description: 'Beschreibe dein Projekt, unsere KI erstellt einen funktionalen Prototyp',
    hero_description_free: 'kostenlos',
    hero_cta_primary: 'Beschreibe deine Idee',
    hero_cta_secondary: 'So funktioniert es',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Prototyp fertig',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'KI-powered',
    hero_stat_price: '0€',
    hero_stat_price_label: 'Zum Starten',

    stats_projects: 'Projekte geliefert',
    stats_satisfaction: 'Kundenzufriedenheit',
    stats_prototype: 'Prototyp fertig',
    stats_faster: 'Schneller als Agenturen',

    process_title: 'So',
    process_subtitle: 'Von der Idee zum Produkt in 4 einfachen Schritten',
    process_step1_title: 'Beschreibe deine Idee',
    process_step1_desc: 'Schreibe oder sprich. Unsere KI stellt die richtigen Fragen, um dein Projekt zu verstehen.',
    process_step2_title: 'Kostenloser KI-Prototyp',
    process_step2_desc: 'In weniger als 48h erhältst du einen funktionalen Prototyp mit deiner Marke, navigierbar und mit echten Daten.',
    process_step3_title: 'Genehmigen und bezahlen',
    process_step3_desc: 'Wenn es dir gefällt, genehmige den Prototyp. Zahle 50% im Voraus und 50% bei Lieferung.',
    process_step4_title: 'Wir bauen es',
    process_step4_desc: 'Unser Team + KI entwickeln dein reales Projekt. Du siehst den Fortschritt in Echtzeit.',

    cases_title: 'Projekte, die',
    cases_subtitle: 'Von Startups bis zu etablierten Unternehmen — wir verwandeln Ideen in echte Produkte',

    pricing_title: 'Transparente',
    pricing_subtitle: '50% im Voraus, 50% bei Zufriedenheit. Keine Überraschungen.',
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'Ab 990€',
    pricing_landing_desc: 'Professionelle Online-Präsenz mit Premium-Design.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'Ab 2.990€',
    pricing_mvp_desc: 'Dein Minimum Viable Product, bereit zur Validierung mit echten Nutzern.',
    pricing_saas: 'System / SaaS',
    pricing_saas_price: 'Ab 7.990€',
    pricing_saas_desc: 'Komplette Multi-Tenant-Plattform, bereit zur Skalierung.',
    pricing_popular: 'Beliebt',
    pricing_cta: 'Jetzt starten',
    pricing_features_landing: [
      'Individuelles Design',
      'Perfekt responsiv',
      'SEO optimiert',
      'Premium-Animationen',
      '1 Jahr Hosting inklusive',
      'Lieferung in 5-7 Tagen',
    ],
    pricing_features_mvp: [
      'Alles von Landing +',
      'Auth und Datenbank',
      'Admin-Panel',
      'Integrationen (Zahlungen, E-Mail...)',
      'KI integriert (falls zutreffend)',
      'Lieferung in 15-20 Tagen',
    ],
    pricing_features_saas: [
      'Alles von MVP +',
      'Multi-Tenant / Multi-Rolle',
      'Komplette API',
      'Analytics-Dashboard',
      'KI-Automatisierungen',
      '3 Monate Support inklusive',
    ],

    chat_title: 'Erzähl uns deine',
    chat_subtitle: 'Schreibe, was du bauen möchtest. Unsere KI erledigt den Rest.',
    chat_header: 'Kerno Studio KI',
    chat_empty_greeting: 'Hallo, ich bin der Assistent von Kerno Studio.',
    chat_empty_instruction: 'Beschreibe dein Projekt und wir erstellen einen kostenlosen Prototyp.',
    chat_placeholder: 'Beschreibe dein Projekt... (z.B.: eine App zur Verwaltung von Buchungen)',
    chat_send: 'Senden',

    building_title: 'Prototyp wird erstellt',
    building_subtitle: 'Das System, das alles verändern wird bei',
    building_generating: 'Bildschirme werden generiert...',
    building_tip_label: 'Wusstest du...',
    building_upsell_title: 'Verbessere dein Projekt',
    building_upsell_subtitle: 'Extras hinzufügen',
    building_addon_chips_label: 'Extras zu deinem Projekt hinzufügen:',
    prototype_ready_title: 'Dein Prototyp ist fertig',
    prototype_ready_subtitle: 'KI-generierte Bildschirme',
    prototype_approve: 'Gefällt mir, genehmigen',
    prototype_change: 'Änderungen vornehmen',
    prototype_extras_title: 'Extras enthalten',
    prototype_new_total: 'Neuer Projektgesamtbetrag',

    footer_description: 'Wir verwandeln Ideen in echte digitale Produkte mit künstlicher Intelligenz und einem erfahrenen Entwicklungsteam.',
    footer_product: 'Produkt',
    footer_legal: 'Rechtliches',
    footer_privacy: 'Datenschutz',
    footer_terms: 'AGB',
    footer_cookies: 'Cookies',
    footer_start: 'Starten',
    footer_copyright: 'Alle Rechte vorbehalten.',
    footer_made_with: 'Hergestellt mit',
    footer_in_canarias: 'auf den Kanaren',

    pres_title: "Présentations premium avec IA",
    pres_subtitle: "Décrivez votre idée et générez une présentation professionnelle en minutes",
    pres_chat_header: "Kerno Presentations — Décrivez votre présentation",
    pres_chat_placeholder: "Décrivez votre présentation...",
    pres_chat_empty_greeting: "De quelle présentation avez-vous besoin ?",
    pres_chat_empty_instruction: "Pitch deck, projet scolaire, proposition commerciale... décrivez votre idée.",
    pres_generate_btn: "Générer la Présentation",
    pres_pay_btn: "Payer et Télécharger",
    pres_building_title: "Génération de votre présentation...",
    pres_pitch: "Pitch Deck",
    pres_school: "Projet Académique",
    pres_proposal: "Proposition Commerciale",
  },

  it: {
    nav_process: 'Processo',
    nav_cases: 'Casi',
    nav_pricing: 'Prezzi',
    nav_start_free: 'Inizia gratis',

    hero_badge: 'Prototipo gratuito in 24h',
    hero_phrases: [
      'La tua idea, realizzata.',
      'Un SaaS completo in giorni.',
      'Dal concetto al prototipo, gratis.',
      'IA + Team esperto = Magia.',
    ],
    hero_description: 'Descrivi il tuo progetto, la nostra IA genera un prototipo funzionale',
    hero_description_free: 'gratis',
    hero_cta_primary: 'Descrivi la tua idea',
    hero_cta_secondary: 'Scopri come funziona',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Prototipo pronto',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'IA-powered',
    hero_stat_price: '0€',
    hero_stat_price_label: 'Per iniziare',

    stats_projects: 'Progetti consegnati',
    stats_satisfaction: 'Soddisfazione clienti',
    stats_prototype: 'Prototipo pronto',
    stats_faster: 'Più veloce delle agenzie',

    process_title: 'Come',
    process_subtitle: "Dall'idea al prodotto in 4 semplici passaggi",
    process_step1_title: 'Descrivi la tua idea',
    process_step1_desc: 'Scrivi o parla. La nostra IA fa le domande giuste per capire il tuo progetto.',
    process_step2_title: 'Prototipo IA gratuito',
    process_step2_desc: 'In meno di 48h ricevi un prototipo funzionale con il tuo brand, navigabile e con dati reali.',
    process_step3_title: 'Approva e paga',
    process_step3_desc: 'Se ti piace, approva il prototipo. Paghi 50% all\'inizio e 50% alla consegna.',
    process_step4_title: 'Lo costruiamo',
    process_step4_desc: 'Il nostro team + IA sviluppano il tuo progetto reale. Vedi i progressi in tempo reale.',

    cases_title: 'Progetti che',
    cases_subtitle: 'Dalle startup alle aziende consolidate, trasformiamo le idee in prodotti reali',

    pricing_title: 'Prezzi',
    pricing_subtitle: 'Paga 50% all\'inizio, 50% quando sei soddisfatto. Senza sorprese.',
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'Da 990€',
    pricing_landing_desc: 'Presenza online professionale con design premium.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'Da 2.990€',
    pricing_mvp_desc: 'Il tuo prodotto minimo funzionante pronto per validare con utenti reali.',
    pricing_saas: 'Sistema / SaaS',
    pricing_saas_price: 'Da 7.990€',
    pricing_saas_desc: 'Piattaforma completa multi-tenant pronta a scalare.',
    pricing_popular: 'Popolare',
    pricing_cta: 'Inizia ora',
    pricing_features_landing: [
      'Design personalizzato',
      'Responsive perfetto',
      'SEO ottimizzato',
      'Animazioni premium',
      'Hosting 1 anno incluso',
      'Consegna in 5-7 giorni',
    ],
    pricing_features_mvp: [
      'Tutto di Landing +',
      'Auth e database',
      'Pannello di amministrazione',
      'Integrazioni (pagamenti, email...)',
      'IA integrata (se applicabile)',
      'Consegna in 15-20 giorni',
    ],
    pricing_features_saas: [
      'Tutto di MVP +',
      'Multi-tenant / multi-ruolo',
      'API completa',
      'Dashboard analytics',
      'Automazioni IA',
      'Supporto 3 mesi incluso',
    ],

    chat_title: 'Raccontaci la tua',
    chat_subtitle: 'Scrivi cosa vuoi costruire. La nostra IA farà il resto.',
    chat_header: 'Kerno Studio IA',
    chat_empty_greeting: "Ciao, sono l'assistente di Kerno Studio.",
    chat_empty_instruction: 'Descrivi il tuo progetto e genereremo un prototipo gratuito.',
    chat_placeholder: 'Descrivi il tuo progetto... (es: un\'app per gestire prenotazioni)',
    chat_send: 'Invia',

    building_title: 'Costruzione del prototipo',
    building_subtitle: 'Il sistema che cambierà tutto in',
    building_generating: 'Generazione schermate...',
    building_tip_label: 'Lo sapevi che...',
    building_upsell_title: 'Migliora il tuo progetto',
    building_upsell_subtitle: 'aggiungi extra',
    building_addon_chips_label: 'Aggiungi extra al tuo progetto:',
    prototype_ready_title: 'Il tuo prototipo è pronto',
    prototype_ready_subtitle: 'schermate generate con IA',
    prototype_approve: 'Mi piace, approva',
    prototype_change: 'Modifica',
    prototype_extras_title: 'Extra inclusi',
    prototype_new_total: 'Nuovo totale del progetto',

    footer_description: 'Trasformiamo le idee in prodotti digitali reali utilizzando intelligenza artificiale e un team esperto di sviluppo.',
    footer_product: 'Prodotto',
    footer_legal: 'Legale',
    footer_privacy: 'Privacy',
    footer_terms: 'Termini',
    footer_cookies: 'Cookie',
    footer_start: 'Inizia',
    footer_copyright: 'Tutti i diritti riservati.',
    footer_made_with: 'Fatto con',
    footer_in_canarias: 'alle Canarie',

    pres_title: "Premium KI-Präsentationen",
    pres_subtitle: "Beschreiben Sie Ihre Idee und erstellen Sie in Minuten eine professionelle Präsentation",
    pres_chat_header: "Kerno Presentations — Beschreiben Sie Ihre Präsentation",
    pres_chat_placeholder: "Beschreiben Sie Ihre Präsentation...",
    pres_chat_empty_greeting: "Welche Präsentation benötigen Sie?",
    pres_chat_empty_instruction: "Pitch Deck, Schulprojekt, Geschäftsvorschlag... beschreiben Sie Ihre Idee.",
    pres_generate_btn: "Präsentation erstellen",
    pres_pay_btn: "Bezahlen & Herunterladen",
    pres_building_title: "Ihre Präsentation wird erstellt...",
    pres_pitch: "Pitch Deck",
    pres_school: "Akademisches Projekt",
    pres_proposal: "Geschäftsvorschlag",
  },

  pt: {
    nav_process: 'Processo',
    nav_cases: 'Casos',
    nav_pricing: 'Preços',
    nav_start_free: 'Começar grátis',

    hero_badge: 'Protótipo grátis em 24h',
    hero_phrases: [
      'Sua ideia, realizada.',
      'Um SaaS completo em dias.',
      'Do conceito ao protótipo, grátis.',
      'IA + Equipe especialista = Magia.',
    ],
    hero_description: 'Descreva seu projeto, nossa IA gera um protótipo funcional',
    hero_description_free: 'grátis',
    hero_cta_primary: 'Descreva sua ideia',
    hero_cta_secondary: 'Veja como funciona',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Protótipo pronto',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'IA-powered',
    hero_stat_price: 'R$0',
    hero_stat_price_label: 'Para começar',

    stats_projects: 'Projetos entregues',
    stats_satisfaction: 'Satisfação dos clientes',
    stats_prototype: 'Protótipo pronto',
    stats_faster: 'Mais rápido que agências',

    process_title: 'Como',
    process_subtitle: 'Da ideia ao produto em 4 passos simples',
    process_step1_title: 'Descreva sua ideia',
    process_step1_desc: 'Escreva ou fale. Nossa IA faz as perguntas certas para entender seu projeto.',
    process_step2_title: 'Protótipo IA grátis',
    process_step2_desc: 'Em menos de 48h você recebe um protótipo funcional com sua marca, navegável e com dados reais.',
    process_step3_title: 'Aprove e pague',
    process_step3_desc: 'Se gostar, aprove o protótipo. Pague 50% no início e 50% na entrega.',
    process_step4_title: 'Nós construímos',
    process_step4_desc: 'Nossa equipe + IA desenvolvem seu projeto real. Você acompanha o progresso em tempo real.',

    cases_title: 'Projetos que',
    cases_subtitle: 'De startups a empresas consolidadas, transformamos ideias em produtos reais',

    pricing_title: 'Preços',
    pricing_subtitle: 'Pague 50% no início, 50% quando estiver satisfeito. Sem surpresas.',
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'A partir de €990',
    pricing_landing_desc: 'Presença online profissional com design premium.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'A partir de €2.990',
    pricing_mvp_desc: 'Seu produto mínimo viável pronto para validar com usuários reais.',
    pricing_saas: 'Sistema / SaaS',
    pricing_saas_price: 'A partir de €7.990',
    pricing_saas_desc: 'Plataforma completa multi-tenant pronta para escalar.',
    pricing_popular: 'Popular',
    pricing_cta: 'Começar agora',
    pricing_features_landing: [
      'Design personalizado',
      'Responsivo perfeito',
      'SEO otimizado',
      'Animações premium',
      'Hospedagem 1 ano incluída',
      'Entrega em 5-7 dias',
    ],
    pricing_features_mvp: [
      'Tudo de Landing +',
      'Auth e banco de dados',
      'Painel de administração',
      'Integrações (pagamentos, email...)',
      'IA integrada (se aplicável)',
      'Entrega em 15-20 dias',
    ],
    pricing_features_saas: [
      'Tudo de MVP +',
      'Multi-tenant / multi-role',
      'API completa',
      'Dashboard analytics',
      'Automações IA',
      'Suporte 3 meses incluído',
    ],

    chat_title: 'Conte-nos sua',
    chat_subtitle: 'Escreva o que quer construir. Nossa IA fará o resto.',
    chat_header: 'Kerno Studio IA',
    chat_empty_greeting: 'Olá, sou o assistente do Kerno Studio.',
    chat_empty_instruction: 'Descreva seu projeto e geraremos um protótipo gratuito.',
    chat_placeholder: 'Descreva seu projeto... (ex: um app para gerenciar reservas)',
    chat_send: 'Enviar',

    building_title: 'Construindo seu protótipo',
    building_subtitle: 'O sistema que mudará tudo em',
    building_generating: 'Gerando telas...',
    building_tip_label: 'Você sabia que...',
    building_upsell_title: 'Melhore seu projeto',
    building_upsell_subtitle: 'adicione extras',
    building_addon_chips_label: 'Adicione extras ao seu projeto:',
    prototype_ready_title: 'Seu protótipo está pronto',
    prototype_ready_subtitle: 'telas geradas com IA',
    prototype_approve: 'Gostei, aprovar',
    prototype_change: 'Fazer alterações',
    prototype_extras_title: 'Extras incluídos',
    prototype_new_total: 'Novo total do projeto',

    footer_description: 'Transformamos ideias em produtos digitais reais usando inteligência artificial e uma equipe especialista de desenvolvimento.',
    footer_product: 'Produto',
    footer_legal: 'Legal',
    footer_privacy: 'Privacidade',
    footer_terms: 'Termos',
    footer_cookies: 'Cookies',
    footer_start: 'Começar',
    footer_copyright: 'Todos os direitos reservados.',
    footer_made_with: 'Feito com',
    footer_in_canarias: 'nas Canárias',

    pres_title: "Presentazioni premium con IA",
    pres_subtitle: "Descrivi la tua idea e genera una presentazione professionale in pochi minuti",
    pres_chat_header: "Kerno Presentations — Descrivi la tua presentazione",
    pres_chat_placeholder: "Descrivi la tua presentazione...",
    pres_chat_empty_greeting: "Di quale presentazione hai bisogno?",
    pres_chat_empty_instruction: "Pitch deck, progetto scolastico, proposta commerciale... descrivi la tua idea.",
    pres_generate_btn: "Genera Presentazione",
    pres_pay_btn: "Paga e Scarica",
    pres_building_title: "Generazione della presentazione...",
    pres_pitch: "Pitch Deck",
    pres_school: "Progetto Accademico",
    pres_proposal: "Proposta Commerciale",
  },

  ca: {
    nav_process: 'Procés',
    nav_cases: 'Casos',
    nav_pricing: 'Preus',
    nav_start_free: 'Comença gratis',

    hero_badge: 'Prototip gratuït en 24h',
    hero_phrases: [
      'La teva idea, feta realitat.',
      'Un SaaS complet en dies.',
      'Del concepte al prototip, gratis.',
      'IA + Equip expert = Màgia.',
    ],
    hero_description: 'Descriu el teu projecte, la nostra IA genera un prototip funcional',
    hero_description_free: 'gratis',
    hero_cta_primary: 'Descriu la teva idea',
    hero_cta_secondary: 'Veure com funciona',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Prototip llest',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'IA-powered',
    hero_stat_price: '0€',
    hero_stat_price_label: 'Per començar',

    stats_projects: 'Projectes lliurats',
    stats_satisfaction: 'Clients satisfets',
    stats_prototype: 'Prototip llest',
    stats_faster: 'Més ràpid que agències',

    process_title: 'Com',
    process_subtitle: "De la idea al producte en 4 passos simples",
    process_step1_title: 'Descriu la teva idea',
    process_step1_desc: "Escriu o parla. La nostra IA et fa les preguntes correctes per entendre el teu projecte.",
    process_step2_title: 'Prototip IA gratuït',
    process_step2_desc: 'En menys de 48h reps un prototip funcional amb la teva marca, navegable i amb dades reals.',
    process_step3_title: 'Aprova i paga',
    process_step3_desc: "Si t'agrada, aprova el prototip. Pagues 50% a l'inici i 50% al lliurament.",
    process_step4_title: 'Ho construïm',
    process_step4_desc: 'El nostre equip + IA desenvolupen el teu projecte real. Tu veus el progrés en temps real.',

    cases_title: 'Projectes que',
    cases_subtitle: "Des d'startups fins a empreses establertes, transformem idees en productes reals",

    pricing_title: 'Preus',
    pricing_subtitle: "Paga 50% a l'inici, 50% quan estiguis satisfet. Sense sorpreses.",
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'Des de 990€',
    pricing_landing_desc: 'Presència online professional amb disseny premium.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'Des de 2.990€',
    pricing_mvp_desc: 'El teu producte mínim viable llest per validar amb usuaris reals.',
    pricing_saas: 'Sistema / SaaS',
    pricing_saas_price: 'Des de 7.990€',
    pricing_saas_desc: 'Plataforma completa multi-tenant llesta per escalar.',
    pricing_popular: 'Popular',
    pricing_cta: 'Comença ara',
    pricing_features_landing: [
      'Disseny personalitzat',
      'Responsive perfecte',
      'SEO optimitzat',
      'Animacions premium',
      'Hosting 1 any inclòs',
      'Lliurament en 5-7 dies',
    ],
    pricing_features_mvp: [
      'Tot de Landing +',
      'Auth i base de dades',
      "Panell d'administració",
      'Integracions (pagaments, email...)',
      'IA integrada (si aplica)',
      'Lliurament en 15-20 dies',
    ],
    pricing_features_saas: [
      'Tot de MVP +',
      'Multi-tenant / multi-rol',
      'API completa',
      'Dashboard analytics',
      'Automatitzacions IA',
      'Suport 3 mesos inclòs',
    ],

    chat_title: "Explica'ns la teva",
    chat_subtitle: 'Escriu el que vols construir. La nostra IA farà la resta.',
    chat_header: 'Kerno Studio IA',
    chat_empty_greeting: "Hola, sóc l'assistent de Kerno Studio.",
    chat_empty_instruction: 'Descriu el teu projecte i generarem un prototip gratuït.',
    chat_placeholder: 'Descriu el teu projecte... (ex: una app per gestionar reserves)',
    chat_send: 'Enviar',

    building_title: 'Construint el teu prototip',
    building_subtitle: 'El sistema que ho canviarà tot a',
    building_generating: 'Generant pantalles...',
    building_tip_label: 'Sabies que...',
    building_upsell_title: 'Millora el teu projecte',
    building_upsell_subtitle: 'afegeix extres',
    building_addon_chips_label: 'Afegeix extres al teu projecte:',
    prototype_ready_title: 'El teu prototip està llest',
    prototype_ready_subtitle: 'pantalles generades amb IA',
    prototype_approve: "M'agrada, aprovar",
    prototype_change: 'Canviar coses',
    prototype_extras_title: 'Extres inclosos',
    prototype_new_total: 'Nou total del projecte',

    footer_description: "Transformem idees en productes digitals reals amb intel·ligència artificial i un equip expert de desenvolupament.",
    footer_product: 'Producte',
    footer_legal: 'Legal',
    footer_privacy: 'Privacitat',
    footer_terms: 'Termes',
    footer_cookies: 'Cookies',
    footer_start: 'Comença',
    footer_copyright: 'Tots els drets reservats.',
    footer_made_with: 'Fet amb',
    footer_in_canarias: 'a Canàries',

    pres_title: "Presentacions premium amb IA",
    pres_subtitle: "Descriu la teva idea i genera una presentació professional en minuts",
    pres_chat_header: "Kerno Presentations — Descriu la teva presentació",
    pres_chat_placeholder: "Descriu la teva presentació...",
    pres_chat_empty_greeting: "Quina presentació necessites?",
    pres_chat_empty_instruction: "Pitch deck, treball escolar, proposta comercial... descriu la teva idea.",
    pres_generate_btn: "Generar Presentació",
    pres_pay_btn: "Pagar i Descarregar",
    pres_building_title: "Generant la teva presentació...",
    pres_pitch: "Pitch Deck",
    pres_school: "Treball Acadèmic",
    pres_proposal: "Proposta Comercial",
  },

  gl: {
    nav_process: 'Proceso',
    nav_cases: 'Casos',
    nav_pricing: 'Prezos',
    nav_start_free: 'Comezar gratis',

    hero_badge: 'Prototipo gratis en 24h',
    hero_phrases: [
      'A túa idea, feita realidade.',
      'Un SaaS completo en días.',
      'Do concepto ao prototipo, gratis.',
      'IA + Equipo experto = Maxia.',
    ],
    hero_description: 'Describe o teu proxecto, a nosa IA xera un prototipo funcional',
    hero_description_free: 'gratis',
    hero_cta_primary: 'Describe a túa idea',
    hero_cta_secondary: 'Ver como funciona',
    hero_stat_prototype: '48h',
    hero_stat_prototype_label: 'Prototipo listo',
    hero_stat_ai: '100%',
    hero_stat_ai_label: 'IA-powered',
    hero_stat_price: '0€',
    hero_stat_price_label: 'Para comezar',

    stats_projects: 'Proxectos entregados',
    stats_satisfaction: 'Clientes satisfeitos',
    stats_prototype: 'Prototipo listo',
    stats_faster: 'Máis rápido que axencias',

    process_title: 'Como',
    process_subtitle: 'Da idea ao produto en 4 pasos simples',
    process_step1_title: 'Describe a túa idea',
    process_step1_desc: 'Escribe ou fala. A nosa IA fai as preguntas correctas para entender o teu proxecto.',
    process_step2_title: 'Prototipo IA gratis',
    process_step2_desc: 'En menos de 48h recibes un prototipo funcional coa túa marca, navegable e con datos reais.',
    process_step3_title: 'Aproba e paga',
    process_step3_desc: 'Se che gusta, aproba o prototipo. Pagas 50% ao inicio e 50% á entrega.',
    process_step4_title: 'Construímolo',
    process_step4_desc: 'O noso equipo + IA desenvolven o teu proxecto real. Ti ves o progreso en tempo real.',

    cases_title: 'Proxectos que',
    cases_subtitle: 'Desde startups ata empresas establecidas, transformamos ideas en produtos reais',

    pricing_title: 'Prezos',
    pricing_subtitle: 'Paga 50% ao inicio, 50% cando esteas satisfeito. Sen sorpresas.',
    pricing_landing: 'Landing Page',
    pricing_landing_price: 'Desde 990€',
    pricing_landing_desc: 'Presenza online profesional con deseño premium.',
    pricing_mvp: 'MVP / App',
    pricing_mvp_price: 'Desde 2.990€',
    pricing_mvp_desc: 'O teu produto mínimo viable listo para validar con usuarios reais.',
    pricing_saas: 'Sistema / SaaS',
    pricing_saas_price: 'Desde 7.990€',
    pricing_saas_desc: 'Plataforma completa multi-tenant lista para escalar.',
    pricing_popular: 'Popular',
    pricing_cta: 'Comezar agora',
    pricing_features_landing: [
      'Deseño personalizado',
      'Responsive perfecto',
      'SEO optimizado',
      'Animacións premium',
      'Hosting 1 ano incluído',
      'Entrega en 5-7 días',
    ],
    pricing_features_mvp: [
      'Todo de Landing +',
      'Auth e base de datos',
      'Panel de administración',
      'Integracións (pagamentos, email...)',
      'IA integrada (se aplica)',
      'Entrega en 15-20 días',
    ],
    pricing_features_saas: [
      'Todo de MVP +',
      'Multi-tenant / multi-rol',
      'API completa',
      'Dashboard analytics',
      'Automatizacións IA',
      'Soporte 3 meses incluído',
    ],

    chat_title: 'Cóntanos a túa',
    chat_subtitle: 'Escribe o que queres construír. A nosa IA fará o resto.',
    chat_header: 'Kerno Studio IA',
    chat_empty_greeting: 'Ola, son o asistente de Kerno Studio.',
    chat_empty_instruction: 'Describe o teu proxecto e xeraremos un prototipo gratis.',
    chat_placeholder: 'Describe o teu proxecto... (ex: unha app para xestionar reservas)',
    chat_send: 'Enviar',

    building_title: 'Construíndo o teu prototipo',
    building_subtitle: 'O sistema que cambiará todo en',
    building_generating: 'Xerando pantallas...',
    building_tip_label: 'Sabías que...',
    building_upsell_title: 'Mellora o teu proxecto',
    building_upsell_subtitle: 'engade extras',
    building_addon_chips_label: 'Engade extras ao teu proxecto:',
    prototype_ready_title: 'O teu prototipo está listo',
    prototype_ready_subtitle: 'pantallas xeradas con IA',
    prototype_approve: 'Gústame, aprobar',
    prototype_change: 'Cambiar cousas',
    prototype_extras_title: 'Extras incluídos',
    prototype_new_total: 'Novo total do proxecto',

    footer_description: 'Transformamos ideas en produtos dixitais reais usando intelixencia artificial e un equipo experto de desenvolvemento.',
    footer_product: 'Produto',
    footer_legal: 'Legal',
    footer_privacy: 'Privacidade',
    footer_terms: 'Termos',
    footer_cookies: 'Cookies',
    footer_start: 'Comezar',
    footer_copyright: 'Todos os dereitos reservados.',
    footer_made_with: 'Feito con',
    footer_in_canarias: 'en Canarias',

    pres_title: "Presentacións premium con IA",
    pres_subtitle: "Describe a túa idea e xera unha presentación profesional en minutos",
    pres_chat_header: "Kerno Presentations — Describe a túa presentación",
    pres_chat_placeholder: "Describe a túa presentación...",
    pres_chat_empty_greeting: "Que presentación necesitas?",
    pres_chat_empty_instruction: "Pitch deck, traballo escolar, proposta comercial... describe a túa idea.",
    pres_generate_btn: "Xerar Presentación",
    pres_pay_btn: "Pagar e Descargar",
    pres_building_title: "Xerando a túa presentación...",
    pres_pitch: "Pitch Deck",
    pres_school: "Traballo Académico",
    pres_proposal: "Proposta Comercial",
  },
}
