export type StateInfo = {
  codeSection: string;
  guidance: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  trade: "plumbing" | "hvac" | "electrical";
  states: Record<string, StateInfo>;
};

export const courses: Course[] = [
  {
    id: "plumbing-prv",
    title: "Installing Pressure Reducing Valves (PRV)",
    description:
      "Best practices for PRV installation in residential plumbing systems.",
    trade: "plumbing",
    states: {
      CA: {
        codeSection: "CA Plumbing Code §608.2",
        guidance: "PRV required when supply pressure exceeds 80 psi.",
      },
      TX: {
        codeSection: "IPC 2018 §604.8",
        guidance: "Install downstream of meter; follow local amendments.",
      },
    },
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Seasonal Maintenance",
    description: "Interactive walkthrough for spring and fall tune-ups.",
    trade: "hvac",
    states: {
      CA: {
        codeSection: "CEC Title 24 Part 6",
        guidance:
          "Verify refrigerant charge and airflow per California requirements.",
      },
      NY: {
        codeSection: "NYC Mechanical Code §403",
        guidance: "Ventilation rates must meet table 403.3.1.1.",
      },
    },
  },
  {
    id: "electrical-panel",
    title: "Residential Service Panel Upgrades",
    description: "Step-by-step NEC-compliant panel upgrades.",
    trade: "electrical",
    states: {
      FL: {
        codeSection: "NEC 2020 §408",
        guidance: "Label circuits per Florida Building Code.",
      },
      WA: {
        codeSection: "WAC 296-46B-408",
        guidance: "AFCI protection required for bedroom circuits.",
      },
    },
  },
];
