export type AnimalStatus = 'do adopcji' | 'w trakcie' | 'po adopcji'
export type AnimalType = 'pies' | 'kot'
export type AnimalGender = 'samiec' | 'samica'
export type AnimalSize = 'mały' | 'średni' | 'duży'

export interface Animal {
  id: string
  name: string
  type: AnimalType
  age: string
  gender: AnimalGender
  size: AnimalSize
  intakeDate: string
  status: AnimalStatus
  urgent: boolean
  description: string
  images: string[]
}

export interface ShelterInfo {
  name: string
  phone: string
  email: string
  address: string
  openHours: string
  mapEmbedUrl: string
  adoptionFormUrl: string
}

export interface MockData {
  shelter: ShelterInfo
  animals: Animal[]
  featuredAnimalIds: string[]
  dashboard: {
    urgentCount: number
  }
}
