import { legalDocuments, type LegalSectionItem } from "@/db/schema";
import { eq } from "drizzle-orm";

/* =============================================================
   LEGAL PAGES — TEMPORARY STATIC MODE (user spec)
   ------------------------------------------------------------
   The privacy & terms pages WILL ultimately be bound to the admin
   dashboard, but the dashboard is not finished yet. Until then this
   flag DISABLES the database binding and serves the built-in
   documents below instantly — zero DB dependency, zero breakage.

   ➜ When the admin console ships, flip this to `true` and the pages
     automatically read from (and write to) the database again. No
     other file needs to change.
   ============================================================= */
export const LEGAL_DB_SYNC_ENABLED = false;

export interface LegalDocumentData {
  slug: "privacy" | "terms";
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  version: string;
  updatedAt: string;
  sections: LegalSectionItem[];
}

export const DEFAULT_PRIVACY_DOC: Omit<LegalDocumentData, "updatedAt"> = {
  slug: "privacy",
  titleAr: "سياسة الخصوصية",
  titleEn: "Privacy Policy",
  subtitleAr:
    "نلتزم في منصة معاون بحماية خصوصيتك وبياناتك الشخصية وتنظيم معالجتها بأعلى معايير الأمان والشفافية.",
  subtitleEn:
    "At Moawen, we are committed to safeguarding your privacy and personal data with the highest standards of security and transparency.",
  version: "1.0",
  sections: [
    {
      id: "privacy-1",
      order: 1,
      headingAr: "1. مقدمة ونطاق السياسة",
      headingEn: "1. Introduction & Scope",
      bodyAr:
        "توضح سياسة الخصوصية هذه كيفية قيام منصة معاون (تطبيق الهاتف والموقع الإلكتروني) بجمع واستخدام وحفظ وحماية البيانات الشخصية للعملاء ومقدمي الخدمات عند استخدام خدمات المنصة. استخدامك لمنصة معاون يعني موافقتك على الممارسات الموضحة في هذه السياسة.",
      bodyEn:
        "This Privacy Policy explains how the Moawen platform (mobile application and website) collects, uses, stores, and protects the personal data of clients and service providers. By using Moawen, you agree to the practices described in this policy.",
      pointsAr: [
        "تنطبق هذه السياسة على جميع المستخدمين من العملاء والمستقلين داخل المملكة العربية السعودية وخارجها.",
        "تتم إدارة وتحديث بنود هذه السياسة مباشرة من قبل إدارة منصة معاون لضمان توافقها المستمر مع الأنظمة المعمول بها.",
      ],
      pointsEn: [
        "This policy applies to all clients and independent service providers inside and outside Saudi Arabia.",
        "Policy clauses are centrally managed and updated by Moawen administration to ensure ongoing regulatory compliance.",
      ],
    },
    {
      id: "privacy-2",
      order: 2,
      headingAr: "2. البيانات التي نقوم بجمعها",
      headingEn: "2. Data We Collect",
      bodyAr:
        "نجمع فقط البيانات اللازمة لتشغيل المنصة بكفاءة وتوفير تجربة موثوقة لإنجاز الأعمال والتواصل الآمن بين الأطراف.",
      bodyEn:
        "We collect only the data necessary to operate the platform efficiently and deliver a reliable experience for completing projects and secure communication.",
      pointsAr: [
        "بيانات الحساب والتعريف: الاسم الكامل، البريد الإلكتروني، رقم الجوال، والملف المهني لمقدمي الخدمات.",
        "بيانات الطلبات والمراسلات: تفاصيل المشاريع المطروحة، عروض الأسعار، المحادثات داخل التطبيق، والملفات المتبادلة لإتمام الطلب.",
        "بيانات المعاملات المالية: سجلات الدفع وحالة حفظ المبالغ دون تخزين بيانات البطاقات البنكية الحساسة على خوادمنا.",
        "البيانات التقنية والتحليلية: نوع الجهاز، نظام التشغيل، لغة الواجهة، ومؤشرات الاستخدام لتحسين الأداء.",
      ],
      pointsEn: [
        "Account & Identity Data: Full name, email address, phone number, and professional portfolio details for service providers.",
        "Orders & Communications Data: Project briefs, proposals, in-app messages, and deliverables exchanged to fulfill orders.",
        "Transaction Metadata: Payment logs and escrow status without storing sensitive payment card credentials on our servers.",
        "Technical & Analytics Data: Device type, OS version, preferred language, and usage metrics to optimize performance.",
      ],
    },
    {
      id: "privacy-3",
      order: 3,
      headingAr: "3. كيف نستخدم بياناتك",
      headingEn: "3. How We Use Your Data",
      bodyAr:
        "نستخدم المعلومات التي تزودنا بها حصريًا لتقديم خدمات معاون وتطويرها وحماية حقوق جميع الأطراف.",
      bodyEn:
        "We use the information you provide exclusively to deliver and improve Moawen services and protect the rights of all parties.",
      pointsAr: [
        "ربط العملاء بالمختصين المناسبين وتسهيل تقديم العروض ومتابعة تنفيذ الطلبات.",
        "توثيق الاتفاقات ومواعيد التسليم وحفظ المستحقات المالية داخل المنصة حتى اعتماد الاستلام.",
        "تقديم الدعم الفني على مدار الساعة ومعالجة البلاغات والاستفسارات بسرعة وفعالية.",
        "الوقاية من الاحتيال وضمان جودة الخدمة وسلامة التعاملات داخل التطبيق.",
      ],
      pointsEn: [
        "Matching clients with qualified specialists and facilitating proposals and order tracking.",
        "Documenting agreements, delivery schedules, and holding funds safely until delivery approval.",
        "Providing 24/7 technical support and resolving reports and inquiries promptly.",
        "Preventing fraud and ensuring service quality and transaction safety inside the app.",
      ],
    },
    {
      id: "privacy-4",
      order: 4,
      headingAr: "4. حماية المدفوعات والبيانات المالية",
      headingEn: "4. Payment & Financial Data Protection",
      bodyAr:
        "تتم جميع عمليات الدفع عبر بوابات دفع إلكترونية مرخصة ومشفرة بالكامل. يحتفظ معاون بالمبلغ المدفوع في حساب وسيط آمن داخل المنصة ولا يتم تحويله إلى مقدم الخدمة إلا بعد تأكيد العميل استلام العمل واعتماده.",
      bodyEn:
        "All payments are processed through licensed, fully encrypted payment gateways. Moawen holds paid amounts securely inside the platform and releases funds to the service provider only after the client confirms receipt and approves the work.",
    },
    {
      id: "privacy-5",
      order: 5,
      headingAr: "5. مشاركة البيانات والسرية",
      headingEn: "5. Data Sharing & Confidentiality",
      bodyAr:
        "لا نقوم ببيع أو تأجير بياناتك الشخصية لأي طرف ثالث تحت أي ظرف. تقتصر مشاركة البيانات على الحالات التشغيلية الضرورية فقط:",
      bodyEn:
        "We never sell or rent your personal data to any third party under any circumstances. Data sharing is strictly limited to essential operational cases:",
      pointsAr: [
        "مشاركة تفاصيل المشروع أو الخدمة بين العميل ومقدم الخدمة المعني لإتمام التنفيذ.",
        "مزودو خدمات الدفع والبنية التحتية التقنية الملتزمون باتفاقيات سرية وحماية بيانات صارمة.",
        "الامتثال للطلبات النظامية الصادرة عن الجهات المختصة وفق القوانين المعمول بها.",
      ],
      pointsEn: [
        "Sharing project or service details between the matched client and specialist to execute the order.",
        "Payment processors and cloud infrastructure providers bound by strict confidentiality and data protection agreements.",
        "Compliance with lawful requests issued by competent authorities under applicable regulations.",
      ],
    },
    {
      id: "privacy-6",
      order: 6,
      headingAr: "6. ملفات تعريف الارتباط وتحليلات الأداء",
      headingEn: "6. Cookies & Performance Analytics",
      bodyAr:
        "نستخدم ملفات تعريف الارتباط وأدوات التحليل مثل Google Analytics لفهم كيفية تفاعل الزوار مع الموقع وتحسين سرعة التصفح وتجربة المستخدم وتفضيلات اللغة والمظهر.",
      bodyEn:
        "We use cookies and analytics tools such as Google Analytics to understand how visitors interact with our site and to enhance browsing speed, user experience, and language/theme preferences.",
    },
    {
      id: "privacy-7",
      order: 7,
      headingAr: "7. حقوقك والتحكم في بياناتك",
      headingEn: "7. Your Rights & Data Control",
      bodyAr:
        "يحق لك في أي وقت الاطلاع على بياناتك الشخصية المسجلة لدينا أو طلب تعديلها أو تحديثها أو حذف حسابك وبياناتك وفق الضوابط النظامية.",
      bodyEn:
        "You have the right at any time to access your registered personal data, request corrections or updates, or request deletion of your account and data subject to regulatory obligations.",
    },
    {
      id: "privacy-8",
      order: 8,
      headingAr: "8. التواصل معنا",
      headingEn: "8. Contact Us",
      bodyAr:
        "إذا كانت لديك أي أسئلة حول سياسة الخصوصية أو رغبت في ممارسة أي من حقوقك المتعلقة بالبيانات، يمكنك التواصل معنا عبر صفحة الدعم الفني في التطبيق أو عبر نموذج تواصل معنا أو البريد الإلكتروني الرسمي: support@moawen.sa.",
      bodyEn:
        "If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us via the in-app Support page, our Contact Us form, or our official email: support@moawen.sa.",
    },
  ],
};

export const DEFAULT_TERMS_DOC: Omit<LegalDocumentData, "updatedAt"> = {
  slug: "terms",
  titleAr: "الشروط والأحكام",
  titleEn: "Terms & Conditions",
  subtitleAr:
    "تنظم هذه الشروط والأحكام العلاقة التعاقدية واستخدام منصة معاون بين الإدارة والعملاء ومقدمي الخدمات.",
  subtitleEn:
    "These Terms & Conditions govern the contractual relationship and use of the Moawen platform between administration, clients, and service providers.",
  version: "1.0",
  sections: [
    {
      id: "terms-1",
      order: 1,
      headingAr: "1. التعريفات ونطاق التطبيق",
      headingEn: "1. Definitions & Scope of Application",
      bodyAr:
        "منصة معاون هي منصة رقمية تجمع بين العملاء الباحثين عن إنجاز مهام أو مشاريع وبين المختصين ومقدمي الخدمات المستقلين من مختلف أنحاء العالم العربي. استخدامك للتطبيق أو الموقع يُعد إقرارًا بالالتزام الكامل بهذه الشروط والأحكام.",
      bodyEn:
        "Moawen is a digital platform connecting clients seeking to accomplish tasks or projects with skilled independent specialists across the Arab world. Using the app or website constitutes full acceptance of these Terms & Conditions.",
      pointsAr: [
        "العميل: كل شخص طبيعي أو اعتباري يطلب خدمة جاهزة أو يطرح مشروعًا عبر منصة معاون.",
        "مقدم الخدمة (المستقل): كل مختص يعرض خدماته أو يقدم عروضًا لتنفيذ طلبات العملاء عبر المنصة.",
        "الطلب: الاتفاق المبرم داخل التطبيق بين العميل ومقدم الخدمة شاملاً النطاق والسعر ومدة التسليم.",
      ],
      pointsEn: [
        "Client: Any individual or entity requesting a ready-made service or posting a project on Moawen.",
        "Service Provider (Freelancer): Any specialist listing services or submitting proposals to execute client orders.",
        "Order: The in-app agreement between Client and Service Provider specifying scope, price, and delivery deadline.",
      ],
    },
    {
      id: "terms-2",
      order: 2,
      headingAr: "2. التسجيل وأهلية الحساب",
      headingEn: "2. Registration & Account Eligibility",
      bodyAr:
        "يشترط لإنشاء حساب في معاون تقديم معلومات صحيحة ودقيقة، والمحافظة على سرية بيانات الدخول. يتحمل صاحب الحساب المسؤولية الكاملة عن جميع الأنشطة التي تتم من خلال حسابه.",
      bodyEn:
        "Creating a Moawen account requires providing accurate information and maintaining credential confidentiality. The account holder bears full responsibility for all activities conducted through their account.",
    },
    {
      id: "terms-3",
      order: 3,
      headingAr: "3. آلية الطلبات والاتفاق داخل المنصة",
      headingEn: "3. Ordering & In-Platform Contracting",
      bodyAr:
        "يتيح معاون مسارين واضحين للتعامل، ويجب أن تتم كافة الاتفاقات والمراسلات والمدفوعات داخل التطبيق لضمان حماية حقوق الطرفين:",
      bodyEn:
        "Moawen offers two clear pathways, and all agreements, communications, and payments must remain inside the app to protect both parties' rights:",
      pointsAr: [
        "مسار الخدمة الجاهزة: يختار العميل خدمة منشورة، ويراجع تفاصيلها وسعرها وموعد تسليمها ثم يؤكد الطلب.",
        "مسار المشروع الخاص: يطرح العميل تفاصيل مشروعه وميزانيته، ويستقبل عروض المختصين ويختار العرض الأنسب.",
        "يحق للطرفين التفاوض والاتفاق على السعر النهائي ومدة التنفيذ قبل اعتماد الطلب وبدء العمل.",
      ],
      pointsEn: [
        "Ready-Made Service Track: The client selects a listed service, reviews scope, price, and deadline, and confirms the order.",
        "Custom Project Track: The client posts project details and budget, receives specialist proposals, and selects the best fit.",
        "Both parties may negotiate and agree on final pricing and delivery duration before confirming the order.",
      ],
    },
    {
      id: "terms-4",
      order: 4,
      headingAr: "4. حفظ الأموال والمدفوعات",
      headingEn: "4. Escrow & Platform Payments",
      bodyAr:
        "لضمان الثقة والأمان، يتم دفع قيمة الطلب عبر بوابات الدفع المعتمدة داخل تطبيق معاون، وتبقى الأموال محفوظة لدى المنصة طوال فترة التنفيذ.",
      bodyEn:
        "To ensure trust and security, order payments are processed through approved payment gateways inside Moawen, and funds remain safely held by the platform throughout execution.",
      pointsAr: [
        "لا يُصرف المبلغ لمقدم الخدمة إلا بعد قيام العميل بمراجعة العمل المسلّم واعتماد استلامه.",
        "يُحظر تمامًا تحويل أي مبالغ مالية خارج المنصة، ولا تتحمل المنصة مسؤولية أي تعاملات تتم خارج إطار التطبيق.",
      ],
      pointsEn: [
        "Funds are released to the service provider only after the client reviews and approves the delivered work.",
        "Off-platform payments are strictly prohibited; Moawen bears no liability for transactions conducted outside the app.",
      ],
    },
    {
      id: "terms-5",
      order: 5,
      headingAr: "5. الالتزام بمواعيد التسليم وسياسة الاسترداد",
      headingEn: "5. Delivery Deadlines & Refund Policy",
      bodyAr:
        "يلتزم مقدم الخدمة بتسليم العمل المتفق عليه بالجودة المطلوبة وقبل انتهاء موعد التسليم المحدد في الطلب.",
      bodyEn:
        "The service provider commits to delivering the agreed work at the specified quality before the order deadline expires.",
      pointsAr: [
        "إذا انتهى موعد التسليم المحدد دون استلام العميل لطلبه، يحق للعميل رفع بلاغ فوري لفريق الدعم وطلب استرداد مبلغه بالكامل.",
        "في حال وجود ملاحظات على التسليم، يلتزم مقدم الخدمة بإجراء التعديلات المتفق عليها ضمن نطاق الطلب.",
      ],
      pointsEn: [
        "If the delivery deadline passes without receipt of the order, the client may file a support report and request a full refund.",
        "If revisions are needed, the service provider must perform agreed adjustments within the order scope.",
      ],
    },
    {
      id: "terms-6",
      order: 6,
      headingAr: "6. التزامات مقدمي الخدمات وحقوق الملكية الفكرية",
      headingEn: "6. Service Provider Obligations & Intellectual Property",
      bodyAr:
        "يضمن مقدم الخدمة أن جميع الأعمال والملفات المسلمة أصلية وخالية من أي انتهاك لحقوق الملكية الفكرية لأطراف ثالثة. وبمجرد اعتماد الطلب وسداد قيمته، تنتقل حقوق استخدام العمل المسلّم للعميل وفق المتفق عليه.",
      bodyEn:
        "The service provider warrants that all delivered work is original and free from third-party intellectual property infringement. Upon order approval, usage rights transfer to the client as agreed.",
    },
    {
      id: "terms-7",
      order: 7,
      headingAr: "7. الدعم الفني وحل النزاعات",
      headingEn: "7. 24/7 Support & Dispute Resolution",
      bodyAr:
        "يوفر معاون فريق دعم متاحًا على مدار الساعة لمتابعة الطلبات وحل أي خلاف قد ينشأ بين العميل ومقدم الخدمة بالاستناد إلى تفاصيل الطلب والمحادثات الموثقة داخل التطبيق.",
      bodyEn:
        "Moawen provides a 24/7 support team to monitor orders and fairly resolve any dispute between client and provider based on documented in-app order terms and chat logs.",
    },
    {
      id: "terms-8",
      order: 8,
      headingAr: "8. تعديل الشروط والأحكام",
      headingEn: "8. Amendments to Terms",
      bodyAr:
        "تحتفظ إدارة معاون بالحق في تحديث أو تعديل هذه الشروط والأحكام عند الحاجة عبر لوحة التحكم الإدارية، وتصبح التعديلات سارية فور نشرها على المنصة.",
      bodyEn:
        "Moawen administration reserves the right to update or amend these Terms & Conditions when necessary via the administrative console, effective immediately upon publication.",
    },
  ],
};

export async function ensureLegalDocumentsSeeded() {
  // DB binding temporarily disabled (see LEGAL_DB_SYNC_ENABLED above)
  if (!LEGAL_DB_SYNC_ENABLED) return;

  const { db } = await import("@/db");
  try {
    const existingPrivacy = await db
      .select()
      .from(legalDocuments)
      .where(eq(legalDocuments.slug, "privacy"))
      .limit(1);

    if (existingPrivacy.length === 0) {
      await db
        .insert(legalDocuments)
        .values({
          slug: DEFAULT_PRIVACY_DOC.slug,
          titleAr: DEFAULT_PRIVACY_DOC.titleAr,
          titleEn: DEFAULT_PRIVACY_DOC.titleEn,
          subtitleAr: DEFAULT_PRIVACY_DOC.subtitleAr,
          subtitleEn: DEFAULT_PRIVACY_DOC.subtitleEn,
          version: DEFAULT_PRIVACY_DOC.version,
          sections: DEFAULT_PRIVACY_DOC.sections,
        })
        .onConflictDoNothing();
    }

    const existingTerms = await db
      .select()
      .from(legalDocuments)
      .where(eq(legalDocuments.slug, "terms"))
      .limit(1);

    if (existingTerms.length === 0) {
      await db
        .insert(legalDocuments)
        .values({
          slug: DEFAULT_TERMS_DOC.slug,
          titleAr: DEFAULT_TERMS_DOC.titleAr,
          titleEn: DEFAULT_TERMS_DOC.titleEn,
          subtitleAr: DEFAULT_TERMS_DOC.subtitleAr,
          subtitleEn: DEFAULT_TERMS_DOC.subtitleEn,
          version: DEFAULT_TERMS_DOC.version,
          sections: DEFAULT_TERMS_DOC.sections,
        })
        .onConflictDoNothing();
    }
  } catch (err) {
    console.warn("Legal documents seed skipped or deferred:", err);
  }
}

export async function getLegalDocumentBySlug(
  slug: "privacy" | "terms"
): Promise<LegalDocumentData> {
  /* TEMPORARY STATIC MODE (user spec): the admin dashboard is not
     finished yet, so the pages are decoupled from the database and
     render the built-in documents below — a complete, unbroken
     experience. Flip LEGAL_DB_SYNC_ENABLED to `true` to restore the
     live admin-console binding later. */
  if (!LEGAL_DB_SYNC_ENABLED) {
    const fallback =
      slug === "privacy" ? DEFAULT_PRIVACY_DOC : DEFAULT_TERMS_DOC;
    return {
      ...fallback,
      updatedAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
    };
  }

  const { db } = await import("@/db");
  try {
    await ensureLegalDocumentsSeeded();
    const rows = await db
      .select()
      .from(legalDocuments)
      .where(eq(legalDocuments.slug, slug))
      .limit(1);

    if (rows.length > 0) {
      const row = rows[0];
      return {
        slug: row.slug as "privacy" | "terms",
        titleAr: row.titleAr,
        titleEn: row.titleEn,
        subtitleAr: row.subtitleAr,
        subtitleEn: row.subtitleEn,
        version: row.version,
        updatedAt: row.updatedAt.toISOString(),
        sections: [...row.sections].sort((a, b) => a.order - b.order),
      };
    }
  } catch (err) {
    console.warn(`Falling back to default ${slug} document:`, err);
  }

  const fallback =
    slug === "privacy" ? DEFAULT_PRIVACY_DOC : DEFAULT_TERMS_DOC;
  return {
    ...fallback,
    updatedAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  };
}
