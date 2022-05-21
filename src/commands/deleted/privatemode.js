const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('privatemode')
	.setDescription('Sets up a private channel for '),
	async execute(interaction, player) {
		//if pritvate channel exists
		if (interaction.guild.channels.cache.find(channel => channel.name === "private-"+interaction.user.username)) {
			await interaction.reply({ content: "Private Mode Already Activated, find and join the channel", ephemeral: true });
		} else {
			interaction.guild.channels.create("private-"+interaction.user.username, {
				type: 'GUILD_VOICE',
				permissionOverwrites: [
					{
						id: interaction.guild.roles.everyone.id,
						deny: [Permissions.FLAGS.VIEW_CHANNEL],
					},
					{
						id: interaction.guild.me.id,
						allow: [Permissions.FLAGS.VIEW_CHANNEL],
					},
					{
						id: interaction.user.id,
						allow: [Permissions.FLAGS.VIEW_CHANNEL],
					},
				],
			})
			await interaction.reply({ content: "Private Mode setup, Now find and join the channel to start listening", ephemeral: true });
		}
		//create a private thread for the user
		interaction.channel.threads.create({
			name: "private-"+interaction.user.username,
			autoArchiveDuration: 60,
			//type: 'GUILD_PRIVATE_THREAD',
			reason: 'Private Mode Play Mode for '+interaction.user.username,
			recipients: [interaction.user],
			parentId: interaction.channel.id,
			isPinnable: false
		})
	},
};