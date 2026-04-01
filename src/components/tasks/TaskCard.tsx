import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, MoreVertical } from 'lucide-react';
import type { Task } from '../../types';
import { Badge, Avatar, cn } from '../ui';
import users from '../../data/users.json';

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const assignee = users.find(u => u.id === task.assigneeId);

  const priorityColors = {
    High: 'bg-red-50 text-red-600 border-red-100',
    Medium: 'bg-orange-50 text-orange-600 border-orange-100',
    Low: 'bg-green-50 text-green-600 border-green-100',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(task)}
      className={cn(
        "group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing",
        isDragging && "ring-2 ring-ninja-yellow shadow-xl z-50"
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <Badge status={task.priority} className={cn("text-[10px] px-2 py-0.5", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
          <button className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={16} />
          </button>
        </div>

        <h4 className="font-bold text-ninja-dark text-sm leading-tight leading-relaxed">
          {task.title}
        </h4>

        {task.description && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 text-gray-400">
            <div className="flex items-center gap-1 text-[10px] font-medium">
              <Calendar size={12} />
              <span>{task.dueDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-[-8px]">
            <Avatar 
              name={assignee?.name || 'Unassigned'} 
              size="sm" 
              className="ring-2 ring-white"
            />
          </div>
        </div>
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {task.tags.map(tag => (
              <span key={tag} className="text-[9px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded-md font-medium uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
