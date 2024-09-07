import { CacheType, CommandInteraction } from 'discord.js';

import { OptionsBuilder } from '@Utils/options-builder';
import { randomBytes } from 'crypto';
import { Command } from '../../structures/command';
import TicTacToe from '../../structures/tic-tac-toe';

const options = new OptionsBuilder()
  .addUserOption({
    name: 'user',
    description: 'The user to play with'
  })
  .addBoolOption({
    name: 'ultimate',
    description: 'To play TicTacToe Ultimate (there cannot be more than 3 marks per player)'
  })
  .build();

export default class TicTacToeCommand extends Command<typeof options> {
  constructor() {
    super({
      name: 'tic-tac-toe',
      description: 'Play tic-tac-toe',
      options
    });
  }

  async run(interaction: CommandInteraction<CacheType>) {
    const id = randomBytes(6).toString('hex');
    const tictactoe = await TicTacToe.initGame(interaction, id, this.options.user, this.options.ultimate);
    if (!tictactoe) return;

    this.echidna.ticTacToeManager.set(id, tictactoe);
  }
}
