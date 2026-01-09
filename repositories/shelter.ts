export interface ShelterInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  adoptionFormUrl: string;
  mapEmbedUrl: string;
}

export const getShelterInfo = async (): Promise<ShelterInfo> => {
  const data = await import('~/data/mock_data.json');
  return data.default.shelter as ShelterInfo;
};
