import { serializePOJOs } from '../lib/helpers'

export const load = ({locals}) => {
    if(locals.user){
        return {
            profile: serializePOJOs(locals.user)
        }
    }
}