export interface IUser {
  id?: string;
  phone?: string;
  birthday: string;
  email?: string | null;
  firstname?: string;
  lastname?: string;
  address?: {
    id?: string;
    country?: string;
    region?: string;
    district?: string;
    neighborhood?: string;
  };
}

export interface IUserCertificate {
  id?: string;
  user?: IUser | null;
  uniqueId: number;
  course?: {
    id?: string;
    title?: string;
  } | null;
  file?: string;
  createdAt?: string;
}

export type CertificateDegreeType = 'GOLD' | 'SILVER' | 'BRONZE' ;
export type CertificateDegree = 'GOLD' | 'SILVER' | 'BRONZE' ;



export interface IVerifyCertificate {
  user: IUser;
  file: string;
  course?: {
    id: string;
    title: string;
  };
  examStatistics?: {
    totalTests: number;
    submittedTests: number;
  };
  degree: CertificateDegreeType;
}
