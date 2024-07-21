import swaggerJsDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 4001;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo App API',
      version: '1.0.0',
      description: 'API documentation for the Todo App',
      contact: {
        name: 'Deepak Kumar Sahoo',
        email: 'deepakkumarsahoo2002@gmail.com',
      },
      servers: [{ url: `http://localhost:${PORT}/api/v1` }],
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Paths to files containing OpenAPI definitions
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
