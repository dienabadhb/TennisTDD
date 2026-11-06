import type { Classement } from "./classement";

const NOMS_POINTS = ["Zéro", "Quinze", "Trente", "Quarante"];
const POINTS_A_QUARANTE = 3;

export class Jeu {
  private points = { joueur1: 0, joueur2: 0 };
  private vainqueur: string | null = null;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    const estJoueur1 = joueur === this.joueur1;
    const cle = estJoueur1 ? "joueur1" : "joueur2";
    if (this.points[cle] === POINTS_A_QUARANTE) {
      this.vainqueur = joueur;
    } else {
      this.points[cle]++;
    }
  }

  score(): string {
    if (this.vainqueur) return `Victoire ${this.vainqueur}`;
    const { joueur1, joueur2 } = this.points;
    if (joueur1 === joueur2 && joueur1 >= 3) return "Égalité";
    if (joueur1 === joueur2 && joueur1 >= 1) {
      return `${NOMS_POINTS[joueur1]}-A`;
    }
    return `${NOMS_POINTS[joueur1]}-${NOMS_POINTS[joueur2]}`;
  }
}