import type { PageServerLoad } from './$types'
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
        resultList = await locals.pb.collection(`collection_tasks_${userId}`).getList(1, 50)
        if(!resultList){
            console.log('No associated db was found...')
        }
    }
    catch(err){
        const _pb = new PocketBase(SECRET_URL);
        await _pb.admins.authWithPassword(SECRET_ADMIN_USER, SECRET_ADMIN_PASSWORD);
        const userId = locals.user.id;
        const base = await _pb.collections.create({
            name: `collection_tasks_${userId}`,
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
                }
            ],
        });
        resultList = await locals.pb.collection(`collection_tasks_${userId}`).getList(1, 50)
        // resultList = await locals.pb.collection('').create()
    }
    return JSON.parse(JSON.stringify(resultList))
  }) satisfies PageServerLoad;
