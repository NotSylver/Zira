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
    switch (command.params[0]) {
    case 'channel':
    {
      if (!command.params[1]) {
        caller.utils.message(command.msg.channel.id, {
          embed: {
            title: lang.title,
            description: `**${command.prefix}${lang.join.channel[0]}${command.prefix}${lang.join.channel[1]}`,
            color: caller.color.blue,
          },
        });
        return;
      }
      const channel = (command.params[1] === 'stop') ? 'stop' : command.msg.channel.guild.channels.get(command.params[1].replace(/\D/g, ''));
      if (channel) {
        if (channel === 'stop') {
          guild.joinChannel = '';
          caller.utils.message(command.msg.channel.id, {
            embed: {
              title: lang.titleComp,
              description: lang.join.stop,
              color: caller.color.green,
            },
          });
          caller.utils.updateGuild(guild);
        } else {
          guild.joinChannel = channel.id;
          caller.utils.message(command.msg.channel.id, {
            embed: {
              title: lang.titleComp,
              description: lang.join.setChannel[0] + guild.joinChannel + lang.join.setChannel[1],
              color: caller.color.green,
            },
          });
          caller.utils.updateGuild(guild);
        }
      } else {
        caller.utils.message(command.msg.channel.id, {
          embed: {
            title: lang.titleError,
            description: lang.unknownChannel,
            color: caller.color.yellow,
          },
        });
      }
      break;
    }
    case 'message':
    {
      if (!command.params[1]) {
        caller.utils.message(command.msg.channel.id, {
          embed: {
            title: lang.title,
            description: `**${command.prefix}${lang.join.message}\n\n${lang.example}${command.prefix}join message $mention, welcome to $guild!`,
            color: caller.color.blue,
          },
        });
        return;
      }
      const message = command.params.splice(1).join(' ');
      guild.joinMessage = message;
      caller.utils.message(command.msg.channel.id, {
        embed: {
          title: lang.titleComp,
          description: lang.join.setMessage + guild.joinMessage,
          color: caller.color.green,
        },
      });
      caller.utils.updateGuild(guild);
      break;
    }
    default:
      caller.utils.message(command.msg.channel.id, {
        embed: {
          title: lang.join.title,
          description: `**${command.prefix}${lang.join.help[0]}${command.prefix}${lang.join.help[1]}`,
          color: caller.color.blue,
        },
      });
    }
  } else {
    caller.utils.message(command.msg.channel.id, {
      embed: {
        title: lang.titleError,
        description: lang.perm.noGuildPerm,
        color: caller.color.yellow,
      },
    });
  }
};

exports.Settings = function Settings() {
  return {
    show: true,
    category: 'logs',
  };
};
