import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase'
import { SECRET_URL, SECRET_ADMIN_USER, SECRET_ADMIN_PASSWORD } from '$env/static/private'

export const load = ( async ({ locals }) => {
    if(!locals.pb.authStore.isValid){
        throw redirect(307, '/login')
    }
    //Create new notes collection if one does not exist for the user.
    let resultList;
    try{
        const userId = locals.user.id;
        resultList = await locals.pb.collection(`collections_record_${userId}`).getList(1, 50,{
            expand: 'tasks'
        })
        if(resultList.totalItems === 0){
            throw new error('No collection, making new collection')
        }
    }
    catch(err){
        const _pb = new PocketBase(SECRET_URL);
        await _pb.admins.authWithPassword(SECRET_ADMIN_USER, SECRET_ADMIN_PASSWORD);
        const userId = locals.user.id;
        console.log('starting collections generation')
        let tasksCollectionBase

        try {
            const isTaskCollectionAvailable = await locals.pb.collection(`tasks_${userId}`).getList(1,50)
            const isCollectionAvailable = await locals.pb.collection(`collections_record_${userId}`).getList(1,50)
            resultList = isCollectionAvailable
        } catch (error) {
            tasksCollectionBase = await _pb.collections.create({
                name: `tasks_${userId}`,
                type: 'base',
                listRule: '@request.auth.id != "" && @request.auth.verified = true',
                createRule: '@request.auth.id != "" && @request.auth.verified = true',
                viewRule: '@request.auth.id != "" && @request.auth.verified = true',
                updateRule: '@request.auth.id != "" && @request.auth.verified = true',
                deleteRule: '@request.auth.id != "" && @request.auth.verified = true',
                schema: [
                    {
                        name: 'notes',
                        type: 'text',
                    },
                    {
                        name: 'title',
                        type: 'text',
                    },
                    {
                        name: 'task',
                        type: 'json'
                    },
                    {
                        name: 'due_date',
                        type: 'date'
                    },
                    {
                        name: 'is_trash',
                        type: 'bool',
                    },
                    {
                        name: 'author',
                        type: 'text',
                        required: true
                    },
                    {
                        name: 'parent_collection',
                        type: 'text',
                        required: true
                    }
                ],
            });
        }

        try {
            const isCollectionAvailable = await locals.pb.collection(`collections_record_${userId}`).getList(1,50)
            resultList = isCollectionAvailable
        } catch (error) {
            console.log('No collections record found, making new one')
            const collectionBase = await _pb.collections.create({
                name: `collections_record_${userId}`,
                type: 'base',
                listRule: '@request.auth.id != "" && @request.auth.verified = true',
                createRule: '@request.auth.id != "" && @request.auth.verified = true',
                viewRule: '@request.auth.id != "" && @request.auth.verified = true',
                updateRule: '@request.auth.id != "" && @request.auth.verified = true',
                deleteRule: '@request.auth.id != "" && @request.auth.verified = true',
                schema: [
                    {
                        name: 'collection_name',
                        type: 'text'
                    },
                    {
                        name: "tasks",
                        type: 'relation',
                        options: {
                            collectionId: tasksCollectionBase ? tasksCollectionBase.id : isTaskCollectionAvailable.id,
                        },
                    },
                    {
                        name: 'author',
                        type: 'text',
                    }
                ]
            })
            const firstTask = await locals.pb.collection(`tasks_${userId}`).create({
                notes: '',
                title: 'Tasks',
                is_trash: false,
                author: userId,
                task: [{
                    title: 'Task 1',
                    completed: false,
                    id: 0,
                    is_editing: false,
                }],
                parent_collection: collectionBase.id
            })
            const addTaskCollectionRecord = await locals.pb.collection(`collections_record_${userId}`).create({
                collection_name: 'Collection 1',
                tasks: firstTask.id,
                author: userId
            })
            resultList = await locals.pb.collection(`collections_record_${userId}`).getList(1, 50, {
                expand: 'tasks'
            })
        }
    }
    return JSON.parse(JSON.stringify(resultList))
  }) satisfies PageServerLoad;

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
        try {
            const record = await locals.pb.collection(`tasks_${userId}`).create(task)
            const currentCollectionSet = await locals.pb.collection(`collections_record_${userId}`).getOne(data.collectionRecord)
            const updateCollectionSet = await locals.pb.collection(`collections_record_${userId}`).update(data.collectionRecord, {
                tasks: [...currentCollectionSet.tasks, record.id]
            })
            return {
                success: true,
                message: 'New task created!'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error creating new task, please refresh and try again!'
            }
        }
    },
    delete: async ({locals, request}) => {
        const userId = locals.user.id;
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])

        try {
            const deletedRecord = await locals.pb.collection(`tasks_${userId}`).delete(data.id);
            return {
                success: true,
                message: 'Task deleted'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error deleting task, please refresh and try again'
            }
        }
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

        return {
            success: true,
            message: 'Saved successfully!'
        }

    },
    deleteCollection: async({locals, request}) => {
        const userId = locals.user.id
        const formData = await request.formData()
        const formattedData = Object.fromEntries([...formData])

        try {
            const _deletedRecordRef = await locals.pb.collection(`collections_record_${userId}`).getOne(`${formattedData.id}`)
            const _remainingTasks = _deletedRecordRef.tasks
            //If there are tasks in this collection, we are going to move them over to another collection
            if(_remainingTasks.length > 0){
                console.log('There are tasks in this collection')
                const data = {
                    collection_name: 'unsorted',
                    tasks: _remainingTasks,
                    author: userId
                }
                const unsortedCollection = await locals.pb.collection(`collections_record_${userId}`).create(data)
            }
            console.log(_remainingTasks)
            const deletedRecord = await locals.pb.collection(`collections_record_${userId}`).delete(formattedData.id)
            return {
                success: true,
                message: 'Collection successfully deleted'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error deleting collection, please refresh and try again'
            }
        }
    },
    createCollection: async({locals, request}) => {
        const userId = locals.user.id
        // formData = await request.formData()
        // formattedData = Object.fromEntries([...formData])

        const data = {
            collection_name: 'New collection',
            author: {userId}
        }
        try {
            const newRecord = await locals.pb.collection(`collections_record_${userId}`).create(data)
            return {
                success: true,
                message: 'New collection created!'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error creating new collection, please refresh and try again'
            }
        }
    },
    renameCollection: async({locals, request}) => {
        const userId = locals.user.id
        const formData = await request.formData()
        const formattedData = Object.fromEntries([...formData])

        const data = {
            collection_name: formattedData.collection_name
        }

        try {
            const renamedCollectionRecord = await locals.pb.collection(`collections_record_${userId}`).update(formattedData.id, data)
            return {
                success: true,
                message: 'Successfully renamed collection!'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error updating, please refresh and try again!'
            }
        }
    }
}
