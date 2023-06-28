import {
  CacheType,
  CommandInteraction
} from 'discord.js';
import { Command } from '../../structures/command';
import ValCrosshair from '../../structures/val-crosshair';
import GetChoices from '../../utils/get-choices';

export default class ValCrosshairCommand extends Command {
  constructor() {
    super({
      name: 'val-crosshair',
      description: 'Generate a image of a crosshair for Valorant',
      options: [
        {
          type: 'string',
          name: 'crosshair-id',
          description: 'The ID of the crosshair to generate',
          required: true,
        },
      ],
    });
  }

  async run(interaction: CommandInteraction<CacheType>) {
    await interaction.deferReply();
    const crosshairId = new GetChoices(interaction.options).getString(
      'crosshair-id',
      true,
    )!;
    return new ValCrosshair().getCrosshair(interaction, crosshairId);
  }
}
