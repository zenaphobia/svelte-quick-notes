import { error, redirect } from '@sveltejs/kit';
import { serializePOJOs } from './../../lib/helpers'

export const actions = {
    create: async ({locals, request}) => {
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])
        console.log(data)

        const userId = locals.user.id;
        const task = {
            notes: "",
            title: 'Tasks for today!',
            author: userId,
            is_trash: false,
            due_date: '',
            task: [{
                title: 'Task',
                completed: false,
                id: 0,
                is_editing: false,
            }],
            parent_collection: data.collectionRecord
        }
        const record = await locals.pb.collection(`tasks_${userId}`).create(task)
        const currentCollectionSet = await locals.pb.collection(`collections_record_${userId}`).getOne(data.collectionRecord)
        const updateCollectionSet = await locals.pb.collection(`collections_record_${userId}`).update(data.collectionRecord, {
            tasks: [...currentCollectionSet.tasks, record.id]
        })
        throw redirect(301, '/dashboard')
    },
    delete: async ({locals, request}) => {
        const userId = locals.user.id;
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])

        const deletedRecord = await locals.pb.collection(`tasks_${userId}`).delete(data.id);
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

        const record = await locals.pb.collection(`tasks_${userId}`).update(formattedData.id, data);

        throw redirect(301, '/dashboard')
    },
    deleteCollection: async({locals, request}) => {
        const userId = locals.user.id
        const formData = await request.formData()
        const formattedData = Object.fromEntries([...formData])
        const deletedRecord = await locals.pb.collection(`collections_record_${userId}`).delete(formattedData.id)
        throw redirect(301, '/dashboard')
    },
    createCollection: async({locals, request}) => {
        const userId = locals.user.id
        // formData = await request.formData()
        // formattedData = Object.fromEntries([...formData])

        const data = {
            collection_name: 'New collection',
            author: {userId}
        }
        const newRecord = await locals.pb.collection(`collections_record_${userId}`).create(data)
        throw redirect(301, '/dashboard')
    }
}