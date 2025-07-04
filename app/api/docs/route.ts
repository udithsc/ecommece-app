import { NextRequest, NextResponse } from 'next/server';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/lib/swagger';

// Generate HTML for Swagger UI
function generateSwaggerHTML(spec: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>UDT Store API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
      <style>
        html {
          box-sizing: border-box;
          overflow: -moz-scrollbars-vertical;
          overflow-y: scroll;
        }
        *, *:before, *:after {
          box-sizing: inherit;
        }
        body {
          margin:0;
          background: #fafafa;
        }
        .swagger-ui .topbar {
          background-color: #629d23;
        }
        .swagger-ui .topbar .download-url-wrapper .select-label {
          color: white;
        }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = function() {
          const ui = SwaggerUIBundle({
            url: '/api/docs/spec',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
            tryItOutEnabled: true,
            requestInterceptor: function(request) {
              // Add any default headers here
              return request;
            },
            responseInterceptor: function(response) {
              return response;
            }
          });
        };
      </script>
    </body>
    </html>
  `;
}

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: API Documentation
 *     description: Interactive Swagger UI for UDT Store API documentation
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: HTML page with Swagger UI
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
export async function GET(request: NextRequest) {
  try {
    const html = generateSwaggerHTML(swaggerSpec);
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating Swagger UI:', error);
    return NextResponse.json(
      { error: 'Failed to generate API documentation' },
      { status: 500 }
    );
  }
}