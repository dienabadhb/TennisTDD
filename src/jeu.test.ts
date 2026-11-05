import { describe, it, expect } from "vitest";
import { Jeu } from "./jeu.ts";
import type { Classement } from "./classement";

const classementBidon: Classement = { enregistrer: () => {} };

function unJeu(): Jeu {
  return new Jeu("Alice", "Bob", classementBidon);
}

function marque(jeu: Jeu, joueur: string, fois: number): void {
  for (let i = 0; i < fois; i++) jeu.pointPour(joueur);
}

describe("les points", () => {
  it("le score est Zéro-Zéro au début du jeu", () => {
    expect(unJeu().score()).toBe("Zéro-Zéro");
  })
  it.each([
  [1, 0, "Quinze-Zéro"],
  [0, 1, "Zéro-Quinze"],
  [2, 1, "Trente-Quinze"],
  [3, 2, "Quarante-Trente"],
])(
  "annonce les points en français : Alice %i, Bob %i donne %s",
  (pointsAlice, pointsBob, attendu) => {
    const jeu = unJeu();
    marque(jeu, "Alice", pointsAlice);
    marque(jeu, "Bob", pointsBob);
    expect(jeu.score()).toBe(attendu);
  },
);
});