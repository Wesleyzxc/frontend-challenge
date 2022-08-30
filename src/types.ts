export const ABILITY_NAMES = ['Power', 'Mobility', 'Technique', 'Survivability', 'Energy'] as const;
export type AbilityName = typeof ABILITY_NAMES[number];

export interface CharacterAbility {
  abilityName: AbilityName;
  abilityScore: number;
}

export interface CharacterTag {
  slot: number;
  tag_name: string; // assuming this can't be changed to use the camelCase naming convention
}

export interface Character {
  id: number;
  name: string;
  quote?: string;
  image: string;
  thumbnail?: string;
  universe: string;
  abilities: CharacterAbility[];
  tags?: CharacterTag[];
}
