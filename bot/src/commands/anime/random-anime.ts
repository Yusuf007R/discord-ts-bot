import Anime from '@Structures/anime';
import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from '../../structures/command';

export default class RandomAnimeCommand extends Command {
  constructor() {
    super({
      name: 'random-anime',
      description: 'Get a random anime recommendation',
      cmdType: 'BOTH',
      options: []
    });
  }

  async run(interaction: CommandInteraction<CacheType>) {
    await interaction.deferReply();

    try {
      const anime = await Anime.getRandomAnime();
      const embed = Anime.getAnimeEmbed(anime);

      await interaction.editReply({ embeds: [embed] });
    } catch (error: any) {
      console.error('Error fetching random anime:', error);
      await interaction.editReply('An error occurred while fetching a random anime. Please try again later.');
    }
  }
}
