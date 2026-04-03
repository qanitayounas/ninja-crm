import { useState, useEffect } from 'react';
import { 
  Plus, 
  Eye, 
  Trash2, 
  TrendingUp, 
  MoreVertical,
  ChevronDown,
  Layout,
  GitBranch
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, Button, Avatar, cn, Modal, Input, Select, Textarea, Badge } from '../components/ui';
import { apiService } from '../services/apiService';
import type { Pipeline, PipelineStage, Deal } from '../data/pipelineData';

export const PipelinePage = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('');
  const [columns, setColumns] = useState<PipelineStage[]>([]);
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isAddPipelineModalOpen, setIsAddPipelineModalOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newPipelineName, setNewPipelineName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    loadPipelines();
  }, []);

  const loadPipelines = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      const [pipelineData, opportunitiesData] = await Promise.all([
        apiService.getPipelines(),
        apiService.getOpportunities()
      ]);

      // Map opportunities to their respective stages
      const enrichedPipelines = pipelineData.map(pipeline => ({
        ...pipeline,
        stages: pipeline.stages.map(stage => {
          const stageOpportunities = opportunitiesData.filter(opp => 
            opp.pipelineId === pipeline.id && opp.pipelineStageId === stage.id
          );
          
          return {
            ...stage,
            count: stageOpportunities.length,
            totalValue: stageOpportunities.reduce((sum, opp) => sum + (opp.monetaryValue || 0), 0),
            deals: stageOpportunities.map(opp => ({
              id: opp.id,
              title: opp.name,
              company: opp.contact?.name || 'N/A',
              value: opp.monetaryValue || 0,
              probability: opp.probability || 100,
              description: opp.status || 'No status',
              owner: { 
                name: opp.assignedToUser?.name || 'Unassigned', 
                initials: (opp.assignedToUser?.name || 'U').substring(0, 1), 
                color: 'bg-ninja-yellow text-ninja-dark' 
              }
            }))
          };
        })
      }));

      setPipelines(enrichedPipelines);
      if (enrichedPipelines.length > 0) {
        setSelectedPipelineId(enrichedPipelines[0].id);
        setColumns(enrichedPipelines[0].stages);
      }
    } catch (error: any) {
      console.error('Error loading pipeline data:', error);
      if (error.status === 403 || error.status === 401) {
        setSyncError('Deal pipelines are currently being synchronized. Please ensure your Ninja CRM account setup is complete.');
      } else {
        toast.error('Failed to load pipelines');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePipelineChange = (id: string) => {
    setSelectedPipelineId(id);
    const pipeline = pipelines.find(p => p.id === id);
    if (pipeline) {
      setColumns(pipeline.stages);
    }
  };

  const handleAddPipeline = async () => {
    if (!newPipelineName.trim()) return;
    
    const newPipeline = await apiService.createPipeline(newPipelineName, ['Lead', 'Contacted', 'Proposal', 'Won']);
    setPipelines([...pipelines, newPipeline]);
    handlePipelineChange(newPipeline.id);
    setNewPipelineName('');
    setIsAddPipelineModalOpen(false);
    toast.success(`Pipeline "${newPipelineName}" created!`);
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      title: newSectionTitle,
      count: 0,
      totalValue: 0,
      color: '#D4FF00', // default ninja yellow
      deals: []
    };

    setColumns([...columns, newStage]);
    setNewSectionTitle('');
    setIsAddSectionModalOpen(false);
    toast.success('Section added!');
  };

  // Calculate stats based on current columns
  const totalValue = columns.reduce((acc, stage) => acc + stage.totalValue, 0);
  const dealsCount = columns.reduce((acc, stage) => acc + stage.count, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Pipelines</h1>
            <Badge status="info" className="bg-ninja-yellow/20 text-ninja-dark border-ninja-yellow/30">
              {pipelines.length} Total
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select 
                value={selectedPipelineId} 
                onChange={(e) => handlePipelineChange(e.target.value)}
                className="appearance-none bg-white border border-gray-100 rounded-xl px-4 py-2 pr-10 font-bold text-ninja-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-ninja-yellow transition-all cursor-pointer"
              >
                {pipelines.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-ninja-dark transition-colors" />
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setIsAddPipelineModalOpen(true)}
              className="flex items-center gap-2 text-gray-400 hover:text-ninja-dark hover:bg-gray-50 border border-transparent hover:border-gray-100 px-4"
            >
              <Plus size={18} />
              <span className="text-sm font-bold uppercase tracking-wider">New Pipeline</span>
            </Button>
          </div>
        </div>
        <Button onClick={() => setIsAddDealModalOpen(true)} className="flex items-center gap-2 px-8 py-3 rounded-2xl shadow-lg shadow-ninja-yellow/20">
          <Plus size={20} />
          <span>Add Deal</span>
        </Button>
      </div>

      {/* Alert Case: Branded Setup Notice */}
      {syncError && (
        <Card className="p-4 border-l-4 border-l-ninja-purple bg-ninja-purple/5 border-ninja-purple/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ninja-purple/10 rounded-lg text-ninja-purple">
              <GitBranch size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-ninja-dark">Module Synchronization</p>
              <p className="text-xs text-slate-500 font-medium">{syncError}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col gap-2 border-none bg-ninja-dark text-white p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-white/5 transition-transform group-hover:scale-110 duration-500">
            <TrendingUp size={120} />
          </div>
          <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">Pipeline Value</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black font-display tracking-tight">${(totalValue / 1000).toFixed(1)}K</span>
          </div>
          <p className="text-[10px] font-bold text-ninja-yellow flex items-center gap-1 mt-2">
            <span className="inline-block w-1 h-1 rounded-full bg-ninja-yellow animate-pulse" />
            Total estimated revenue
          </p>
        </Card>
        <Card className="flex flex-col gap-2 border-none p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all">
          <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Active Deals</span>
          <span className="text-4xl font-black text-ninja-dark font-display">{dealsCount}</span>
          <div className="w-full bg-gray-50 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-ninja-yellow h-full rounded-full" style={{ width: '65%' }} />
          </div>
        </Card>
        <Card className="flex flex-col gap-2 border-none p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all">
          <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Pipeline Strategy</span>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-10 w-10 rounded-2xl bg-ninja-yellow/10 flex items-center justify-center text-ninja-yellow">
              <Layout size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-ninja-dark leading-none">Smart Automation</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider italic">Powered by MagnusFlow</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {columns.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col gap-4">
            {/* Stage Header */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                  <h3 className="font-black text-ninja-dark uppercase tracking-tight text-sm">
                    {stage.title} <span className="text-gray-300 ml-1 font-bold">({stage.count})</span>
                  </h3>
                </div>
                <button className="text-gray-300 hover:text-ninja-dark">
                  <MoreVertical size={14} />
                </button>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: stage.color }}>
                ${(stage.totalValue / 1000).toFixed(1)}K total
              </span>
            </div>

            {/* Stage Cards */}
            <div className="flex flex-col gap-4 min-h-[500px]">
              {stage.deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        ))}
        
        {/* Add Section Button */}
        <div className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col gap-4">
          <div className="h-[42px]" /> {/* Spacer to align with headers */}
          <Button 
            variant="ghost" 
            onClick={() => setIsAddSectionModalOpen(true)}
            className="h-[500px] border-2 border-dashed border-gray-200 text-gray-400 hover:text-ninja-dark hover:border-ninja-yellow hover:bg-ninja-yellow/5 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all"
          >
            <Plus size={32} />
            <span className="font-bold text-sm uppercase tracking-widest">Add Section</span>
          </Button>
        </div>
      </div>

      {/* Add Deal Modal */}
      <Modal isOpen={isAddDealModalOpen} onClose={() => setIsAddDealModalOpen(false)} title="Add New Deal">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Deal Title *</label>
            <Input placeholder="e.g.: Website Redesign" className="rounded-xl border-gray-100 bg-gray-50/50" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Company *</label>
            <Input placeholder="Company Name" className="rounded-xl border-gray-100 bg-gray-50/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Value *</label>
              <Input placeholder="$10,000" className="rounded-xl border-gray-100 bg-gray-50/50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Owner</label>
              <Select defaultValue="John" className="rounded-xl border-gray-100 bg-gray-50/50">
                <option value="John">John</option>
                <option value="Emily">Emily</option>
                <option value="Sarah">Sarah</option>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Notes</label>
            <Textarea placeholder="Additional details about this deal..." className="rounded-xl border-gray-100 bg-gray-50/50 min-h-[100px]" />
          </div>
          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsAddDealModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={() => {
              toast.success('Deal added successfully!');
              setIsAddDealModalOpen(false);
            }} className="rounded-xl px-8">
              Add Deal
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Section Modal */}
      <Modal isOpen={isAddSectionModalOpen} onClose={() => setIsAddSectionModalOpen(false)} title="Add Pipeline Section">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Section Name *</label>
            <Input 
              placeholder="e.g.: Under Review" 
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
              className="rounded-xl border-gray-100 bg-gray-50/50"
            />
          </div>
          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsAddSectionModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleAddSection} className="rounded-xl px-8">Add Section</Button>
          </div>
        </div>
      </Modal>

      {/* Add Pipeline Modal */}
      <Modal isOpen={isAddPipelineModalOpen} onClose={() => setIsAddPipelineModalOpen(false)} title="Create New Pipeline">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark uppercase tracking-wider">Pipeline Name *</label>
            <Input 
              placeholder="e.g.: Enterprise Sales" 
              value={newPipelineName}
              onChange={(e) => setNewPipelineName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPipeline()}
              className="rounded-xl border-gray-100 bg-gray-50/50"
            />
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
            Default stages (Lead, Contacted, Proposal, Won) will be created automatically.
          </p>
          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsAddPipelineModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleAddPipeline} className="rounded-xl px-8">Create Pipeline</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const DealCard = ({ deal }: { deal: Deal }) => {
  return (
    <Card className="p-5 border-none shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group bg-white rounded-3xl">
      <div className="flex flex-col gap-4">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h4 className="font-bold text-ninja-dark leading-tight group-hover:text-ninja-yellow transition-colors">{deal.title}</h4>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">{deal.company}</span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 text-gray-300 hover:text-ninja-dark transition-colors">
              <Eye size={16} />
            </button>
            <button className="p-1.5 text-gray-300 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Value and Probability */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-ninja-yellow font-display">
            ${deal.value.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-gray-300 font-bold text-[10px] uppercase tracking-widest">
            <TrendingUp size={14} className="text-ninja-yellow/40" />
            <span>{deal.probability}%</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 font-medium leading-relaxed">
          {deal.description}
        </p>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
          <div className="flex items-center gap-2">
            <Avatar 
              name={deal.owner.name} 
              size="sm" 
              className={cn("h-6 w-6 text-[10px] border-none shadow-sm", deal.owner.color, "text-white")} 
            />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{deal.owner.name}</span>
          </div>
          <button className="text-gray-300 hover:text-ninja-dark">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
};



