import './CharacterCard';
import './VotingStatistics';
import './AppContainer';


class RootComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<app-container></app-container>`;
  }
}

customElements.define('root-component', RootComponent);
export default RootComponent;
