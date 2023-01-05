import { css } from "lit-element";

const style = css`
  ha-card {
    padding: 24px 16px 16px 16px;
  }

  button {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    cursor: pointer;

    background-color: var(--primary-color);
    color: var(--primary-text-color);
  }

  .harmony {
  }

  .activities {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-right: -0.5rem;
    justify-content: center;
  }

  .devices {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-right: -0.5rem;
    justify-content: center;
  }

  .activities button,
  .devices button {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
  }

  .remote-container .remote {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .remote-container .remote div {
    display: flex;
    justify-content: center;
  }

  .remote-container .remote button {
    margin: 0.5rem;
    width: 50px;
    height: 50px;
  }

  .rotate {
    transform: rotate(90deg);
  }

  .active-color {
    background-color: var(--light-primary-color);
    border: 1px solid var(--primary-color);
  }

  .remote-container .commands {
    display: flex;
    flex-wrap: wrap;
    margin-top: -0.5rem;
    justify-content: center;
  }

  .remote-container .commands button {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export default style;
