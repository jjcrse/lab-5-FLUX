

export type Agent = {
    uuid: string;
    displayName: string;
    displayIcon: string;
  };
  
  export async function fetchRandomAgents(count: number = 16): Promise<Agent[]> {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const data = await response.json();
  
    const agents: Agent[] = data.data
      .filter((agent: any) => agent.isPlayableCharacter)
      .map((agent: any) => ({
        uuid: agent.uuid,
        displayName: agent.displayName,
        displayIcon: agent.displayIcon || agent.fullPortrait,
      }));
  
    // Mezclar y tomar solo los primeros 16
    const shuffled = agents.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  export function pairAgents(agents: Agent[]) {
    const matchups = [];
    for (let i = 0; i < agents.length; i += 2) {
      matchups.push({
        id: `match-${i / 2}`,
        agent1: agents[i],
        agent2: agents[i + 1],
        votes1: 0,
        votes2: 0,
      });
    }
    return matchups;
  }
  