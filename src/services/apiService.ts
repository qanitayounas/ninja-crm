import { pipelines, type Pipeline } from '../data/pipelineData';
import { smartLists, type SmartList } from '../data/smartLists';

class ApiService {
  private pipelines: Pipeline[] = [...pipelines];
  private smartLists: SmartList[] = [...smartLists];

  // Pipelines
  async getPipelines(): Promise<Pipeline[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.pipelines]), 500);
    });
  }

  async createPipeline(name: string, stages: string[]): Promise<Pipeline> {
    const newPipeline: Pipeline = {
      id: `pipeline-${Date.now()}`,
      name,
      stages: stages.map((stageName, index) => ({
        id: `stage-${Date.now()}-${index}`,
        title: stageName,
        count: 0,
        totalValue: 0,
        color: ['#94a3b8', '#3b82f6', '#a855f7', '#f59e0b', '#10b981'][index % 5],
        deals: []
      }))
    };
    this.pipelines.push(newPipeline);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newPipeline), 500);
    });
  }

  // Smart Lists
  async getSmartLists(): Promise<SmartList[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.smartLists]), 500);
    });
  }

  async createSmartList(name: string, description: string, filters: any[]): Promise<SmartList> {
    const newList: SmartList = {
      id: `list-${Date.now()}`,
      name,
      description,
      filters,
      createdAt: new Date().toISOString()
    };
    this.smartLists.push(newList);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newList), 500);
    });
  }
}

export const apiService = new ApiService();
