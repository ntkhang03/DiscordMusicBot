const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Xóa danh sách đợi trong máy chủ",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Hiện tại không có bài hát nào đang  phát...**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(message.channel, "❌ | **Hiện tại không có bài hát nào đang phát...**");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bạn phải ở trong một kênh thoại để sử dụng lệnh này!**");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bạn phải ở cùng kênh thoại với bot để sử dụng lệnh này!**");
    player.queue.clear();
    await client.sendTime(message.channel, "✅ | **Đã xóa danh sách đợi!**");
  },

  SlashCommand: {
    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      if (!member.voice.channel) return client.sendTime(interaction, "❌ | Bạn phải ở trong một kênh thoại để sử dụng lệnh này.");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bạn phải ở cùng kênh thoại với bot để sử dụng lệnh này!**");
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(interaction, "❌ | **Hiện tại không có bài hát nào đang phát...**");

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime(interaction, "❌ | **Hiện tại không có bài hát nào đang phát...**");
      player.queue.clear();
      await client.sendTime(interaction, "✅ | **Đã xóa danh sách đợi!**");
    },
  },
};
