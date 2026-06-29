export type UserRole = 'PATIENT' | 'PROFESSIONAL' | 'ADMIN';

export type UserStatus = 'ACTIVE' | 'INACTIVE';


export interface PatientAchievementDto {
  id: string;
}

export interface PatientResponse {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  cbo: string | null;
  dateOfBirth: string;     
  gender: string | null;
  sex: string | null;
  race: string | null;
  status: UserStatus;
  city: string;
  uf: string;
  cep: string;
  address: string;
  sobriety: string | null;
  lastCheckin: string | null;
  achievements: PatientAchievementDto[];
}

export interface CreatePatientDto {
  name: string;
  email: string;
  cbo?: string;
  dateOfBirth: string;   
  gender?: string;
  sex?: string;
  race?: string;
  city: string;
  uf: string;
  cep: string;
  address: string;
  sobriety?: string;
}

export interface UpdatePatientDto {
  name?: string;
  email?: string;
  cbo?: string;
  dateOfBirth?: string;
  gender?: string;
  sex?: string;
  race?: string;
  city?: string;
  uf?: string;
  cep?: string;
  address?: string;
  sobriety?: string;
}

export interface ProfessionalResponse {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  crp: string;
  status: UserStatus;
}

export interface CreateProfessionalDto {
  name: string;
  email: string;
  crp: string;
}

export type UpdateProfessionalDto = CreateProfessionalDto;

export interface UserResponse {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  patient: PatientResponse | null;
  professional: ProfessionalResponse | null;
}

export interface CreateUserDto {
  role: UserRole;
  name: string;
  email: string;
  patient?: CreatePatientDto;
  professional?: CreateProfessionalDto;
}

export interface LoginDto {
  email: string;
  password: string;
}