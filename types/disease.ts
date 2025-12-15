// types/disease.ts
export interface DiagnosisMethod {
  name: string
  description: string
}

export interface TreatmentOption {
  type: string
  methods: string[]
}

export interface Prognosis {
  description: string
  factors: string[]
}

export interface DiseaseImage {
  src: string
  alt: string
  caption?: string
}

export interface Disease {
  title: string
  shortDesc: string
  heroImg: string
  prevalence: string
  riskLevel: string
  ageGroup: string
  overview: string
  symptoms: string[]
  causes: string[]
  diagnosisMethods: DiagnosisMethod[]
  treatmentOptions: TreatmentOption[]
  prevention: string[]
  prognosis: Prognosis
  images: DiseaseImage[]
}

export type DiseaseSlug = 'glaucoma' | 'cataract' | 'diabetic-retinopathy' | 'normal'

export type Diseases = Record<DiseaseSlug, Disease>