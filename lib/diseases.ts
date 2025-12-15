// lib/diseases.ts
export const diseases = {
  glaucoma: {
    title: "Glaucoma",
    shortDesc: "A group of conditions that damage the optic nerve, often linked to high intraocular pressure.",
    heroImg: "/glaucoma-optic-nerve-damage-fundus-photo.jpg",
    prevalence: "~80 million worldwide",
    riskLevel: "High",
    ageGroup: "40+ years",
    overview: "Glaucoma is often called the 'silent thief of sight' because it can cause irreversible vision loss without noticeable symptoms in early stages. It damages the optic nerve, which transmits visual information from the eye to the brain.",
    symptoms: [
      "Patchy blind spots in peripheral vision",
      "Tunnel vision in advanced stages",
      "Eye pain and redness",
      "Halos around lights",
      "Sudden vision blurring",
      "Nausea and vomiting (in acute cases)"
    ],
    causes: [
      "Elevated intraocular pressure",
      "Family history of glaucoma",
      "Age over 60",
      "Diabetes and heart disease",
      "Previous eye injury or surgery",
      "Long-term steroid medication use",
      "Severe nearsightedness"
    ],
    diagnosisMethods: [
      {
        name: "Tonometry",
        description: "Measures intraocular pressure using a special device"
      },
      {
        name: "Ophthalmoscopy",
        description: "Examines the shape and color of the optic nerve"
      },
      {
        name: "Perimetry",
        description: "Tests the complete field of vision"
      },
      {
        name: "Gonioscopy",
        description: "Assesses the drainage angle of the eye"
      },
      {
        name: "Pachymetry",
        description: "Measures corneal thickness"
      }
    ],
    treatmentOptions: [
      {
        type: "Medication",
        methods: [
          "Prostaglandin analogs (eye drops)",
          "Beta blockers (eye drops)",
          "Alpha agonists (eye drops)",
          "Carbonic anhydrase inhibitors",
          "Combination medications"
        ]
      },
      {
        type: "Laser Therapy",
        methods: [
          "Trabeculoplasty (improves drainage)",
          "Iridotomy (creates drainage hole)",
          "Cyclophotocoagulation (reduces fluid production)"
        ]
      },
      {
        type: "Surgical Options",
        methods: [
          "Trabeculectomy (creates new drainage channel)",
          "Glaucoma drainage devices",
          "Minimally invasive glaucoma surgery (MIGS)"
        ]
      }
    ],
    prevention: [
      "Regular comprehensive eye exams every 1-2 years",
      "Know your family eye history",
      "Exercise safely and regularly",
      "Wear eye protection during sports",
      "Manage blood pressure and diabetes",
      "Avoid head-down positions if at risk"
    ],
    prognosis: {
      description: "With early detection and proper treatment, most people with glaucoma will not lose their vision. However, any vision loss from glaucoma is irreversible, making early diagnosis crucial.",
      factors: [
        "Early detection and treatment",
        "Adherence to medication regimen",
        "Regular monitoring and follow-up",
        "Type and severity of glaucoma",
        "Overall eye health and age"
      ]
    },
    images: [
      {
        src: "/glaucoma-optic-nerve-damage-fundus-photo.jpg",
        alt: "Glaucoma optic nerve damage",
        caption: "Advanced glaucomatous optic nerve damage showing cupping"
      },
      {
        src: "/glaucoma-visual-field-test.jpg",
        alt: "Glaucoma visual field test results",
        caption: "Visual field test showing peripheral vision loss"
      }
    ]
  },
  cataract: {
    title: "Cataract",
    shortDesc: "Clouding of the eye's lens causing blurry, dim, or yellowed vision; treated with lens replacement surgery.",
    heroImg: "/cataract-cloudy-lens-eye-image.jpg",
    prevalence: "~95 million worldwide",
    riskLevel: "Medium",
    ageGroup: "60+ years",
    overview: "Cataracts are the leading cause of blindness worldwide. They develop slowly and cause the lens to become cloudy, affecting vision quality. Cataract surgery is one of the most common and successful surgical procedures performed today.",
    symptoms: [
      "Clouded, blurred or dim vision",
      "Increasing difficulty with vision at night",
      "Sensitivity to light and glare",
      "Seeing 'halos' around lights",
      "Frequent changes in eyeglass prescription",
      "Fading or yellowing of colors",
      "Double vision in a single eye"
    ],
    causes: [
      "Aging (most common cause)",
      "Diabetes",
      "Smoking and excessive alcohol use",
      "Prolonged sunlight exposure",
      "Obesity and high blood pressure",
      "Previous eye injury or inflammation",
      "Family history of cataracts",
      "Long-term use of corticosteroid medications"
    ],
    diagnosisMethods: [
      {
        name: "Visual Acuity Test",
        description: "Measures how well you see at various distances"
      },
      {
        name: "Slit-lamp Examination",
        description: "Microscopic examination of eye structures"
      },
      {
        name: "Retinal Exam",
        description: "Examines the back of your eye after dilation"
      },
      {
        name: "Applanation Tonometry",
        description: "Measures fluid pressure in the eye"
      }
    ],
    treatmentOptions: [
      {
        type: "Surgical Options",
        methods: [
          "Phacoemulsification (ultrasound removal)",
          "Extracapsular cataract extraction",
          "Laser-assisted cataract surgery"
        ]
      },
      {
        type: "Lens Implants",
        methods: [
          "Monofocal lenses (single distance)",
          "Multifocal lenses (multiple distances)",
          "Toric lenses (astigmatism correction)",
          "Accommodating lenses (natural focus)"
        ]
      }
    ],
    prevention: [
      "Regular eye examinations",
      "Wear sunglasses with UV protection",
      "Quit smoking and limit alcohol",
      "Manage health problems like diabetes",
      "Maintain healthy weight and diet",
      "Eat antioxidant-rich foods"
    ],
    prognosis: {
      description: "Cataract surgery has a very high success rate (over 95%) in improving vision. Most people can return to normal activities within a few days, with full recovery in about 8 weeks.",
      factors: [
        "Overall eye health",
        "Type of cataract",
        "Surgical technique used",
        "Post-operative care",
        "Presence of other eye conditions"
      ]
    },
    images: [
      {
        src: "/cataract-cloudy-lens-eye-image.jpg",
        alt: "Cataract in human eye",
        caption: "Advanced cataract showing significant lens clouding"
      },
      {
        src: "/cataract-surgery-procedure.jpg",
        alt: "Cataract surgery procedure",
        caption: "Modern cataract surgery with lens implantation"
      }
    ]
  },
  "diabetic-retinopathy": {
    title: "Diabetic Retinopathy",
    shortDesc: "Damage to retinal blood vessels from diabetes, which can lead to vision loss without treatment.",
    heroImg: "/diabetic-retinopathy-retina-hemorrhages.jpg",
    prevalence: "~103 million worldwide",
    riskLevel: "High",
    ageGroup: "All ages (diabetes patients)",
    overview: "Diabetic retinopathy is a diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). Initially, it may cause no symptoms or only mild vision problems, but can eventually lead to blindness.",
    symptoms: [
      "Spots or dark strings floating in vision (floaters)",
      "Blurred or fluctuating vision",
      "Impaired color vision",
      "Dark or empty areas in vision",
      "Vision loss",
      "Difficulty seeing at nighttime"
    ],
    causes: [
      "Long-term diabetes (type 1 or type 2)",
      "Poor blood sugar control",
      "High blood pressure",
      "High cholesterol",
      "Pregnancy in diabetic women",
      "Tobacco use",
      "Kidney disease"
    ],
    diagnosisMethods: [
      {
        name: "Dilated Eye Exam",
        description: "Comprehensive examination of retina and optic nerve"
      },
      {
        name: "Fluorescein Angiography",
        description: "Uses dye to detect blood vessel problems"
      },
      {
        name: "Optical Coherence Tomography",
        description: "Provides cross-sectional retina images"
      },
      {
        name: "Visual Acuity Testing",
        description: "Measures vision capability at different distances"
      }
    ],
    treatmentOptions: [
      {
        type: "Early Stage Treatment",
        methods: [
          "Blood sugar control and management",
          "Blood pressure control",
          "Cholesterol management",
          "Regular monitoring"
        ]
      },
      {
        type: "Advanced Stage Treatment",
        methods: [
          "Focal laser treatment (photocoagulation)",
          "Scatter laser treatment (panretinal photocoagulation)",
          "Vitrectomy (removing vitreous gel)",
          "Anti-VEGF injection therapy",
          "Corticosteroid injections"
        ]
      }
    ],
    prevention: [
      "Manage your diabetes with proper diet and medication",
      "Monitor your blood sugar level regularly",
      "Keep blood pressure and cholesterol under control",
      "Quit smoking and maintain healthy weight",
      "Pay attention to vision changes",
      "Get regular dilated eye examinations"
    ],
    prognosis: {
      description: "With early detection and proper management, vision loss can be prevented or slowed. However, once proliferative diabetic retinopathy develops, there is a high risk of severe vision loss without treatment.",
      factors: [
        "Blood sugar control level",
        "Duration of diabetes",
        "Blood pressure control",
        "Early detection and treatment",
        "Regular follow-up care"
      ]
    },
    images: [
      {
        src: "/diabetic-retinopathy-retina-hemorrhages.jpg",
        alt: "Diabetic retinopathy retina",
        caption: "Retina showing hemorrhages and exudates from diabetic damage"
      },
      {
        src: "/diabetic-macular-edema.jpg",
        alt: "Diabetic macular edema",
        caption: "Swelling in the macula from fluid leakage"
      }
    ]
  },
  normal: {
    title: "Normal Eye",
    shortDesc: "A healthy eye with clear media and intact retina/optic nerve function resulting in sharp vision.",
    heroImg: "/healthy-human-eye-close-up.jpg",
    prevalence: "Standard human anatomy",
    riskLevel: "None",
    ageGroup: "All ages",
    overview: "A healthy human eye functions as a complex optical system that captures light and converts it into electrical signals for the brain to interpret. Proper eye health allows for clear vision, color perception, depth judgment, and adaptation to different light conditions.",
    symptoms: [
      "Clear, sharp vision at all distances",
      "Good color perception",
      "Proper depth perception",
      "Adequate peripheral vision",
      "Comfortable vision in various lighting",
      "No pain, redness, or discomfort"
    ],
    causes: [
      "Genetic factors determining eye structure",
      "Proper prenatal development",
      "Adequate nutrition for eye health",
      "Good overall health maintenance",
      "Protection from environmental damage"
    ],
    diagnosisMethods: [
      {
        name: "Comprehensive Eye Exam",
        description: "Complete assessment of eye health and vision"
      },
      {
        name: "Visual Acuity Test",
        description: "Measures sharpness of vision at different distances"
      },
      {
        name: "Refraction Assessment",
        description: "Determines appropriate lens prescription"
      },
      {
        name: "Slit-lamp Examination",
        description: "Detailed examination of eye structures"
      },
      {
        name: "Tonometry",
        description: "Measures intraocular pressure"
      }
    ],
    treatmentOptions: [
      {
        type: "Maintenance",
        methods: [
          "Regular eye examinations",
          "Proper nutrition with eye-healthy foods",
          "UV protection with sunglasses",
          "Adequate rest and eye exercises",
          "Proper lighting for reading and work"
        ]
      },
      {
        type: "Preventive Care",
        methods: [
          "Annual comprehensive eye exams",
          "Protective eyewear during sports",
          "Computer vision syndrome prevention",
          "Smoking avoidance",
          "Chronic disease management"
        ]
      }
    ],
    prevention: [
      "Schedule regular comprehensive eye exams",
      "Wear sunglasses with 100% UV protection",
      "Eat a balanced diet rich in antioxidants",
      "Maintain healthy weight and exercise regularly",
      "Avoid smoking and limit alcohol consumption",
      "Practice good computer and screen habits",
      "Wear protective eyewear during hazardous activities"
    ],
    prognosis: {
      description: "With proper care and regular check-ups, a healthy eye can maintain excellent vision throughout life. Most age-related changes can be managed effectively with modern eye care.",
      factors: [
        "Regular eye examinations",
        "Overall health and lifestyle",
        "Genetic predisposition",
        "Environmental factors",
        "Protective measures taken"
      ]
    },
    images: [
      {
        src: "/healthy-human-eye-close-up.jpg",
        alt: "Healthy human eye",
        caption: "Normal healthy eye showing clear structures and vessels"
      },
      {
        src: "/normal-retina-fundus.jpg",
        alt: "Normal retina fundus",
        caption: "Healthy retina with normal optic disc and blood vessels"
      }
    ]
  }
}