import { error, redirect } from '@sveltejs/kit';
import { serializePOJOs } from './../../lib/helpers'

export const actions = {
    create: async ({locals}) => {
        const userId = locals.user.id;
        const task = {
            "notes": "",
            "title": 'Tasks for today!',
            "author": userId,
            is_trash: false,
            due_date: '',
            task: [{
                title: 'Task',
                completed: false,
                id: 0,
                is_editing: false,
            }]
        }
        const record = await locals.pb.collection(`collection_tasks_${userId}`).create(task);
        throw redirect(301, '/dashboard')
    },
    delete: async ({locals, request}) => {
        const userId = locals.user.id;
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])

        const deletedRecord = await locals.pb.collection(`collection_tasks_${userId}`).delete(data.id);
        throw redirect(301, '/dashboard')
    },
    save: async ({locals, request}) => {
        const userId = locals.user.id;
        const formData = await request.formData()
        const formattedData = Object.fromEntries([...formData])
        const data = {
            "notes": formattedData.notes,
            "title": formattedData.title,
            "task": formattedData.task
        }

        const record = await locals.pb.collection(`collection_tasks_${userId}`).update(formattedData.id, data);

        throw redirect(301, '/dashboard')
    }
}