import { redirect } from '@sveltejs/kit';

export const load = ({locals}) => {
    if(locals.pb.authStore.isValid){
        throw redirect(303, '/dashboard')
    }
}

export const actions = {
    register: async ({locals, request}) => {
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])
        if(data?.name?.length > 50){
            return {
                success: false,
                message: 'Please keep your name under 50 characters'
            }
        }
        if(data?.email?.length > 50){
            return {
                success: false,
                message: 'Please keep your email under 50 characters'
            }
        }
        if(data?.password?.length > 50){
            return {
                success: false,
                message: 'Please keep your password under 50 characters'
            }
        }

        try {
            const newUser = await locals.pb.collection('users').create(data)
            locals.pb.collection('users').requestVerification(data.email)
            locals.pb.authStore.clear()
            return {
                success: true,
                message: 'Account created, please confirm your email'
            }
        }
        catch(err){
            return {
                success: false,
                message: `${err}`
            }
        }
    }
}