import {
  User,
  Meeting,
  Commitment,
  Acta,
  DashboardMetrics,
  MonthlyData,
} from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana García López",
    email: "ana.garcia@institucion.gob",
    role: "admin",
    active: true,
  },
  {
    id: "2",
    name: "Carlos Mendoza Ruiz",
    email: "carlos.mendoza@institucion.gob",
    role: "secretario",
    active: true,
  },
  {
    id: "3",
    name: "María Fernández Torres",
    email: "maria.fernandez@institucion.gob",
    role: "participante",
    active: true,
  },
  {
    id: "4",
    name: "Roberto Silva Vega",
    email: "roberto.silva@institucion.gob",
    role: "participante",
    active: true,
  },
  {
    id: "5",
    name: "Laura Martínez Cruz",
    email: "laura.martinez@institucion.gob",
    role: "secretario",
    active: true,
  },
  {
    id: "6",
    name: "José Ramírez Díaz",
    email: "jose.ramirez@institucion.gob",
    role: "participante",
    active: false,
  },
  {
    id: "7",
    name: "Patricia Herrera Luna",
    email: "patricia.herrera@institucion.gob",
    role: "participante",
    active: true,
  },
  {
    id: "8",
    name: "Miguel Ángel Castro",
    email: "miguel.castro@institucion.gob",
    role: "admin",
    active: true,
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Reunión de Planeación Estratégica Q1 2026",
    description:
      "Revisión de objetivos y metas para el primer trimestre del año.",
    date: "2026-01-15",
    startTime: "09:00",
    endTime: "11:00",
    location: "Sala de Juntas Principal",
    type: "ordinaria",
    status: "programada",
    participants: [
      { userId: "1", role: "secretario", attended: true },
      { userId: "3", role: "participante", attended: true },
      { userId: "4", role: "participante", attended: false },
    ],
    hasActa: false,
    createdBy: "1",
    createdAt: "2026-01-05T10:00:00Z",
  },
  {
    id: "2",
    title: "Comité de Presupuesto 2026",
    description: "Análisis y aprobación del presupuesto anual.",
    date: "2026-01-10",
    startTime: "14:00",
    endTime: "16:30",
    location: "Auditorio Central",
    type: "extraordinaria",
    status: "finalizada",
    participants: [
      { userId: "1", role: "secretario", attended: true },
      { userId: "2", role: "participante", attended: true },
      { userId: "3", role: "participante", attended: true },
      { userId: "5", role: "participante", attended: true },
    ],
    hasActa: true,
    createdBy: "1",
    createdAt: "2026-01-03T08:00:00Z",
  },
  {
    id: "3",
    title: "Sesión Ordinaria del Consejo Directivo",
    description: "Sesión mensual ordinaria para revisión de avances.",
    date: "2026-01-20",
    startTime: "10:00",
    endTime: "12:00",
    location: "Sala de Consejo - Piso 5",
    type: "ordinaria",
    status: "programada",
    participants: [
      { userId: "2", role: "secretario" },
      { userId: "1", role: "participante" },
      { userId: "7", role: "participante" },
    ],
    hasActa: false,
    createdBy: "2",
    createdAt: "2026-01-08T14:00:00Z",
  },
  {
    id: "4",
    title: "Reunión de Seguimiento de Proyectos",
    description: "Revisión del estado de proyectos en curso.",
    date: "2026-01-08",
    startTime: "11:00",
    endTime: "12:30",
    location: "Virtual - Microsoft Teams",
    type: "informativa",
    status: "finalizada",
    participants: [
      { userId: "5", role: "secretario", attended: true },
      { userId: "3", role: "participante", attended: true },
      { userId: "4", role: "participante", attended: true },
    ],
    hasActa: true,
    createdBy: "5",
    createdAt: "2026-01-02T09:00:00Z",
  },
  {
    id: "5",
    title: "Reunión Urgente - Contingencia Operativa",
    description: "Atención de incidente operativo crítico.",
    date: "2026-01-12",
    startTime: "08:00",
    endTime: "09:00",
    location: "Sala de Crisis",
    type: "urgente",
    status: "finalizada",
    participants: [
      { userId: "1", role: "secretario", attended: true },
      { userId: "8", role: "participante", attended: true },
    ],
    hasActa: true,
    createdBy: "8",
    createdAt: "2026-01-12T07:30:00Z",
  },
];

export const mockCommitments: Commitment[] = [
  {
    id: "1",
    description: "Elaborar informe de avance del proyecto de modernización",
    responsible: mockUsers[2],
    meetingId: "2",
    meetingTitle: "Comité de Presupuesto 2026",
    dueDate: "2026-01-18",
    status: "pendiente",
    createdAt: "2026-01-10T16:30:00Z",
  },
  {
    id: "2",
    description: "Enviar propuesta de reestructuración organizacional",
    responsible: mockUsers[3],
    meetingId: "2",
    meetingTitle: "Comité de Presupuesto 2026",
    dueDate: "2026-01-25",
    status: "en_progreso",
    createdAt: "2026-01-10T16:30:00Z",
  },
  {
    id: "3",
    description: "Actualizar base de datos de proveedores",
    responsible: mockUsers[4],
    meetingId: "4",
    meetingTitle: "Reunión de Seguimiento de Proyectos",
    dueDate: "2026-01-05",
    status: "cumplido",
    createdAt: "2026-01-08T12:30:00Z",
    completedAt: "2026-01-05T15:00:00Z",
  },
  {
    id: "4",
    description: "Coordinar capacitación del personal nuevo",
    responsible: mockUsers[0],
    meetingId: "4",
    meetingTitle: "Reunión de Seguimiento de Proyectos",
    dueDate: "2026-01-08",
    status: "vencido",
    createdAt: "2026-01-08T12:30:00Z",
  },
  {
    id: "5",
    description: "Preparar plan de contingencia actualizado",
    responsible: mockUsers[7],
    meetingId: "5",
    meetingTitle: "Reunión Urgente - Contingencia Operativa",
    dueDate: "2026-01-14",
    status: "cumplido",
    createdAt: "2026-01-12T09:00:00Z",
    completedAt: "2026-01-13T18:00:00Z",
  },
  {
    id: "6",
    description: "Revisar y validar documentación técnica",
    responsible: mockUsers[1],
    meetingId: "2",
    meetingTitle: "Comité de Presupuesto 2026",
    dueDate: "2026-01-13",
    status: "pendiente",
    createdAt: "2026-01-10T16:30:00Z",
  },
];

export const mockActas: Acta[] = [
  {
    id: "1",
    meetingId: "2",
    content: `# Acta de Reunión - Comité de Presupuesto 2026

## Fecha y Hora
10 de enero de 2026, 14:00 - 16:30 hrs

## Lugar
Auditorio Central

## Asistentes
- Ana García López (Secretaria)
- Carlos Mendoza Ruiz
- María Fernández Torres
- Laura Martínez Cruz

## Orden del Día
1. Lectura y aprobación del acta anterior
2. Presentación del presupuesto propuesto 2026
3. Análisis de partidas prioritarias
4. Votación y aprobación
5. Asuntos generales

## Desarrollo de la Reunión
Se dio inicio a la sesión con la lectura del acta anterior, la cual fue aprobada por unanimidad.

La Directora de Finanzas presentó el presupuesto propuesto para el ejercicio 2026, destacando un incremento del 8% respecto al año anterior.

Se discutieron las partidas prioritarias, enfocándose en modernización tecnológica y capacitación del personal.

## Acuerdos
1. Se aprueba el presupuesto 2026 con las modificaciones propuestas.
2. Se autoriza la contratación de consultoría externa para el proyecto de modernización.
3. Se establece fecha límite para entrega de informes departamentales.`,
    attendees: [
      "Ana García López",
      "Carlos Mendoza Ruiz",
      "María Fernández Torres",
      "Laura Martínez Cruz",
    ],
    agenda: [
      "Lectura y aprobación del acta anterior",
      "Presentación del presupuesto propuesto 2026",
      "Análisis de partidas prioritarias",
      "Votación y aprobación",
      "Asuntos generales",
    ],
    agreements: [
      "Se aprueba el presupuesto 2026",
      "Se autoriza consultoría externa",
      "Se establece fecha límite para informes",
    ],
    hash: "a7f3b2c9d4e5f6a1b8c3d9e0f2a4b6c8",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ACTA-2026-001-a7f3b2c9",
    signatureStatus: "firmada",
    signedBy: ["Ana García López", "Carlos Mendoza Ruiz"],
    signedAt: "2026-01-11T10:00:00Z",
    createdAt: "2026-01-10T17:00:00Z",
    updatedAt: "2026-01-11T10:00:00Z",
  },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalMeetings: 5,
  attendancePercentage: 87,
  commitmentsFulfilled: 2,
  commitmentsPending: 3,
  commitmentsOverdue: 1,
};

export const mockMonthlyData: MonthlyData[] = [
  { month: "Ago", meetings: 8, attendance: 82 },
  { month: "Sep", meetings: 12, attendance: 88 },
  { month: "Oct", meetings: 10, attendance: 85 },
  { month: "Nov", meetings: 14, attendance: 90 },
  { month: "Dic", meetings: 6, attendance: 78 },
  { month: "Ene", meetings: 5, attendance: 87 },
];

export const currentUser: User = mockUsers[0]; // Admin por defecto
