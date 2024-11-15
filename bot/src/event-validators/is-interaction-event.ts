import { CommandValidator, CommandValidatorNext } from '@Structures/command-validator';
import { CacheType, Interaction } from 'discord.js';

export default class IsInteractionEvent extends CommandValidator {
  constructor() {
    super({
      name: 'IsInteractionEvent',
      description: 'Events that are interactions.'
    });
  }

  async isValid(interaction: Interaction<CacheType>, next: CommandValidatorNext) {
    if (interaction.isCommand()) {
      return next();
    }
  }
}
