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
    return `${NOMS_POINTS[this.points.joueur1]}-${NOMS_POINTS[this.points.joueur2]}`;
  }
}