import type { Classement } from "./classement";

const NOMS_POINTS = ["Zéro", "Quinze", "Trente", "Quarante"];

export class Jeu {
  private points = { joueur1: 0, joueur2: 0 };

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    if (joueur === this.joueur1) this.points.joueur1++;
    else this.points.joueur2++;
  }

  score(): string {
  const { joueur1, joueur2 } = this.points;
  if (joueur1 === joueur2 && joueur1 >= 1 && joueur1 < 3) {
    return `${NOMS_POINTS[joueur1]}-A`;
  }
  return `${NOMS_POINTS[joueur1]}-${NOMS_POINTS[joueur2]}`;
}
}