import { useState, useEffect } from 'react';
import { 
  Modal, 
  Input, 
  Textarea, 
  Select, 
  Button, 
} from '../ui';
import type { Task, TaskPriority, TaskStatus, User } from '../../types';
import { Calendar, Tag } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task | null;
  initialStatus?: TaskStatus;
  users?: User[];
}

export const TaskModal = ({ isOpen, onClose, onSave, task, initialStatus, users = [] }: TaskModalProps) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'Medium' as TaskPriority,
    status: initialStatus || 'To Do',
    dueDate: new Date().toISOString().split('T')[0],
    assigneeId: users[0]?.id || '',
    tags: [],
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: initialStatus || 'To Do',
        dueDate: new Date().toISOString().split('T')[0],
        assigneeId: users[0]?.id || '',
        tags: [],
      });
    }
  }, [task, initialStatus, isOpen, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit Task' : 'Create New Task'}
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Task Title</label>
            <Input
              required
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="text-sm font-bold"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Description</label>
            <Textarea
              placeholder="Provide more context..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="text-sm min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Due Date</label>
              <Input
                type="date"
                icon={Calendar}
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="text-sm font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Priority</label>
              <Select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                className="text-sm font-bold"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                className="text-sm font-bold"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Assigned To</label>
              <div className="flex items-center gap-2">
                <Select
                  value={formData.assigneeId}
                  onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                  className="text-sm font-bold flex-1"
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Tags (comma separated)</label>
            <Input
              icon={Tag}
              placeholder="Design, Development, Planning..."
              value={formData.tags?.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) 
              })}
              className="text-sm font-bold"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 -mx-6 px-6 pb-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1 rounded-2xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1 rounded-2xl shadow-lg shadow-ninja-yellow/30"
          >
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
