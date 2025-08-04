from fastapi import FastAPI
from app.Routes import movies, actors, directors, genres
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Adding middleware 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173" 
], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(movies.router)
app.include_router(actors.router)
app.include_router(directors.router)
app.include_router(genres.router)