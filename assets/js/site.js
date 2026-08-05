(() => {
  "use strict";

  const whatsappNumber = "8615520720605";
  const languagePaths = { en: "/en/", ko: "/ko/", ar: "/ar/", ru: "/ru/" };
  const regionDefaults = { korea: "ko", slavic: "ru", mena: "ar", west: "en", other: "en" };
  const storageKey = "stesstar-v4-preferences";

  const copy = {
    en: {
      chooserTitle: "Choose your market and language",
      chooserText: "We will adapt the China setup guidance and consultation route to your location.",
      country: "Your country or market",
      language: "Preferred language",
      continue: "Continue",
      close: "Close",
      formTitle: "Request a China setup assessment",
      formText: "Share the business activity, proposed city, owners and timing. Do not upload passports or bank statements here.",
      name: "Name",
      contact: "Email / WhatsApp / Telegram",
      market: "Country or market",
      activity: "Planned business in China",
      city: "Preferred city (if known)",
      message: "Additional context",
      consent: "I agree that my information may be used to respond to this enquiry and have read the privacy notice.",
      submit: "Send assessment request",
      opening: "Your details are ready. Opening a private WhatsApp conversation…",
      required: "Please complete the required fields and privacy acknowledgement."
    },
    ko: {
      chooserTitle: "국가와 언어를 선택하세요",
      chooserText: "중국 법인 설립 안내와 상담 경로를 고객님의 지역에 맞게 제공합니다.",
      country: "국가 또는 시장",
      language: "선호 언어",
      continue: "계속하기",
      close: "닫기",
      formTitle: "중국 법인 설립 사전 진단 신청",
      formText: "사업 내용, 희망 도시, 주주와 일정을 알려주세요. 여권이나 은행 명세서는 이 양식에 업로드하지 마세요.",
      name: "이름",
      contact: "이메일 / WhatsApp / Telegram",
      market: "국가 또는 시장",
      activity: "중국에서 예정한 사업",
      city: "희망 도시(있는 경우)",
      message: "추가 설명",
      consent: "문의 답변을 위해 내 정보를 처리하는 데 동의하며 개인정보 안내를 확인했습니다.",
      submit: "사전 진단 요청 보내기",
      opening: "입력 내용이 준비되었습니다. WhatsApp 비공개 상담으로 이동합니다…",
      required: "필수 항목과 개인정보 동의를 확인해주세요."
    },
    ar: {
      chooserTitle: "اختر بلدك ولغتك",
      chooserText: "سنخصص إرشادات تأسيس الشركة في الصين ومسار الاستشارة وفقاً لسوقك.",
      country: "بلدك أو سوقك",
      language: "اللغة المفضلة",
      continue: "متابعة",
      close: "إغلاق",
      formTitle: "اطلب تقييماً أولياً للتأسيس في الصين",
      formText: "اذكر النشاط والمدينة المقترحة والملاك والموعد. لا ترفع جوازات السفر أو الكشوف البنكية هنا.",
      name: "الاسم",
      contact: "البريد / واتساب / تيليغرام",
      market: "البلد أو السوق",
      activity: "النشاط المخطط في الصين",
      city: "المدينة المفضلة إن وجدت",
      message: "معلومات إضافية",
      consent: "أوافق على استخدام معلوماتي للرد على هذا الاستفسار وقد قرأت إشعار الخصوصية.",
      submit: "إرسال طلب التقييم",
      opening: "تم تجهيز بياناتك. جارٍ فتح محادثة خاصة عبر واتساب…",
      required: "يرجى إكمال الحقول المطلوبة والموافقة على الخصوصية."
    },
    ru: {
      chooserTitle: "Выберите страну и язык",
      chooserText: "Мы адаптируем информацию о регистрации компании в Китае и маршрут консультации под ваш рынок.",
      country: "Страна или рынок",
      language: "Предпочитаемый язык",
      continue: "Продолжить",
      close: "Закрыть",
      formTitle: "Запросить первичную оценку регистрации в Китае",
      formText: "Укажите вид деятельности, город, собственников и сроки. Не загружайте сюда паспорта или банковские выписки.",
      name: "Имя",
      contact: "Email / WhatsApp / Telegram",
      market: "Страна или рынок",
      activity: "Планируемая деятельность в Китае",
      city: "Предпочтительный город",
      message: "Дополнительная информация",
      consent: "Я согласен на обработку информации для ответа на запрос и ознакомился с уведомлением о конфиденциальности.",
      submit: "Отправить запрос",
      opening: "Данные подготовлены. Открываем защищённый диалог в WhatsApp…",
      required: "Заполните обязательные поля и подтвердите согласие."
    }
  };

  const currentLanguage = document.documentElement.lang.startsWith("ko") ? "ko"
    : document.documentElement.lang.startsWith("ar") ? "ar"
      : document.documentElement.lang.startsWith("ru") ? "ru" : "en";

  const ensureMeta = (selector, attributes) => {
    if (document.head.querySelector(selector)) return;
    const node = document.createElement("meta");
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    document.head.append(node);
  };
  const metaDescription = document.querySelector('meta[name="description"]')?.content || "China company registration and market-entry coordination for foreign founders.";
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href || "https://stesstar.com/";
  const socialImage = "https://stesstar.com/assets/images/og-default.png";
  ensureMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  ensureMeta('meta[property="og:title"]', { property: "og:title", content: document.title });
  ensureMeta('meta[property="og:description"]', { property: "og:description", content: metaDescription });
  ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
  ensureMeta('meta[property="og:image"]', { property: "og:image", content: socialImage });
  ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: document.title });
  ensureMeta('meta[name="twitter:description"]', { name: "twitter:description", content: metaDescription });
  ensureMeta('meta[name="twitter:image"]', { name: "twitter:image", content: socialImage });

  const readPreferences = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "null"); }
    catch { return null; }
  };
  const savePreferences = preference => localStorage.setItem(storageKey, JSON.stringify(preference));

  function wirePreferenceForm(root, redirect = false) {
    if (!root) return;
    const region = root.querySelector("[name='region']");
    const language = root.querySelector("[name='language']");
    const options = root.querySelectorAll(".language-option");
    const saved = readPreferences();
    if (saved?.region && region) region.value = saved.region;
    const setLanguage = value => {
      if (language) language.value = value;
      options.forEach(option => option.classList.toggle("active", option.dataset.language === value));
    };
    setLanguage(saved?.language || currentLanguage);
    region?.addEventListener("change", () => setLanguage(regionDefaults[region.value] || "en"));
    options.forEach(option => option.addEventListener("click", () => setLanguage(option.dataset.language)));
    root.addEventListener("submit", event => {
      event.preventDefault();
      const selectedLanguage = language?.value || "en";
      savePreferences({ region: region?.value || "other", language: selectedLanguage });
      if (redirect) window.location.href = languagePaths[selectedLanguage];
      else {
        document.querySelector(".preference-modal")?.classList.remove("open");
        if (selectedLanguage !== currentLanguage) window.location.href = languagePaths[selectedLanguage];
      }
    });
  }

  wirePreferenceForm(document.querySelector(".gate-form-element"), true);
  wirePreferenceForm(document.querySelector(".preference-form"), false);

  /* Turn visual labels into useful navigation instead of decorative dead ends. */
  const faqAnchors = [
    "faq-shareholder",
    "faq-remote",
    "faq-timeline",
    "faq-operating-readiness",
    "faq-banking",
    "faq-assessment",
    "faq-cost",
    "faq-cities",
    "faq-wfoe",
    "faq-capital",
    "faq-after-registration",
    "faq-investor",
    "faq-apostille"
  ];
  const faqNodes = [...document.querySelectorAll(".faq-item")];
  faqNodes.forEach((item, index) => {
    if (faqAnchors[index] && !item.id) item.id = faqAnchors[index];
  });

  const cardLinkCopy = {
    en: "Read the answer",
    ko: "관련 답변 보기",
    ar: "اقرأ الإجابة",
    ru: "Смотреть ответ"
  };
  const serviceTargets = ["faq/#faq-start", "faq/#faq-ownership", "#risks", "faq/#faq-banking", "faq/#faq-after", "faq/#faq-after"];
  document.querySelectorAll(".service-card").forEach((card, index) => {
    if (card.querySelector(".card-link") || !serviceTargets[index]) return;
    const link = document.createElement("a");
    link.className = "card-link";
    link.href = serviceTargets[index];
    link.textContent = cardLinkCopy[currentLanguage];
    link.setAttribute("aria-label", `${card.querySelector("h3")?.textContent || "Service"}: ${cardLinkCopy[currentLanguage]}`);
    card.append(link);
  });

  const proofTargets = ["faq/#faq-ownership", "faq/#faq-travel", "faq/#faq-banking", "faq/#faq-after"];
  document.querySelectorAll(".proof-grid > div").forEach((item, index) => {
    if (!proofTargets[index]) return;
    const link = document.createElement("a");
    link.className = "proof-link";
    link.href = proofTargets[index];
    link.innerHTML = item.innerHTML;
    item.replaceWith(link);
  });

  const trustTargets = ["language", "#scope", "#faq-banking"];
  document.querySelectorAll(".trust-line > span").forEach((item, index) => {
    const target = trustTargets[index];
    if (!target) return;
    const control = document.createElement(target === "language" ? "button" : "a");
    control.className = `trust-chip${target === "language" ? " locale-trigger" : ""}`;
    control.textContent = item.textContent;
    if (target === "language") control.type = "button";
    else control.href = target;
    item.replaceWith(control);
  });

  const preferenceModal = document.querySelector(".preference-modal");
  document.querySelectorAll(".locale-trigger").forEach(button => button.addEventListener("click", () => preferenceModal?.classList.add("open")));
  preferenceModal?.querySelector(".modal-close")?.addEventListener("click", () => preferenceModal.classList.remove("open"));
  preferenceModal?.addEventListener("click", event => { if (event.target === preferenceModal) preferenceModal.classList.remove("open"); });
  if (preferenceModal && !readPreferences() && !document.body.classList.contains("gate-page")) preferenceModal.classList.add("open");

  const menu = document.querySelector(".desktop-nav");
  document.querySelector(".menu-toggle")?.addEventListener("click", event => {
    const open = menu?.classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", String(Boolean(open)));
  });
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => menu.classList.remove("open")));

  document.querySelectorAll(".faq-q").forEach(button => button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  }));

  const openLinkedFaq = () => {
    if (!window.location.hash) return;
    const item = document.querySelector(window.location.hash);
    if (!item?.classList.contains("faq-item")) return;
    item.classList.add("open");
    item.querySelector(".faq-q")?.setAttribute("aria-expanded", "true");
  };
  window.addEventListener("hashchange", openLinkedFaq);
  openLinkedFaq();

  const faqItems = [...document.querySelectorAll(".faq-item")].map(item => ({
    "@type": "Question",
    "name": item.querySelector(".faq-q")?.textContent.trim(),
    "acceptedAnswer": { "@type": "Answer", "text": item.querySelector(".faq-a")?.textContent.trim() }
  })).filter(item => item.name && item.acceptedAnswer.text);
  if (faqItems.length) {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems });
    document.head.append(schema);
  }

  const enquiryModal = document.querySelector(".enquiry-modal");
  const form = enquiryModal?.querySelector("form");
  document.querySelectorAll(".js-enquiry").forEach(button => button.addEventListener("click", () => enquiryModal?.classList.add("open")));
  document.querySelectorAll(".city-choice[data-city]").forEach(button => button.addEventListener("click", () => {
    const cityInput = form?.querySelector('[name="city"]');
    if (!cityInput) return;
    cityInput.value = button.dataset.city || "";
    window.setTimeout(() => cityInput.focus(), 80);
  }));
  enquiryModal?.querySelector(".modal-close")?.addEventListener("click", () => enquiryModal.classList.remove("open"));
  enquiryModal?.addEventListener("click", event => { if (event.target === enquiryModal) enquiryModal.classList.remove("open"); });
  form?.addEventListener("submit", async event => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (!form.reportValidity()) { status.textContent = copy[currentLanguage].required; return; }
    const data = new FormData(form);
    if (data.get("website")) return;
    const lines = [
      `STES STAR · China setup enquiry · ${currentLanguage.toUpperCase()}`,
      `Name: ${data.get("name") || "—"}`,
      `Contact: ${data.get("contact") || "—"}`,
      `Country / market: ${data.get("market") || "—"}`,
      `Preferred city: ${data.get("city") || "—"}`,
      `Planned activity: ${data.get("activity") || "—"}`,
      `Additional context: ${data.get("message") || "—"}`
    ];
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    status.classList.add("is-success");
    status.textContent = copy[currentLanguage].opening;
    window.setTimeout(() => window.location.assign(whatsappUrl), 180);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    preferenceModal?.classList.remove("open");
    enquiryModal?.classList.remove("open");
  });

  /* Editorial reveal and restrained image depth. Progressive enhancement only. */
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const enhancedMotion = !reducedMotion && window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches;
  if (enhancedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");
    const revealNodes = document.querySelectorAll([
      ".section-heading",
      ".coverage-panel > *",
      ".visual-story",
      ".answer-box",
      ".service-card",
      ".route-card",
      ".scope-card",
      ".step",
      ".risk-intro",
      ".risk-item",
      ".faq",
      ".cta-panel",
      ".team-card",
      ".model-grid article"
    ].join(","));
    revealNodes.forEach((node, index) => {
      node.classList.add("reveal");
      node.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7%", threshold: .08 });
    revealNodes.forEach(node => observer.observe(node));
    window.setTimeout(() => revealNodes.forEach(node => node.classList.add("is-visible")), 900);

    document.querySelectorAll(".china-visual,.visual-story").forEach(card => {
      card.classList.add("depth-card");
      card.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;
        const box = card.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width - .5) * 8;
        const y = ((event.clientY - box.top) / box.height - .5) * 8;
        card.style.setProperty("--mx", `${x.toFixed(2)}px`);
        card.style.setProperty("--my", `${y.toFixed(2)}px`);
      }, { passive: true });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--mx", "0px");
        card.style.setProperty("--my", "0px");
      }, { passive: true });
    });
  }
})();
