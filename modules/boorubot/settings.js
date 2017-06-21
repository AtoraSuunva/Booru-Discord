//Edit and view settings
module.exports.config = {
  name: 'settings',
  invokers: ['settings', 'setting', 'seting', 'set'],
  help: 'Change/view settings',
  expandedHelp: 'Change/View settings for BooruBot\nRequires "Manage Server" perms to change\n**Usage:**\n`setting` => View current settings\n`setting settingName` => View current setting + info about it\n`setting settingName newValue` => Change a setting '
}

const fs = require('fs')

const setTemplate = {
  topicEnable: {
    type: 'boolean',
    default: 'false',
    help: 'Only allow BooruBot to search in channels with `bb=true` in the topic (Other commands will still work, except no invite link for BB will be posted).'
  },

  disableDMs: {
    type: 'boolean',
    default: 'false',
    help: 'Disables users from DMing BooruBot if all shared servers have this set to true.'
  },

  nsfwServer: {
    type: 'boolean',
    default: 'false',
    help: 'Makes the bot treat every channel on the server as nsfw. By default only sfw images are posted out of nsfw channels.'
  },

  showUpdates: {
    type: 'boolean',
    default: 'false',
    help: 'Show an update message on the first bot command after every update.'
  },

  minScore: {
    type: 'number',
    default: 'null',
    help: 'The minimum score an image should have to be posted, `null` means no limit. Setting it too high will make BooruBot not return most images, something like `-5` is a good cut off point.'
  },

  deprecationWarning: {
    type: 'boolean',
    default: 'true',
    help: 'Warn if a user tries to use a deprecated command (Like `=help`).'
  }
}

module.exports.events = {}
module.exports.events.message = (bot, message) => {
  let settingsId = (message.guild !== null) ? message.guild.id : message.channel.id //DMs are a channel, interestingly enough
  let settings = bot.modules.settings.get(settingsId) //yay settings
  let [cmd, setting, ...value] = bot.modules.shlex(message.content)

  value = value.join(' ')

    //b!settings aSetting true
    //['settings', 'aSetting', 'true']
    // 0           1           2

  if (setting === undefined) { //List all the settings
    let options = []
    let longest = 1
    for (let option in setTemplate) {
      options.push([option, settings.options[option]])
      if (option.length > longest) longest = option.length
    }

    message.channel.send(`Current settings\n${'='.repeat(longest + 3)}\n${options.map(v => v[0] + ' '.repeat(longest - v[0].length + 1) + ':: ' + v[1]).join('\n')}\n\nUse 'b!setting [setting]' for more info.`, {code: 'asciidoc'})

  } else if (value === '') { //List one setting + info
    if (setTemplate[setting])
      message.channel.send(`${setting}\n${'='.repeat(setting.length)}\nType    :: ${setTemplate[setting].type}\nDefault :: ${setTemplate[setting].default}\n\n${setTemplate[setting].help}`, {code: 'asciidoc'})
    else
      message.channel.send('That is probably not a valid setting.')
  } else { //Set a setting
    if (message.guild && !message.member.hasPermission('MANAGE_GUILD') && message.author.id !== bot.modules.config.owner.id)
      return message.channel.sendMessage('You don\'t have "Manage Server" perms.')

    if (setTemplate[setting] === undefined)
      return message.channel.sendMessage('That\'s not a valid setting! Use `b!setting` to view them all')

    let newVal

    if (setTemplate[setting].type === 'string') {
      newVal = value
    } else {
      newVal = toPrim(value)
    }

    if (typeof newVal !== setTemplate[setting].type && newVal !== null)
      return message.channel.sendMessage(`The types don't match! You need a ${setTemplate[setting].type}!`)

    settings.options[setting] = newVal
    message.channel.sendMessage(`Setting changed!\n\`${setting}\` = \`${settings.options[setting]}\``)
  }

  bot.modules.settings.set(settingsId, settings)
}

//Convert stuff to it's primitive values
//'True'      => true
//'false'     => false
//'342'       => 342
//'stringsda' => 'stringsda'
//'52332adsa' => '52332adsa'

function toPrim(val) {
  let prim = ((parseFloat(val) == val) ? parseFloat(val) : null) || ((val.toLowerCase() === 'true') ? true : null) || ((val.toLowerCase() === 'false') ? false : NaN)
  if (val.toLowerCase() === 'null') prim = null
  if (prim !== prim) prim = val //hacky fix since || will check the next one if it's false, meaning that false always returned a string
  return prim
}