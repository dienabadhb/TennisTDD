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
});