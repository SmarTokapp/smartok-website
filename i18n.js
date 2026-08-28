/* ============================================
   SmarTok Website — i18n Localization System
   10 languages: en, es, fr, de, pt, it, ja, zh, ar, hi
   ============================================ */

var SmarTokI18n = (function () {
    'use strict';

    var SUPPORTED_LANGS = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'zh', 'ar', 'hi'];
    var STORAGE_KEY = 'smartok_website_lang';
    var RTL_LANGS = ['ar'];
    var currentLang = 'en';

    var translations = {
        en: {
            'nav.features': 'Features',
            'nav.showcase': 'Showcase',
            'nav.videos': 'Latest Content',
            'nav.about': 'About',
            'nav.getApp': 'Get the App',
            'nav.toggleNav': 'Toggle navigation',
            'hero.badge': 'AI-Powered Video Platform',
            'hero.titlePre': 'Create. Connect.',
            'hero.titleHighlight': 'Captivate.',
            'hero.subtitle': 'SmarTok is the next-generation short-form video platform built for creators. Powered by AI, designed for engagement, optimized for growth.',
            'hero.downloadBtn': 'Download on Google Play',
            'hero.exploreBtn': 'Explore Features',
            'features.title': 'Powerful Features',
            'features.description': 'Everything creators need to produce, share, and monetize content — all in one platform.',
            'features.ai.title': 'AI Content Intelligence',
            'features.ai.desc': 'Smart recommendations and content optimization powered by advanced machine learning algorithms.',
            'features.video.title': 'Seamless Video Creation',
            'features.video.desc': 'Built-in recording, editing, and effects tools designed for mobile-first content creation.',
            'features.monetization.title': 'Creator Monetization',
            'features.monetization.desc': 'Multiple revenue streams including subscriptions, gifts, and premium content tiers for creators.',
            'features.community.title': 'Community & Engagement',
            'features.community.desc': 'Real-time interactions, comments, and social features that keep your audience coming back.',
            'features.analytics.title': 'Advanced Analytics',
            'features.analytics.desc': 'Deep insights into performance, audience demographics, and engagement metrics.',
            'features.security.title': 'Secure & Private',
            'features.security.desc': 'Enterprise-grade security with user privacy at the core of everything we build.',
            'showcase.title': 'App Showcase',
            'showcase.description': 'Experience SmarTok through the eyes of our creators. Swipe through the gallery to see it in action.',
            'videos.title': 'Latest Content',
            'videos.description': 'Watch the latest videos and tutorials from the SmarTok community.',
            'videos.comingSoon': 'Videos coming soon.',
            'videos.loadError': 'Unable to load videos at this time.',
            'about.title': 'About SmarTok',
            'about.text1': 'SmarTok is redefining the short-form video landscape with AI-driven technology that empowers creators to produce remarkable content. Our platform combines cutting-edge machine learning with intuitive design to deliver an unparalleled experience for both creators and viewers.',
            'about.text2': "Based in Tampa, Florida, we're a team of engineers, designers, and visionaries committed to building the future of digital content creation.",
            'about.stats.creators': 'Active Creators',
            'about.stats.views': 'Monthly Views',
            'about.stats.uptime': 'Uptime',
            'footer.tagline': 'AI-Powered Video Platform for Creators',
            'footer.platform': 'Platform',
            'footer.features': 'Features',
            'footer.showcase': 'Showcase',
            'footer.videos': 'Latest Content',
            'footer.aboutUs': 'About Us',
            'footer.getApp': 'Get the App',
            'footer.googlePlay': 'Google Play Store',
            'footer.legal': 'Legal',
            'footer.privacy': 'Privacy Policy',
            'footer.copyright': '© 2026 SmarTok. All rights reserved.',
            'footer.address': 'Tampa, Florida, USA',
            'webapp.exit': 'Back to Website',
            'webapp.exitAria': 'Exit demo',
            'modal.closeVideo': 'Close video modal',
            'modal.closeImage': 'Close image modal',
            'modal.prevImage': 'Previous image',
            'modal.nextImage': 'Next image',
            'lang.selector': 'Language'
        },

        es: {
            'nav.features': 'Características',
            'nav.showcase': 'Galería',
            'nav.videos': 'Último Contenido',
            'nav.about': 'Acerca de',
            'nav.getApp': 'Obtén la App',
            'nav.toggleNav': 'Alternar navegación',
            'hero.badge': 'Plataforma de Video con IA',
            'hero.titlePre': 'Crea. Conecta.',
            'hero.titleHighlight': 'Fascina.',
            'hero.subtitle': 'SmarTok es la plataforma de video de formato corto de nueva generación creada para creadores. Impulsada por IA, diseñada para el compromiso, optimizada para el crecimiento.',
            'hero.downloadBtn': 'Descargar en Google Play',
            'hero.exploreBtn': 'Explorar Características',
            'features.title': 'Características Poderosas',
            'features.description': 'Todo lo que los creadores necesitan para producir, compartir y monetizar contenido — todo en una plataforma.',
            'features.ai.title': 'Inteligencia de Contenido con IA',
            'features.ai.desc': 'Recomendaciones inteligentes y optimización de contenido impulsadas por algoritmos avanzados de aprendizaje automático.',
            'features.video.title': 'Creación de Video Fluida',
            'features.video.desc': 'Herramientas integradas de grabación, edición y efectos diseñadas para la creación de contenido móvil.',
            'features.monetization.title': 'Monetización para Creadores',
            'features.monetization.desc': 'Múltiples fuentes de ingresos incluyendo suscripciones, regalos y niveles de contenido premium para creadores.',
            'features.community.title': 'Comunidad y Participación',
            'features.community.desc': 'Interacciones en tiempo real, comentarios y funciones sociales que mantienen a tu audiencia regresando.',
            'features.analytics.title': 'Análisis Avanzados',
            'features.analytics.desc': 'Información profunda sobre el rendimiento, demografía de la audiencia y métricas de engagement.',
            'features.security.title': 'Seguro y Privado',
            'features.security.desc': 'Seguridad de nivel empresarial con la privacidad del usuario en el centro de todo lo que construimos.',
            'showcase.title': 'Galería de la App',
            'showcase.description': 'Experimenta SmarTok a través de los ojos de nuestros creadores. Desliza por la galería para verla en acción.',
            'videos.title': 'Último Contenido',
            'videos.description': 'Mira los últimos videos y tutoriales de la comunidad SmarTok.',
            'videos.comingSoon': 'Próximamente videos.',
            'videos.loadError': 'No se pudieron cargar los videos en este momento.',
            'about.title': 'Acerca de SmarTok',
            'about.text1': 'SmarTok está redefiniendo el panorama de video de formato corto con tecnología impulsada por IA que capacita a los creadores para producir contenido remarkable. Nuestra plataforma combina aprendizaje automático de vanguardia con diseño intuitivo para ofrecer una experiencia incomparable tanto para creadores como para espectadores.',
            'about.text2': 'Con sede en Tampa, Florida, somos un equipo de ingenieros, diseñadores y visionarios comprometidos con construir el futuro de la creación de contenido digital.',
            'about.stats.creators': 'Creadores Activos',
            'about.stats.views': 'Vistas Mensuales',
            'about.stats.uptime': 'Tiempo de Actividad',
            'footer.tagline': 'Plataforma de Video con IA para Creadores',
            'footer.platform': 'Plataforma',
            'footer.features': 'Características',
            'footer.showcase': 'Galería',
            'footer.videos': 'Último Contenido',
            'footer.aboutUs': 'Acerca de Nosotros',
            'footer.getApp': 'Obtén la App',
            'footer.googlePlay': 'Google Play Store',
            'footer.legal': 'Legal',
            'footer.privacy': 'Política de Privacidad',
            'footer.copyright': '© 2026 SmarTok. Todos los derechos reservados.',
            'footer.address': 'Tampa, Florida, EE.UU.',
            'webapp.exit': 'Volver al Sitio Web',
            'webapp.exitAria': 'Salir de la demo',
            'modal.closeVideo': 'Cerrar modal de video',
            'modal.closeImage': 'Cerrar modal de imagen',
            'modal.prevImage': 'Imagen anterior',
            'modal.nextImage': 'Imagen siguiente',
            'lang.selector': 'Idioma'
        },

        fr: {
            'nav.features': 'Fonctionnalités',
            'nav.showcase': 'Vitrine',
            'nav.videos': 'Dernier Contenu',
            'nav.about': 'À Propos',
            'nav.getApp': "Obtenir l'App",
            'nav.toggleNav': 'Basculer la navigation',
            'hero.badge': 'Plateforme Vidéo Propulsée par l\'IA',
            'hero.titlePre': 'Créer. Connecter.',
            'hero.titleHighlight': 'Captiver.',
            'hero.subtitle': "SmarTok est la plateforme vidéo de format courte de nouvelle génération conçue pour les créateurs. Propulsée par l'IA, conçue pour l'engagement, optimisée pour la croissance.",
            'hero.downloadBtn': 'Télécharger sur Google Play',
            'hero.exploreBtn': 'Explorer les Fonctionnalités',
            'features.title': 'Fonctionnalités Puissantes',
            'features.description': "Tout ce dont les créateurs ont besoin pour produire, partager et monétiser du contenu — le tout sur une seule plateforme.",
            'features.ai.title': 'Intelligence de Contenu IA',
            'features.ai.desc': "Recommandations intelligentes et optimisation de contenu propulsées par des algorithmes avancés d'apprentissage automatique.",
            'features.video.title': 'Création Vidéo Fluide',
            'features.video.desc': "Outils intégrés d'enregistrement, de montage et d'effets conçus pour la création de contenu mobile.",
            'features.monetization.title': 'Monétisation pour Créateurs',
            'features.monetization.desc': "Multiple sources de revenus incluant abonnements, cadeaux et niveaux de contenu premium pour les créateurs.",
            'features.community.title': 'Communauté et Engagement',
            'features.community.desc': "Interactions en temps réel, commentaires et fonctionnalités sociales qui font revenir votre audience.",
            'features.analytics.title': 'Analytiques Avancées',
            'features.analytics.desc': "Analyses approfondies des performances, de la démographie de l'audience et des métriques d'engagement.",
            'features.security.title': 'Sécurisé et Privé',
            'features.security.desc': "Sécurité de niveau entreprise avec la confidentialité des utilisateurs au cœur de tout ce que nous construisons.",
            'showcase.title': 'Vitrine de l\'App',
            'showcase.description': "Découvrez SmarTok à travers les yeux de nos créateurs. Parcourez la galerie pour la voir en action.",
            'videos.title': 'Dernier Contenu',
            'videos.description': 'Regardez les dernières vidéos et tutoriels de la communauté SmarTok.',
            'videos.comingSoon': 'Vidéos bientôt disponibles.',
            'videos.loadError': 'Impossible de charger les vidéos pour le moment.',
            'about.title': 'À Propos de SmarTok',
            'about.text1': "SmarTok redéfinit le paysage des vidéos de format courte avec une technologie pilotée par l'IA qui permet aux créateurs de produire du contenu remarquable. Notre plateforme combine l'apprentissage automatique de pointe avec un design intuitif pour offrir une expérience inégalée aux créateurs et aux spectateurs.",
            'about.text2': "Basés à Tampa, en Floride, nous sommes une équipe d'ingénieurs, de designers et de visionnaires engagés à construire l'avenir de la création de contenu numérique.",
            'about.stats.creators': 'Créateurs Actifs',
            'about.stats.views': 'Vues Mensuelles',
            'about.stats.uptime': 'Disponibilité',
            'footer.tagline': 'Plateforme Vidéo IA pour Créateurs',
            'footer.platform': 'Plateforme',
            'footer.features': 'Fonctionnalités',
            'footer.showcase': 'Vitrine',
            'footer.videos': 'Dernier Contenu',
            'footer.aboutUs': 'À Propos de Nous',
            'footer.getApp': "Obtenir l'App",
            'footer.googlePlay': 'Google Play Store',
            'footer.legal': 'Mentions Légales',
            'footer.privacy': 'Politique de Confidentialité',
            'footer.copyright': '© 2026 SmarTok. Tous droits réservés.',
            'footer.address': 'Tampa, Floride, États-Unis',
            'webapp.exit': 'Retour au Site Web',
            'webapp.exitAria': 'Quitter la démo',
            'modal.closeVideo': 'Fermer le modal vidéo',
            'modal.closeImage': "Fermer le modal d'image",
            'modal.prevImage': 'Image précédente',
            'modal.nextImage': 'Image suivante',
            'lang.selector': 'Langue'
        },

        de: {
            'nav.features': 'Funktionen',
            'nav.showcase': 'Showcase',
            'nav.videos': 'Neueste Inhalte',
            'nav.about': 'Über uns',
            'nav.getApp': 'App holen',
            'nav.toggleNav': 'Navigation umschalten',
            'hero.badge': 'KI-gestützte Videoplattform',
            'hero.titlePre': 'Erstellen. Verbinden.',
            'hero.titleHighlight': 'Faszinieren.',
            'hero.subtitle': 'SmarTok ist die Videoplattform der nächsten Generation für Kurzvideos, entwickelt für Creator. KI-gestützt, auf Engagement ausgelegt, für Wachstum optimiert.',
            'hero.downloadBtn': 'Auf Google Play herunterladen',
            'hero.exploreBtn': 'Funktionen entdecken',
            'features.title': 'Leistungsstarke Funktionen',
            'features.description': 'Alles, was Creator benötigen, um Inhalte zu produzieren, zu teilen und zu monetarisieren — alles auf einer Plattform.',
            'features.ai.title': 'KI-Inhaltintelligenz',
            'features.ai.desc': 'Intelligente Empfehlungen und Inhaltsoptimierung, angetrieben durch fortschrittliche Machine-Learning-Algorithmen.',
            'features.video.title': 'Nahtlose Videoerstellung',
            'features.video.desc': 'Eingebaute Aufnahme-, Bearbeitungs- und Effektwerkzeuge für die mobile Content-Erstellung.',
            'features.monetization.title': 'Creator-Monetarisierung',
            'features.monetization.desc': 'Mehrere Einnahmequellen包括 Abonnements, Geschenke und Premium-Content-Stufen für Creator.',
            'features.community.title': 'Community & Engagement',
            'features.community.desc': 'Echtzeit-Interaktionen, Kommentare und soziale Funktionen, die Ihre Zielgruppe zurückkehren lassen.',
            'features.analytics.title': 'Erweiterte Analytik',
            'features.analytics.desc': 'Tiefe Einblicke in Leistung, Zielgruppen-Demografie und Engagement-Metriken.',
            'features.security.title': 'Sicher & Privat',
            'features.security.desc': 'Unternehmensgrade Sicherheit mit Benutzerprivatsphäre im Mittelpunkt alles dessen, was wir bauen.',
            'showcase.title': 'App-Showcase',
            'showcase.description': 'Erleben Sie SmarTok durch die Augen unserer Creator. Wischen Sie durch die Galerie, um sie in Aktion zu sehen.',
            'videos.title': 'Neueste Inhalte',
            'videos.description': 'Sehen Sie sich die neuesten Videos und Tutorials der SmarTok-Community an.',
            'videos.comingSoon': 'Videos folgen in Kürze.',
            'videos.loadError': 'Videos können derzeit nicht geladen werden.',
            'about.title': 'Über SmarTok',
            'about.text1': 'SmarTok definiert die Kurzvideo-Landschaft mit KI-gestützter Technologie neu, die Creator befähigt, bemerkenswerte Inhalte zu produzieren. Unsere Plattform kombiniert modernstes Machine Learning mit intuitivem Design für ein beispielloses Erlebnis für Creator und Zuschauer.',
            'about.text2': 'Mit Hauptsitz in Tampa, Florida, sind wir ein Team von Ingenieuren, Designern und Visionären, die der Zukunft der digitalen Content-Erstellung verpflichtet sind.',
            'about.stats.creators': 'Aktive Creator',
            'about.stats.views': 'Monatliche Aufrufe',
            'about.stats.uptime': 'Verfügbarkeit',
            'footer.tagline': 'KI-gestützte Videoplattform für Creator',
            'footer.platform': 'Plattform',
            'footer.features': 'Funktionen',
            'footer.showcase': 'Showcase',
            'footer.videos': 'Neueste Inhalte',
            'footer.aboutUs': 'Über uns',
            'footer.getApp': 'App holen',
            'footer.googlePlay': 'Google Play Store',
            'footer.legal': 'Rechtliches',
            'footer.privacy': 'Datenschutzrichtlinie',
            'footer.copyright': '© 2026 SmarTok. Alle Rechte vorbehalten.',
            'footer.address': 'Tampa, Florida, USA',
            'webapp.exit': 'Zurück zur Website',
            'webapp.exitAria': 'Demo beenden',
            'modal.closeVideo': 'Video-Modal schließen',
            'modal.closeImage': 'Bild-Modal schließen',
            'modal.prevImage': 'Vorheriges Bild',
            'modal.nextImage': 'Nächstes Bild',
            'lang.selector': 'Sprache'
        },

        pt: {
            'nav.features': 'Recursos',
            'nav.showcase': 'Vitrine',
            'nav.videos': 'Conteúdo Recente',
            'nav.about': 'Sobre',
            'nav.getApp': 'Baixar App',
            'nav.toggleNav': 'Alternar navegação',
            'hero.badge': 'Plataforma de Vídeo com IA',
            'hero.titlePre': 'Crie. Conecte.',
            'hero.titleHighlight': 'Cative.',
            'hero.subtitle': 'SmarTok é a plataforma de vídeo de formato curto de nova geração criada para criadores. Impulsionada por IA, projetada para engajamento, otimizada para crescimento.',
            'hero.downloadBtn': 'Baixar no Google Play',
            'hero.exploreBtn': 'Explorar Recursos',
            'features.title': 'Recursos Poderosos',
            'features.description': 'Tudo o que os criadores precisam para produzir, compartilhar e monetizar conteúdo — tudo em uma plataforma.',
            'features.ai.title': 'Inteligência de Conteúdo com IA',
            'features.ai.desc': 'Recomendações inteligentes e otimização de conteúdo impulsionadas por algoritmos avançados de aprendizado de máquina.',
            'features.video.title': 'Criação de Vídeo Perfeita',
            'features.video.desc': 'Ferramentas integradas de gravação, edição e efeitos projetadas para criação de conteúdo móvel.',
            'features.monetization.title': 'Monetização para Criadores',
            'features.monetization.desc': 'Múltiplas fontes de receita incluindo assinaturas, presentes e níveis de conteúdo premium para criadores.',
            'features.community.title': 'Comunidade e Engajamento',
            'features.community.desc': 'Interações em tempo real, comentários e recursos sociais que fazem seu público voltar.',
            'features.analytics.title': 'Análises Avançadas',
            'features.analytics.desc': 'Informações profundas sobre desempenho, demografia de público e métricas de engajamento.',
            'features.security.title': 'Seguro e Privado',
            'features.security.desc': 'Segurança de nível empresarial com a privacidade do usuário no centro de tudo o que construímos.',
            'showcase.title': 'Vitrine do App',
            'showcase.description': 'Experimente o SmarTok pelos olhos de nossos criadores. Deslize pela galeria para vê-lo em ação.',
            'videos.title': 'Conteúdo Recente',
            'videos.description': 'Assista aos vídeos e tutoriais mais recentes da comunidade SmarTok.',
            'videos.comingSoon': 'Vídeos em breve.',
            'videos.loadError': 'Não foi possível carregar os vídeos no momento.',
            'about.title': 'Sobre o SmarTok',
            'about.text1': 'SmarTok está redefinindo o cenário de vídeo de formato curto com tecnologia impulsionada por IA que capacita criadores a produzir conteúdo notável. Nossa plataforma combina aprendizado de máquina de ponta com design intuitivo para oferecer uma experiência incomparável para criadores e espectadores.',
            'about.text2': 'Sediados em Tampa, Flórida, somos uma equipe de engenheiros, designers e visionários comprometidos em construir o futuro da criação de conteúdo digital.',
            'about.stats.creators': 'Criadores Ativos',
            'about.stats.views': 'Visualizações Mensais',
            'about.stats.uptime': 'Disponibilidade',
            'footer.tagline': 'Plataforma de Vídeo com IA para Criadores',
            'footer.platform': 'Plataforma',
            'footer.features': 'Recursos',
            'footer.showcase': 'Vitrine',
            'footer.videos': 'Conteúdo Recente',
            'footer.aboutUs': 'Sobre Nós',
            'footer.getApp': 'Baixar App',
            'footer.googlePlay': 'Google Play Store',
            'footer.legal': 'Legal',
            'footer.privacy': 'Política de Privacidade',
            'footer.copyright': '© 2026 SmarTok. Todos os direitos reservados.',
            'footer.address': 'Tampa, Flórida, EUA',
            'webapp.exit': 'Voltar ao Site',
            'webapp.exitAria': 'Sair da demonstração',
            'modal.closeVideo': 'Fechar modal de vídeo',
            'modal.closeImage': 'Fechar modal de imagem',
            'modal.prevImage': 'Imagem anterior',
            'modal.nextImage': 'Próxima imagem',
            'lang.selector': 'Idioma'
        },

        it: {
            'nav.features': 'Funzionalità',
            'nav.showcase': 'Showcase',
            'nav.videos': 'Ultimi Contenuti',
            'nav.about': 'Informazioni',
            'nav.getApp': "Ottieni l'App",
            'nav.toggleNav': 'Attiva/disattiva navigazione',
            'hero.badge': 'Piattaforma Video Potenziata dall\'IA',
            'hero.titlePre': 'Crea. Connetti.',
            'hero.titleHighlight': 'Affascina.',
            'hero.subtitle': "SmarTok è la piattaforma video di formato corto di nuova generazione creata per i creator. Potenziata dall'IA, progettata per l'engagement, ottimizzata per la crescita.",
            'hero.downloadBtn': 'Scarica su Google Play',
            'hero.exploreBtn': 'Esplora Funzionalità',
            'features.title': 'Funzionalità Potenti',
            'features.description': "Tutto ciò di cui i creator hanno bisogno per produrre, condividere e monetizzare contenuti — tutto in un'unica piattaforma.",
            'features.ai.title': 'Intelligenza dei Contenuti IA',
            'features.ai.desc': 'Raccomendazioni intelligenti e ottimizzazione dei contenuti potenziata da algoritmi avanzati di machine learning.',
            'features.video.title': 'Creazione Video Fluida',
            'features.video.desc': 'Strumenti integrati di registrazione, modifica ed effetti progettati per la creazione di contenuti mobile.',
            'features.monetization.title': 'Monetizzazione per Creator',
            'features.monetization.desc': 'Molteplici fonti di reddito tra cui abbonamenti, regali e livelli di contenuti premium per i creator.',
            'features.community.title': 'Community e Engagement',
            'features.community.desc': 'Interazioni in tempo reale, commenti e funzioni social che fanno tornare il tuo pubblico.',
            'features.analytics.title': 'Analisi Avanzate',
            'features.analytics.desc': 'Approfondimenti dettagliati su prestazioni, demografia del pubblico e metriche di engagement.',
            'features.security.title': 'Sicuro e Privato',
            'features.security.desc': 'Sicurezza di livello aziendale con la privacy dell\'utente al centro di tutto ciò che costruiamo.',
            'showcase.title': "Showcase dell'App",
            'showcase.description': 'Sperimenta SmarTok attraverso gli occhi dei nostri creator. Scorri la galleria per vederla in azione.',
            'videos.title': 'Ultimi Contenuti',
            'videos.description': 'Guarda i video e i tutorial più recenti della community SmarTok.',
            'videos.comingSoon': 'Video in arrivo.',
            'videos.loadError': 'Impossibile caricare i video al momento.',
            'about.title': 'Informazioni su SmarTok',
            'about.text1': "SmarTok sta ridefinendo il panorama dei video di formato corto con tecnologia guidata dall'IA che permette ai creator di produrre contenuti notevoli. La nostra piattaforma combina machine learning all'avanguardia con design intuitivo per offrire un'esperienza impareggiabile sia per creator che per spettatori.",
            'about.text2': "Con sede a Tampa, in Florida, siamo un team di ingegneri, designer e visionari impegnati a costruire il futuro della creazione di contenuti digitali.",
            'about.stats.creators': 'Creator Attivi',
            'about.stats.views': 'Visualizzazioni Mensili',
            'about.stats.uptime': 'Disponibilità',
            'footer.tagline': 'Piattaforma Video IA per Creator',
            'footer.platform': 'Piattaforma',
            'footer.features': 'Funzionalità',
            'footer.showcase': 'Showcase',
            'footer.videos': 'Ultimi Contenuti',
            'footer.aboutUs': 'Su di Noi',
            'footer.getApp': "Ottieni l'App",
            'footer.googlePlay': 'Google Play Store',
            'footer.legal': 'Legale',
            'footer.privacy': 'Informativa sulla Privacy',
            'footer.copyright': '© 2026 SmarTok. Tutti i diritti riservati.',
            'footer.address': 'Tampa, Florida, USA',
            'webapp.exit': 'Torna al Sito Web',
            'webapp.exitAria': 'Esci dalla demo',
            'modal.closeVideo': 'Chiudi modal video',
            'modal.closeImage': 'Chiudi modal immagine',
            'modal.prevImage': 'Immagine precedente',
            'modal.nextImage': 'Immagine successiva',
            'lang.selector': 'Lingua'
        },

        ja: {
            'nav.features': '機能',
            'nav.showcase': 'ショーケース',
            'nav.videos': '最新コンテンツ',
            'nav.about': '概要',
            'nav.getApp': 'アプリを入手',
            'nav.toggleNav': 'ナビゲーションを切り替え',
            'hero.badge': 'AI搭載動画プラットフォーム',
            'hero.titlePre': '作成。つながる。',
            'hero.titleHighlight': '魅了する。',
            'hero.subtitle': 'SmarTokはクリエイターのための次世代ショート動画プラットフォームです。AI駆動、エンゲージメント重視、成長最適化。',
            'hero.downloadBtn': 'Google Playでダウンロード',
            'hero.exploreBtn': '機能を探索',
            'features.title': '強力な機能',
            'features.description': 'クリエイターがコンテンツを制作、共有、収益化するために必要なすべて — 1つのプラットフォームで。',
            'features.ai.title': 'AIコンテンツインテリジェンス',
            'features.ai.desc': '高度な機械学習アルゴリズムによるスマートなレコメンデーションとコンテンツ最適化。',
            'features.video.title': 'シームレスな動画制作',
            'features.video.desc': 'モバイルファーストのコンテンツ制作のための録画、編集、エフェクトツールを内蔵。',
            'features.monetization.title': 'クリエイター収益化',
            'features.monetization.desc': 'サブスクリプション、ギフト、プレミアムコンテンツ階層など、クリエイター向けの複数の収益源。',
            'features.community.title': 'コミュニティとエンゲージメント',
            'features.community.desc': 'リアルタイムのやり取り、コメント、視聴者を惹きつけるソーシャル機能。',
            'features.analytics.title': '高度な分析',
            'features.analytics.desc': 'パフォーマンス、視聴者層、エンゲージメント指標の詳細な洞察。',
            'features.security.title': '安全でプライベート',
            'features.security.desc': 'ユーザープライバシーを中心に据えたエンタープライズグレードのセキュリティ。',
            'showcase.title': 'アプリショーケース',
            'showcase.description': 'クリエイターの目を通してSmarTokを体験。ギャラリーをスワイプして実際の動作を確認。',
            'videos.title': '最新コンテンツ',
            'videos.description': 'SmarTokコミュニティの最新動画とチュートリアルをご覧ください。',
            'videos.comingSoon': '動画は近日公開。',
            'videos.loadError': '現在動画を読み込めません。',
            'about.title': 'SmarTokについて',
            'about.text1': 'SmarTokは、クリエイターが素晴らしいコンテンツを制作できるよう支援するAI駆動技術で、ショート動画の風景を再定義しています。最先端の機械学習と直感的なデザインを組み合わせ、クリエイターと視聴者の両方に比類のない体験を提供します。',
            'about.text2': 'フロリダ州タンパを拠点とする私たちは、デジタルコンテンツ制作の未来を構築することに尽力するエンジニア、デザイナー、ビジョナリーのチームです。',
            'about.stats.creators': 'アクティブクリエイター',
            'about.stats.views': '月間視聴回数',
            'about.stats.uptime': '稼働率',
            'footer.tagline': 'クリエイターのためのAI搭載動画プラットフォーム',
            'footer.platform': 'プラットフォーム',
            'footer.features': '機能',
            'footer.showcase': 'ショーケース',
            'footer.videos': '最新コンテンツ',
            'footer.aboutUs': '私たちについて',
            'footer.getApp': 'アプリを入手',
            'footer.googlePlay': 'Google Playストア',
            'footer.legal': '法的情報',
            'footer.privacy': 'プライバシーポリシー',
            'footer.copyright': '© 2026 SmarTok. All rights reserved.',
            'footer.address': 'フロリダ州タンパ、米国',
            'webapp.exit': 'ウェブサイトに戻る',
            'webapp.exitAria': 'デモを終了',
            'modal.closeVideo': '動画モーダルを閉じる',
            'modal.closeImage': '画像モーダルを閉じる',
            'modal.prevImage': '前の画像',
            'modal.nextImage': '次の画像',
            'lang.selector': '言語'
        },

        zh: {
            'nav.features': '功能',
            'nav.showcase': '展示',
            'nav.videos': '最新内容',
            'nav.about': '关于',
            'nav.getApp': '获取应用',
            'nav.toggleNav': '切换导航',
            'hero.badge': 'AI驱动的视频平台',
            'hero.titlePre': '创作。连接。',
            'hero.titleHighlight': '引人入胜。',
            'hero.subtitle': 'SmarTok是为创作者打造的下一代短视频平台。由AI驱动，为互动设计，为增长优化。',
            'hero.downloadBtn': '在Google Play下载',
            'hero.exploreBtn': '探索功能',
            'features.title': '强大功能',
            'features.description': '创作者制作、分享和变现内容所需的一切 — 尽在一个平台。',
            'features.ai.title': 'AI内容智能',
            'features.ai.desc': '由先进的机器学习算法驱动的智能推荐和内容优化。',
            'features.video.title': '无缝视频创作',
            'features.video.desc': '内置录制、编辑和特效工具，专为移动优先的内容创作设计。',
            'features.monetization.title': '创作者变现',
            'features.monetization.desc': '多种收入来源，包括订阅、礼物和高级内容等级。',
            'features.community.title': '社区与互动',
            'features.community.desc': '实时互动、评论和社交功能，让您的受众不断回访。',
            'features.analytics.title': '高级分析',
            'features.analytics.desc': '深入了解性能、受众画像和互动指标。',
            'features.security.title': '安全与隐私',
            'features.security.desc': '企业级安全，以用户隐私为我们构建一切的核心。',
            'showcase.title': '应用展示',
            'showcase.description': '通过创作者的视角体验SmarTok。滑动图库查看实际效果。',
            'videos.title': '最新内容',
            'videos.description': '观看SmarTok社区的最新视频和教程。',
            'videos.comingSoon': '视频即将推出。',
            'videos.loadError': '目前无法加载视频。',
            'about.title': '关于SmarTok',
            'about.text1': 'SmarTok正在以AI驱动技术重新定义短视频领域，赋能创作者制作卓越内容。我们的平台将前沿的机器学习与直观设计相结合，为创作者和观众提供无与伦比的体验。',
            'about.text2': '总部位于佛罗里达州坦帕，我们是一支由工程师、设计师和有远见者组成的团队，致力于构建数字内容创作的未来。',
            'about.stats.creators': '活跃创作者',
            'about.stats.views': '月浏览量',
            'about.stats.uptime': '正常运行时间',
            'footer.tagline': '面向创作者的AI驱动视频平台',
            'footer.platform': '平台',
            'footer.features': '功能',
            'footer.showcase': '展示',
            'footer.videos': '最新内容',
            'footer.aboutUs': '关于我们',
            'footer.getApp': '获取应用',
            'footer.googlePlay': 'Google Play商店',
            'footer.legal': '法律',
            'footer.privacy': '隐私政策',
            'footer.copyright': '© 2026 SmarTok. 保留所有权利。',
            'footer.address': '美国佛罗里达州坦帕',
            'webapp.exit': '返回网站',
            'webapp.exitAria': '退出演示',
            'modal.closeVideo': '关闭视频弹窗',
            'modal.closeImage': '关闭图片弹窗',
            'modal.prevImage': '上一张图片',
            'modal.nextImage': '下一张图片',
            'lang.selector': '语言'
        },

        ar: {
            'nav.features': 'الميزات',
            'nav.showcase': 'معرض',
            'nav.videos': 'أحدث المحتوى',
            'nav.about': 'حول',
            'nav.getApp': 'احصل على التطبيق',
            'nav.toggleNav': 'تبديل التنقل',
            'hero.badge': 'منصة فيديو مدعومة بالذكاء الاصطناعي',
            'hero.titlePre': 'أنشئ. تواصل.',
            'hero.titleHighlight': 'أسر.',
            'hero.subtitle': 'SmarTok هي منصة الفيديو القصير من الجيل التالي المصممة للمبدعين. مدعومة بالذكاء الاصطناعي، مصممة للتفاعل، محسّنة للنمو.',
            'hero.downloadBtn': 'تحميل من Google Play',
            'hero.exploreBtn': 'استكشف الميزات',
            'features.title': 'ميزات قوية',
            'features.description': 'كل ما يحتاجه المبدعون لإنتاج ومشاركة وتحقيق الدخل من المحتوى — كل ذلك في منصة واحدة.',
            'features.ai.title': 'ذكاء المحتوى بالذكاء الاصطناعي',
            'features.ai.desc': 'توصيات ذكية وتحسين المحتوى مدعومة بخوارزميات تعلم الآلة المتقدمة.',
            'features.video.title': 'إنشاء فيديو سلس',
            'features.video.desc': 'أدوات مدمجة للتسجيل والتحرير والمؤثرات مصممة لإنشاء محتوى على الأجهزة المحمولة.',
            'features.monetization.title': 'تحقيق الدخل للمبدعين',
            'features.monetization.desc': 'مصادر دخل متعددة تشمل الاشتراكات والهدايات ومستويات المحتوى المتميز للمبدعين.',
            'features.community.title': 'المجتمع والتفاعل',
            'features.community.desc': 'تفاعلات في الوقت الفعلي وتعليقات وميزات اجتماعية تجعل جمهورك يعود.',
            'features.analytics.title': 'تحليلات متقدمة',
            'features.analytics.desc': 'رؤى عميقة حول الأداء والديموغرافيا للجمهور ومقاييس التفاعل.',
            'features.security.title': 'آمن وخاص',
            'features.security.desc': 'أمان بمستوى المؤسسات مع خصوصية المستخدم في صميم كل ما نبنيه.',
            'showcase.title': 'معرض التطبيق',
            'showcase.description': 'اختبر SmarTok من خلال أعين مبدعينا. تصفح المعرض لرؤيته أثناء العمل.',
            'videos.title': 'أحدث المحتوى',
            'videos.description': 'شاهد أحدث الفيديوهات والدروس من مجتمع SmarTok.',
            'videos.comingSoon': 'فيديوهات قريباً.',
            'videos.loadError': 'تعذر تحميل الفيديوهات في الوقت الحالي.',
            'about.title': 'حول SmarTok',
            'about.text1': 'تقوم SmarTok بإعادة تعريف مشهد الفيديو القصير بتقنية مدعومة بالذكاء الاصطناعي تمكن المبدعين من إنتاج محتوى رائع. تجمع منصتنا بين تعلم الآلة المتطور والتصميم البديهي لتقديم تجربة لا مثيل لها للمبدعين والمشاهدين.',
            'about.text2': 'مقرنا في تامبا، فلوريدا، نحن فريق من المهندسين والمصممين والرؤى الملتزمين ببناء مستقبل إنشاء المحتوى الرقمي.',
            'about.stats.creators': 'مبدعون نشطون',
            'about.stats.views': 'مشاهدات شهرية',
            'about.stats.uptime': 'وقت التشغيل',
            'footer.tagline': 'منصة فيديو مدعومة بالذكاء الاصطناعي للمبدعين',
            'footer.platform': 'المنصة',
            'footer.features': 'الميزات',
            'footer.showcase': 'المعرض',
            'footer.videos': 'أحدث المحتوى',
            'footer.aboutUs': 'من نحن',
            'footer.getApp': 'احصل على التطبيق',
            'footer.googlePlay': 'متجر Google Play',
            'footer.legal': 'قانوني',
            'footer.privacy': 'سياسة الخصوصية',
            'footer.copyright': '© 2026 SmarTok. جميع الحقوق محفوظة.',
            'footer.address': 'تامبا، فلوريدا، الولايات المتحدة',
            'webapp.exit': 'العودة إلى الموقع',
            'webapp.exitAria': 'إنهاء العرض التجريبي',
            'modal.closeVideo': 'إغلاق نافذة الفيديو',
            'modal.closeImage': 'إغلاق نافذة الصورة',
            'modal.prevImage': 'الصورة السابقة',
            'modal.nextImage': 'الصورة التالية',
            'lang.selector': 'اللغة'
        },

        hi: {
            'nav.features': 'विशेषताएँ',
            'nav.showcase': 'शोकेस',
            'nav.videos': 'नवीनतम सामग्री',
            'nav.about': 'परिचय',
            'nav.getApp': 'ऐप प्राप्त करें',
            'nav.toggleNav': 'नेविगेशन टॉगल करें',
            'hero.badge': 'AI-संचालित वीडियो प्लेटफ़ॉर्म',
            'hero.titlePre': 'बनाएं। जुड़ें।',
            'hero.titleHighlight': 'मंत्रमुग्ध करें।',
            'hero.subtitle': 'SmarTok रचनाकारों के लिए बनी अगली पीढ़ी का शॉर्ट-फॉर्म वीडियो प्लेटफ़ॉर्म है। AI द्वारा संचालित, जुड़ाव के लिए डिज़ाइन किया गया, विकास के लिए अनुकूलित।',
            'hero.downloadBtn': 'Google Play पर डाउनलोड करें',
            'hero.exploreBtn': 'विशेषताएँ देखें',
            'features.title': 'शक्तिशाली विशेषताएँ',
            'features.description': 'रचनाकारों को सामग्री बनाने, साझा करने और राजस्व कमाने के लिए जो कुछ भी चाहिए — वह सब एक ही प्लेटफ़ॉर्म पर।',
            'features.ai.title': 'AI सामग्री बुद्धिमत्ता',
            'features.ai.desc': 'उन्नत मशीन लर्निंग एल्गोरिदम द्वारा संचालित स्मार्ट सुझाव और सामग्री अनुकूलन।',
            'features.video.title': 'निर्बाध वीडियो निर्माण',
            'features.video.desc': 'मोबाइल-फर्स्ट सामग्री निर्माण के लिए डिज़ाइन किए गए अंतर्निहित रिकॉर्डिंग, संपादन और प्रभाव उपकरण।',
            'features.monetization.title': 'रचनाकार राजस्व',
            'features.monetization.desc': 'सदस्यता, उपहार और प्रीमियम सामग्री स्तर सहित रचनाकारों के लिए कई राजस्व स्रोत।',
            'features.community.title': 'समुदाय और जुड़ाव',
            'features.community.desc': 'रीयल-टाइम इंटरैक्शन, टिप्पणियाँ और सामाजिक विशेषताएँ जो आपके दर्शकों को वापस लाती हैं।',
            'features.analytics.title': 'उन्नत विश्लेषण',
            'features.analytics.desc': 'प्रदर्शन, दर्शक जनसांख्यिकी और जुड़ाव मेट्रिक्स की गहरी जानकारी।',
            'features.security.title': 'सुरक्षित और निजी',
            'features.security.desc': 'उपयोगकर्ता गोपनीयता को हम जो कुछ भी बनाते हैं उसके केंद्र में रखते हुए एंटरप्राइज़-ग्रेड सुरक्षा।',
            'showcase.title': 'ऐप शोकेस',
            'showcase.description': 'हमारे रचनाकारों की आँखों से SmarTok का अनुभव करें। गैलरी के माध्यम से स्वाइप करें और इसे क्रिया में देखें।',
            'videos.title': 'नवीनतम सामग्री',
            'videos.description': 'SmarTok समुदाय के नवीनतम वीडियो और ट्यूटोरियल देखें।',
            'videos.comingSoon': 'वीडियो जल्द आ रहे हैं।',
            'videos.loadError': 'इस समय वीडियो लोड करने में असमर्थ।',
            'about.title': 'SmarTok के बारे में',
            'about.text1': 'SmarTok AI-संचालित तकनीक के साथ शॉर्ट-फॉर्म वीडियो परिदृश्य को पुनर्परिभाषित कर रहा है जो रचनाकारों को उत्कृष्ट सामग्री बनाने में सक्षम बनाता है। हमारा प्लेटफ़ॉर्म अत्याधुनिक मशीन लर्निंग को सहज डिज़ाइन के साथ जोड़ता है ताकि रचनाकारों और दर्शकों दोनों के लिए एक अद्वितीय अनुभव प्रदान किया जा सके।',
            'about.text2': 'ताम्पा, फ्लोरिडा में स्थित, हम इंजीनियरों, डिज़ाइनरों और दूरदर्शियों की एक टीम हैं जो डिजिटल सामग्री निर्माण का भविष्य बनाने के लिए प्रतिबद्ध हैं।',
            'about.stats.creators': 'सक्रिय रचनाकार',
            'about.stats.views': 'मासिक दृश्य',
            'about.stats.uptime': 'अपटाइम',
            'footer.tagline': 'रचनाकारों के लिए AI-संचालित वीडियो प्लेटफ़ॉर्म',
            'footer.platform': 'प्लेटफ़ॉर्म',
            'footer.features': 'विशेषताएँ',
            'footer.showcase': 'शोकेस',
            'footer.videos': 'नवीनतम सामग्री',
            'footer.aboutUs': 'हमारे बारे में',
            'footer.getApp': 'ऐप प्राप्त करें',
            'footer.googlePlay': 'Google Play स्टोर',
            'footer.legal': 'कानूनी',
            'footer.privacy': 'गोपनीयता नीति',
            'footer.copyright': '© 2026 SmarTok. सर्वाधिकार सुरक्षित।',
            'footer.address': 'ताम्पा, फ्लोरिडा, संयुक्त राज्य अमेरिका',
            'webapp.exit': 'वेबसाइट पर वापस',
            'webapp.exitAria': 'डेमो से बाहर निकलें',
            'modal.closeVideo': 'वीडियो मॉडल बंद करें',
            'modal.closeImage': 'छवि मॉडल बंद करें',
            'modal.prevImage': 'पिछली छवि',
            'modal.nextImage': 'अगली छवि',
            'lang.selector': 'भाषा'
        }
    };

    var langNames = {
        en: 'English',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch',
        pt: 'Português',
        it: 'Italiano',
        ja: '日本語',
        zh: '中文',
        ar: 'العربية',
        hi: 'हिन्दी'
    };

    var langFlags = {
        en: '🇬🇧',
        es: '🇪🇸',
        fr: '🇫🇷',
        de: '🇩🇪',
        pt: '🇧🇷',
        it: '🇮🇹',
        ja: '🇯🇵',
        zh: '🇨🇳',
        ar: '🇸🇦',
        hi: '🇮🇳'
    };

    function detectLanguage() {
        var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        var primary = browserLang.split('-')[0];
        if (SUPPORTED_LANGS.indexOf(primary) !== -1) return primary;
        return 'en';
    }

    function getStoredLang() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function storeLang(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
    }

    function isRTL(lang) {
        return RTL_LANGS.indexOf(lang) !== -1;
    }

    function applyTranslations(lang) {
        var dict = translations[lang] || translations['en'];
        var fallback = translations['en'];

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var text = dict[key] || fallback[key] || key;
            el.textContent = text;
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            var text = dict[key] || fallback[key] || key;
            el.setAttribute('placeholder', text);
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-aria');
            var text = dict[key] || fallback[key] || key;
            el.setAttribute('aria-label', text);
        });

        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            var text = dict[key] || fallback[key] || key;
            el.innerHTML = text;
        });

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', isRTL(lang) ? 'rtl' : 'ltr');
    }

    function setLanguage(lang) {
        if (SUPPORTED_LANGS.indexOf(lang) === -1) lang = 'en';
        currentLang = lang;
        storeLang(lang);
        applyTranslations(lang);
        updateSelectorActive(lang);
        document.dispatchEvent(new CustomEvent('smartok:languagechange', { detail: { lang: lang } }));
    }

    function getCurrentLang() {
        return currentLang;
    }

    function t(key) {
        var dict = translations[currentLang] || translations['en'];
        return dict[key] || translations['en'][key] || key;
    }

    function buildSelector() {
        var selector = document.getElementById('lang-selector');
        if (!selector) return;

        var dropdown = selector.querySelector('.lang-dropdown');
        if (!dropdown) return;

        dropdown.innerHTML = '';
        SUPPORTED_LANGS.forEach(function (code) {
            var item = document.createElement('button');
            item.className = 'lang-option';
            item.setAttribute('data-lang', code);
            item.innerHTML = '<span class="lang-flag">' + langFlags[code] + '</span><span class="lang-name">' + langNames[code] + '</span>';
            item.addEventListener('click', function () {
                setLanguage(code);
                selector.classList.remove('open');
            });
            dropdown.appendChild(item);
        });

        var trigger = selector.querySelector('.lang-trigger');
        if (trigger) {
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                selector.classList.toggle('open');
            });
        }

        document.addEventListener('click', function (e) {
            if (!selector.contains(e.target)) {
                selector.classList.remove('open');
            }
        });
    }

    function updateSelectorActive(lang) {
        var selector = document.getElementById('lang-selector');
        if (!selector) return;

        var trigger = selector.querySelector('.lang-trigger');
        if (trigger) {
            trigger.innerHTML = '<span class="lang-flag">' + langFlags[lang] + '</span><span class="lang-current">' + langNames[lang] + '</span>';
        }

        selector.querySelectorAll('.lang-option').forEach(function (opt) {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    function init() {
        var stored = getStoredLang();
        currentLang = stored && SUPPORTED_LANGS.indexOf(stored) !== -1 ? stored : detectLanguage();
        buildSelector();
        applyTranslations(currentLang);
        updateSelectorActive(currentLang);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        init: init,
        setLanguage: setLanguage,
        getCurrentLang: getCurrentLang,
        t: t,
        supportedLangs: SUPPORTED_LANGS
    };
})();
