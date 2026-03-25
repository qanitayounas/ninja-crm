import { useState } from 'react';
import { 
  Plus, 
  Eye, 
  Trash2, 
  TrendingUp, 
  MoreVertical
} from 'lucide-react';
import { Card, Button, Avatar, cn, Modal, Input, Select, Textarea } from '../components/ui';
import { pipelineData } from '../data/pipelineData';
import type { Deal } from '../data/pipelineData';

export const PipelinePage = () => {
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Sales Pipeline</h1>
          <p className="text-gray-400 font-medium">Manage your pipeline with drag and drop</p>
        </div>
        <Button onClick={() => setIsAddDealModalOpen(true)} className="flex items-center gap-2 px-8 py-3 rounded-2xl shadow-lg shadow-ninja-yellow/20">
          <Plus size={20} />
          <span>Add Deal</span>
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col gap-2 border-none">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Pipeline Value</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-ninja-dark font-display">$463.5K</span>
          </div>
        </Card>
        <Card className="flex flex-col gap-2 border-none">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Deals Won</span>
          <span className="text-3xl font-black text-ninja-yellow font-display">1</span>
        </Card>
        <Card className="flex flex-col gap-2 border-none">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Revenue Won</span>
          <span className="text-3xl font-black text-ninja-yellow font-display">$125.0K</span>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {pipelineData.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col gap-4">
            {/* Stage Header */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                <h3 className="font-black text-ninja-dark uppercase tracking-tight text-sm">
                  {stage.title} <span className="text-gray-300 ml-1 font-bold">({stage.count})</span>
                </h3>
              </div>
              <span className="text-xs font-black" style={{ color: stage.color }}>
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
      </div>

      <Modal isOpen={isAddDealModalOpen} onClose={() => setIsAddDealModalOpen(false)} title="Add New Deal">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Deal Title *</label>
            <Input placeholder="e.g.: Website Redesign" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Company *</label>
            <Input placeholder="Company Name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Value *</label>
              <Input placeholder="$10,000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-ninja-dark">Owner</label>
              <Select defaultValue="John">
                <option value="John">John</option>
                <option value="Emily">Emily</option>
                <option value="Sarah">Sarah</option>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-ninja-dark">Notes</label>
            <Textarea placeholder="Additional details about this deal..." />
          </div>
          <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsAddDealModalOpen(false)}>Cancel</Button>
            <Button>Add Deal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const DealCard = ({ deal }: { deal: Deal }) => {
  return (
    <Card className="p-5 border-none shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group">
      <div className="flex flex-col gap-4">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h4 className="font-bold text-ninja-dark leading-tight group-hover:text-ninja-yellow transition-colors">{deal.title}</h4>
            <span className="text-xs text-gray-400 font-bold">{deal.company}</span>
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
          <span className="text-lg font-black text-ninja-yellow font-display">
            ${deal.value.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-gray-300 font-bold text-xs uppercase tracking-tighter">
            <TrendingUp size={14} className="text-gray-200" />
            <span>{deal.probability}%</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 font-medium leading-relaxed">
          {deal.description}
        </p>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-1">
          <div className="flex items-center gap-2">
            <Avatar 
              name={deal.owner.name} 
              size="sm" 
              className={cn("h-6 w-6 text-[10px]", deal.owner.color, "text-white")} 
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{deal.owner.name}</span>
          </div>
          <button className="text-gray-300 hover:text-ninja-dark">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
};

