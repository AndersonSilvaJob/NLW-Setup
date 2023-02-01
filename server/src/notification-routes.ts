import WebPush from 'web-push'
import { FastifyInstance } from "fastify"
import { z } from 'zod'

const publicKey ='BIfp9hueDMBzPazYwWvfbPWPOmTWGrvQQ4aUeSPeuMLzf8F0O8Dm8mdC7Xq1iJEI4vb39InTb-nxPBrfREklwbk'
const privateKey = 'wzj6SONMbPP1s-zyv6IuI_CM06eyyTi48eOm134v20c'

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function notificationRoutes (app: FastifyInstance){
    app.get('/push/public_key',() =>{
      return{
        publicKey
      }
    })

    app.post('/push/register', (request, reply) =>{
      console.log(request.body)

      return reply.status(201).send()
    })

    app.post('/push/send', async(request, reply) =>{
  const sendPushBody = z.object({     
    subscription: z.object ({
    endpoint: z.string(),  //'https://fcm.googleapis.com/fcm/send/e1zYBTTInsw:APA91bG1BV3vczfYX_EfE0l__VjiuvS8R9DI4zZU6iGqps3LQPnAlnok0RxQqk1s0KvFCmxwSwnddjCTlEi9ayl4LYrlkobjVamkzPg3eM5nuhSt58mI8DHr6RGzgikgovZLN15G18vH',  
    keys: z.object({
      p256dh: z.string(),//'BMsRWs59LobhMlpTDuEuvH4NQLxZBnT0HgOzbgjl3MHb9DX-LYNiuyRLUEQyLaygcHnMws24_GrulPqegwxrZEg',
      auth: z.string()//'B6aDBLY7A8xaQSzW-7-VkA'
    })
   })
  })

  const {subscription} = sendPushBody.parse(request.body)

  setTimeout(()=>{
    WebPush.sendNotification(subscription, 'Confira Seus Hábitos de Hoje!')
  }, 5000)
      return reply.status(201).send()
    })
  }

