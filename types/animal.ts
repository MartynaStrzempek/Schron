export type AdoptionStatus = 'do adopcji' | 'w trakcie' | 'po adopcji';

export interface Animal {
  id: string;
  name: string;
  type: 'pies' | 'kot';
  age: 'młody' | 'dorosły' | 'senior';
  gender: 'samiec' | 'samica';
  size: 'mała' | 'średnia' | 'duża';
  description: string;
  intakeDate: string;
  status: AdoptionStatus;
  urgent: boolean;
  featured: boolean;
  photos: string[];
}
