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
  [1, "Quinze-A"],
  [2, "Trente-A"],
])("annonce « A » quand les joueurs ont %i point(s) chacun : %s", (points, attendu) => {
  const jeu = unJeu();
  marque(jeu, "Alice", points);
  marque(jeu, "Bob", points);
  expect(jeu.score()).toBe(attendu);
});
});describe("le point décisif", () => {
  it("annonce Égalité quand les deux joueurs sont à Quarante", () => {
    const jeu = unJeu();
    marque(jeu, "Alice", 3);
    marque(jeu, "Bob", 3);
    expect(jeu.score()).toBe("Égalité");
  });
});

describe("la victoire", () => {
  it.each([
    [3, 0, "Alice", "Victoire Alice"],
    [0, 3, "Bob", "Victoire Bob"],
    [3, 3, "Alice", "Victoire Alice"],
    [3, 3, "Bob", "Victoire Bob"],
  ])(
    "gagne en marquant à Quarante : Alice %i, Bob %i, point pour %s donne %s",
    (pointsAlice, pointsBob, marqueur, attendu) => {
      const jeu = unJeu();
      marque(jeu, "Alice", pointsAlice);
      marque(jeu, "Bob", pointsBob);
      jeu.pointPour(marqueur);
      expect(jeu.score()).toBe(attendu);
    },
  );
});

describe("le classement du tournoi", () => {
  // Double : SPY (vi.fn()). enregistrer() est une sortie : Jeu envoie un
  // résultat au classement et n'attend rien en retour. Il faut donc observer
  // l'appel après coup. Un dummy ne retient rien, un stub n'a aucune valeur
  // de retour à fournir (void), un fake serait du code inutile.
  it("enregistre le vainqueur puis le perdant, une seule fois, à la fin du match", () => {
    const enregistrer = vi.fn();
    const jeu = new Jeu("Alice", "Bob", { enregistrer });

    marque(jeu, "Alice", 4);

    expect(enregistrer).toHaveBeenCalledTimes(1);
    expect(enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });
});