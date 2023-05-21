export const actions = {
    default: async ({locals, request}) => {
        const formData = await request.formData()
        const data = Object.fromEntries([...formData])
        if(data.email === ''){
            return {
                success: false,
                message: 'Please enter an email'
            }
        }
        try {
            await locals.pb.collection('users').requestPasswordReset(`${data.email}`);
            return {
                 success: true,
                 message: 'Password reset email has been sent!'
            }
        }
        catch(err){
            console.log("No email found...")
            return {
                success: true,
                message: 'Password reset email has been sent!'
           }
        }
    }
}