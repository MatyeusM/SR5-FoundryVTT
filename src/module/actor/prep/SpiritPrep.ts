import { SkillsPrep } from './functions/SkillsPrep';
import { AttributesPrep } from './functions/AttributesPrep';
import { LimitsPrep } from './functions/LimitsPrep';
import { MovementPrep } from './functions/MovementPrep';
import { WoundsPrep } from './functions/WoundsPrep';
import { ModifiersPrep } from './functions/ModifiersPrep';
import { InitiativePrep } from './functions/InitiativePrep';
import { Helpers } from '../../helpers';
import { PartsList } from '../../parts/PartsList';
import { SkillFlow } from '../flows/SkillFlow';
import { CharacterPrep } from './CharacterPrep';
import { GruntPrep } from './functions/GruntPrep';
import { DataDefaults } from '../../data/DataDefaults';
import { SR } from '../../constants';
import { SkillFieldType, SkillsType } from 'src/module/types/template/Skills';
import { SR5Item } from 'src/module/item/SR5Item';
import { AttributesType } from 'src/module/types/template/Attributes';
import { ActiveSkillsById } from '../../config/ActiveSkills';
import { spiritOverrides } from 'src/module/config/Spirits';

export class SpiritPrep {
    static prepareBaseData(system: Actor.SystemOfType<'spirit'>) {
        SpiritPrep.prepareSpiritSpecial(system);
        SkillsPrep.prepareSkillData(system);

        ModifiersPrep.clearAttributeMods(system);
        ModifiersPrep.clearArmorMods(system);
        ModifiersPrep.clearLimitMods(system);
    }

    static prepareDerivedData(system: Actor.SystemOfType<'spirit'>, items: SR5Item[]) {
        SpiritPrep.prepareSpiritBaseData(system);

        // Use spirit attribute range to avoid issues with attribute calculation causing unusable attributes.
        AttributesPrep.prepareAttributes(system, SR.attributes.rangesSpirit);
        SpiritPrep.prepareAttributesWithForce(system);
        SkillsPrep.prepareSkills(system);

        LimitsPrep.prepareLimitBaseFromAttributes(system);
        LimitsPrep.prepareLimits(system);
        LimitsPrep.prepareDerivedLimits(system);

        SpiritPrep.prepareSpiritArmor(system);

        GruntPrep.prepareConditionMonitors(system);

        MovementPrep.prepareMovement(system);
        WoundsPrep.prepareWounds(system);

        InitiativePrep.prepareCurrentInitiative(system);

        CharacterPrep.prepareRecoil(system);
        CharacterPrep.prepareRecoilCompensation(system);
    }

    static prepareSpiritSpecial(system: Actor.SystemOfType<'spirit'>) {
        // Spirits will always be awakened.
        // system.special = 'magic';
    }

    static prepareSpiritBaseData(system: Actor.SystemOfType<'spirit'>) {
        const overrides = this.getSpiritStatModifiers(system.spiritType);

        if (overrides) {
            const { attributes, skills, initiative, force, modifiers } = system;

            // set the base of attributes to the provided force
            for (const [attId, value] of Object.entries(overrides.attributes)) {
                if (attributes[attId] !== undefined) {
                    attributes[attId].base = (value ?? 0) + force;
                }
            }

            // set the base of skills to the provided force
            for (const skillId of overrides.skills) {
                // Custom skills need to be created on the actor.
                const skill = SpiritPrep.prepareActiveSkill(skillId, skills.active);
                if (skill === undefined) continue;
                if (SkillFlow.isCustomSkill(skill)) continue;

                skill.base = overrides.halfValueSkill ? Math.ceil(force / 2) : force;
                skills.active[skillId] = skill;
            }

            // prepare initiative data
            initiative.meatspace.base.base =
                force * overrides.init_mult + overrides.init + Number(modifiers['astral_initiative']);
            initiative.meatspace.base.mod = PartsList.AddUniquePart(
                initiative.meatspace.base.mod,
                'SR5.Bonus',
                Number(modifiers['meat_initiative']),
            );
            initiative.meatspace.dice.base = overrides.init_dice;
            initiative.meatspace.dice.mod = PartsList.AddUniquePart(
                initiative.meatspace.dice.mod,
                'SR5.Bonus',
                Number(modifiers['meat_initiative_dice']),
            );

            initiative.astral.base.base =
                force * overrides.astral_init_mult +
                overrides.astral_init +
                Number(modifiers['astral_initiative_dice']);
            initiative.astral.base.mod = PartsList.AddUniquePart(
                initiative.astral.base.mod,
                'SR5.Bonus',
                Number(modifiers['astral_initiative']),
            );
            initiative.astral.dice.base = overrides.astral_init_dice;
            initiative.astral.dice.mod = PartsList.AddUniquePart(
                initiative.astral.dice.mod,
                'SR5.Bonus',
                Number(modifiers['astral_initiative_dice']),
            );
        }
    }

    /**
     * Spirits can have some none default skills. The must be created first and don't count as custom skills.
     * @param skillId Whatever skill id should be used.
     * @param skills The list of active skills of the sprite.
     * @returns A prepared SkillField without levels.
     */
    static prepareActiveSkill(skillId: string, skills: SkillsType): SkillFieldType {
        if (skills[skillId]) return skills[skillId];

        const rawSkill = ActiveSkillsById[skillId];
        const label = rawSkill.label;
        const attribute = rawSkill.linkedAttribute;
        const canDefault = rawSkill.flags.canDefault;

        return DataDefaults.createData('skill_field', { label, attribute, canDefault });
    }

    static prepareSpiritArmor(system: Actor.SystemOfType<'spirit'>) {
        const { armor, attributes } = system;
        armor.base = (attributes.essence.value ?? 0) * 2;
        armor.value = Helpers.calcTotal(armor);
        armor.hardened = true;
    }

    /**
     * get the attribute and initiative modifiers and skills
     */
    static getSpiritStatModifiers(spiritType: string) {
        if (!spiritType) return;

        const overrides = {
            // value of 0 for attribute makes it equal to the Force
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            attributes: {
                body: 0,
                agility: 0,
                reaction: 0,
                strength: 0,
                willpower: 0,
                logic: 0,
                intuition: 0,
                charisma: 0,
                magic: 0,
                essence: 0,
            } as Partial<Record<keyof AttributesType, number>>,
            // modifiers for after the Force x init_mult + (init_dice)d6 calculation
            init: 0,
            astral_init: 0,
            init_mult: 2,
            astral_init_mult: 2,
            init_dice: 2,
            astral_init_dice: 3,
            // skills are all set to Force
            skills: [] as string[],
            halfValueSkill: false as boolean,
        };
        const merged = {
            ...overrides,
            ...spiritOverrides[spiritType],
            attributes: {
                ...overrides.attributes,
                ...(spiritOverrides[spiritType]?.attributes || {}),
            },
            skills: [...(overrides.skills || []), ...(spiritOverrides[spiritType]?.skills || [])],
        };
        if (spiritOverrides[spiritType].removeAttributes) {
            delete merged.removeAttributes;
            spiritOverrides[spiritType].removeAttributes.forEach((attr) => {
                // got to delete them dynamically so we have a proper def file.
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete merged.attributes[attr];
            });
        }

        return overrides;
    }

    /**
     * The spirits force value is used for the force attribute value.
     *
     * NOTE: This separation is mainly a legacy concern. Attributes are available as testable (and modifiable values)
     *       flat values like force aren't. For this reason the flat value is transformed to an attribute.
     *
     * @param system The spirit system data to prepare
     */
    static prepareAttributesWithForce(system: Actor.SystemOfType<'spirit'>) {
        const { attributes, force } = system;

        // Allow value to be understandable when displayed.
        attributes.force.base = 0;
        PartsList.AddUniquePart(attributes.force.mod, 'SR5.Force', force);
        AttributesPrep.calculateAttribute('force', attributes.force);
    }
}
