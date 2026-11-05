import type { Classement } from "./classement";

export class Jeu {
  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string): void {}

  score(): string {
    return "Zéro-Zéro";
  }
}