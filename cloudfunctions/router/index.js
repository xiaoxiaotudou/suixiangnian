// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')

cloud.init({
  //env: 'prod-29121c'
  env: 'staging-ef4dd'
})

const database = cloud.database()

exports.main = async (event, context) => {
  const router = new tcbRouter({ event });

  router.router('util', 
     async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
       const util = require('util/util.js')
       ctx.body = util.main(event, context, cloud, database)
    }
  )

  router.router('revenueType-findAll',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('revenueType/findAll.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('revenueType-save',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('revenueType/save.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('revenueType-delete',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('revenueType/delete.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('billType-findAll',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billType/findAll.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  router.router('billCloseType-findAll',
    async (ctx, next) => {
      await next();
    }, async (ctx, next) => {
      await next();
    }, async (ctx) => {
      const util = require('billCloseType/findAll.js')
      ctx.body = util.main(event, context, cloud, database)
    }
  )
  return router.serve()
}