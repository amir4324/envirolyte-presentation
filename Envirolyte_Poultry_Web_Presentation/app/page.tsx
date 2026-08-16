"use client";

import { cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type React from "react";

type Language = "en" | "ar";

type Slide = {
  kicker: string;
  title: string;
  type: string;
  image?: string;
  images?: string[];
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const arabicCopy: Record<string, string> = {
  "Poultry Industry": "صناعة الدواجن",
  "A Complete Water Treatment & Disinfection Solution for the Poultry Industry": "حل متكامل لمعالجة المياه والتطهير في صناعة الدواجن",
  "The Challenge": "التحدي",
  "Disease Is Not Only a Health Problem — It Is a Business Problem": "الأمراض ليست مشكلة صحية فقط — بل تحدٍ تشغيلي وتجاري",
  "The Gap": "الفجوة",
  "Traditional Disinfection Solves Isolated Problems. Farms Need a Complete System.": "التطهير التقليدي يعالج مشكلات منفصلة، بينما تحتاج المزارع إلى نظام متكامل.",
  "The Strategic Message": "الرسالة الاستراتيجية",
  "Control the Water. Control More of the Farm’s Risk.": "تحكّم في المياه، لتسيطر على قدر أكبر من مخاطر المزرعة.",
  "Control the Water.": "تحكّم في المياه.",
  "Control More of the Farm’s Risk.": "لتسيطر على قدر أكبر من مخاطر المزرعة.",
  "Safety & Sustainability": "السلامة والاستدامة",
  "Powerful Against Microorganisms. Designed for Safer Operations.": "فعّال ضد الكائنات الدقيقة ومصمم لعمليات أكثر أمانًا.",
  "The Solution": "الحل",
  "Envirolyte Extends Water Treatment Into Farm-Wide Biosecurity": "إنفيرولايت يوسّع معالجة المياه إلى أمن حيوي شامل للمزرعة",
  "Across the Farm": "في جميع أنحاء المزرعة",
  "One Technology. Multiple Poultry Applications.": "تقنية واحدة وتطبيقات متعددة في قطاع الدواجن.",
  "How It Works": "كيف يعمل النظام",
  "Generated On-Site Using Only Salt, Water & Electricity": "إنتاج في الموقع باستخدام الملح والماء والكهرباء فقط",
  "System Advantages": "مزايا النظام",
  "Why the Envirolyte System Is Built for Poultry Operations": "لماذا يناسب نظام إنفيرولايت عمليات مزارع الدواجن",
  "System Outputs": "مخرجات النظام",
  "Two Electrolyzed Solutions. Two Different Functions.": "محلولان بالتحليل الكهربائي ووظيفتان مختلفتان.",
  "Anolyte Advantages": "مزايا الأنولايت",
  "A High-Performance Disinfection Solution Generated Fresh On-Site": "محلول تطهير عالي الأداء يُنتج طازجًا في الموقع",
  "Business Case": "الجدوى التشغيلية",
  "This Is More Than Disinfection — It Is an Operational Cost Decision": "الأمر يتجاوز التطهير — إنه قرار يتعلق بتكاليف التشغيل",
  "Assessment & Rollout": "التقييم والتنفيذ",
  "Start With an Assessment of Your Farm": "ابدأ بتقييم مزرعتك",
  "Qatar Results — As Reported": "نتائج قطر — كما تم الإبلاغ عنها",
  "What Did the Farm Achieve?": "ماذا حققت المزرعة؟",
  "Completed Projects in Qatar": "مشروعات منفذة في قطر",
  "Poultry Farm — Operating Outcomes in Qatar": "مزرعة دواجن — نتائج التشغيل في قطر",
  "International accreditations": "الاعتمادات الدولية",
  "Local accreditations": "الاعتمادات المحلية",
  "ACES and Qatar University": "ACES وجامعة قطر",
  "International Poultry References": "مراجع دولية في قطاع الدواجن",
  "Selected Poultry References & Field Case Studies": "مراجع مختارة ودراسات حالة ميدانية في قطاع الدواجن",
  "ENVIROLYTE • POULTRY BIOSECURITY": "إنفيرولايت • الأمن الحيوي للدواجن",
  "Envirolyte and Raseen Aqua Solutions": "إنفيرولايت ورسين للحلول المائية",
  "Raseen Aqua Solutions logo": "شعار رسين للحلول المائية",
  "RASEEN AQUA SOLUTIONS": "رسين للحلول المائية",
  "Core solution areas": "مجالات الحل الرئيسية",
  "Sterilization & Disinfection": "التعقيم والتطهير",
  "Water Purification": "تنقية المياه",
  "For safer operations, healthier birds, and better farm performance.": "لعمليات أكثر أمانًا وطيور أكثر صحة وأداء أفضل للمزرعة.",
  "Diseases and infections create compounding operational pressure across every production cycle.": "تُحدث الأمراض والعدوى ضغوطًا تشغيلية متراكمة خلال كل دورة إنتاج.",
  "Mortality": "النفوق",
  "Higher flock losses": "ارتفاع خسائر القطيع",
  "Medication": "الأدوية",
  "More treatment requirements": "زيادة متطلبات العلاج",
  "Efficiency": "الكفاءة",
  "Lower operational performance": "انخفاض الأداء التشغيلي",
  "Water": "المياه",
  "Continuous contamination risk": "خطر تلوث مستمر",
  "Biosecurity": "الأمن الحيوي",
  "Pressure across people and assets": "ضغط على الأفراد والأصول",
  "Worker disinfecting a poultry barn": "عامل يطهر عنبر دواجن",
  "Effective biosecurity must cover the entire contamination journey — not one chemical or one location.": "يجب أن يغطي الأمن الحيوي الفعّال مسار التلوث كاملًا، لا مادة كيميائية واحدة أو موقعًا واحدًا.",
  "Daily intake": "الاستهلاك اليومي",
  "Barns": "العنابر",
  "Living environment": "بيئة التربية",
  "Equipment": "المعدات",
  "Contact surfaces": "أسطح التلامس",
  "Workers": "العاملون",
  "Movement & hygiene": "الحركة والنظافة",
  "Vehicles": "المركبات",
  "Farm access": "مداخل المزرعة",
  "Chillers": "المبرّدات",
  "Cooling units": "وحدات التبريد",
  "One weak point can reintroduce risk across the full operation.": "نقطة ضعف واحدة قد تعيد المخاطر إلى العملية بأكملها.",
  "A comprehensive, eco-conscious and cost-focused program — generated on site and applied where the farm needs it.": "برنامج شامل يراعي البيئة والتكلفة، يُنتج في الموقع ويُطبق حيث تحتاجه المزرعة.",
  "Drinking water treatment": "معالجة مياه الشرب",
  "Barn cleaning and disinfection": "تنظيف العنابر وتطهيرها",
  "Microbial control": "التحكم الميكروبي",
  "Farm sanitation": "تطهير المزرعة",
  "Eliminate the use of conventional chemical disinfectants": "الاستغناء عن المطهرات الكيميائية التقليدية",
  "Envirolyte generation equipment": "معدات إنتاج إنفيرولايت",
  "Drinking water systems": "أنظمة مياه الشرب",
  "Barn air — fogging": "هواء العنابر — الضباب الرذاذي",
  "Barn floors": "أرضيات العنابر",
  "Hatcheries": "المفاقس",
  "Chiller water": "مياه المبرّدات",
  "Staff hands & feet": "أيدي وأقدام العاملين",
  "Vehicles and access points": "المركبات ونقاط الدخول",
  "Poultry sanitation misting application": "تطبيق الرذاذ لتطهير منشآت الدواجن",
  "A conditioned brine solution passes through a diaphragmatic electrolysis cell to create fresh active solutions close to the point of use.": "يمر محلول ملحي مُهيأ عبر خلية تحليل كهربائي غشائية لإنتاج محاليل فعّالة طازجة بالقرب من نقطة الاستخدام.",
  "Conditioned feed": "مياه تغذية مهيأة",
  "Salt": "الملح",
  "Sodium chloride brine": "محلول كلوريد الصوديوم",
  "Electricity": "الكهرباء",
  "Controlled current": "تيار كهربائي مضبوط",
  "Diaphragmatic cell": "خلية غشائية",
  "Anolyte": "الأنولايت",
  "Disinfection solution": "محلول التطهير",
  "Fresh generation on demand reduces reliance on transported and stored disinfectants.": "الإنتاج الطازج عند الطلب يقلل الاعتماد على المطهرات المنقولة والمخزنة.",
  "A scalable generation platform designed to simplify supply, dosing and operational hygiene across the farm.": "منصة إنتاج قابلة للتوسع صُممت لتبسيط الإمداد والجرعات والنظافة التشغيلية في أنحاء المزرعة.",
  "On-Site Generation": "الإنتاج في الموقع",
  "Uses only salt, water and electricity.": "يستخدم الملح والماء والكهرباء فقط.",
  "Fresh On Demand": "طازج عند الطلب",
  "Produces active solution close to the point of use.": "ينتج المحلول الفعّال بالقرب من نقطة الاستخدام.",
  "Automated Control": "تحكم آلي",
  "Supports controlled dosing and repeatable operation.": "يدعم الجرعات المضبوطة والتشغيل المتكرر.",
  "Scalable Capacity": "سعة قابلة للتوسع",
  "System capacity can be matched to farm demand.": "يمكن مواءمة سعة النظام مع احتياجات المزرعة.",
  "Reduced Logistics": "تقليل الخدمات اللوجستية",
  "Cuts dependence on transported and stored disinfectants.": "يقلل الاعتماد على المطهرات المنقولة والمخزنة.",
  "One Farm Platform": "منصة واحدة للمزرعة",
  "Supports water, cleaning, disinfection, fogging and chillers.": "تدعم المياه والتنظيف والتطهير والضباب الرذاذي والمبرّدات.",
  "ANOLYTE": "أنولايت",
  "CATHOLYTE": "كاثولايت",
  "DISINFECTION": "التطهير",
  "CLEANING & DEGREASING": "التنظيف وإزالة الدهون",
  "Oxidizing solution used for microbial control, water treatment and sanitation.": "محلول مؤكسد للتحكم الميكروبي ومعالجة المياه والتطهير.",
  "Broad-spectrum germicidal function": "فعالية واسعة الطيف ضد الجراثيم",
  "Alkaline reducing solution used for washing, cleaning support and process applications.": "محلول قلوي مختزل يُستخدم للغسيل ودعم التنظيف وتطبيقات التشغيل.",
  "Detergent / degreasing function": "وظيفة التنظيف وإزالة الدهون",
  "Anolyte combines fast microbial control with practical farm-wide application and fresh on-site availability.": "يجمع الأنولايت بين التحكم الميكروبي السريع وسهولة التطبيق في المزرعة والإنتاج الطازج في الموقع.",
  "ACTIVE": "فعّال",
  "Generated fresh where it is needed": "يُنتج طازجًا حيث تدعو الحاجة",
  "Broad-Spectrum Control": "تحكم واسع الطيف",
  "Targets bacteria, viruses and fungi.": "يستهدف البكتيريا والفيروسات والفطريات.",
  "Rapid Action": "مفعول سريع",
  "Delivers fast disinfection at practical dosing levels.": "يحقق تطهيرًا سريعًا بجرعات عملية.",
  "Water & Surface Use": "للمياه والأسطح",
  "Suitable for drinking systems and sanitation programs.": "مناسب لأنظمة الشرب وبرامج التطهير.",
  "Biofilm Support": "التحكم في الأغشية الحيوية",
  "Helps control contamination inside water lines.": "يساعد في التحكم بالتلوث داخل خطوط المياه.",
  "Low Residue Burden": "بقايا كيميائية أقل",
  "Reduces reliance on persistent conventional chemicals.": "يقلل الاعتماد على المواد الكيميائية التقليدية المستمرة.",
  "Fresh Availability": "توافر طازج",
  "Produced on demand without routine chemical deliveries.": "يُنتج عند الطلب دون توريدات كيميائية دورية.",
  "CONVENTIONAL CHEMICAL MODEL": "نموذج المواد الكيميائية التقليدية",
  "Purchase → Transport → Store → Handle → Repeat": "شراء ← نقل ← تخزين ← تداول ← تكرار",
  "Transport & storage burden": "عبء النقل والتخزين",
  "Leak and handling exposure": "مخاطر التسرب والتداول",
  "Cost tied to recurring purchases": "تكلفة مرتبطة بالمشتريات المتكررة",
  "ENVIROLYTE MODEL": "نموذج إنفيرولايت",
  "Generate On-Site → Dose → Use When Needed": "إنتاج في الموقع ← ضبط الجرعة ← استخدام عند الحاجة",
  "Low generation cost": "تكلفة إنتاج منخفضة",
  "Reduced transportation": "تقليل النقل",
  "Potentially steadier cost structure": "هيكل تكلفة أكثر استقرارًا",
  "Evaluate the operational baseline": "قيّم خط الأساس التشغيلي",
  "Drinking water system": "نظام مياه الشرب",
  "Current disinfection procedures": "إجراءات التطهير الحالية",
  "Medication and chemical usage": "استخدام الأدوية والمواد الكيميائية",
  "Mortality levels": "معدلات النفوق",
  "Farm sanitation requirements": "متطلبات تطهير المزرعة",
  "Potential operational savings": "الوفورات التشغيلية المحتملة",
  "FROM CLEANER WATER → SAFER OPERATIONS → BETTER POULTRY PERFORMANCE": "مياه أنظف ← عمليات أكثر أمانًا ← أداء أفضل للدواجن",
  "Team assessing poultry farm water treatment and sanitation requirements": "فريق يقيّم متطلبات معالجة المياه والتطهير في مزرعة دواجن",
  "Assessment connects site conditions to the right treatment program": "يربط التقييم ظروف الموقع ببرنامج المعالجة المناسب",
  "Safety": "السلامة",
  "Simple handling\nNon-hazardous operation": "تداول بسيط\nتشغيل غير خطر",
  "Environment": "البيئة",
  "Lower environmental impact\n100% biodegradable*": "أثر بيئي أقل\nقابل للتحلل الحيوي 100%*",
  "Performance": "الأداء",
  "Fast-acting biocide\nLonger residual effect": "مبيد حيوي سريع المفعول\nأثر متبقٍ لمدة أطول",
  "Simplicity": "البساطة",
  "Generated on site\nUsed when needed": "يُنتج في الموقع\nويُستخدم عند الحاجة",
  "Fast-acting • Powerful biocide • Simple to handle • Non-toxic* • Environmentally friendly*": "سريع المفعول • مبيد حيوي قوي • سهل التداول • غير سام* • صديق للبيئة*",
  "*As described in the supplied material; application and regulatory requirements should be validated locally.": "*وفقًا لما ورد في المواد المقدمة؛ يجب التحقق محليًا من متطلبات التطبيق واللوائح.",
  "Holland": "هولندا",
  "Germany": "ألمانيا",
  "Canada": "كندا",
  "Switzerland": "سويسرا",
  "Qatar": "قطر",
  "60,000 mother hens": "60,000 من أمهات الدواجن",
  "61,000 mother hens": "61,000 من أمهات الدواجن",
  "30,000 meat turkeys": "30,000 ديك رومي للتسمين",
  "Installed": "تاريخ التركيب",
  "Dosing": "الجرعة",
  "December 2012": "ديسمبر 2012",
  "November 2011": "نوفمبر 2011",
  "April 2007": "أبريل 2007",
  "3% in drinking water": "3% في مياه الشرب",
  "2.5% in drinking water": "2.5% في مياه الشرب",
  "Reported: 1% total mortality; acid and other chemicals reduced to zero.": "المُبلّغ عنه: 1% إجمالي نفوق، وخفض الأحماض والمواد الكيميائية الأخرى إلى الصفر.",
  "Open case study ↗": "فتح دراسة الحالة ↗",
  "Supplied poultry installation photos": "صور منشآت دواجن مقدمة",
  "Envirolyte equipment and treatment vessels in an installation room": "معدات إنفيرولايت وأوعية المعالجة داخل غرفة التركيب",
  "Installed treatment equipment": "معدات المعالجة المركبة",
  "Poultry farm site and installed Envirolyte equipment": "موقع مزرعة دواجن ومعدات إنفيرولايت المركبة",
  "Farm site and installation": "موقع المزرعة والتركيب",
  "Additional poultry references": "مراجع إضافية في قطاع الدواجن",
  "Open supplied reference list ↗": "فتح قائمة المراجع المقدمة ↗",
  "Layers": "دجاج بيّاض",
  "Broilers": "دجاج لاحم",
  "Installation and outcome details are reproduced from the supplied case materials; no independent verification was provided.": "تفاصيل التركيبات والنتائج من مواد الحالات المقدمة، ولم يتم تقديم تحقق مستقل.",
  "Your browser does not support the video element.": "متصفحك لا يدعم تشغيل الفيديو.",
  "Qatar poultry operations • Supplied project video": "عمليات دواجن في قطر • فيديو المشروع المقدم",
  "NIL": "لا شيء",
  "Antibiotics & reduced medication": "المضادات الحيوية والأدوية المخفضة",
  "Conventional disinfectants & sterilizers": "المطهرات ومواد التعقيم التقليدية",
  "Mortality rate": "معدل النفوق",
  "Average bird weight": "متوسط وزن الطائر",
  "Average feed per bird": "متوسط العلف لكل طائر",
  "1.6–1.7 kg": "1.6–1.7 كجم",
  "2.2 kg": "2.2 كجم",
  "25–27 DAYS": "25–27 يومًا",
  "Cycle time": "مدة الدورة",
  "Operational results reported in the supplied presentation; no independent verification was provided.": "النتائج التشغيلية كما وردت في العرض المقدم، ولم يتم تقديم تحقق مستقل.",
  "Envirolyte on-site production unit installed at a poultry farm in Qatar": "وحدة إنتاج إنفيرولايت في الموقع داخل مزرعة دواجن في قطر",
  "Envirolyte equipment and tank connections at a poultry farm in Qatar": "معدات إنفيرولايت وربط الخزانات في مزرعة دواجن في قطر",
  "On-site production unit": "وحدة الإنتاج في الموقع",
  "Equipment and tank connections": "المعدات وربط الخزانات",
  "COMPLETED PROJECT • QATAR": "مشروع منفذ • قطر",
  "Reported operating outcomes after system implementation:": "النتائج التشغيلية المُبلّغ عنها بعد تطبيق النظام:",
  "Operation under intensive rearing conditions.": "التشغيل تحت ظروف التربية المكثفة.",
  "lower mortality rate.": "انخفاض في معدل النفوق.",
  "less medication use.": "انخفاض في استخدام الأدوية.",
  "Improved chick vigor, with livelier and more robust birds.": "تحسنت حيوية الكتاكيت وأصبحت الطيور أكثر نشاطًا وقوة.",
  "Better feed utilization, faster weight gain, and fewer days on feed.": "تحسنت الاستفادة من العلف وتسارعت زيادة الوزن مع تقليل أيام التغذية.",
  "Results are reproduced from the supplied project material and apply to this reported case; no independent verification was provided.": "النتائج من مواد المشروع المقدمة وتنطبق على هذه الحالة المُبلّغ عنها؛ ولم يتم تقديم تحقق مستقل.",
  "Quality management system": "نظام إدارة الجودة",
  "U.S. Environmental Protection Agency": "وكالة حماية البيئة الأمريكية",
  "U.S. Food and Drug Administration": "إدارة الغذاء والدواء الأمريكية",
  "Water health and safety standards": "معايير صحة وسلامة المياه",
  "European Chemicals Agency": "الوكالة الأوروبية للمواد الكيميائية",
  "Open ISO certificate ↗": "فتح شهادة ISO ↗",
  "Open EPA approval ↗": "فتح اعتماد EPA ↗",
  "Open FDA letter ↗": "فتح خطاب FDA ↗",
  "Company document ↗": "وثيقة الشركة ↗",
  "Tallinn facility ↗": "منشأة تالين ↗",
  "Open ECHA document ↗": "فتح وثيقة ECHA ↗",
  "Local accreditations and tests": "الاعتمادات والاختبارات المحلية",
  "ACES laboratory test report": "تقرير اختبار مختبر ACES",
  "ACES test report": "تقرير اختبار ACES",
  "Microbiological effectiveness of Anolyte": "الفعالية الميكروبيولوجية للأنولايت",
  "Open the original document ↗": "فتح الوثيقة الأصلية ↗",
  "Qatar University College of Engineering letter": "خطاب كلية الهندسة بجامعة قطر",
  "Qatar University — College of Engineering": "جامعة قطر — كلية الهندسة",
  "Laboratory trials on ANOX solution": "تجارب مخبرية على محلول ANOX",
  "Local test and review evidence supporting technical evaluation in Qatar.": "أدلة اختبار ومراجعة محلية تدعم التقييم الفني في قطر.",
  "Each document should be read according to its scope, date and stated test conditions.": "تُقرأ كل وثيقة وفق نطاقها وتاريخها وشروط الاختبار الواردة فيها.",
  "Europe": "أوروبا",
  "Broad commercial acceptance": "قبول تجاري واسع",
  "United States": "الولايات المتحدة",
  "Market presence and use cases": "حضور في السوق وحالات استخدام",
  "Global": "عالميًا",
  "Applications across multiple sectors": "تطبيقات في قطاعات متعددة",
  "World map": "خريطة العالم",
  "System selection and application remain subject to water quality, dosing requirements, capacity and local regulation.": "يظل اختيار النظام وتطبيقه خاضعين لجودة المياه ومتطلبات الجرعات والسعة واللوائح المحلية.",
  "Every bird drinks water. Every day.": "كل طائر يشرب الماء، كل يوم.",
  "That makes water one of the most powerful intervention points in poultry production.": "وهذا يجعل المياه من أقوى نقاط التدخل في إنتاج الدواجن.",
  "BIOSECURITY + EFFICIENCY + COST CONTROL": "الأمن الحيوي + الكفاءة + التحكم في التكلفة",
  "Presentation controls": "عناصر التحكم في العرض",
  "Previous slide": "الشريحة السابقة",
  "Next slide": "الشريحة التالية",
  "Open slide menu": "فتح قائمة الشرائح",
  "Toggle animation": "تشغيل أو إيقاف الحركة",
  "Fullscreen": "ملء الشاشة",
  "Keyboard help": "مساعدة لوحة المفاتيح",
  "Slide navigator": "قائمة الشرائح",
  "Presentation Navigator": "التنقل بين الشرائح",
  "Envirolyte for Poultry": "إنفيرولايت لقطاع الدواجن",
  "Presentation help": "مساعدة العرض",
  "CONTROLS": "عناصر التحكم",
  "Present with confidence": "قدّم العرض بثقة",
  "Next scene": "الشريحة التالية",
  "Previous scene": "الشريحة السابقة",
  "Advance": "تقدم",
  "Full screen": "ملء الشاشة",
  "First scene": "الشريحة الأولى",
  "Last scene": "الشريحة الأخيرة",
  "Swipe left or right on touch screens. Click the slide counter to jump directly to any scene.": "اسحب يمينًا أو يسارًا على الشاشات اللمسية، واضغط عدّاد الشرائح للانتقال مباشرة إلى أي شريحة.",
  "Switch to Arabic": "التبديل إلى العربية",
  "Switch to English": "التبديل إلى الإنجليزية",
};

function translateText(text: string, language: Language): string {
  if (language === "en") return text;
  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  const translated = arabicCopy[text.trim()];
  return translated ? `${leading}${translated}${trailing}` : text;
}

function localizeNode(node: React.ReactNode, language: Language): React.ReactNode {
  if (language === "en" || node == null || typeof node === "boolean" || typeof node === "number") return node;
  if (typeof node === "string") return translateText(node, language);
  if (Array.isArray(node)) return node.map((child) => localizeNode(child, language));
  if (!isValidElement(node)) return node;
  const element = node as React.ReactElement<Record<string, unknown>>;
  const props = element.props;
  const localizedProps: Record<string, unknown> = {};
  if (Object.prototype.hasOwnProperty.call(props, "children")) localizedProps.children = localizeNode(props.children as React.ReactNode, language);
  for (const attribute of ["aria-label", "alt", "title"] as const) {
    if (typeof props[attribute] === "string") localizedProps[attribute] = translateText(props[attribute], language);
  }
  return cloneElement(element, localizedProps);
}

const slides: Slide[] = [
  { kicker: "Poultry Industry", title: "A Complete Water Treatment & Disinfection Solution for the Poultry Industry", type: "cover", image: "/images/cover-chickens.jpg" },
  { kicker: "The Challenge", title: "Disease Is Not Only a Health Problem — It Is a Business Problem", type: "challenge", image: "/images/poultry-biosecurity-inspection.png" },
  { kicker: "The Gap", title: "Traditional Disinfection Solves Isolated Problems. Farms Need a Complete System.", type: "journey" },
  { kicker: "The Strategic Message", title: "Control the Water. Control More of the Farm’s Risk.", type: "strategy", image: "/images/qatar-chicks.png" },
  { kicker: "Safety & Sustainability", title: "Powerful Against Microorganisms. Designed for Safer Operations.", type: "safety" },
  { kicker: "The Solution", title: "Envirolyte Extends Water Treatment Into Farm-Wide Biosecurity", type: "solution", image: "/images/envirolyte-system.png" },
  { kicker: "Across the Farm", title: "One Technology. Multiple Poultry Applications.", type: "applications", image: "/images/poultry-sanitation-misting.png" },
  { kicker: "How It Works", title: "Generated On-Site Using Only Salt, Water & Electricity", type: "process" },
  { kicker: "System Advantages", title: "Why the Envirolyte System Is Built for Poultry Operations", type: "system-benefits" },
  { kicker: "System Outputs", title: "Two Electrolyzed Solutions. Two Different Functions.", type: "outputs" },
  { kicker: "Anolyte Advantages", title: "A High-Performance Disinfection Solution Generated Fresh On-Site", type: "anolyte-benefits" },
  { kicker: "Business Case", title: "This Is More Than Disinfection — It Is an Operational Cost Decision", type: "business" },
  { kicker: "Assessment & Rollout", title: "Start With an Assessment of Your Farm", type: "assessment", image: "/images/farm-assessment-team.png" },
  { kicker: "Qatar Results — As Reported", title: "What Did the Farm Achieve?", type: "qatar" },
  { kicker: "Completed Projects in Qatar", title: "Poultry Farm — Operating Outcomes in Qatar", type: "qatar-poultry-project", images: ["/images/qatar-poultry-farm-unit.jpeg", "/images/qatar-poultry-farm-tanks.jpeg"] },
  { kicker: "International accreditations", title: "International accreditations", type: "accreditations" },
  { kicker: "Local accreditations", title: "ACES and Qatar University", type: "local-accreditations" },
  { kicker: "International Poultry References", title: "Selected Poultry References & Field Case Studies", type: "references" },
];

const benefits = [
  ["01", "Mortality", "Higher flock losses"],
  ["02", "Medication", "More treatment requirements"],
  ["03", "Efficiency", "Lower operational performance"],
  ["04", "Water", "Continuous contamination risk"],
  ["05", "Biosecurity", "Pressure across people and assets"],
];

const apps = ["Drinking water systems", "Barn air — fogging", "Barn floors", "Hatcheries", "Chiller water", "Staff hands & feet", "Vehicles and access points"];
const assessment = ["Drinking water system", "Current disinfection procedures", "Medication and chemical usage", "Mortality levels", "Farm sanitation requirements", "Potential operational savings"];
const accreditations = [
  { code: "ISO", title: "ISO 9001:2015", description: "Quality management system", tone: "navy", links: [["Open ISO certificate ↗", "/accreditations/iso-9001-2015.jpeg"]] },
  { code: "EPA", title: "EPA", description: "U.S. Environmental Protection Agency", tone: "green", links: [["Open EPA approval ↗", "/accreditations/envirolyte-epa-approval.pdf"]] },
  { code: "FDA", title: "FDA", description: "U.S. Food and Drug Administration", tone: "amber", links: [["Open FDA letter ↗", "/accreditations/fda-letter.jpeg"]] },
  { code: "NSF", title: "NSF", description: "Water health and safety standards", tone: "navy", links: [["Company document ↗", "/accreditations/nsf-ansi-61-company.jpeg"], ["Tallinn facility ↗", "/accreditations/nsf-ansi-61-tallinn.jpeg"]] },
  { code: "ECHA", title: "ECHA", description: "European Chemicals Agency", tone: "green", links: [["Open ECHA document ↗", "/accreditations/echa-approval-2016.pdf"]] },
];
const poultryCaseStudies = [
  { country: "Holland", client: "Alfons Weerink", flock: "60,000 mother hens", unit: "EL400", installed: "December 2012", dosing: "3% in drinking water", source: "/references/weerink-netherlands.pdf" },
  { country: "Germany", client: "P & P Farmbetrieb Doetlingen", flock: "61,000 mother hens", unit: "EL900", installed: "November 2011", dosing: "2.5% in drinking water", source: "/references/doetlingen-germany.pdf" },
  { country: "Canada", client: "Starlite Colony", flock: "30,000 meat turkeys", unit: "EL6000", installed: "April 2007", dosing: "3% in drinking water", result: "Reported: 1% total mortality; acid and other chemicals reduced to zero.", source: "/references/starlite-canada-turkey-farm.pdf" },
];
const poultryReferences = [
  ["Cocorico", "Switzerland", "2009", "Layers"],
  ["Geflügelhof Weber", "Germany", "2016", "Layers"],
  ["Mosterd Poultry Farms Ltd.", "Canada", "2008", "Broilers"],
  ["ELTKAWI Poultry Farm", "Qatar", "2019", "Broilers"],
];

function Dots({ count, active }: { count: number; active: number }) {
  return <div className="mini-dots" aria-hidden="true">{Array.from({ length: count }, (_, i) => <span key={i} className={i === active ? "on" : ""} />)}</div>;
}

function Scene({ slide, index, language }: { slide: Slide; index: number; language: Language }) {
  const slideImage = slide.image ? asset(slide.image) : undefined;
  const frame = (children: React.ReactNode) => (
    <>
      <header className="scene-head reveal"><span>{translateText(slide.kicker, language)}</span><div className="brand-word">ENVIROLYTE</div></header>
      <main className="scene-main">{localizeNode(children, language)}</main>
      <footer className="scene-foot reveal"><span>{translateText("ENVIROLYTE • POULTRY BIOSECURITY", language)}</span><strong>{String(index + 1).padStart(2, "0")}</strong></footer>
    </>
  );

  if (slide.type === "cover") return localizeNode(
    <div className="cover-layout">
      <div className="cover-copy">
        <div className="cover-partners reveal" aria-label="Envirolyte and Raseen Aqua Solutions">
          <div className="partner-card envirolyte-partner"><img src={asset("/images/envirolyte-logo.png")} alt="Envirolyte" /></div>
          <div className="partner-card raseen-partner"><img src={asset("/images/raseen-logo.jpeg")} alt="Raseen Aqua Solutions logo" /><span>RASEEN AQUA SOLUTIONS</span></div>
        </div>
        <p className="eyebrow cover-industry reveal">Poultry Industry</p>
        <h1 className="hero-title reveal">A Complete Water Treatment &amp; Disinfection Solution for the Poultry Industry</h1>
        <div className="cover-pillars reveal" aria-label="Core solution areas">
          <span>Sterilization &amp; Disinfection</span>
          <span>Water Purification</span>
        </div>
        <p className="cover-support reveal">For safer operations, healthier birds, and better farm performance.</p>
      </div>
      <div className="cover-image" style={{ backgroundImage: `url(${slideImage})` }}><div className="water-glow" /></div>
    </div>, language
  );

  if (slide.type === "challenge") return frame(<div className="split media-right"><div className="copy-block"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Diseases and infections create compounding operational pressure across every production cycle.</p><div className="issue-list">{benefits.map(([n, a, b], i) => <div className="issue reveal" key={a} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}><b>{n}</b><strong>{a}</strong><span>{b}</span></div>)}</div></div><figure className="photo reveal"><img src={slideImage} alt="Worker disinfecting a poultry barn" /></figure></div>);

  if (slide.type === "journey") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Effective biosecurity must cover the entire contamination journey — not one chemical or one location.</p><div className="journey journey-six">{[["Water", "Daily intake"], ["Barns", "Living environment"], ["Equipment", "Contact surfaces"], ["Workers", "Movement & hygiene"], ["Vehicles", "Farm access"], ["Chillers", "Cooling units"]].map(([a, b], i) => <div className="journey-node reveal" key={a} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}><b>{i + 1}</b><strong>{a}</strong><span>{b}</span></div>)}</div><div className="thesis reveal">One weak point can reintroduce risk across the full operation.</div></div>);

  if (slide.type === "solution") return frame(<div className="split media-right"><div className="copy-block"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A comprehensive, eco-conscious and cost-focused program — generated on site and applied where the farm needs it.</p><ul className="check-list">{["Drinking water treatment", "Barn cleaning and disinfection", "Microbial control", "Farm sanitation", "Eliminate the use of conventional chemical disinfectants"].map((x, i) => <li className="reveal" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} key={x}>{x}</li>)}</ul></div><figure className="photo equipment reveal"><img src={slideImage} alt="Envirolyte generation equipment" /></figure></div>);

  if (slide.type === "applications") return frame(<div className="split media-right"><div><h2 className="scene-title reveal">{slide.title}</h2><div className="application-list">{apps.map((x, i) => <div className="application reveal" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties} key={x}><b>{i + 1}</b><span>{x}</span></div>)}</div></div><figure className="photo reveal"><img src={slideImage} alt="Poultry sanitation misting application" /></figure></div>);

  if (slide.type === "process") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A conditioned brine solution passes through a diaphragmatic electrolysis cell to create fresh active solutions close to the point of use.</p><div className="process">{[["Water", "Conditioned feed"], ["Salt", "Sodium chloride brine"], ["Electricity", "Controlled current"], ["Envirolyte", "Diaphragmatic cell"], ["Anolyte", "Disinfection solution"]].map(([a, b], i) => <article className="process-step reveal" key={a} style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}><em>{String(i + 1).padStart(2, "0")}</em><strong>{a}</strong><span>{b}</span></article>)}</div><div className="soft-thesis reveal">Fresh generation on demand reduces reliance on transported and stored disinfectants.</div></div>);

  if (slide.type === "system-benefits") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A scalable generation platform designed to simplify supply, dosing and operational hygiene across the farm.</p><div className="benefit-matrix">{[
    ["01", "On-Site Generation", "Uses only salt, water and electricity."],
    ["02", "Fresh On Demand", "Produces active solution close to the point of use."],
    ["03", "Automated Control", "Supports controlled dosing and repeatable operation."],
    ["04", "Scalable Capacity", "System capacity can be matched to farm demand."],
    ["05", "Reduced Logistics", "Cuts dependence on transported and stored disinfectants."],
    ["06", "One Farm Platform", "Supports water, cleaning, disinfection, fogging and chillers."],
  ].map(([n, a, b], i) => <article className="benefit-tile reveal" key={a} style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}><b>{n}</b><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></div>);

  if (slide.type === "outputs") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="solution-pair"><article className="solution-card aqua reveal"><div className="round-icon">A</div><h3>ANOLYTE</h3><b>DISINFECTION</b><p>Oxidizing solution used for microbial control, water treatment and sanitation.</p><small>Broad-spectrum germicidal function</small></article><article className="solution-card green reveal"><div className="round-icon">C</div><h3>CATHOLYTE</h3><b>CLEANING &amp; DEGREASING</b><p>Alkaline reducing solution used for washing, cleaning support and process applications.</p><small>Detergent / degreasing function</small></article></div></div>);

  if (slide.type === "anolyte-benefits") return frame(<div className="anolyte-benefits-slide"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Anolyte combines fast microbial control with practical farm-wide application and fresh on-site availability.</p><div className="anolyte-layout"><div className="anolyte-core reveal"><span>ANOLYTE</span><strong>ACTIVE<br />DISINFECTION</strong><small>Generated fresh where it is needed</small></div><div className="anolyte-points">{[
    ["Broad-Spectrum Control", "Targets bacteria, viruses and fungi."],
    ["Rapid Action", "Delivers fast disinfection at practical dosing levels."],
    ["Water & Surface Use", "Suitable for drinking systems and sanitation programs."],
    ["Biofilm Support", "Helps control contamination inside water lines."],
    ["Low Residue Burden", "Reduces reliance on persistent conventional chemicals."],
    ["Fresh Availability", "Produced on demand without routine chemical deliveries."],
  ].map(([a, b], i) => <article className="anolyte-point reveal" key={a} style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}><b>{i + 1}</b><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></div></div>);

  if (slide.type === "business") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="business-pair"><article className="model old reveal"><h3>CONVENTIONAL CHEMICAL MODEL</h3><div className="model-flow">Purchase → Transport → Store → Handle → Repeat</div><ul><li>Transport &amp; storage burden</li><li>Leak and handling exposure</li><li>Cost tied to recurring purchases</li></ul></article><article className="model new reveal"><h3>ENVIROLYTE MODEL</h3><div className="model-flow">Generate On-Site → Dose → Use When Needed</div><ul><li>Low generation cost</li><li>Reduced transportation</li><li>Potentially steadier cost structure</li></ul></article></div></div>);

  if (slide.type === "assessment") return frame(<div className="assessment-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="assessment-layout"><div><h3 className="subhead reveal">Evaluate the operational baseline</h3><div className="application-list compact">{assessment.map((x, i) => <div className={`application reveal ${i === 5 ? "accent" : ""}`} style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={x}><b>✓</b><span>{x}</span></div>)}</div><div className="thesis reveal">FROM CLEANER WATER → SAFER OPERATIONS → BETTER POULTRY PERFORMANCE</div></div><figure className="photo assessment-photo reveal"><img src={slideImage} alt="Team assessing poultry farm water treatment and sanitation requirements" /><figcaption>Assessment connects site conditions to the right treatment program</figcaption></figure></div></div>);

  if (slide.type === "safety") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="safety-grid">{[["Safety", "Simple handling\nNon-hazardous operation"], ["Environment", "Lower environmental impact\n100% biodegradable*"], ["Performance", "Fast-acting biocide\nLonger residual effect"], ["Simplicity", "Generated on site\nUsed when needed"]].map(([a, b], i) => <article className="safety-item reveal" key={a}><b>{i + 1}</b><h3>{a}</h3><p>{b}</p></article>)}</div><div className="thesis reveal">Fast-acting • Powerful biocide • Simple to handle • Non-toxic* • Environmentally friendly*</div><p className="fineprint reveal">*As described in the supplied material; application and regulatory requirements should be validated locally.</p></div>);

  if (slide.type === "references") return frame(<div className="references-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="references-content"><div className="case-study-grid">{poultryCaseStudies.map((item, i) => <article className={`case-study reveal ${i === 2 ? "featured" : ""}`} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} key={item.client}><div className="case-study-head"><span>{item.country}</span><b>{item.unit}</b></div><h3>{item.client}</h3><strong>{item.flock}</strong><dl><div><dt>Installed</dt><dd>{item.installed}</dd></div><div><dt>Dosing</dt><dd>{item.dosing}</dd></div></dl>{item.result && <p className="case-result">{item.result}</p>}<a href={asset(item.source)} target="_blank" rel="noopener noreferrer">Open case study ↗</a></article>)}</div><div className="reference-photo-grid reveal" aria-label="Supplied poultry installation photos"><a href={asset("/images/poultry-reference-equipment-room.jpeg")} target="_blank" rel="noopener noreferrer"><img src={asset("/images/poultry-reference-equipment-room.jpeg")} alt="Envirolyte equipment and treatment vessels in an installation room" /><span>Installed treatment equipment</span></a><a href={asset("/images/poultry-reference-farm-site.jpeg")} target="_blank" rel="noopener noreferrer"><img src={asset("/images/poultry-reference-farm-site.jpeg")} alt="Poultry farm site and installed Envirolyte equipment" /><span>Farm site and installation</span></a></div></div><div className="reference-strip reveal"><div className="reference-strip-head"><strong>Additional poultry references</strong><a href={asset("/references/poultry-reference-list.jpeg")} target="_blank" rel="noopener noreferrer">Open supplied reference list ↗</a></div><div className="reference-list">{poultryReferences.map(([client, country, year, sector]) => <div className="reference-item" key={client}><b>{client}</b><span>{country}</span><span>{year}</span><strong>{sector}</strong></div>)}</div></div><p className="fineprint reveal">Installation and outcome details are reproduced from the supplied case materials; no independent verification was provided.</p></div>);

  if (slide.type === "qatar") return frame(<div className="qatar-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="qatar-layout"><figure className="qatar-video-wrap reveal"><video className="qatar-video" controls playsInline preload="metadata"><source src={asset("/Video/WhatsApp Video 2026-08-13 at 4.41.49 PM.mp4")} type="video/mp4" />Your browser does not support the video element.</video><figcaption>Qatar poultry operations • Supplied project video</figcaption></figure><div className="qatar-grid">{[["NIL", "Antibiotics & reduced medication"], ["NIL", "Conventional disinfectants & sterilizers"], ["2.5%", "Mortality rate"], ["1.6–1.7 kg", "Average bird weight"], ["2.2 kg", "Average feed per bird"], ["25–27 DAYS", "Cycle time"]].map(([a, b], i) => <article className={`qatar-stat reveal q${i}`} key={b}><strong>{a}</strong><span>{b}</span></article>)}</div></div><p className="fineprint reveal">Operational results reported in the supplied presentation; no independent verification was provided.</p></div>);

  if (slide.type === "qatar-poultry-project") return frame(<div className="poultry-project-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="poultry-project-layout"><div className="poultry-project-gallery reveal">{slide.images?.map((image, i) => <a className="poultry-project-photo" href={asset(image)} target="_blank" rel="noopener noreferrer" key={image}><img src={asset(image)} alt={i === 0 ? "Envirolyte on-site production unit installed at a poultry farm in Qatar" : "Envirolyte equipment and tank connections at a poultry farm in Qatar"} /><span>{i === 0 ? "On-site production unit" : "Equipment and tank connections"}</span></a>)}</div><div className="poultry-project-copy"><span className="project-status reveal">COMPLETED PROJECT • QATAR</span><p className="project-intro reveal">Reported operating outcomes after system implementation:</p><ul className="poultry-project-results">{[<>Operation under intensive rearing conditions.</>, <><strong>50%</strong> lower mortality rate.</>, <><strong>70%</strong> less medication use.</>, <>Improved chick vigor, with livelier and more robust birds.</>, <>Better feed utilization, faster weight gain, and fewer days on feed.</>].map((item, i) => <li className="reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={i}>{item}</li>)}</ul><p className="fineprint">Results are reproduced from the supplied project material and apply to this reported case; no independent verification was provided.</p></div></div></div>);

  if (slide.type === "accreditations") return frame(<div className="accreditations-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="accreditation-grid" aria-label="International accreditations">{accreditations.map((item, i) => <article className={`accreditation-card ${item.tone} reveal`} style={{ "--delay": `${i * 75}ms` } as React.CSSProperties} key={item.code}><span className="accreditation-mark">{item.code}</span><div className="accreditation-copy"><h3>{item.title}</h3><p>{item.description}</p></div><div className="accreditation-links">{item.links.map(([label, href]) => <a href={asset(href)} target="_blank" rel="noopener noreferrer" key={href}>{label}</a>)}</div></article>)}</div></div>);

  if (slide.type === "local-accreditations") return frame(<div className="local-accreditations-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="local-accreditation-grid" aria-label="Local accreditations and tests"><a className="local-accreditation-doc reveal" href={asset("/accreditations/aces-lab-report.pdf")} target="_blank" rel="noopener noreferrer"><img src={asset("/accreditations/aces-lab-report.png")} alt="ACES laboratory test report" /><strong>ACES test report</strong><span>Microbiological effectiveness of Anolyte</span><small>Open the original document ↗</small></a><a className="local-accreditation-doc reveal" href={asset("/accreditations/qatar-university-engineering.pdf")} target="_blank" rel="noopener noreferrer"><img src={asset("/accreditations/qatar-university-engineering.png")} alt="Qatar University College of Engineering letter" /><strong>Qatar University — College of Engineering</strong><span>Laboratory trials on ANOX solution</span><small>Open the original document ↗</small></a></div><div className="local-accreditation-summary reveal"><strong>Local test and review evidence supporting technical evaluation in Qatar.</strong><span>Each document should be read according to its scope, date and stated test conditions.</span></div></div>);

  if (slide.type === "global") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="global-layout"><div className="map ghost reveal"><img src={slideImage} alt="World map" /></div><div className="region-list">{[["Europe", "Broad commercial acceptance"], ["United States", "Market presence and use cases"], ["Global", "Applications across multiple sectors"]].map(([a, b], i) => <article className="region reveal" key={a}><b>{i + 1}</b><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></div><div className="soft-thesis reveal">System selection and application remain subject to water quality, dosing requirements, capacity and local regulation.</div></div>);

  if (slide.type === "strategy") return localizeNode(<div className="strategy-layout"><div className="strategy-copy"><p className="eyebrow reveal">{slide.kicker}</p><h2 className="strategy-title reveal">Control the Water.<br />Control More of the Farm’s Risk.</h2><h3 className="reveal">Every bird drinks water. Every day.</h3><p className="lead reveal">That makes water one of the most powerful intervention points in poultry production.</p><div className="thesis reveal">BIOSECURITY + EFFICIENCY + COST CONTROL</div></div><div className="strategy-image reveal" style={{ backgroundImage: `url(${slideImage})` }} /></div>, language);

  return null;
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menu, setMenu] = useState(false);
  const [help, setHelp] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem("envirolyte-poultry-language");
      return savedLanguage === "ar" || savedLanguage === "en" ? savedLanguage : "en";
    } catch {
      return "en";
    }
  });
  const touchStart = useRef<number | null>(null);
  const total = slides.length;
  const t = (text: string) => translateText(text, language);
  const go = useCallback((n: number) => { setCurrent(Math.max(0, Math.min(total - 1, n))); setMenu(false); }, [total]);
  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);
  const progress = useMemo(() => `${((current + 1) / total) * 100}%`, [current, total]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = language === "ar" ? "إنفيرولايت لقطاع الدواجن | عرض تفاعلي" : "Envirolyte for Poultry | Interactive Presentation";
    try { localStorage.setItem("envirolyte-poultry-language", language); } catch { /* Local preferences may be unavailable. */ }
  }, [language]);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, input, select, textarea, video")) return;
      if (event.key === "ArrowRight") { event.preventDefault(); language === "ar" ? prev() : next(); }
      if (event.key === "ArrowLeft") { event.preventDefault(); language === "ar" ? next() : prev(); }
      if (["PageDown", " ", "Enter"].includes(event.key)) { event.preventDefault(); next(); }
      if (event.key === "PageUp") { event.preventDefault(); prev(); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(total - 1);
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
      if (event.key === "Escape") { setMenu(false); setHelp(false); }
      if (event.key === "?") setHelp(true);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go, language, next, prev, total]);

  return (
    <div className={`presentation ${quiet ? "quiet" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current == null) return; const d = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(d) > 55) language === "ar" ? (d > 0 ? next() : prev()) : (d < 0 ? next() : prev()); touchStart.current = null; }}>
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <div className="deck" aria-live="polite">
        <div className="brand-rails" aria-hidden="true"><i /><i /><i /></div>
        {slides.map((slide, index) => <section key={slide.title} className={`scene ${index === current ? "active" : index < current ? "past" : "future"}`} aria-hidden={index !== current}><Scene slide={slide} index={index} language={language} /></section>)}
        <div className="progress"><i style={{ width: progress }} /></div>
        <nav className="controls" aria-label={t("Presentation controls")}>
          <button onClick={prev} disabled={current === 0} aria-label={t("Previous slide")}>{language === "ar" ? "→" : "←"}</button>
          <button className="counter" onClick={() => setMenu(true)} aria-label={t("Open slide menu")}><b>{String(current + 1).padStart(2, "0")}</b><span>/ {String(total).padStart(2, "0")}</span></button>
          <button onClick={next} disabled={current === total - 1} aria-label={t("Next slide")}>{language === "ar" ? "←" : "→"}</button>
        </nav>
        <div className="utility">
          <button className="language-toggle" onClick={() => setLanguage(language === "en" ? "ar" : "en")} title={t(language === "en" ? "Switch to Arabic" : "Switch to English")} aria-label={t(language === "en" ? "Switch to Arabic" : "Switch to English")}>{language === "en" ? "AR" : "EN"}</button>
          <button onClick={() => setQuiet(!quiet)} title={t("Toggle animation")}>{quiet ? "▶" : "◌"}</button>
          <button onClick={() => document.documentElement.requestFullscreen?.()} title={t("Fullscreen")}>⛶</button>
          <button onClick={() => setHelp(true)} title={t("Keyboard help")}>?</button>
        </div>
        <Dots count={total} active={current} />
      </div>
      {menu && <div className="overlay" role="dialog" aria-modal="true" aria-label={t("Slide navigator")} onClick={() => setMenu(false)}><div className="drawer" onClick={(e) => e.stopPropagation()}><header><div><span>{t("Presentation Navigator")}</span><h2>{t("Envirolyte for Poultry")}</h2></div><button onClick={() => setMenu(false)} aria-label={language === "ar" ? "إغلاق" : "Close"}>×</button></header><div className="slide-menu">{slides.map((s, i) => <button key={s.title} onClick={() => go(i)} className={i === current ? "active" : ""}><b>{String(i + 1).padStart(2, "0")}</b><span><em>{t(s.kicker)}</em>{t(s.title)}</span></button>)}</div></div></div>}
      {help && <div className="overlay" role="dialog" aria-modal="true" aria-label={t("Presentation help")} onClick={() => setHelp(false)}><div className="help-card" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setHelp(false)} aria-label={language === "ar" ? "إغلاق" : "Close"}>×</button><span className="eyebrow">{t("CONTROLS")}</span><h2>{t("Present with confidence")}</h2><div className="key-grid"><kbd>{language === "ar" ? "←" : "→"}</kbd><span>{t("Next scene")}</span><kbd>{language === "ar" ? "→" : "←"}</kbd><span>{t("Previous scene")}</span><kbd>Space</kbd><span>{t("Advance")}</span><kbd>F</kbd><span>{t("Full screen")}</span><kbd>Home</kbd><span>{t("First scene")}</span><kbd>End</kbd><span>{t("Last scene")}</span></div><p>{t("Swipe left or right on touch screens. Click the slide counter to jump directly to any scene.")}</p></div></div>}
    </div>
  );
}
