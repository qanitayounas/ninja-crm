import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, MoreHorizontal } from 'lucide-react';
import type { Task } from '../../types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask?: (status: string) => void;
  onTaskClick?: (task: Task) => void;
}

export const TaskColumn = ({ id, title, tasks, onAddTask, onTaskClick }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col w-[calc(100vw-3rem)] md:w-[300px] lg:w-full shrink-0 h-full rounded-3xl bg-gray-50/50 border border-gray-100/50 snap-center transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 ring-1 ring-white">
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-black text-ninja-dark text-sm uppercase tracking-wider">{title}</h3>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-gray-100 text-[10px] font-bold text-gray-500">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onAddTask?.(id)}
            className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-white rounded-lg transition-all"
          >
            <Plus size={16} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-ninja-dark hover:bg-white rounded-lg transition-all">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div 
        ref={setNodeRef}
        className="flex-1 p-3 flex flex-col gap-3 min-h-[500px]"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl p-8 text-center bg-white/30">
            <div className="bg-white p-3 rounded-2xl shadow-sm mb-3">
               <Plus className="text-gray-300" size={24} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">No tasks here</p>
            <button 
              onClick={() => onAddTask?.(id)}
              className="mt-2 text-[10px] font-black text-ninja-yellow uppercase tracking-widest hover:underline"
            >
              Click to add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
