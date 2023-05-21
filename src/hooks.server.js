import PocketBase from 'pocketbase'
import { SECRET_URL } from '$env/static/private'
import { redirect } from '@sveltejs/kit';

export const handle = async ({event, resolve}) => {
    event.locals.pb = new PocketBase(SECRET_URL)
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    if(event?.locals?.pb?.authStore?.isValid){
        event.locals.user = event.locals.pb.authStore.model
    }

    // if(event?.locals?.user?.verified === false){
    //     event.locals.pb.authStore.clear();
    // }

    const response = await resolve(event)

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie())

    return response
}