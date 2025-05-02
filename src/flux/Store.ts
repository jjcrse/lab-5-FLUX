// src/flux/store.ts

type Agent = {
    uuid: string;
    displayName: string;
    displayIcon: string;
  };
  
  type Matchup = {
    id: string;
    agent1: Agent;
    agent2: Agent;
    votes1: number;
    votes2: number;
  };
  
  type AppState = {
    matchups: Matchup[];
  };
  
  type Action =
    | { type: 'SET_MATCHUPS'; payload: Matchup[] }
    | { type: 'VOTE'; payload: { matchupId: string; votedAgentUuid: string } };
  
  type Listener = () => void;
  
  class Store {
    private state: AppState = { matchups: [] };
    private listeners: Listener[] = [];
  
    getState() {
      return this.state;
    }
  
    dispatch(action: Action) {
      switch (action.type) {
        case 'SET_MATCHUPS':
          this.state.matchups = action.payload;
          break;
        case 'VOTE':
          this.state.matchups = this.state.matchups.map((match) => {
            if (match.id === action.payload.matchupId) {
              return {
                ...match,
                votes1:
                  match.agent1.uuid === action.payload.votedAgentUuid
                    ? match.votes1 + 1
                    : match.votes1,
                votes2:
                  match.agent2.uuid === action.payload.votedAgentUuid
                    ? match.votes2 + 1
                    : match.votes2,
              };
            }
            return match;
          });
          break;
      }
  
      this.listeners.forEach((l) => l());
    }
  
    subscribe(listener: Listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      };
    }
  }
  
  const store = new Store();
  export default store;
  