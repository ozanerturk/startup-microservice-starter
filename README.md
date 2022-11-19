# startup-microservice-starter

This is my new service boilerplate.
I do not want to put a lot effort on fancy frameworks, layers, middlewares, OOP, abstract bullshit etc. My concern is dev-speed, I should try my ideas fast!

TypeScrip is also no no. I do not want to slowdown development process. Yeah yeah types are great, be a good programmer and follow your variables!

It has to be 'clean' and understandable. A developer should look at the folder structure and understand what does this service do
I've tried NestJS + Mongo + Clean Architecture, it was sexy. but only sexy

Unit test. This could be done actually after adopting the development proecss. We already definig the schemas beforehand.

If I feel struggeled again of development time I would go fastify-mongoose-api. 

- Assumption1: authentication is not microservices problem , maybe in apigw or bff or spesific microservices, maybe kratos-ketos backed microservice(I'll do that)
- Assumption2: i10n and i18n is not microservices problem, maybe in apigw like response transform middleware, with spesific microservice for localization and stuff
- Assumption3: Date is always and always in ISO formatter and GMT+0 Timezone.
- Data validation done by schemas, thankfully they can also generate swagger docs and UI
- internal logger works quite find
- Use gateways( the gateways in cleanarchitecture) to retrieve data into usecase or interact with different systems
- Well usecases are not native I know. They have dependencies of different frameworks 


TODO:
[] RabbitMQ handler, Why: ? I like rabbitmq
[] PM2
[] Docker, Nahh, why aq.
