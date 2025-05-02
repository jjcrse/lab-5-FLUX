
import { fetchRandomAgents, pairAgents } from '../utils/FetchAgents';
import store from '../flux/store';

class AppContainer extends HTMLElement {
  async connectedCallback() {
    const agents = await fetchRandomAgents(16);
    const matchups = pairAgents(agents);
    store.dispatch({ type: 'SET_MATCHUPS', payload: matchups });

    this.render();
    store.subscribe(() => this.render());
  }

  render() {
    const matchups = store.getState().matchups;
    this.innerHTML = `
      <div class="app-container">
        ${matchups
          .map(
            (match) => `
            <div class="fight-card">
              <character-card 
                matchup-id="${match.id}" 
                agent-uuid="${match.agent1.uuid}" 
                name="${match.agent1.displayName}" 
                image="${match.agent1.displayIcon}">
              </character-card>
              <span class="vs">VS</span>
              <character-card 
                matchup-id="${match.id}" 
                agent-uuid="${match.agent2.uuid}" 
                name="${match.agent2.displayName}" 
                image="${match.agent2.displayIcon}">
              </character-card>
              <voting-statistics matchup-id="${match.id}"></voting-statistics>
            </div>
          `
          )
          .join('')}
      </div>
    `;
  }
}

customElements.define('app-container', AppContainer);
export default AppContainer;
