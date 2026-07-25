export const creditOptions = [
  {
    id: "basic",
    name: "Préstamo Básico",
    rate: "1.8%",
    monthlyPayment: "$320",
    term: "24 meses",
    eligibility: "Alta",
    description: "Ideal para consolidar deudas o cubrir gastos planificados.",
    features: ["Sin comisión por apertura", "Aprobación en 24 horas", "Pagos semanales o mensuales"],
  },
  {
    id: "grow",
    name: "Crédito para Crecimiento",
    rate: "1.5%",
    monthlyPayment: "$410",
    term: "36 meses",
    eligibility: "Media",
    description: "Pensado para inversiones, emprendimientos o proyectos mayores.",
    features: ["Plazo extendido", "Asesoría personalizada", "Opciones de pago flexible"],
  },
  {
    id: "flex",
    name: "Rotativo Flexible",
    rate: "2.1%",
    monthlyPayment: "$280",
    term: "12 meses",
    eligibility: "Alta",
    description: "Perfecto si prefieres disponer de un límite disponible para gastos variables.",
    features: ["Línea disponible", "Pago mínimo reducido", "Revolvimiento automático"],
  },
];

export const userStats = [
  { label: "Solicitudes revisadas", value: "12" },
  { label: "Tasa promedio", value: "1.7%" },
  { label: "Próximo pago", value: "$320" },
];

export const adminStats = [
  { label: "Usuarios activos", value: "1,248" },
  { label: "Solicitudes hoy", value: "84" },
  { label: "Tasa de aprobación", value: "91%" },
];

export const activityFeed = [
  { title: "Nueva solicitud aprobada", detail: "Luis M. revisó una propuesta para 36 meses." },
  { title: "Comparación destacada", detail: "El crédito Crecimiento fue marcado como favorito." },
  { title: "Actualización de póliza", detail: "Se ajustaron los criterios de riesgo para este mes." },
];
