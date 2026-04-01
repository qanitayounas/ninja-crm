import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  closestCorners,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import type { Task, TaskStatus } from '../../types';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { TASK_COLUMNS } from '../../data/tasksData';

interface TaskBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onAddTask: (status: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
}

export const TaskBoard = ({ tasks, onTaskMove, onAddTask, onTaskClick }: TaskBoardProps) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const overId = over.id as string;

    // Determine the target status
    let newStatus: TaskStatus | null = null;
    
    // Check if we dropped over a column
    if (TASK_COLUMNS.some(col => col.id === overId)) {
      newStatus = overId as TaskStatus;
    } else {
      // dropped over a task, find that task's column
      const overTask = tasks.find(t => t.id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus) {
      onTaskMove(taskId, newStatus);
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:flex lg:grid lg:grid-cols-4 gap-4 md:gap-6 pb-6 h-full min-h-[calc(100vh-280px)] xl:gap-8 overflow-x-auto lg:overflow-visible custom-scrollbar snap-x snap-mandatory scroll-smooth">
        {TASK_COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);
          return (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={columnTasks}
              onAddTask={() => onAddTask(column.id as TaskStatus)}
              onTaskClick={onTaskClick}
            />
          );
        })}
      </div>

      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.5',
            },
          },
        }),
      }}>
        {activeTask ? (
          <div className="w-[300px]">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
