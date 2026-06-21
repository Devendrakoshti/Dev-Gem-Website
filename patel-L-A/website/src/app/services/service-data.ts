export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  benefits: string[];
  faqs: ServiceFaq[];
  paragraphs: string[];
  price: string;
  cta: string;
  ctaTitle?: string;
  ctaDescription?: string;
  overviewCard?: {
    label: string;
    title: string;
  };
  overviewHighlights?: {
    label: string;
    value: string;
    detail: string;
  }[];
  pricing?: {
    title: string;
    price: string;
    note?: string;
    features: string[];
  }[];
  definition?: {
    title: string;
    paragraphs: string[];
  };
  benefitsSection?: {
    title: string;
    paragraphs: string[];
  };
  process?: {
    title: string;
    steps: { title: string; description: string }[];
  };
}

export const services: Record<string, ServiceData> = {
  "msme-registration": {
    metaTitle: "MSME Registration Online | Udyam Registration – Patel Legal Advisors",
    metaDescription: "Get your MSME / Udyam Registration done online quickly. Enjoy government subsidies, lower interest rates, tax benefits and more. Expert assistance from Patel Legal Advisors.",
    title: "MSME Registration",
    description:
      "Register your business as an MSME (Micro, Small & Medium Enterprise) under the Udyam Registration portal and unlock a wide range of government benefits, subsidies and incentives.",

    benefits: [
      "Priority Sector Lending from Banks",
      "Lower Interest Rates on Loans",
      "Protection Against Delayed Payments",
      "Excise Exemption Scheme",
      "Tax Benefits & Exemptions",
      "Government Tender Preference",
      "Electricity Bill Concession",
      "Barcode Registration Subsidy",
      "ISO Certification Reimbursement",
      "Patent & Trademark Subsidies",
      "Credit Guarantee Scheme",
      "Technology Upgradation Support"
    ],

    faqs: [
      {
        question: "What is MSME / Udyam Registration?",
        answer: "MSME Registration, now known as Udyam Registration, is a government registration for Micro, Small and Medium Enterprises under the MSMED Act, 2006. It is a completely online, paperless process based on self-declaration and requires only an Aadhaar number."
      },
      {
        question: "Who is eligible for MSME Registration?",
        answer: "Any business entity including proprietorship, partnership, LLP, private limited company, Hindu Undivided Family (HUF), cooperative societies, and trusts can register as an MSME, provided they meet the investment and turnover criteria."
      },
      {
        question: "What are the criteria for Micro, Small and Medium enterprises?",
        answer: "Micro Enterprise: Investment up to Rs. 1 Crore & Turnover up to Rs. 5 Crore. Small Enterprise: Investment up to Rs. 10 Crore & Turnover up to Rs. 50 Crore. Medium Enterprise: Investment up to Rs. 50 Crore & Turnover up to Rs. 250 Crore."
      },
      {
        question: "Is MSME Registration mandatory?",
        answer: "MSME Registration is not mandatory but is highly recommended. It unlocks numerous government benefits including subsidies, lower interest rates, tax exemptions, and priority in government tenders."
      },
      {
        question: "What documents are required for MSME Registration?",
        answer: "The primary requirement is the Aadhaar number of the business owner. Additionally, PAN card, business address proof, bank account details, and information about the nature of business activity are needed."
      },
      {
        question: "How long does MSME Registration take?",
        answer: "With our expert assistance, the MSME Registration process can be completed within 1–2 working days. The Udyam Registration Certificate is issued digitally."
      },
      {
        question: "Is MSME Registration valid for lifetime?",
        answer: "Yes, Udyam Registration does not require renewal. Once registered, the certificate is valid for the lifetime of the enterprise. However, you should update your information if there are any changes in business details."
      },
      {
        question: "Can I register multiple businesses under MSME?",
        answer: "Each enterprise requires a separate Udyam Registration. However, the same person can register multiple businesses, each with its own Udyam Registration Number (URN)."
      }
    ],

    paragraphs: [
      "Union Ministry of Micro, Small and Medium Enterprises (M/o MSMEs) has issued Gazette notification to pave way for implementation of the upward revision in the definition and criteria of MSMEs in the country. The new definition and criterion will come into effect from 1st July, 2020.",
      "After 14 years since the MSME Development Act came into existence in 2006, a revision in MSME definition was announced in the Atmnirbhar Bharat package on 13th May, 2020. As per this announcement, the definition of Micro manufacturing and services units was increased to Rs. 1 Crore of investment and Rs. 5 Crore of turnover. The limit of small unit was increased to Rs. 10 Crore of investment and Rs 50 Crore of turnover. Similarly, the limit of medium unit was increased to Rs. 50 Crore of investment and Rs. 250 Crore of turnover."
    ],

    price: "STARTING FROM RS. 1499/-",
    cta: "REGISTER NOW",

    definition: {
      title: "DEFINITION OF MSME",
      paragraphs: [
        "MSME stands for Micro, Small and Medium Enterprises – any enterprise that falls under any of these three categories. MSME enterprises are the backbone of the Indian economy and are an engine of economic growth, promoting equitable development for all. MSME Enterprises are typically more labour-intensive than large corporates and provide tremendous employment potential at a very low capital cost. MSMEs also share a major portion of industrial production and exports in India and play a pivotal role in the development of the industrial economy.",
        "To promote and develop MSMEs, the MSMED Act of India facilitates the promotion and development of enterprises through many incentives, schemes and subsidies. To obtain the benefits under the MSMED Act, MSME Registration (now known as Udyam Registration) is a must. Proprietorship firms, partnership firms, LLPs, Private Limited Companies, and Public Limited Companies can all register."
      ]
    },

    benefitsSection: {
      title: "BENEFITS OF MSME REGISTRATION",
      paragraphs: [
        "The MSME registration process in India has been conceptualised to provide maximum benefits to all types of enterprises. After registration, any enterprise becomes qualified to reap the benefits offered under the MSMED Act. Some of the benefits from the Central Government include easy sanction of bank loans (Priority Sector Lending), lower rates of interest, excise exemption scheme, exemption under Direct Tax Laws, and statutory support such as reservation and the Interest on Delayed Payments Act.",
        "State Governments and Union Territories have also compiled their own package of facilities and incentives for MSMEs. Some benefits provided by State Governments include development of specialized industrial estates, tax subsidies, power tariff subsidies, capital investment subsidies, and other support. Both the Centre and the State target their incentives and support packages generally to units registered with them.",
        "Banking Laws, Excise Law and the Direct Taxes Law have incorporated the word MSME in their exemption notifications. Therefore, the registration certificate issued by the registering authority is seen as proof of being an MSME and is required to avail the benefits sanctioned for MSMEs."
      ]
    },

    process: {
      title: "MSME REGISTRATION PROCESS",
      steps: [
        {
          title: "Share Your Details",
          description: "Provide your Aadhaar number, PAN card, business details and contact information to our expert team."
        },
        {
          title: "Document Verification",
          description: "Our experts verify your documents and ensure all information is accurate for a smooth registration process."
        },
        {
          title: "Application Filing",
          description: "We file your Udyam Registration application on the official government portal on your behalf."
        },
        {
          title: "Certificate Issued",
          description: "Receive your digitally signed Udyam Registration Certificate with a unique URN (Udyam Registration Number)."
        }
      ]
    }
  },

  "privatelimitedcompanyincorporation": {
    metaTitle: "Private Limited Company Incorporation | Patel Legal Advisors",
    metaDescription:
      "Private Limited Company incorporation support with name approval, DSC, company forms, incorporation certificate, PAN, TAN and compliance guidance.",
    title: "Private Limited Company",
    description:
      "A company is a type of business structure that is a separate legal entity from its owners. It's a complex business structure, with higher set-up and administrative costs because of extra reporting requirements and higher-level legal obligations.",

    paragraphs: [
      "A company is a type of business structure that is a separate legal entity from its owners. It's a complex business structure, with higher set-up and administrative costs because of extra reporting requirements and higher-level legal obligations.",
    ],

    price: "STARTING FROM RS. 10999/-",
    cta: "KNOW ABOUT PACKAGE",
    ctaTitle: "Ready to Incorporate Your Private Limited Company?",
    ctaDescription:
      "Our expert team of CAs, CS and Lawyers will guide you through name approval, DSC, incorporation filing, PAN, TAN and post-incorporation support.",
    definition: {
      title: "Private Limited Company Registration",
      paragraphs: [
        "Company formation is the process of incorporating (registering) a business in the form of a limited company. When a company is registered, it becomes a separate legal entity; a ‘person’ that is completely distinct from its owners and responsible for its own finances, assets, and liabilities.",
        "This means that, if the company becomes insolvent, the owners (shareholders or guarantors) are not held personally liable for any of its debts or liability claims beyond the sums they have invested in shares or committed to pay in guarantees (except in rare cases, such as fraud). This financial protection is known as ‘limited liability’.",
      ],
    },

    benefitsSection: {
      title: "Process of Company Incorporation",
      paragraphstitle:[
        "Choose a Company Name",
      "Select a Company Formation Package",
      "Add Company Address Services ",
      "Complete the Checklist Provided by Us ",
      ],
      paragraphs: [
        "To find out the availability of your proposed name, simply enter it into our online company name-check tool. This system will compare any name you enter against the Index of Company Names at Companies House. ",
        "We offer a wide selection of packages for companies limited by shares, in addition to tailor-made packages for Non-UK Residents, companies limited by guarantee, Public Limited Companies (PLCs), and Limited Liability Partnerships (LLPs). ",
        "All limited companies must provide details of a registered office. A service address must also be supplied by each director, subscriber, company secretary, and Person with Significant Control (PSC).",
        "Online application form is really easy to complete, requiring only a few minutes of your time. You must provide the following information: Company name, Registered office address, Description of main business activities (SIC code), PAN of the Directors – self attested color copies, Aadhar card of the Directors – self attested color copies, Passport sized Photograph of the Directors, Driving licence / voter ID of the Directors, Electricity Bill/water Bill/ Gas bill/ Bank statement of the Director, Electricity Bill/water Bill/ Gas bill of the registered office",
      ],
    },

    faqs: [
      {
        question: "What is a Private Limited Company?",
        answer:
          "A Private Limited Company is a separate legal entity from its owners. It can own assets, enter contracts and carry liabilities in its own name.",
      },
      {
        question: "What is limited liability?",
        answer:
          "Limited liability means owners and shareholders are generally not personally liable beyond the amount they invest or commit, except in rare cases such as fraud.",
      },
      {
        question: "What documents are generally required?",
        answer:
          "The process generally requires PAN, Aadhaar, photograph, address proof, registered office details, director details and utility bill or NOC documents.",
      },
      {
        question: "What happens after incorporation?",
        answer:
          "After incorporation, you receive the incorporation certificate, PAN and TAN. You can then proceed with bank account opening and required post-incorporation compliances.",
      },
    ],

    overviewCard: {
      label: "Company Structure",
      title: "Limited Liability",
    },

    overviewHighlights: [
      {
        label: "Entity Type",
        value: "Separate",
        detail: "Distinct legal identity",
      },
      {
        label: "Protection",
        value: "Limited",
        detail: "Liability for shareholders",
      },
      {
        label: "Starting From",
        value: "Rs. 10999/-",
        detail: "All-inclusive package",
      },
    ],

    pricing: [
      {
        title: "Basic",
        price: "Rs. 10999/-",
        note: "Stamp duty included",
        features: [
          "2 DIN & 2 DSC",
          "1 Name Approval Letter",
          "Stamp duty on Authorized Capital upto INR 1 Lakh",
          "Certificate of Incorporation",
          "Copy of MOA & AOA (E-Copy)",
          "E-PAN & E-TAN",
          "ESIC Registration through SPICe Plus",
          "PF Registration through SPICe Plus",
          "Bank Account opening through SPICe Plus",
        ],
      },
      {
        title: "Standard",
        price: "Rs. 13999/-",
        note: "Stamp duty included",
        features: [
          "2 DIN & 2 DSC",
          "1 Name Approval Letter",
          "Stamp duty on Authorized Capital upto INR 1 Lakh",
          "Certificate of Incorporation",
          "Copy of MOA & AOA (E-Copy)",
          "E-PAN & E-TAN",
          "Share Certificates",
          "ESIC Registration through SPICe Plus",
          "PF Registration through SPICe Plus",
          "Bank Account opening through SPICe Plus",
          "MSME Registration",
          "GST Registration",
          "INC 20A filing",
        ],
      },
      {
        title: "Professional",
        price: "Rs. 18999/-",
        note: "Stamp duty included",
        features: [
          "2 DIN & 2 DSC",
          "1 Name Approval Letter",
          "Stamp duty on Authorized Capital upto INR 1 Lakh",
          "Certificate of Incorporation",
          "Copy of MOA & AOA (E-Copy)",
          "E-PAN & E-TAN",
          "Share Certificates",
          "ESIC Registration through SPICe Plus",
          "PF Registration through SPICe Plus",
          "Bank Account opening through SPICe Plus",
          "MSME Registration",
          "GST Registration",
          "INC 20A filing",
          "Appointment of 1st Auditor (Form ADT-1)",
          "Share Certificate - 25 Certificate",
        ],
      },
    ],

    process: {
      title: "How to Incorporate a Company",
      steps: [
         "Apply for Reserve Your Company Name",
         "Apply for Digital Signature Certificate (DSC)",
        "Submission of Forms for Incorporate a Company",
         "Obtain Company's Incorporation Certificate",
         "Obtain Company's PAN Card and TAN Card",         
        
      ],
    },
  }
};

services["private-limited-company-incorporation"] =
  services.privatelimitedcompanyincorporation;
