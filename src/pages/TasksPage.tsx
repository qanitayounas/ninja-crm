import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  User as UserIcon,
  Users as UsersIcon
} from 'lucide-react';
import { TaskBoard } from '../components/tasks/TaskBoard';
import { TaskModal } from '../components/tasks/TaskModal';
import { Button, cn } from '../components/ui';
import type { Task, TaskStatus, TaskPriority, TaskCategory, User } from '../types';
import { apiService } from '../services/apiService';
import toast from 'react-hot-toast';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('team');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [initialStatus, setInitialStatus] = useState<TaskStatus>('To Do');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Mock current user (In a real app, this would come from an auth context)
  const currentUser = JSON.parse(localStorage.getItem('ninja_crm_user') || '{}');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [tasksData, usersData] = await Promise.all([
        apiService.getTasks(),
        apiService.getUsers()
      ]);
      setTasks(tasksData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading tasks data:', error);
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Category filter
    let matchesCategory = true;
    if (activeCategory === 'assigned') matchesCategory = task.assigneeId === currentUser.id;
    else if (activeCategory === 'created') matchesCategory = task.creatorId === currentUser.id;
    
    // Search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Priority filter
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesCategory && matchesSearch && matchesPriority;
  });

  const handleTaskMove = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      try {
        const updatedTask = await apiService.updateTask(taskId, { status: newStatus });
        setTasks(prev => prev.map(t => 
          t.id === taskId ? updatedTask : t
        ));
        toast.success(`Task moved to ${newStatus}`);
      } catch (error) {
        toast.error('Failed to move task');
      }
    }
  };

  const handleCreateTask = (status: TaskStatus = 'To Do') => {
    setInitialStatus(status);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        // Update
        const updatedTask = await apiService.updateTask(editingTask.id, taskData);
        setTasks(prev => prev.map(t => 
          t.id === editingTask.id ? updatedTask : t
        ));
        toast.success('Task updated');
      } else {
        // Create
        const newTaskData = {
          ...taskData,
          status: taskData.status || initialStatus,
          assigneeId: taskData.assigneeId || currentUser.id,
          creatorId: currentUser.id,
          tags: taskData.tags || [],
        };
        const newTask = await apiService.createTask(newTaskData);
        setTasks(prev => [newTask, ...prev]);
        toast.success('Task created');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save task');
    }
  };


  const categories = [
    { id: 'assigned', label: 'Assigned to Me', icon: UserIcon },
    { id: 'created', label: 'Created by Me', icon: CheckCircle2 },
    { id: 'team', label: 'Team Tasks', icon: UsersIcon },
  ] as const;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-yellow"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-ninja-dark tracking-tighter">Task Management</h1>
          <p className="text-gray-400 font-medium mt-1">Manage your team tasks and centralized workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => handleCreateTask()}
            className="rounded-2xl shadow-xl shadow-ninja-yellow/20 flex items-center gap-2 group"
          >
            <div className="bg-ninja-dark text-ninja-yellow rounded-lg p-0.5 group-hover:scale-110 transition-transform">
              <Plus size={16} />
            </div>
            <span>New Task</span>
          </Button>
        </div>
      </div>

      {/* Categories & Filter Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-white p-2 rounded-[32px] border border-gray-100 shadow-sm w-full transition-all duration-300">
        <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-2xl overflow-x-auto lg:overflow-visible no-scrollbar scroll-smooth snap-x lg:w-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-[10px] md:text-sm font-bold transition-all whitespace-nowrap snap-start",
                activeCategory === category.id 
                  ? "bg-white text-ninja-dark shadow-sm ring-1 ring-ninja-yellow/20" 
                  : "text-gray-400 hover:text-ninja-dark hover:bg-white/50"
              )}
            >
              <category.icon size={18} className={activeCategory === category.id ? "text-ninja-yellow" : ""} />
              {category.label}
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-gray-100 hidden lg:block" />

        <div className="flex flex-1 items-center gap-2 md:gap-4 px-2 min-w-0 h-10 lg:h-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-ninja-dark placeholder:text-gray-400/60 pl-10 h-10"
            />
          </div>
          
          <div className="h-6 w-px bg-gray-100" />
          
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'All')}
              className="bg-transparent border-none focus:ring-0 text-xs font-bold text-ninja-dark uppercase tracking-wider cursor-pointer pr-8"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 min-h-0">
        <TaskBoard 
          tasks={filteredTasks}
          onTaskMove={handleTaskMove}
          onAddTask={handleCreateTask}
          onTaskClick={handleEditTask}
        />
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        initialStatus={initialStatus}
        users={users}
      />
    </div>
  );
};
