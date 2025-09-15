const hiTranslation = {
  common: {
    appName: "आशा - आपदा प्रतिक्रिया",
    loading: "लोड हो रहा है...",
    save: "सहेजें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    edit: "संपादित करें",
    backToHome: "होम पेज पर वापस जाएं",
    yes: "हां",
    no: "नहीं",
    success: "सफलता",
    error: "त्रुटि",
    warning: "चेतावनी",
    info: "जानकारी",
    search: "खोज",
    filter: "फ़िल्टर",
    refresh: "रीफ्रेश करें",
    noData: "कोई डेटा उपलब्ध नहीं है"
  },
  
  auth: {
    loginSuccess: "लॉगिन सफल",
    loginError: "अमान्य प्रमाण पत्र",
    logout: "लॉगआउट",
    forgotPassword: "पासवर्ड भूल गए?",
    resetPassword: "पासवर्ड रीसेट करें",
    signIn: "साइन इन करें",
    register: "पंजीकरण करें",
    mobileNumber: "मोबाइल नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    email: "ईमेल पता",
    invalidMobile: "कृपया एक वैध 10-अंकों का मोबाइल नंबर दर्ज करें",
    passwordLength: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए"
  },
  
  admin: {
    dashboard: {
      title: "प्रशासक डैशबोर्ड",
      overview: "सिस्टम अवलोकन",
      activeUsers: "सक्रिय उपयोगकर्ता",
      shelters: "आश्रय",
      incidents: "घटनाएं",
      analytics: "विश्लेषण"
    },
    login: {
      title: "प्रशासक लॉगिन",
      description: "प्रशासन नियंत्रण केंद्र तक पहुंचने के लिए लॉग इन करें"
    }
  },
  
  volunteer: {
    dashboard: {
      title: "स्वयंसेवक डैशबोर्ड",
      welcome: "स्वागत है स्वयंसेवक",
      tasks: "सौंपे गए कार्य",
      schedule: "आपका शेड्यूल",
      notifications: "सूचनाएं",
      profile: "प्रोफाइल"
    },
    login: {
      title: "स्वयंसेवक लॉगिन",
      description: "अपने डैशबोर्ड तक पहुंचने के लिए अपना मोबाइल नंबर और पासवर्ड दर्ज करें"
    },
    tasks: {
      title: "उपलब्ध कार्य",
      assignedTo: "आपको सौंपा गया",
      completed: "पूर्ण",
      status: "स्थिति",
      deadline: "समय सीमा",
      priority: "प्राथमिकता",
      location: "स्थान",
      details: "कार्य विवरण",
      accept: "कार्य स्वीकार करें"
    },
    map: {
      title: "मिशन मानचित्र",
      viewDetails: "विवरण देखें",
      directions: "दिशानिर्देश प्राप्त करें",
      incidents: "घटनाएं",
      shelters: "आश्रय",
      civilians: "नागरिक",
      updateLocation: "मेरा स्थान अपडेट करें"
    },
    default: "स्वयंसेवक",
    level: "स्तर {{level}}",
    taskAccepted: {
      title: "स्वीकृत",
      description: "आपने कार्य स्वीकार कर लिया है। विवरण के लिए अपने असाइनमेंट देखें।"
    },
    profile: {
      verified: "प्रोफ़ाइल सत्यापित",
      rating: "रेटिंग: {{rating}} ({{missions}} मिशन)"
    },
    skills: {
      firstAid: "प्राथमिक चिकित्सा",
      searchRescue: "खोज और बचाव",
      medicalSupport: "चिकित्सा समर्थन",
      communication: "संचार",
      navigation: "नेविगेशन",
      waterRescue: "जल बचाव",
      logistics: "लॉजिस्टिक्स",
      driving: "ड्राइविंग",
      cooking: "खाने बनाना"
    },
    emergency: {
      title: "आपातकालीन संपर्क",
      mainNumber: "आपातकालीन नंबर: {{number}}"
    },
    stats: {
      completed: "पूर्ण किए गए कार्य",
      activeTasks: "सक्रिय कार्य",
      teamMembers: "टीम सदस्य",
      livesHelped: "मदद की गई जीवन"
    },
    team: {
      title: "टीम प्रबंधित करें",
      basicInfo: "टीम जानकारी",
      basicInfoDesc: "नई स्वयंसेवक टीम के लिए बुनियादी विवरण दर्ज करें।",
      nameLabel: "टीम का नाम",
      namePlaceholder: "टीम का नाम दर्ज करें",
      descriptionLabel: "विवरण",
      descriptionPlaceholder: "अपनी टीम के मिशन और उद्देश्यों का वर्णन करें",
      typeLabel: "टीम प्रकार",
      typePlaceholder: "टीम प्रकार चुनें",
      types: {
        rescue: "बचाव टीम",
        medical: "चिकित्सा समर्थन",
        logistics: "लॉजिस्टिक्स और आपूर्ति",
        shelter: "आश्रय प्रबंधन",
        communication: "संचार"
      },
      locationLabel: "ऑपरेटिंग स्थान",
      locationPlaceholder: "आपकी टीम कहां काम करेगी?",
      sizeLabel: "टीम का आकार",
      sizePlaceholder: "अधिकतम टीम आकार चुनें",
      openToJoin: "दूसरों के जुड़ने के लिए खुला",
      skills: "आवश्यक कौशल",
      skillsDesc: "उन कौशलों का चयन करें जो आपकी टीम के मिशन के लिए प्रासंगिक हैं।",
      createTeamButton: "टीम बनाएं",
      createButton: "बनाएं",
      howTeamsWork: "टीमें कैसे काम करती हैं",
      coordination: "बेहतर समन्वय",
      coordinationDesc: "टीमें बेहतर प्रभाव के लिए प्रयासों का समन्वय करने की अनुमति देती हैं।",
      specialization: "कौशल विशेषज्ञता",
      specializationDesc: "जटिल कार्यों से निपटने के लिए पूरक कौशल वाली टीम बनाएं।",
      coverage: "भौगोलिक कवरेज",
      coverageDesc: "अधिक कुशल प्रतिक्रिया के लिए विशिष्ट क्षेत्रों को कवर करने के लिए टीमों का आयोजन करें।",
      asTeamLeader: "एक टीम लीडर के रूप में, आप कार्यों का समन्वय कर सकेंगे, सदस्यों को आमंत्रित कर सकेंगे, और टीम संचालन का प्रबंधन कर सकेंगे।",
      findMembers: "टीम सदस्य ढूंढें",
      findMembersDesc: "अपनी टीम बनाने के बाद, आप कर सकते हैं:",
      searchVolunteers: "विशिष्ट कौशल वाले स्वयंसेवकों की खोज करें",
      inviteVolunteers: "अपनी टीम में शामिल होने के लिए निमंत्रण भेजें",
      browsePotentialMembers: "संभावित सदस्यों को ब्राउज़ करें",
      errors: {
        nameRequired: "टीम का नाम आवश्यक है",
        enterTeamName: "कृपया अपनी टीम के लिए एक नाम दर्ज करें।",
        typeRequired: "टीम प्रकार आवश्यक है",
        selectTeamType: "कृपया टीम प्रकार चुनें।"
      },
      success: {
        title: "टीम बनाई गई",
        description: "आपकी स्वयंसेवक टीम सफलतापूर्वक बनाई गई है। सदस्यों को शामिल होने के लिए आमंत्रित करें।"
      }
    }
  },
  
  citizen: {
    dashboard: {
      title: "नागरिक डैशबोर्ड",
      welcome: "स्वागत है",
      emergencyContact: "आपातकालीन संपर्क",
      nearestShelter: "निकटतम आश्रय",
      reportIncident: "घटना की रिपोर्ट करें"
    },
    login: {
      title: "नागरिक लॉगिन",
      description: "अपने डैशबोर्ड तक पहुंचने के लिए अपना मोबाइल नंबर और पासवर्ड दर्ज करें"
    },
    incident: {
      title: "घटना की रिपोर्ट करें",
      type: "घटना का प्रकार",
      location: "स्थान",
      description: "विवरण",
      submit: "रिपोर्ट सबमिट करें",
      uploadPhotos: "फोटो अपलोड करें"
    }
  }
};

export default hiTranslation;