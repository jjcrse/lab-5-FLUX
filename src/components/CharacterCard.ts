
import store from '../flux/store';

class CharacterCard extends HTMLElement {
  agentUuid: string = '';
  matchupId: string = '';
  name: string = '';
  image: string = '';

  static get observedAttributes() {
    return ['agent-uuid', 'matchup-id', 'name', 'image'];
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    (this as any)[name] = newVal;
  }

  connectedCallback() {
    this.render();
    this.querySelector('button')?.addEventListener('click', () => {
      store.dispatch({
        type: 'VOTE',
        payload: {
          matchupId: this.matchupId,
          votedAgentUuid: this.agentUuid,
        },
      });
    });
  }

  render() {
    this.innerHTML = `
      <div class="character-card">
        <img src="${this.image}" alt="${this.name}" />
        <h3>${this.name}</h3>
        <button>Votar</button>
      </div>
    `;
  }
}

customElements.define('character-card', CharacterCard);
export default CharacterCard;
