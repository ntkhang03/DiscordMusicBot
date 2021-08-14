const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "seek",
    description: "Tìm kiếm một vị trí trong bài hát",
    usage: "<time s/m/h>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["forward"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Hiện tại không có bài hát nào đang phát...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bạn phải ở trong một kênh thoại để sử dụng lệnh này!!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bạn phải ở cùng kênh thoại với bot để sử dụng lệnh này!**");
        if (!player.queue.current.isSeekable) return client.sendTime(message.channel, "❌ | **Không thể tìm thấy bài hát này!**");
        let SeekTo = client.ParseHumanTime(args.join(" "));
        if (!SeekTo) return client.sendTime(message.channel, `**Usage: **\`${GuildDB.prefix}seek <number s/m/h>\` \n**Example: **\`${GuildDB.prefix}seek 2m 10s\``);
        player.seek(SeekTo * 1000);
        message.react("✅");
    }
};

