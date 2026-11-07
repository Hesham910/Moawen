export type Locale = "ar" | "en";

export interface Dictionary {
  nav: {
    home: string;
    howItWorks: string;
    forClients: string;
    forFreelancers: string;
    faq: string;
    contact: string;
    downloadApp: string;
    langToggle: string;
    themeToLight: string;
    themeToDark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    scrollHint: string;
  };
  audience: {
    sectionTitle: string;
    clientTab: string;
    freelancerTab: string;
    client: {
      badge: string;
      question: string;
      description: string;
      cta: string;
    };
    freelancer: {
      badge: string;
      question: string;
      description: string;
      cta: string;
    };
  };
  twoWays: {
    title: string;
    subtitle: string;
    track1Badge: string;
    track1Title: string;
    track1Lead: string;
    track1Steps: Array<{ num: string; title: string; desc: string }>;
    track2Badge: string;
    track2Title: string;
    track2Lead: string;
    track2Steps: Array<{ num: string; title: string; desc: string }>;
  };
  categories: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      label: string;
      title: string;
      description: string;
    }>;
  };
  whyMoawen: {
    title: string;
    subtitle: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    privacyBtn: string;
    termsBtn: string;
  };
  productExperience: {
    title: string;
    pillars: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    summary: string;
    exploreCta: string;
  };
  freelancer: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    microNote: string;
    roles: string[];
  };
  faq: {
    title: string;
    desc: string;
    leadQuestion: string;
    leadAnswer: string;
    items: Array<{
      num: string;
      question: string;
      answer: string;
    }>;
  };
  finalCta: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailCtaLabel: string;
    officialEmail: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    privacyNote: string;
    successTitle: string;
    successBody: string;
    successShort: string;
    errorMsg: string;
    invalidMsg: string;
    sendAnother: string;
  };
  categoryModal: {
    badge: string;
    title: string;
    description: string;
    closeBtn: string;
  };
  footer: {
    brandName: string;
    tagline: string;
    exploreTitle: string;
    helpTitle: string;
    downloadTitle: string;
    followTitle: string;
    contactEmailTitle: string;
    copyright: string;
  };
  comingSoonModal: {
    badge: string;
    title: string;
    description: string;
    customersAppLabel: string;
    providersAppLabel: string;
    storeHint: string;
    closeBtn: string;
  };
  a11y: {
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    previousScreen: string;
    nextScreen: string;
    screenNumber: string;
    carouselLabel: string;
  };
}

export const DICTIONARY: Record<Locale, Dictionary> = {
  ar: {
    nav: {
      home: "الرئيسية",
      howItWorks: "كيف يعمل معاون",
      forClients: "للعملاء",
      forFreelancers: "لمقدمي الخدمات",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
      downloadApp: "حمّل التطبيق",
      langToggle: "EN",
      themeToLight: "تفعيل الوضع النهاري",
      themeToDark: "تفعيل الوضع الليلي",
    },
    hero: {
      eyebrow: "منصة الخدمات المهنية والمشاريع المستقلة",
      title: "اختر من يعاونك !",
      subtitle:
        "في معاون، قرّبنا لك مختصين من مختلف أنحاء العالم العربي، بمهارات وخبرات متنوعة تقدر تتعاون معهم لإنجاز اللي تحتاجه بثقة ومرونة.",
      scrollHint: "مرّر للأسفل لاستكشاف تجربة معاون",
    },
    audience: {
      sectionTitle: "أيًا كان ما تبحث عنه، معاون لديه ما يناسبك",
      clientTab: "أريد إنجاز شيء",
      freelancerTab: "أريد تقديم خدماتي",
      client: {
        badge: "مسار العملاء وأصحاب المشاريع",
        question: "لديك مهمة أو مشروع وتبحث عن شخص ينفذه؟",
        description:
          "ابحث عن الخدمة التي تحتاجها، أو اكتب طلبك واستقبل عروض الخبراء لإتمام عملك.",
        cta: "ابدأ كعميل",
      },
      freelancer: {
        badge: "مسار المختصين ومقدمي الخدمات",
        question: "لديك مهارة تستطيع تقديمها للآخرين؟",
        description:
          "اعرض خدماتك، وقدّم عروضك على الطلبات التي تناسب خبرتك.",
        cta: "انضم كمقدم خدمة",
      },
    },
    twoWays: {
      title: "ابدأ بالطريقة التي تناسب طلبك.",
      subtitle:
        "سواء كنت تعرف الخدمة التي تحتاجها، أو لديك هدف محدد وتبحث عمّن يساعدك على تحقيقه.",
      track1Badge: "المسار الأول • خدمة جاهزة",
      track1Title: "تعرف ما تريد؟",
      track1Lead: "ابدأ من خدمة جاهزة.",
      track1Steps: [
        {
          num: "01",
          title: "01 — اكتشف الخدمات",
          desc: "تصفّح الخدمات المتاحة واختر المجال الذي يناسب احتياجك.",
        },
        {
          num: "02",
          title: "02 — تعرّف على التفاصيل",
          desc: "اطّلع على وصف الخدمة وسعرها وتقييمات العملاء.",
        },
        {
          num: "03",
          title: "03 — اطلب الخدمة",
          desc: "أكمل طلبك وابدأ بالتنسيق مع المختص.",
        },
      ],
      track2Badge: "المسار الثاني • تنفيذ خاص",
      track2Title: "تحتاج إلى تنفيذ خاص؟",
      track2Lead: "اطرح مشروعك واستقبل عروضًا تناسب احتياجك.",
      track2Steps: [
        {
          num: "01",
          title: "01 — اطرح مشروعك",
          desc: "وضّح فكرة مشروعك ومتطلباته والميزانية المناسبة لك.",
        },
        {
          num: "02",
          title: "02 — استقبل العروض",
          desc: "قارن بين عروض المختصين وخبراتهم وتقييماتهم.",
        },
        {
          num: "03",
          title: "03 — اختر المختص المناسب",
          desc: "اختر العرض الذي يتوافق مع متطلبات مشروعك وميزانيتك.",
        },
      ],
    },
    categories: {
      title: "لكل مجال معاون",
      subtitle:
        "من التصميم والبرمجة إلى التسويق والأعمال وغيرها من المجالات، تعرّف على مستقلين من مختلف أنحاء العالم العربي، بمهارات وخبرات متنوعة تلبي احتياجاتك.",
      items: [
        {
          id: "design",
          label: "الإبداع البصري",
          title: "التصميم والإبداع",
          description:
            "التصميم الجرافيكي، الهوية البصرية، واجهات وتجربة المستخدم (UI/UX)، والمونتاج وصناعة الفيديو الاحترافي.",
        },
        {
          id: "tech",
          label: "التقنية والتطوير",
          title: "البرمجة والتقنية",
          description:
            "تطوير المواقع والمتاجر، وتطبيقات الهواتف الذكية، والحلول البرمجية السحابية المتكاملة.",
        },
        {
          id: "academic",
          label: "الدراسات والبحث",
          title: "البحوث والخدمات الأكاديمية",
          description:
            "البحث العلمي، جمع البيانات وتحليلها إحصائياً، التدقيق اللغوي الدقيق، والتنسيق المنهجي.",
        },
        {
          id: "marketing",
          label: "النمو والانتشار",
          title: "التسويق والمحتوى",
          description:
            "التسويق الرقمي، إدارة الحسابات والمنصات، الإعلانات الممولة، وكتابة المحتوى الإبداعي وصناعة الـ SEO.",
        },
        {
          id: "business",
          label: "الاستشارات والحلول",
          title: "الأعمال والخدمات المهنية",
          description:
            "المساندة الإدارية، دراسات الجدوى، استشارات الأعمال، والخدمات المهنية المتخصصة.",
        },
        {
          id: "other",
          label: "تخصصات متنوعة",
          title: "مجالات أخرى",
          description:
            "الترجمة الاحترافية، التعليق الصوتي، التدريب، وغيرها من التخصصات الحرة المتنوعة.",
        },
      ],
    },
    whyMoawen: {
      title: "لأن إنجاز العمل لا يجب أن يكون معقدًا.",
      subtitle:
        "معاون يجمع أهم ما تحتاجه أثناء التعامل في مكان واحد، من التواصل والاتفاق إلى الدفع ومتابعة الطلب.",
      cards: [
        {
          id: "unified-chat",
          title: "تواصل من مكان واحد",
          description:
            "ناقش تفاصيل العمل مع مقدم الخدمة من خلال التطبيق بدل توزيع التواصل بين أكثر من مكان، وضمان متابعتنا لكافة التطورات وجودة العمل المقدم معك .",
        },
        {
          id: "clear-agreement",
          title: "اعرف ما اتفقت عليه",
          description:
            "راجع تفاصيل الخدمة والسعر وموعد التسليم قبل بدء التنفيذ.",
        },
        {
          id: "platform-payment",
          title: "ادفع من خلال المنصة",
          description:
            "تتم المدفوعات عبر بوابات الدفع الآمنة والموثوقة داخل التطبيق.",
        },
        {
          id: "order-tracking",
          title: "ارجع إلى طلبك في أي وقت",
          description:
            "ابقَ على اطلاع بتفاصيل طلبك وتواصل مع مقدم الخدمة أثناء التنفيذ.",
        },
        {
          id: "verified-reviews",
          title: "تجارب عملاء تساعدك تختار",
          description:
            "كل تقييم يشارك تجربة العميل مع المختص، ويعطيك فكرة عن جودة عمله ومدى التزامه.",
        },
        {
          id: "escrow-protection",
          title: "أموالك محفوظة داخل المنصة",
          description:
            "يُصرف المبلغ للمختص بعد اعتمادك للطلب وتأكيد استلامك للنتيجة.",
        },
        {
          id: "deadline-commitment",
          title: "التزام بموعد التسليم",
          description:
            "إذا انتهى موعد التسليم دون استلام طلبك، تقدر ترفع بلاغ للدعم وتطلب استرداد مبلغك.",
        },
        {
          id: "support-247",
          title: "دعم على مدار الساعة",
          description:
            "فريق دعم متاح على مدار الساعة للإجابة عن استفساراتك ومساعدتك في متابعة طلباتك.",
        },
      ],
      privacyBtn: "سياسة الخصوصية",
      termsBtn: "الشروط والأحكام",
    },
    productExperience: {
      title: "تجربة أسهل من البداية للنهاية",
      pillars: [
        {
          id: "p1",
          title: "تواصل من مكان واحد",
          description:
            "تواصل مع مقدم الخدمة وناقش تفاصيل العمل من خلال التطبيق.",
        },
        {
          id: "p2",
          title: "اتفق وأنت مطمئن",
          description:
            "راجع تفاصيل الخدمة والسعر وموعد التسليم قبل بدء التنفيذ.",
        },
        {
          id: "p3",
          title: "ادفع من خلال المنصة",
          description:
            "أتمم مدفوعاتك عبر بوابات الدفع المتاحة داخل التطبيق.",
        },
        {
          id: "p4",
          title: "تابع طلبك بسهولة",
          description: "تابع طلبك ومحادثاتك مع مقدم الخدمة من خلال التطبيق.",
        },
      ],
      summary:
        "من اكتشاف الخدمة إلى متابعة الطلب، صُمم التطبيق لتجد ما تحتاجه وتتفاعل مع طلبك من مكان واحد.",
      exploreCta: "استكشف التطبيق الآن",
    },
    freelancer: {
      badge: "بوابة المستقلين ومقدمي الخدمات",
      title: "وسّع فرصك مع معاون",
      subtitle: "لديك مهارة؟ هناك عملاء بحاجتها ويبحثون عنك.",
      description:
        "سواء كنت مصممًا، مبرمجًا، كاتبًا، مسوقًا أو تقدم خدمة يمكن تنفيذها عن بُعد، يمكنك عرض خدماتك على معاون والتقدم للطلبات التي تناسب خبرتك.",
      cta: "اعرض خدماتك على معاون",
      microNote: "أنشئ حسابك وابدأ بتقديم خدماتك.",
      roles: [
        "مصمم",
        "مبرمج",
        "كاتب",
        "مسوّق",
        "مترجم",
        "محلل بيانات",
        "مونتير",
        "مستشار",
      ],
    },
    faq: {
      title: "الأسئلة الشائعة",
      desc: "إجابات مختصرة عن أكثر ما يُسأل عنه قبل البدء.",
      leadQuestion: "هل أحتاج إلى معرفة الخدمة التي أريدها مسبقًا؟",
      leadAnswer:
        "ليس بالضرورة. يمكنك البحث عن خدمة جاهزة إذا كنت تعرف ما تحتاجه، أو نشر طلب إذا كان لديك احتياج خاص وتريد استقبال عروض من المختصين.",
      items: [
        {
          num: "1",
          question: "كيف أبحث عن مستقل مناسب؟",
          answer:
            "يمكنك تصفح المستقلين، الاطلاع على ملفاتهم الشخصية، ومراجعة مهاراتهم وأعمالهم السابقة قبل البدء.",
        },
        {
          num: "2",
          question: "هل يمكنني طلب أكثر من خدمة في نفس الوقت؟",
          answer:
            "نعم، يمكنك إنشاء وإدارة عدة طلبات وخدمات في نفس الوقت حسب احتياجك.",
        },
        {
          num: "3",
          question: "كيف يضمن معاون حقوق العميل والمستقل؟",
          answer:
            "يتم الاحتفاظ بالمبلغ داخل المنصة حتى تأكيد استلام الطلب، وفي حال وجود مشكلة يمكن رفع بلاغ ليتم مراجعة الحالة من قبل فريق الدعم.",
        },
        {
          num: "4",
          question: "هل يمكنني التفاوض على السعر أو مدة التنفيذ؟",
          answer:
            "نعم، يمكن للطرفين الاتفاق على السعر والتفاصيل المناسبة قبل بدء العمل.",
        },
        {
          num: "5",
          question: "ماذا أفعل إذا لم أجد الخدمة التي أبحث عنها؟",
          answer:
            "يمكنك نشر طلبك داخل المنصة ليتمكن المستقلون من الاطلاع عليه والتقدم لتنفيذه.",
        },
        {
          num: "6",
          question: "هل بياناتي ومدفوعاتي آمنة؟",
          answer:
            "نعمل على توفير بيئة آمنة لحماية بيانات المستخدمين وتنظيم العمليات داخل المنصة.",
        },
        {
          num: "7",
          question: "هل معاون متاح خارج السعودية؟",
          answer: "نعم، يمكن استخدام المنصة من مختلف دول العالم.",
        },
        {
          num: "8",
          question: "كيف أتواصل مع الدعم؟",
          answer:
            "يمكنك التواصل مع فريق الدعم عبر صفحة “الدعم الفني” في التطبيق أو عبر البريد الإلكتروني الرسمي support@moawen.sa، وسيتم الرد عليك في أقرب وقت ممكن.",
        },
      ],
    },
    finalCta: {
      title: "لديك مهمة تريد إنجازها؟ .. لديك مهارة؟ مكانك هنا.",
      subtitle:
        "سواء كنت تبحث عمّن يساعدك في إنجاز عملك، أو لديك مهارة تريد تقديمها، ابدأ من معاون.",
    },
    contact: {
      title: "لديك استفسار يحتاج الإجابة؟ اسألنا.",
      subtitle:
        "إذا كان لديك سؤال عن معاون أو تحتاج إلى مساعدة، أرسل لنا رسالتك وسنتواصل معك، أو راسلنا مباشرة على بريدنا الرسمي.",
      emailCtaLabel: "أو راسلنا مباشرة عبر:",
      officialEmail: "support@moawen.sa",
      nameLabel: "الاسم",
      namePlaceholder: "أدخل اسمك الكامل",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "name@example.com",
      messageLabel: "اكتب رسالتك",
      messagePlaceholder: "اكتب استفسارك أو تفاصيل رسالتك هنا...",
      submitBtn: "إرسال الرسالة",
      submittingBtn: "جارٍ الإرسال...",
      privacyNote: "سنستخدم بياناتك فقط للتواصل معك بشأن استفسارك.",
      successTitle: "تم استلام رسالتك بنجاح",
      successBody:
        "شكرًا لتواصلك مع معاون. تم إرسال رسالتك بنجاح وسيتواصل معك فريقنا في أقرب وقت.",
      successShort: "وصلتنا رسالتك، وسنرد عليك قريبًا.",
      errorMsg: "تعذر إرسال الرسالة الآن، حاول مرة أخرى أو راسلنا مباشرة عبر support@moawen.sa",
      invalidMsg: "يرجى تعبئة جميع الحقول بشكل صحيح.",
      sendAnother: "إرسال رسالة أخرى",
    },
    categoryModal: {
      badge: "قريبًا على App Store و Google Play",
      title: "تخصصات معاون قريبًا في التطبيق",
      description:
        "نعمل على تجهيز تطبيق معاون الذي يجمع كل هذه التخصصات في مكان واحد — للعملاء ومقدمي الخدمات. ترقبوا الإطلاق قريبًا على Google Play و App Store.",
      closeBtn: "حسناً، فهمت",
    },
    footer: {
      brandName: "معاون",
      tagline: "منصة تجمع من يحتاج إلى إنجاز العمل بمن يستطيع إنجازه.",
      exploreTitle: "استكشف",
      helpTitle: "المساعدة",
      downloadTitle: "حمّل التطبيق",
      followTitle: "تابع معاون",
      contactEmailTitle: "البريد الرسمي",
      copyright: "© 2026 معاون — جميع الحقوق محفوظة",
    },
    comingSoonModal: {
      badge: "قريبًا على Google Play و App Store",
      title: "تطبيق معاون قريبًا",
      description:
        "نعمل على تجهيز تطبيق معاون لتقديم تجربة أسهل للعملاء ومقدمي الخدمات. ترقبوا الإطلاق قريبًا.",
      customersAppLabel: "تطبيق العملاء",
      providersAppLabel: "تطبيق مقدمي الخدمات",
      storeHint: "سيكون متاحًا قريبًا على:",
      closeBtn: "إغلاق",
    },
    a11y: {
      primaryNav: "التنقل الرئيسي",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      previousScreen: "الشاشة السابقة",
      nextScreen: "الشاشة التالية",
      screenNumber: "الشاشة",
      carouselLabel: "معاينة شاشات تطبيق معاون",
    },
  },
  en: {
    nav: {
      home: "Home",
      howItWorks: "How Moawen Works",
      forClients: "For Clients",
      forFreelancers: "For Freelancers",
      faq: "FAQ",
      contact: "Contact Us",
      downloadApp: "Download App",
      langToggle: "عربي",
      themeToLight: "Switch to Light Mode",
      themeToDark: "Switch to Dark Mode",
    },
    hero: {
      eyebrow: "Professional Services & Freelance Collaboration",
      title: "Choose who assists you!",
      subtitle:
        "At Moawen, we bring you specialists from across the Arab world with diverse skills and expertise so you can collaborate and get what you need done with confidence and flexibility.",
      scrollHint: "Scroll down to explore the Moawen experience",
    },
    audience: {
      sectionTitle: "Whatever you are looking for, Moawen has the right fit",
      clientTab: "I will get it done",
      freelancerTab: "I want to offer my services",
      client: {
        badge: "Clients & Project Owners",
        question:
          "Have a task or project and looking for someone to execute it?",
        description:
          "Search for the service you need, or post your request and receive proposals from experts to complete your work.",
        cta: "Start as a Client",
      },
      freelancer: {
        badge: "Specialists & Service Providers",
        question: "Have a skill you can offer to others?",
        description:
          "Showcase your services and submit proposals on requests that match your expertise.",
        cta: "Join as a Service Provider",
      },
    },
    twoWays: {
      title: "Start the way that suits your request.",
      subtitle:
        "Whether you know the exact service you need, or have a specific goal and are looking for someone to help achieve it.",
      track1Badge: "Path 01 • Ready Service",
      track1Title: "Know what you want?",
      track1Lead: "Start from a ready-made service.",
      track1Steps: [
        {
          num: "01",
          title: "01 — Discover Services",
          desc: "Browse available services and choose the field that matches your need.",
        },
        {
          num: "02",
          title: "02 — Review Details",
          desc: "Check the service description, pricing, and client ratings.",
        },
        {
          num: "03",
          title: "03 — Order the Service",
          desc: "Complete your order and begin coordinating with the specialist.",
        },
      ],
      track2Badge: "Path 02 • Custom Execution",
      track2Title: "Need custom execution?",
      track2Lead: "Post your project and receive tailored proposals.",
      track2Steps: [
        {
          num: "01",
          title: "01 — Post Your Project",
          desc: "Clarify your project idea, requirements, and suitable budget.",
        },
        {
          num: "02",
          title: "02 — Receive Proposals",
          desc: "Compare specialist offers, experience, and client ratings.",
        },
        {
          num: "03",
          title: "03 — Choose the Right Specialist",
          desc: "Select the proposal that aligns with your project requirements and budget.",
        },
      ],
    },
    categories: {
      title: "A Moawen for every field",
      subtitle:
        "From design and programming to marketing, business, and more, meet independent specialists across the Arab world with diverse skills tailored to your needs.",
      items: [
        {
          id: "design",
          label: "Visual Arts",
          title: "Design & Creativity",
          description:
            "Graphic design, brand identities, UI/UX prototyping, motion graphics, and high-end video editing.",
        },
        {
          id: "tech",
          label: "Engineering",
          title: "Programming & Technology",
          description:
            "Full-stack web apps & e-commerce, native iOS/Android mobile apps, and robust cloud backend integrations.",
        },
        {
          id: "academic",
          label: "Research & Academic",
          title: "Research & Academic Services",
          description:
            "Scientific research, statistical data analytics, precise academic proofreading, and methodology formatting.",
        },
        {
          id: "marketing",
          label: "Growth & Reach",
          title: "Marketing & Content",
          description:
            "Digital campaigns, social media management, paid ads, SEO copywriting, and engaging creative content.",
        },
        {
          id: "business",
          label: "Business & Beyond",
          title: "Business & Professional Services",
          description:
            "Administrative assistance, feasibility studies, management consulting, and specialized professional services.",
        },
        {
          id: "other",
          label: "Diverse Skills",
          title: "Other Fields",
          description:
            "Professional translation, voice-over, training, and more diverse freelance specialties.",
        },
      ],
    },
    whyMoawen: {
      title: "Because getting work done shouldn't be complicated.",
      subtitle:
        "Moawen brings everything you need during collaboration into one place—from communication and agreement to payment and order tracking.",
      cards: [
        {
          id: "unified-chat",
          title: "Communicate in one place",
          description:
            "Discuss work details with the service provider inside the app instead of scattering chats across multiple tools, ensuring full tracking and quality.",
        },
        {
          id: "clear-agreement",
          title: "Know what you agreed upon",
          description:
            "Review service scope, pricing, and delivery deadline before execution begins.",
        },
        {
          id: "platform-payment",
          title: "Pay through the platform",
          description:
            "Payments are processed via secure, trusted payment gateways directly inside the app.",
        },
        {
          id: "order-tracking",
          title: "Check your order anytime",
          description:
            "Stay informed about your order status and communicate with your specialist during execution.",
        },
        {
          id: "verified-reviews",
          title: "Client reviews help you choose",
          description:
            "Every review shares a real client experience, giving you clear insight into quality and commitment.",
        },
        {
          id: "escrow-protection",
          title: "Your funds are protected",
          description:
            "Funds are released to the specialist only after you approve the order and confirm receipt.",
        },
        {
          id: "deadline-commitment",
          title: "Delivery deadline commitment",
          description:
            "If the delivery deadline passes without receiving your order, you can file a support report and request a refund.",
        },
        {
          id: "support-247",
          title: "24/7 Support",
          description:
            "A dedicated support team available around the clock to answer inquiries and help track your orders.",
        },
      ],
      privacyBtn: "Privacy Policy",
      termsBtn: "Terms & Conditions",
    },
    productExperience: {
      title: "A smoother experience from start to finish",
      pillars: [
        {
          id: "p1",
          title: "Communicate in one place",
          description:
            "Connect with the service provider and discuss work details inside the app.",
        },
        {
          id: "p2",
          title: "Agree with confidence",
          description:
            "Review service details, pricing, and delivery date before starting.",
        },
        {
          id: "p3",
          title: "Pay through the platform",
          description:
            "Complete your payments via secure payment gateways inside the app.",
        },
        {
          id: "p4",
          title: "Track your order easily",
          description:
            "Follow your order progress and chats with the specialist inside the app.",
        },
      ],
      summary:
        "From discovering a service to tracking your order, the app is designed so you find what you need and manage your request in one place.",
      exploreCta: "Explore the app now",
    },
    freelancer: {
      badge: "Freelancers & Service Providers Hub",
      title: "Expand your opportunities with Moawen",
      subtitle: "Have a skill? Clients need it and are searching for you.",
      description:
        "Whether you are a designer, developer, writer, marketer, or provide any remote service, you can list your services on Moawen and apply to requests matching your expertise.",
      cta: "Offer your services on Moawen",
      microNote: "Create your account and start offering your services.",
      roles: [
        "Designer",
        "Developer",
        "Writer",
        "Marketer",
        "Translator",
        "Data analyst",
        "Video editor",
        "Consultant",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      desc: "Quick answers to the most common questions before getting started.",
      leadQuestion: "Do I need to know the exact service I want in advance?",
      leadAnswer:
        "Not necessarily. You can browse ready-made services if you know what you need, or post a custom request if you have a specific requirement and want to receive proposals from specialists.",
      items: [
        {
          num: "1",
          question: "How do I find a suitable freelancer?",
          answer:
            "You can browse specialists, view their profiles, and review their skills and past work before getting started.",
        },
        {
          num: "2",
          question: "Can I request more than one service at the same time?",
          answer:
            "Yes, you can create and manage multiple orders and services simultaneously according to your needs.",
        },
        {
          num: "3",
          question:
            "How does Moawen protect both the client and the freelancer?",
          answer:
            "Funds are held safely inside the platform until order receipt is confirmed; if an issue arises, a report can be submitted for support review.",
        },
        {
          num: "4",
          question: "Can I negotiate the price or delivery duration?",
          answer:
            "Yes, both parties can agree on the suitable price and details before starting work.",
        },
        {
          num: "5",
          question: "What if I don't find the exact service I'm looking for?",
          answer:
            "You can publish your request inside the platform so specialists can view it and submit proposals to execute it.",
        },
        {
          num: "6",
          question: "Are my data and payments secure?",
          answer:
            "We maintain a secure environment to protect user data and regulate all operations inside the platform.",
        },
        {
          num: "7",
          question: "Is Moawen available outside Saudi Arabia?",
          answer:
            "Yes, the platform can be used from countries around the world.",
        },
        {
          num: "8",
          question: "How do I contact support?",
          answer:
            "You can reach the support team via the Technical Support page in the app or by emailing the official address support@moawen.sa, and we will respond as soon as possible.",
        },
      ],
    },
    finalCta: {
      title: "Have a task to get done? .. Have a skill? Your place is here.",
      subtitle:
        "Whether you're looking for someone to help complete your work, or have a skill to offer, start with Moawen.",
    },
    contact: {
      title: "Have a question that needs an answer? Ask us.",
      subtitle:
        "If you have a question about Moawen or need assistance, send us your message and we will get in touch, or email us directly at our official address.",
      emailCtaLabel: "Or email us directly at:",
      officialEmail: "support@moawen.sa",
      nameLabel: "Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      messageLabel: "Write your message",
      messagePlaceholder: "Write your inquiry or message details here...",
      submitBtn: "Send Message",
      submittingBtn: "Sending...",
      privacyNote:
        "We will only use your details to contact you regarding your inquiry.",
      successTitle: "Your message has been received",
      successBody:
        "Thank you for reaching out to Moawen. Your message has been dispatched and our team will contact you shortly.",
      successShort: "Message received — we will reply to you soon.",
      errorMsg:
        "Could not send the message right now. Please try again or email us directly at support@moawen.sa",
      invalidMsg: "Please fill in all fields correctly.",
      sendAnother: "Send another message",
    },
    categoryModal: {
      badge: "Coming soon on the App Store & Google Play",
      title: "Moawen specialties are coming to the app",
      description:
        "We are preparing the Moawen app that brings all these specialties together — for customers and service providers. Stay tuned for the launch on Google Play and the App Store.",
      closeBtn: "Got it, thanks",
    },
    footer: {
      brandName: "Moawen",
      tagline:
        "A platform connecting those who need work done with those who can get it done.",
      exploreTitle: "Explore",
      helpTitle: "Help",
      downloadTitle: "Download App",
      followTitle: "Follow Moawen",
      contactEmailTitle: "Official Email",
      copyright: "© 2026 Moawen — All rights reserved",
    },
    comingSoonModal: {
      badge: "Coming soon on Google Play & the App Store",
      title: "Moawen Is Coming Soon",
      description:
        "Our applications for customers and service providers are coming soon to Google Play and the Apple App Store. Stay tuned!",
      customersAppLabel: "Customer app",
      providersAppLabel: "Service-provider app",
      storeHint: "Will be available on:",
      closeBtn: "Close",
    },
    a11y: {
      primaryNav: "Primary navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      previousScreen: "Previous screen",
      nextScreen: "Next screen",
      screenNumber: "Screen",
      carouselLabel: "Moawen app screens preview",
    },
  },
};
