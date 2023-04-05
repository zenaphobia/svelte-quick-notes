import PocketBase from 'pocketbase'

export const handle = async ({event, resolve}) => {
    event.locals.pb = new PocketBase('https://alex-navarro-design.pockethost.io')
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    if(event.locals.pb.authStore.isValid){
        event.locals.user = event.locals.pb.authStore.model
    }

    const response = await resolve(event)

    //TODO: secure before deploying

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie())

    return response
}