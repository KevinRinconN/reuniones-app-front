export type UserRole = "admin" | "secretario" | "participante";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  active: boolean;
}

export type MeetingStatus =
  | "programada"
  | "en_curso"
  | "finalizada"
  | "cancelada";
export type MeetingType =
  | "ordinaria"
  | "extraordinaria"
  | "urgente"
  | "informativa";

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: MeetingType;
  status: MeetingStatus;
  participants: Participant[];
  hasActa: boolean;
  createdBy: string;
  createdAt: string;
}

export interface Participant {
  userId: string;
  role: "secretario" | "participante";
  attended?: boolean;
  user?: User;
}

export type CommitmentStatus =
  | "pendiente"
  | "en_progreso"
  | "cumplido"
  | "vencido";

export interface Commitment {
  id: string;
  description: string;
  responsible: User;
  meetingId: string;
  meetingTitle: string;
  dueDate: string;
  status: CommitmentStatus;
  createdAt: string;
  completedAt?: string;
}

export interface Acta {
  id: string;
  meetingId: string;
  content: string;
  attendees: string[];
  agenda: string[];
  agreements: string[];
  hash: string;
  qrCode: string;
  signatureStatus: "pendiente" | "firmada";
  signedBy?: string[];
  signedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMetrics {
  totalMeetings: number;
  attendancePercentage: number;
  commitmentsFulfilled: number;
  commitmentsPending: number;
  commitmentsOverdue: number;
}

export interface MonthlyData {
  month: string;
  meetings: number;
  attendance: number;
}
