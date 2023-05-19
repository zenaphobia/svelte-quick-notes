export const load = ( async ({ locals }) => {
    const userId = locals.user.id
    const user = await locals.pb.collection('users').getOne(`${userId}`)
    return {
        userData: JSON.parse(JSON.stringify(user))
    }
})