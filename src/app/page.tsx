'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [task, setTask] = useState<
    { taskID: number; taskName: string; status: boolean }[]
  >([]);
  function handleDeleteTask(taskId: number) {
    setTask(task.filter((item) => item.taskID !== taskId));
  }
  function handleTaskUpdate(taskId: number) {
    setTask(
      task.map((item) =>
        item.taskID === taskId ? { ...item, status: !item.status } : item
      )
    );
  }
  function handleAddTask() {
    setTask([
      ...task,
      {
        taskID: task.length + 1,
        taskName: inputValue,
        status: false,
      },
    ]);
    setInputValue('');
  }
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-md mt-32 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">ToDo List</h1>
          <p className="text-muted-foreground">
            Keep track of your daily tasks
          </p>
        </div>
        <div className="flex gap-3">
          <Input
            type="text"
            value={inputValue}
            placeholder="Add Task"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></Input>
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
        <div className="mt-8">
          <TaskTable
            task={task}
            handleUpdateTask={handleTaskUpdate}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

interface TaskTableProps {
  task: { taskID: number; taskName: string; status: boolean }[];
  handleUpdateTask: (taskId: number) => void;
  handleDeleteTask: (taskId: number) => void;
}

function TaskTable({
  task,
  handleUpdateTask,
  handleDeleteTask,
}: TaskTableProps) {
  return task.length > 0 ? (
    <Table>
      <TableCaption>Finish Task! Be Productive</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Update</TableHead>
          <TableHead className="w-[400px]">Task</TableHead>
          <TableHead>Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {task.map((item) => (
          <TableRow key={item.taskID}>
            <TableCell className="font-medium">
              <Checkbox onCheckedChange={() => handleUpdateTask(item.taskID)} />
            </TableCell>
            <TableCell className={item.status ? 'line-through' : ''}>
              {item.taskName}
            </TableCell>

            <TableCell>
              <Button onClick={() => handleDeleteTask(item.taskID)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p className="font-light">Add your task to start!</p>
  );
}
