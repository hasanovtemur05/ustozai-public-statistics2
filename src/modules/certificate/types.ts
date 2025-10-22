export interface CertificateType {
  id: string;
  degree: string;
  photo: string;
  course: any | {
    id: string;
    name: string;
  };
  courseId:string;
  date: string;
}



export interface CertificateInputType {
  dagree: string;
  photo: string;
  course: any;
}

export interface CertificateEditBodyType {
  id: string;
  values: CertificateInputType;
}

