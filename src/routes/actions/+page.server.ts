import { error, redirect } from '@sveltejs/kit';
import { serializePOJOs } from './../../lib/helpers'
import PocketBase from 'pocketbase'
import { SECRET_URL, SECRET_ADMIN_USER, SECRET_ADMIN_PASSWORD } from '$env/static/private'

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
    },
    deleteAccount: async ({locals}) => {
        const userId = locals.user.id
        //deleting user tasks and collections first...
        const _pb = new PocketBase(SECRET_URL);
        await _pb.admins.authWithPassword(SECRET_ADMIN_USER, SECRET_ADMIN_PASSWORD);
        await _pb.collections.delete(`collections_record_${userId}`)
        await _pb.collections.delete(`tasks_${userId}`);
        //deleting user
        await _pb.collection('users').delete(`${userId}`);
        locals.pb.authStore.clear()
        locals.user = undefined
        throw redirect(303, '/login')
    }
}