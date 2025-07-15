import { AttributesType } from 'src/module/types/template/Attributes';

// TODO: Move Later to its own types file
export type SpiritOverride = Partial<{
    attributes: Partial<Record<keyof AttributesType, number>>;
    init: number;
    astral_init: number;
    init_mult: number;
    astral_init_mult: number;
    init_dice: number;
    astral_init_dice: number;
    skills: string[];
    halfValueSkill: boolean;
    removeAttributes: (keyof AttributesType)[];
}>;

export const spiritOverrides: Record<string, SpiritOverride> = {
    air: {
        attributes: { body: -2, agility: 3, reaction: 4, strength: -3 },
        init: 4,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },
    aircraft: {
        attributes: { body: 2, agility: 1, strength: 1, logic: -2 },
        skills: ['free_fall', 'navigation', 'perception', 'pilot_aircraft', 'unarmed_combat'],
    },
    airwave: {
        attributes: { body: 2, agility: 3, reaction: 4, strength: -3 },
        skills: [
            'assensing',
            'astral_combat',
            'exotic_range',
            'impersonation',
            'perception',
            'running',
            'unarmed_combat',
        ],
        init: 4,
    },
    ally: {
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },
    automotive: {
        attributes: { body: 1, agility: 2, reaction: 1, logic: -2 },
        init: 1,
        skills: ['navigation', 'perception', 'pilot_ground_craft', 'running', 'unarmed_combat'],
    },
    beasts: {
        attributes: { body: 2, agility: 1, strength: 2 },
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },
    blood_shade: {
        attributes: { agility: 2, reaction: 2, strength: -1, charisma: 1 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'counterspelling', 'impersonation', 'perception', 'unarmed_combat'],
    },
    bone: {
        attributes: { body: 3, strength: 2, logic: -1, charisma: -1 },
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },
    ceramic: {
        attributes: { agility: 1, reaction: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },
    earth: {
        attributes: { body: 4, agility: -2, reaction: -1, strength: 4, logic: -1 },
        init: -1,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },
    energy: {
        attributes: { body: 1, agility: 2, reaction: 3, strength: -2, intuition: 1 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },
    fire: {
        attributes: { body: 1, agility: 2, reaction: 3, strength: -2, intuition: 1 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'flight', 'perception', 'unarmed_combat'],
    },
    guardian: {
        attributes: { body: 1, agility: 2, reaction: 3, strength: 2 },
        init: 1,
        skills: [
            'assensing',
            'astral_combat',
            'blades',
            'clubs',
            'counterspelling',
            'exotic_range',
            'perception',
            'unarmed_combat',
        ],
    },
    guidance: {
        attributes: { body: 3, agility: -1, reaction: 2, strength: 1 },
        skills: ['arcana', 'assensing', 'astral_combat', 'counterspelling', 'perception', 'unarmed_combat'],
    },
    homunculus: {
        attributes: { agility: -2, reaction: -2 },
        init: 1,
        init_dice: 1,
        init_mult: 1,
        astral_init_dice: 0,
        astral_init_mult: 0,
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
        halfValueSkill: true,
        removeAttributes: ['body', 'charisma', 'intuition', 'logic', 'willpower'],
    },
    man: {
        attributes: { body: 1, reaction: 2, strength: -2, intuition: 1 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'perception', 'spellcasting', 'unarmed_combat'],
    },
    metal: {
        attributes: { body: 4, agility: -2, reaction: -1, strength: 4, logic: -1 },
        init: -1,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },
    plant: {
        attributes: { body: 2, agility: -1, strength: 1, logic: -1 },
        skills: ['assensing', 'astral_combat', 'perception', 'exotic_range', 'unarmed_combat'],
    },
    ship: {
        attributes: { body: 4, agility: -1, reaction: -1, strength: 2, logic: -2 },
        init: -1,
        skills: ['navigation', 'perception', 'pilot_water_craft', 'survival', 'swimming', 'unarmed_combat'],
    },
    task: {
        attributes: { reaction: 2, strength: 2 },
        init: 2,
        skills: ['artisan', 'assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },
    train: {
        attributes: { body: 3, agility: -1, reaction: -1, strength: 2, willpower: 1, logic: -2 },
        init: -1,
        skills: ['intimidation', 'navigation', 'perception', 'pilot_ground_craft', 'unarmed_combat'],
    },
    watcher: {
        attributes: { willpower: -2, logic: -2, intuition: -2, charisma: -2 },
        init_dice: 0,
        init_mult: 0,
        astral_init_dice: 1,
        skills: ['assensing', 'astral_combat', 'perception'],
        halfValueSkill: true,
        removeAttributes: ['body', 'agility', 'reaction', 'strength'],
    },
    water: {
        attributes: { agility: 1, reaction: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },

    toxic_air: {
        attributes: { body: -2, agility: 3, reaction: 4, strength: -3 },
        init: 4,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'running', 'unarmed_combat'],
    },
    toxic_beasts: {
        attributes: { body: 2, agility: 1, strength: 2 },
        skills: ['assensing', 'astral_combat', 'exotic_range', 'gymnastics', 'perception', 'running', 'unarmed_combat'],
    },
    toxic_earth: {
        attributes: { body: 4, agility: -2, reaction: -1, strength: 4, logic: -1 },
        init: -1,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },
    toxic_fire: {
        attributes: { body: 1, agility: 2, reaction: 3, strength: -2, intuition: 1 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'flight', 'unarmed_combat'],
    },
    toxic_man: {
        attributes: { reaction: 2, strength: -2, intuition: 1 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'perception', 'spell_casting', 'unarmed_combat'],
    },
    toxic_water: {
        attributes: { body: 1, agility: 1, reaction: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },

    blood: {
        attributes: { body: 2, agility: 2, strength: 2, logic: -1 },
        skills: ['assensing', 'astral_combat', 'perception', 'running', 'unarmed_combat'],
    },

    muse: {
        attributes: { agility: 3, reaction: 2, willpower: 1 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'con', 'gymnastics', 'intimidation', 'perception', 'unarmed_combat'],
    },
    nightmare: {
        attributes: { agility: 3, reaction: 2, willpower: 1, intuition: 1, charisma: 2 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'con', 'gymnastics', 'intimidation', 'perception', 'unarmed_combat'],
    },
    shade: {
        attributes: { agility: 3, reaction: 2, willpower: 1, intuition: 1, charisma: 2 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'con', 'gymnastics', 'intimidation', 'perception', 'unarmed_combat'],
    },
    succubus: {
        attributes: { agility: 3, reaction: 2, willpower: 1, intuition: 1, charisma: 2 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'con', 'gymnastics', 'intimidation', 'perception', 'unarmed_combat'],
    },
    wraith: {
        attributes: { agility: 3, reaction: 2, willpower: 1, intuition: 1, charisma: 2 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'con', 'gymnastics', 'intimidation', 'perception', 'unarmed_combat'],
    },

    // Shedim
    shedim: {
        attributes: { reaction: 2, strength: 1 },
        init: 2,
        init_dice: 1,
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },

    hopper: {
        attributes: { reaction: 4, intuition: 1 },
        init: 6,
        init_dice: 1,
        skills: [
            'assensing',
            'astral_combat',
            'blades',
            'gymnastics',
            'perception',
            'running',
            'sneaking',
            'throwing_weapons',
            'unarmed_combat',
        ],
    },

    blade_summoned: {
        attributes: { body: 1, agility: 3, reaction: 2, strength: 1 },
        init: 2,
        init_dice: 1,
        skills: [
            'assensing',
            'astral_combat',
            'blades',
            'gymnastics',
            'perception',
            'running',
            'sneaking',
            'throwing_weapons',
            'unarmed_combat',
        ],
    },

    horror_show: {
        attributes: { body: 1, agility: 3, reaction: 2, strength: 1 },
        init: 2,
        init_dice: 1,
        skills: [
            'assensing',
            'astral_combat',
            'blades',
            'con',
            'disguise',
            'gymnastics',
            'impersonation',
            'perception',
            'running',
            'sneaking',
            'unarmed_combat',
        ],
    },

    unbreakable: {
        attributes: { body: 3, agility: 1, reaction: 1, strength: 3, logic: -1 },
        init: 1,
        init_dice: 1,
        skills: ['assensing', 'astral_combat', 'clubs', 'perception', 'sneaking', 'throwing_weapons', 'unarmed_combat'],
    },

    master_shedim: {
        attributes: { reaction: 2, strength: 1, logic: 1, intuition: 1 },
        init: 3,
        init_dice: 1,
        skills: ['assensing', 'astral_combat', 'counterspelling', 'perception', 'spellcasting', 'unarmed_combat'],
    },

    // insect
    caretaker: {
        attributes: { agility: 1, reaction: 1 },
        init: 1,
        skills: ['assensing', 'astral_combat', 'leadership', 'perception', 'unarmed_combat'],
    },
    nymph: {
        attributes: { body: 1, reaction: 3, strength: 1 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'perception', 'gymnastics', 'spellcasting', 'unarmed_combat'],
    },
    scout: {
        attributes: { agility: 2, reaction: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'perception', 'gymnastics', 'sneaking', 'unarmed_combat'],
    },
    soldier: {
        attributes: { body: 3, agility: 1, reaction: 1, strength: 3 },
        init: 1,
        skills: [
            'assensing',
            'astral_combat',
            'counterspelling',
            'exotic_range',
            'gymnastics',
            'perception',
            'unarmed_combat',
        ],
    },
    worker: {
        attributes: { strength: 1 },
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },
    queen: {
        attributes: {
            body: 5,
            agility: 3,
            reaction: 4,
            strength: 5,
            willpower: 1,
            logic: 1,
            intuition: 1,
        },
        init: 5,
        skills: [
            'assensing',
            'astral_combat',
            'con',
            'counterspelling',
            'gymnastics',
            'leadership',
            'negotiation',
            'perception',
            'spellcasting',
            'unarmed_combat',
        ],
    },
    carcass: {
        attributes: { body: 3, strength: 2, charisma: -1 },
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },
    corpse: {
        attributes: { body: 2, agility: -1, reaction: 2, strength: -2, intuition: 1, charisma: -1 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },
    rot: {
        attributes: { body: 3, agility: -2, strength: 1, logic: -1, charisma: -1 },
        skills: ['assensing', 'astral_combat', 'counterspelling', 'exotic_range', 'perception', 'unarmed_combat'],
    },
    palefile: {
        attributes: { body: 2, agility: 1, reaction: 3, strength: -2, intuition: 1, charisma: -1 },
        init: 3,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'flight', 'perception', 'unarmed_combat'],
    },
    detritus: {
        attributes: { body: 5, agility: -3, reaction: -1, strength: 4, logic: -1, charisma: -1 },
        init: -1,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'perception', 'unarmed_combat'],
    },

    // Howling Shadow
    anarch: {
        attributes: { body: -1, agility: -1, reaction: 1, strength: -1 },
        init: 1,
        skills: [
            'assensing',
            'automatics',
            'blades',
            'clubs',
            'con',
            'demolitions',
            'disguise',
            'forgery',
            'gymnastics',
            'impersonation',
            'locksmith',
            'palming',
            'perception',
            'pistols',
            'sneaking',
            'throwing_weapons',
            'unarmed_combat',
        ],
    },

    arboreal: {
        attributes: { body: 2, strength: 1, essence: -2 },
        skills: ['assensing', 'astral_combat', 'blade', 'clubs', 'unarmed_combat', 'exotic_range', 'perception'],
    },

    blackjack: {
        attributes: { body: 2, agility: 1, reaction: 1 },
        init: 1,
        skills: [
            'assensing',
            'automatics',
            'blades',
            'clubs',
            'computer',
            'first_aid',
            'gymnastics',
            'intimidation',
            'locksmith',
            'longarms',
            'perception',
            'pilot_ground_craft',
            'pistols',
            'sneaking',
            'throwing_weapons',
            'unarmed_combat',
        ],
    },

    boggle: {
        attributes: { body: -2, agility: -1, reaction: -1, strength: -2, willpower: 2 },
        init: -1,
        skills: ['assensing', 'astral_combat', 'blades', 'clubs', 'unarmed_combat', 'gymnastics', 'perception'],
    },

    bugul: {
        attributes: { agility: -1, reaction: -1, strength: -2, willpower: 1, logic: 2 },
        skills: [
            'artisan',
            'assensing',
            'astral_combat',
            'con',
            'counterspelling',
            'disenchanting',
            'gymnastics',
            'negotiation',
            'perception',
            'unarmed_combat',
        ],
    },

    chindi: {
        attributes: { body: 2, agility: 1, reaction: 2, strength: 1 },
        init: 2,
        skills: [
            'archery',
            'blades',
            'clubs',
            'first_aid',
            'gymnastics',
            'intimidation',
            'perception',
            'sneaking',
            'throwing_weapons',
            'unarmed_combat',
        ],
    },

    // HS#119: This spirit types has fixed values that don't use general spirit rules...
    corpselight: {},

    croki: {
        attributes: { reaction: 2, strength: 2 },
        init: 2,
        skills: [
            'artificing',
            'assensing',
            'astral_combat',
            'gymnastics',
            'perception',
            'ritual_spellcasting',
            'spellcasting',
        ],
    },

    duende: {
        attributes: { reaction: 2, strength: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'con', 'gymnastics', 'perception'],
    },

    ejerian: {
        skills: [
            'assensing',
            'astral_combat',
            'automatics',
            'blades',
            'clubs',
            'computer',
            'first_aid',
            'gymnastics',
            'intimidation',
            'locksmith',
            'longarms',
            'perception',
            'pilot_ground_craft',
            'pistols',
            'sneaking',
            'throwing_weapons',
            'unarmed_combat',
        ],
    },

    elvar: {
        attributes: { reaction: 2, strength: 2 },
        init: 2,
        skills: [
            'assensing',
            'astral_combat',
            'con',
            'counterspelling',
            'disenchanting',
            'gymnastics',
            'perception',
            'spellcasting',
        ],
    },

    erinyes: {
        attributes: { body: -1, agility: 3, reaction: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'flight', 'gymnastics', 'perception', 'sneaking', 'unarmed_combat'],
    },

    green_man: {
        attributes: { body: 3, agility: -1, reaction: 2, strength: 4 },
        init: 2,
        skills: [
            'assensing',
            'astral_combat',
            'counterspelling',
            'gymnastics',
            'leadership',
            'perception',
            'unarmed_combat',
        ],
    },

    imp: {
        attributes: { reaction: 3 },
        init: 3,
        skills: [
            'alchemy',
            'assensing',
            'astral_combat',
            'con',
            'counterspelling',
            'disenchanting',
            'gymnastics',
            'intimidation',
            'perception',
            'spellcasting',
            'unarmed_combat',
        ],
    },

    jarl: {
        attributes: { body: 2, agility: -2, reaction: 3, strength: 2 },
        init: 4,
        skills: [
            'assensing',
            'astral_combat',
            'counterspelling',
            'gymnastics',
            'leadership',
            'perception',
            'unarmed_combat',
        ],
    },

    kappa: {
        attributes: { body: 5, reaction: -1, strength: 1, essence: -2 },
        init: -1,
        skills: ['assensing', 'astral_combat', 'exotic_range', 'gymnastics', 'perception', 'unarmed_combat'],
    },

    kokopelli: {
        attributes: { body: -1, agility: 2, reaction: 2 },
        init: 2,
        skills: ['artisan', 'assensing', 'astral_combat', 'leadership', 'perception', 'unarmed_combat'],
    },

    morbi: {
        attributes: { reaction: 1, strength: -2, intuition: 1, charisma: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'perception', 'ritual_spellcasting', 'sneaking', 'unarmed_combat'],
    },

    nocnitsa: {
        attributes: { body: -3, agility: 4, reaction: 5, strength: -2, willpower: -1 },
        init: 5,
        skills: ['assensing', 'astral_combat', 'perception', 'sneaking', 'unarmed_combat'],
    },

    phantom: {
        attributes: { body: 1, reaction: 2, strength: -2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'gymnastics', 'perception', 'unarmed_combat'],
    },

    preta: {
        attributes: { body: -1, agility: 1, reaction: 2, strength: -1 },
        init: 2,
        skills: [
            'assensing',
            'astral_combat',
            'intimidation',
            'negotiation',
            'perception',
            'sneaking',
            'unarmed_combat',
        ],
    },

    stabber: {
        attributes: { body: 1, agility: 4, reaction: 2, strength: 4 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'gymnastics', 'perception', 'unarmed_combat'],
    },

    tungak: {
        attributes: { body: 1, reaction: 2, strength: -2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'gymnastics', 'perception', 'unarmed_combat'],
    },

    vucub_caquix: {
        attributes: { body: 3, agility: 4, reaction: 4, strength: 2, intuition: 2, charisma: 4 },
        init: 5,
        skills: ['assensing', 'flight', 'perception', 'unarmed_combat'],
    },

    // AET#34-37: This spirit types has fixed values that don't use general spirit rules...
    gum_toad: {
        attributes: { body: 7, agility: -2, strength: 2, charisma: 1, willpower: -1 },
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
    },

    crawler: {
        attributes: { body: 4, reaction: 3, strength: 6, charisma: -1, intuition: 3, willpower: -1 },
        init: 6,
        astral_init: 6,
        skills: ['assensing', 'astral_combat', 'perception', 'running', 'sneaking', 'unarmed_combat'],
    },

    ghasts: {
        attributes: { body: 2, reaction: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'flight', 'perception', 'spellcasting', 'unarmed_combat'],
    },

    vrygoths: {
        attributes: { body: 4, strength: 3, logic: 3 },
        skills: ['assensing', 'astral_combat', 'flight', 'perception', 'spellcasting', 'unarmed_combat'],
    },

    gremlin: {
        attributes: { reaction: 3 },
        init: 3,
        skills: [
            'assensing',
            'astral_combat',
            'con',
            'counterspelling',
            'intimidation',
            'perception',
            'spellcasting',
            'unarmed_combat',
        ],
    },

    anansi: {
        attributes: { agility: 2, reaction: 2 },
        init: 2,
        skills: ['assensing', 'astral_combat', 'gymnastics', 'perception', 'sneaking', 'unarmed_combat'],
    },

    tsuchigumo_warrior: {
        attributes: { body: 2, agility: 2, reaction: 1, strength: 3 },
        init: 1,
        skills: ['assensing', 'astral_combat', 'counterspelling', 'perception', 'unarmed_combat'],
    },

    // HT#129
    corps_cadavre: {
        attributes: { body: 2, agility: -2, reaction: -2 },
        init: 1,
        init_dice: 1,
        init_mult: 1,
        astral_init_dice: 1,
        astral_init_mult: 1,
        skills: ['assensing', 'astral_combat', 'perception', 'unarmed_combat'],
        removeAttributes: ['charisma', 'intuition', 'logic', 'willpower'],
    },
};
