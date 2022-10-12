import "@babel/polyfill/noConflict";
import { LitElement, html } from "lit-element";

import packageJson from "../package.json";
import style from "./style";
import defaultConfig from "./defaults";

/* eslint no-console: 0 */
console.info(`${packageJson.name} v${packageJson.version}`);

class HarmonyHubCard extends LitElement {
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
    return html`<ha-card>${this.renderBody()}</ha-card>`;
  }

  renderBody() {
    return html`<div class="harmony">
      ${this.renderActivities()} ${this.renderDevices()} ${this.renderRemote()}
    </div>`;
  }

  renderActivities() {
    const prename = this.config.entity.split(".")[1];

    const entityState = this.hass.states[this.config.entity].state;
    const entityAttributes = this.hass.states[this.config.entity].attributes
    if(!entityAttributes.activity_list || entityAttributes.activity_list.length === 0) return;

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

        ${entityAttributes.activity_list.map((activity) => {
          const entityName = `switch.${prename}_${activity
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
              ${activity}
            </button>
          `;
        })}
      </div>
    `;
  }

  renderDevices() {
    const entityAttributes = this.hass.states[this.config.entity].attributes
    if(!entityAttributes.devices_list || entityAttributes.devices_list.length === 0) return;
    const activeDevice = this.getActiveDevice();

    return html`
      <div class="devices">
        ${entityAttributes.devices_list.map((device) => {
          return html`
            <button
              class="${activeDevice === device
                ? "active-color"
                : ""}"
              @click="${() => this.setActiveDevice(device)}"
            >
              ${device}
            </button>
          `;
        })}
      </div>
    `;
  }

  setActiveDevice(device) {
    this._activeDevice = device;
  }

  getActiveDevice() {
    if (this._activeDevice) return this._activeDevice;

    const entityAttributes = this.hass.states[this.config.entity].attributes
    const device = entityAttributes.devices_list[0];

    this.setActiveDevice(device);
    return device;
  }

  getActiveDeviceCustomCommands() {
    if(!this.config.devices) return [];
    const activeDevice = this.getActiveDevice();
    if(!activeDevice) return [];

    const deviceCommands = this.config.devices.find(device => device.name === activeDevice);
    return deviceCommands ? deviceCommands.commands : [];
  }

  renderRemote() {
    const activeDevice = this.getActiveDevice();
    if(!activeDevice) return null;

    const customCommands = this.getActiveDeviceCustomCommands();

    return html`
      <div class="remote-container">
        <div class="remote">
          <div>
            <button
              class="rotate"
              @click=${() => this.commandService({ command: "DirectionUp" })}
            >
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
          </div>
          <div>
            <button
              @click=${() => this.commandService({ command: "DirectionLeft" })}
            >
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
            <button
              @click=${() => this.commandService({ command: "Select" })}
            ></button>
            <button
              @click=${() => this.commandService({ command: "DirectionRight" })}
            >
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          </div>
          <div>
            <button
              class="rotate"
              @click=${() => this.commandService({ command: "DirectionDown" })}
            >
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          </div>
        </div>
        <div class="commands">
        ${customCommands.map((cmd) => {
          const displayName = cmd.name || cmd;
          const command = cmd.command || cmd;
          return html`
            <button @click="${() => this.commandService({ command })}">
              ${displayName}
            </button>
          `;
        })}
        </div>
      </div>
    `;
  }

  getDeviceDisplayName(deviceConfig) {
    console.log({ deviceConfig });
    return "test";
  }

  commandService({ service = "send_command", command }) {
    const activeDevice = this.getActiveDevice();
    this.callService({
      service,
      data: { command, device: activeDevice.device },
    });
  }

  callService({ domain = "remote", service = "", data }) {
    this.hass.callService(domain, service, {
      entity_id: this.config.entity,
      ...data,
    });
  }
}

customElements.define("harmony-hub-card", HarmonyHubCard);
