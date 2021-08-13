module.exports = {
  name: "uptime",
  description: "Hiển thị thời gian bot hoạt độngy",
  usage: "[uptime]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["time"],

  run: async (client, message, args) => {
    if (!message.member.voice.channel)
    const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
		message.channel.send(`${hours}: ${minutes}: ${seconds}`);
  }

};
