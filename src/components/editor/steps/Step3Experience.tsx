import { useResume } from '../../../hooks/useResume';
import { Input, Textarea, Button } from '../../ui/Inputs';
import { FiPlus, FiTrash2, FiMenu } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

export default function Step3Experience() {
  const { data, addExperience, updateExperience, removeExperience, reorderExperiences } = useResume();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(data.experiences);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    reorderExperiences(items);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">List your work experience. Drag to reorder.</p>
        <Button onClick={addExperience} variant="secondary" size="sm"><FiPlus /> Add Job</Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="experiences">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4">
              {data.experiences.map((exp, index) => (
                <Draggable key={exp.id} draggableId={exp.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}
                      className="bg-white border border-slate-100 rounded-xl p-5 relative shadow-sm">
                      <div {...provided.dragHandleProps}
                        className="absolute left-0 top-0 bottom-0 w-7 flex items-center justify-center cursor-grab text-slate-300 hover:text-slate-500">
                        <FiMenu size={14} />
                      </div>
                      <div className="ml-5">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience {index + 1}</span>
                          <button onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-600 p-1.5 bg-red-50 rounded-lg transition">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <Input label="Job Title" placeholder="Senior Developer" value={exp.role} onChange={e => updateExperience(exp.id, { role: e.target.value })} />
                          <Input label="Company" placeholder="Acme Corp" value={exp.company} onChange={e => updateExperience(exp.id, { company: e.target.value })} />
                          <Input label="Location" placeholder="San Francisco, CA" value={exp.location} onChange={e => updateExperience(exp.id, { location: e.target.value })} />
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">Start Date</label>
                            <input type="month" className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={exp.startDate} onChange={e => updateExperience(exp.id, { startDate: e.target.value })} />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">End Date</label>
                            <input type="month" disabled={exp.isCurrent} className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-40 disabled:bg-slate-50" value={exp.endDate} onChange={e => updateExperience(exp.id, { endDate: e.target.value })} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                              <input type="checkbox" checked={exp.isCurrent} onChange={e => updateExperience(exp.id, { isCurrent: e.target.checked, endDate: '' })} className="rounded border-slate-300 w-4 h-4 accent-slate-900" />
                              I currently work here
                            </label>
                          </div>
                          <Input label="Technologies Used" placeholder="React, Node.js, AWS" value={exp.technologies} onChange={e => updateExperience(exp.id, { technologies: e.target.value })} />
                          <Input label="Team Size (Optional)" placeholder="Led a team of 5" value={exp.teamSize || ''} onChange={e => updateExperience(exp.id, { teamSize: e.target.value })} />
                        </div>
                        <Textarea label="Key Responsibilities / Achievements" placeholder="• Architected a scalable microservices backend...&#10;• Reduced page load time by 40%..." value={exp.description} onChange={e => updateExperience(exp.id, { description: e.target.value })} className="min-h-[130px]" />
                        <div className="mt-3">
                          <Input label="Reason for Leaving (Optional)" placeholder="Seeking new challenges" value={exp.reasonForLeaving || ''} onChange={e => updateExperience(exp.id, { reasonForLeaving: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {data.experiences.length === 0 && (
        <div className="text-center p-10 border-2 border-dashed border-slate-100 rounded-xl">
          <p className="text-slate-400 text-sm mb-4">No work experience added yet.</p>
          <Button onClick={addExperience} variant="outline"><FiPlus /> Add First Job</Button>
        </div>
      )}
    </div>
  );
}
