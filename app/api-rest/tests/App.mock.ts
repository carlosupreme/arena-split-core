import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

export const handlers = [
    http.post('http://localhost:3000/user', async ({request}) => {
        const user = await request.json()
        return HttpResponse.json(user, {status: 201})
    }),

    http.get('http://localhost:3000/health', async () => {
        return HttpResponse.text('OK', {status: 200})
    }),
]


export const server = setupServer(...handlers)