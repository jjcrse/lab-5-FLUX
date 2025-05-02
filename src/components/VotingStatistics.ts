
import store from '../flux/store';

class VotingStatistics extends HTMLElement {
  matchupId: string = '';

  static get observedAttributes() {
    return ['matchup-id'];
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    this.matchupId = newVal;
  }

  connectedCallback() {
    store.subscribe(() => this.render());
    this.render();
  }

  render() {
    const match = store.getState().matchups.find(m => m.id === this.matchupId);
    if (!match) return;

    const totalVotes = match.votes1 + match.votes2 || 1; // evitar división por 0
    const percent1 = Math.round((match.votes1 / totalVotes) * 100);
    const percent2 = Math.round((match.votes2 / totalVotes) * 100);

    this.innerHTML = `
      <div class="voting-stats">
        <div>${match.agent1.displayName}: ${percent1}%</div>
        <div>${match.agent2.displayName}: ${percent2}%</div>
      </div>
    `;
  }
}

customElements.define('voting-statistics', VotingStatistics);
export default VotingStatistics;
