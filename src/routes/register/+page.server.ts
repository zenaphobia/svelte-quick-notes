import { redirect } from '@sveltejs/kit';
export const actions = {
    register: async ({locals, request}) => {
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])

        try {
            const newUser = await locals.pb.collection('users').create(data)
            locals.pb.authStore.clear()
        }
        catch(err){
            console.log('Error', err)
            return {
                error: true,
                message: err
            }
        }
        throw redirect(303, './login')
    }
}