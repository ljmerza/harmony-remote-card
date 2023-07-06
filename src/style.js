import { css } from "lit-element";

const style = css`
  ha-card {
    padding: 24px 16px 16px 16px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
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

  .btn-seperate {
    margin-right: 10px;
  }


  .activities {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-right: -0.5rem;
  }

  .activities button, 
  .devices button {
    background-color: var(--secondary-color);
    color: var(--primary-text-color);
    border: 1px solid var(--light-secondary-color);
  }

  .activities button.active-color, 
  .devices button.active-color,
  .active-color {
    background-color: var(--primary-color);
    border: 1px solid var(--light-primary-color);
  }


  .devices {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-right: -0.5rem;
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

  .remote-container .commands {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: -0.5rem;
  }

  .remote-container .commands button {
    width: 23.4%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    white-space: normal;
    word-break: break-word;
  }
`;

export default style;
