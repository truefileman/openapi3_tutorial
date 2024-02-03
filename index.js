const express=require('express');
const cors=require('cors')
const app=express();
const dotenv=require('dotenv');
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
const {getAllWorkOrders}=require('./src/read')
dotenv.config();
const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'FAKE MAS API',
            version:'1.0.0',
            description:'FAKE MAS',
            contact:{
                name:'Chunyu Jiang',
                url:'https://fmmac.com',
                email:'chunyu.jiang@ibm.com'
            },
            version: '1.0.0'
        },
        servers:[{url:`http://localhost:${process.env.PORT}`}]
    },
    apis:["index.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });

app.use(express.json());
/**
 * @swagger
 * components:
 *  schemas:
 *   WorkOrders:
 *    type: array
 *    items:
 *      $ref: '#/components/schemas/WorkOrder'
 *   WorkOrder:
 *    type: object
 *    properties:
 *     wo_id:
 *      type: string
 *      description: id of the work order
 *      example: 'wo123'
 *     date_of_creation:
 *      type: string
 *      description: the date when the work order was creatd
 *      example: '2022-02-22'
 *     assignee:
 *      type: string
 *      description: name of the assignee
 *      example: 'John Doe'
 */

/**
 * @swagger
 * /workorders:
 *  get:
 *   summary: get all work orders
 *   description: get all work orders
 *   responses:
 *    200:
 *     description: work order list
 *     content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/WorkOrders'
 *    500:
 *     description: error
 */
app.get('/workorders',cors(), getAllWorkOrders)

app.listen(process.env.PORT,()=>{
    console.log(`server listening in port ${process.env.PORT}`);
})