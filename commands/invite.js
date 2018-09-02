'use strict';

exports.Run = async function Run(caller, command) {
  caller.utils.message(command.msg.channel.id, '<https://discordapp.com/oauth2/authorize?client_id=465191491224993793&permissions=268790848&scope=bot>');
};

exports.Settings = function Settings() {
  return {
    show: true,
    category: 'misc',
  };
};
