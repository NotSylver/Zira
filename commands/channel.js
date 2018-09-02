'use strict';

exports.Run = async function Run(caller, command, GUILD) {
  if (!command.msg.channel.guild) {
    caller.utils.message(command.msg.channel.id, {
      embed: {
        description: ':warning: This command can\'t be used in DM',
        color: caller.color.yellow,
      },
    }).catch(console.error);
    return;
  }
  const guild = GUILD;
  const lang = caller.utils.getLang(guild);
  if (command.msg.author.id === process.env.OWNER || command.msg.member.permission.has('manageRoles')) {
    if (!command.params[0]) {
      const CHANNELS = command.msg.channel.guild.channels.filter(c => !c.type);
      caller.utils.message(command.msg.channel.id, {
        embed: {
          color: caller.color.blue,
          title: lang.title,
          description: `**${command.prefix}${lang.channel.help}\n\n${lang.example}${command.prefix}channel <#${CHANNELS[caller.utils.randomNumber(0, CHANNELS.length - 1)].id}>`,
        },
      }).catch(console.error);
      return;
    }
    const channel = command.msg.channel.guild.channels.get(command.params[0].replace(/\D+/g, ''));
    if (!channel) {
      caller.utils.message(command.msg.channel.id, {
        embed: {
          color: caller.color.yellow,
          title: lang.titleError,
          description: lang.unknownChannel,
        },
      }).catch(console.error);
      return;
    }
    guild.chan = channel.id;
    caller.utils.message(command.msg.channel.id, {
      embed: {
        color: caller.color.green,
        title: lang.titleComp,
        description: `${lang.channel.set}${channel.id}>`,
      },
    }).catch(console.error);
    caller.utils.updateGuild(guild);
  } else {
    caller.utils.message(command.msg.channel.id, {
      embed: {
        title: lang.titleError,
        description: lang.perm.noPerm,
        color: caller.color.yellow,
      },
    }).catch(console.error);
  }
};

exports.Settings = function Settings() {
  return {
    show: true,
    category: 'role',
  };
};
