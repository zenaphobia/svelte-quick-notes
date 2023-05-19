import { redirect } from '@sveltejs/kit';

export const load = ({locals}) => {
    if(locals.pb.authStore.isValid){
        throw redirect(303, '/dashboard')
    }
}

export const actions = {
    login: async ({request, locals}) => {
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])

        if(data.email === '' || data.password === ''){
            return {
                success: false,
                message: 'Please input an email and password.'
            }
        }

        try {
            const user = await locals.pb.collection('users').authWithPassword(
                data.email,
                data.password
            )
            if(locals.pb.authStore.model.verified === false){
                locals.pb.authStore.clear()
                locals.user = undefined
                return {
                    success: false,
                    message: 'Please confirm your email address'
                }
            }
            console.log('About to redirect')
            throw redirect(301, '/dashboard')

        } catch(err) {

            //This is necessary so the redirect doesn't throw an error
            if(err.status === 301){
                // return {
                //     success: true,
                //     message: 'Logged in, Redirecting to Dashboard...'
                // }
                throw redirect(301, '/dashboard')
            }

            let _message = ''
            if(err?.response?.code === 400){
                _message = 'Invalid login credentials'
                return {
                    success: false,
                    message: _message,
                    email: data.email
                }
            }
            else{
                _message = 'An error has ocurred, please try again'
                return {
                    success: false,
                    message: `${err}`,
                    email: data.email
                }
            }
        }
    }
}