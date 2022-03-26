import 'dotenv/config';
import { Client, Collection, Intents } from 'discord.js';

import CommandManager from './managers/command-manager';
import configs from './configs';
import MusicPlayer from './structures/music-player';

import TicTacToe from './structures/tic-tac-toe';

export const player = new MusicPlayer();

export const tictactoeCollection = new Collection<string, TicTacToe>();

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
  retryLimit: Infinity,
});

client.once('ready', () => {
  client.user?.setActivity({
    name: '/help',
    type: 'COMPETING',
  });
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('error', (error) => console.log('Client error', error));

const commandManager = new CommandManager();

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) commandManager.executeCommand(interaction);
  if (interaction.isSelectMenu()) player.selectMusic(interaction);
  if (interaction.isButton()) {
    if (!interaction.message.interaction?.id) return;
    const tictactoe = tictactoeCollection.get(interaction.message.interaction.id);
    if (!tictactoe) {
      interaction.reply({ content: 'No game found', ephemeral: true });
      return;
    }
    if (await tictactoe.handleClick(interaction)) tictactoeCollection.delete(interaction.message.interaction.id);
  }
});

client.login(configs.token);
