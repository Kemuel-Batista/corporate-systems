import { app } from './app'
import { env } from './env'
;(() => {
  app.listen(env.PORT, () => {
    console.info(
      `[HTTP] Server is running at http://${env.BASE_URL}:${env.PORT}`,
    )
  })
})()
