from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from routes import router
from models import engine, Base

app = FastAPI(title="RoutePostcard API", version="0.1.0")

# Create database tables on startup
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# Register router (no prefix – DigitalOcean may strip /api)

@app.middleware("http")
async def normalize_api_prefix(request: Request, call_next):
    if request.scope.get("path", "").startswith("/api/"):
        request.scope["path"] = request.scope["path"][4:] or "/"
    return await call_next(request)

app.include_router(router)

@app.get("/health", response_model=dict)
def health_check():
    return {"status": "ok"}

@app.get("/", response_class=HTMLResponse)
def root_page():
    html_content = """
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>RoutePostcard API</title>
        <style>
            body { background:#111; color:#eee; font-family:Arial,Helvetica,sans-serif; padding:2rem; }
            h1 { color:#ffdd57; }
            a { color:#4ea1ff; }
            table { width:100%; border-collapse:collapse; margin-top:1rem; }
            th, td { padding:0.5rem; border:1px solid #444; }
            th { background:#222; }
        </style>
    </head>
    <body>
        <h1>🚀 RoutePostcard API</h1>
        <p>Turn a city brief into a cinematic, neighborhood‑by‑neighborhood travel postcard.</p>
        <h2>Available Endpoints</h2>
        <table>
            <tr><th>Method</th><th>Path</th><th>Description</th></tr>
            <tr><td>GET</td><td>/health</td><td>Health check</td></tr>
            <tr><td>POST</td><td>/plan</td><td>Generate itinerary from city brief</td></tr>
            <tr><td>POST</td><td>/insights</td><td>Get AI‑driven insights for a selection</td></tr>
        </table>
        <h2>Tech Stack</h2>
        <ul>
            <li>FastAPI 0.115.0</li>
            <li>Python 3.12</li>
            <li>PostgreSQL via SQLAlchemy 2.0.35</li>
            <li>DigitalOcean Serverless Inference (openai‑gpt‑oss‑120b)</li>
        </ul>
        <p><a href="/docs">OpenAPI Docs</a> | <a href="/redoc">ReDoc</a></p>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)
