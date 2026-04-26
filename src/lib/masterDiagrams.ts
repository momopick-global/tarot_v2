export const MASTER_DIAGRAM_SRC = {
  sera: "/assets/master-diagrams/01_Sera.svg",
  kai: "/assets/master-diagrams/02_Kai.svg",
  morgana: "/assets/master-diagrams/03_Morgana.svg",
  noa: "/assets/master-diagrams/04_Noa.svg",
  erebus: "/assets/master-diagrams/05_Erebus.svg",
  serina: "/assets/master-diagrams/06_Serena.svg",
  nyx: "/assets/master-diagrams/07_Nyx.svg",
  clotho: "/assets/master-diagrams/08_Clotho.svg",
  pipi: "/assets/master-diagrams/09_Pipi.svg",
} as const;

export type MasterDiagramId = keyof typeof MASTER_DIAGRAM_SRC;

export function resolveMasterDiagramSrc(masterId: string): string {
  return MASTER_DIAGRAM_SRC[masterId as MasterDiagramId] ?? MASTER_DIAGRAM_SRC.sera;
}
