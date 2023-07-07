import "@babel/polyfill/noConflict";
import { LitElement, html } from "lit-element";

import packageJson from "../package.json";
import style from "./style";
import defaultConfig from "./defaults";

/* eslint no-console: 0 */
console.info(`${packageJson.name} v${packageJson.version}`);

class HarmonyRemoteCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
      _activeDevice: Object,
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Entity is required");
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * get the current size of the card
   * @return {Number}
   */
  getCardSize() {
    return 5;
  }

  static get styles() {
    return style;
  }

  /**
   * generates the card HTML
   * @return {TemplateResult}
   */
  render() {
    if(!this.hass.states[this.config.entity]) {
      throw new Error(`Entity not found: ${this.config.entity}`);
    }
    
    return html`<ha-card>${this.renderBody()}</ha-card>`;
  }

  renderBody() {
    return html`<div class="harmony">
      ${this.renderActivities()} ${this.renderDevices()} ${this.renderRemote()}
    </div>`;
  }

  renderActivities() {
    const prename = this.config.entity.split(".")[1];
    const entity = this.hass.states[this.config.entity];
    if(!entity) return html``;

    const configActivities = this.config.activities;

    const entityState = entity.state;
    const entityAttributes = entity.attributes;

    const activityList = entityAttributes.activity_list || [];

    const uiList = configActivities.length ? configActivities: activityList;

    return html`
      <div class="activities">
        <button
          class="${entityState === "off" ? "active-color" : ""}"
          @click="${() =>
            this.callService({
              service: "turn_off",
              data: { activity: "Off" },
            })}"
        >
          Off
        </button>

        ${uiList.map((item) => {
          // if using custom config then set those props
          if(configActivities.length){
            // check if custom name exists
            if(!activityList.includes(item.activity)) {
              console.warn(`The custom activity name ${activity.name} does not exist: ${activityList.join(', ')}`)
              return html``
            }
          }

          const activityName = item.name || item.activity || item;
          const activity = item.activity || item;

          const entityName = item.entity || `switch.${prename}_${activity
            .replace(/ /g, "_")
            .toLowerCase()}`;

          const entity = this.hass.states[entityName];
          const isActive = entity && entity.state === "on";

          const onClick = () =>
            this.callService({
              service: "turn_on",
              data: { activity },
            });

          return html`
            <button
              class="${isActive ? "active-color" : ""}"
              @click="${onClick}"
            >
              ${this.renderIcon(item.icon, item.hide_name)}
              ${this.renderName(activityName, item.hide_name)}
            </button>
          `;
        })}
      </div>
    `;
  }

  renderDevices() {
    const entity = this.hass.states[this.config.entity];
    if(!entity) return html``;
    
    const activeDevice = this.getActiveDevice();
    const devices = this.config.devices || [];

    return html`
      <div class="devices">
        ${devices.map((device) => {
          return html`
            <button
              class="device-btn ${activeDevice === device.name
                ? "active-color"
                : ""}"
              @click="${() => this.setActiveDevice(device.name)}"
            >
              ${this.renderIcon(device.icon, device.hide_name)}
              ${this.renderName(device.friendly_name || device.name, device.hide_name)}
            </button>
          `;
        })}
      </div>
    `;
  }

  renderIcon(icon, hide_name) {
    if(!icon) return html``;
    return html`<span class=${hide_name ? '' : 'btn-seperate'}><ha-icon .icon="${icon}"></ha-icon></span>`;
  }

  renderName(name, hide_name) {
    if(hide_name) return html``;
    return html`<span>${name}</span>`;
  }

  setActiveDevice(device) {
    this._activeDevice = device;
  }

  getActiveDevice() {
    if (this._activeDevice) return this._activeDevice;

    const device = this.config.devices && this.config.devices[0];
    if(!device) return;

    this.setActiveDevice(device.name);
    return device;
  }

  getDeviceCustomCommands(deviceName) {
    const deviceCommands = this.config.devices.find(configDevice => configDevice.name === deviceName);
    return deviceCommands ? deviceCommands.commands : [];
  }

  renderRemote() {
    const activeDevice = this.getActiveDevice();

    if(!activeDevice) return null;
    if(!this.config.showPad) return null;

    const customCommands = this.getDeviceCustomCommands(activeDevice);

    return html`
      <div class="remote-container">
        <div class="remote">
          <div>
            <button
              class="rotate"
              @click=${() => this.commandService({ command: this.config.upPad })}
            >
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
          </div>
          <div>
            <button
              @click=${() => this.commandService({ command: this.config.leftPad })}
            >
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
            <button
              @click=${() => this.commandService({ command: this.config.centerPad })}
            ></button>
            <button
              @click=${() => this.commandService({ command: this.config.rightPad })}
            >
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          </div>
          <div>
            <button
              class="rotate"
              @click=${() => this.commandService({ command: this.config.downPad })}
            >
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          </div>
        </div>

        <div class="commands">
        ${customCommands.map((cmd) => {
          const displayName = cmd.name || cmd;

          // if we have hass service then check for rest of items needed and call service on click
          const service = cmd.service;
          if(service){
            return html`
            <button @click="${() => this.callService({ domain: cmd.domain, service, data: cmd.data  })}">
              ${this.renderIcon(cmd.icon, cmd.hide_name)}
              ${this.renderName(displayName, cmd.hide_name)}
            </button>
          `;
          }

          const command = cmd.command || cmd;

          return html`
            <button @click="${() => this.commandService({ command })}">
              ${this.renderIcon(cmd.icon, cmd.hide_name)}
              ${this.renderName(displayName, cmd.hide_name)}
            </button>
          `;
        })}
        </div>
      </div>
    `;
  }

  vibrate() {
    if(window && window.navigator && window.navigator.vibrate && this.config.vibrate) {
      window.navigator.vibrate(50)
    }
  }

  commandService({ service = "send_command", command }) {
    const activeDevice = this.getActiveDevice();

    this.callService({
      service,
      data: { command, device: activeDevice },
    });
  }

  callService({ domain = "remote", service = "", data }) {
    this.vibrate();

    this.hass.callService(domain, service, {
      entity_id: this.config.entity,
      ...data,
    });
  }
}

customElements.define("harmony-remote-card", HarmonyRemoteCard);
