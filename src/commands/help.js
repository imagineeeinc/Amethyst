const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('Help and command usage'),
	async execute(interaction, player) {
		return interaction.reply(`Amethyst, a beautiful music bot for discord.

Command usage:
**/play**: Plays a song *[song](url or search term)*
**/pause**: pauses the current song
**/resume**: resumes the current song
**/skip**: skips the current song
**/seek**: seeks to a specific time in the current song *[minutes](the time in minutes) [seconds](the time in seconds)*
**/volume**: sets the volume of the current song *[volume](the volume (0-100))*
**/queue**: shows the current queue
**/clear**: clears the current queue
**/nowplaying**: shows the current song
**/stop**: stops the current song
**/loop**: sets the current song or queue to loop *[loop](track/ queue/ false)*
**/back**: goes back to the previous song
**/playlist**: shows the current playlist *[playlist](The playlist to play, with search term(or urls) seperated by commas)*`);
	},
};