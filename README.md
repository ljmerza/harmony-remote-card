# Harmony Remote Card for Home Assistant
Control your media device through Harmony Hub with this card.

<img src='https://raw.githubusercontent.com/ljmerza/harmony-remote-card/master/card.png' />

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
![Project Maintenance][maintenance-shield]
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

## Installation through [HACS](https://github.com/hacs/integration)

## Configurations:

---

```yaml
type: custom:harmony-remote-card
entity: remote.harmony_hub
```

## Options:

---

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:harmony-remote-card`
| entity | string | **Required** | `remote.harmony_hub` the name of the harmony hub entity
| devices  | Array | **Optional** | a list of devices to add custom commands to. See below for more info.

### devices Options:

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| name | string | **Required** | the name of the device you want custom commands on
| commands | string | **Required** | the name of the command in your harmony.conf file for this device. Can be a simple list or a list of objects with name and command properties.

### commands Options:

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| name | string | **Required** | the custom name of the command
| command | string | **Required** | the name of the command in your harmony.conf file.

---

Example config:

```yaml
type: custom:harmony-hub-card
entity: remote.harmony_hub
devices:
  - name: Media Room Shield
    commands:
      - Mute
      - Home
      - name: Power Off
        command: PowerOff
  - name: LG TV
    commands:
      - Mute
      - Info
      - name: InputHdmi1
        command: InputHdmi1
  - name: Denon AV Receiver
    commands:
      - Mute
      - Info
      - InputTVAudio
      - InputGame
      - name: Volume Down
        command: VolumeDown
      - name: Volume Up
        command: VolumeUp
```

Enjoy my card? Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/JMISm06AD)


[commits-shield]: https://img.shields.io/github/commit-activity/y/ljmerza/harmony-remote-card.svg?style=for-the-badge
[commits]: https://github.com/ljmerza/harmony-remote-card/commits/master
[license-shield]: https://img.shields.io/github/license/ljmerza/harmony-remote-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Leonardo%20Merza%20%40ljmerza-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/ljmerza/harmony-remote-card.svg?style=for-the-badge
[releases]: https://github.com/ljmerza/harmony-remote-card/releases
