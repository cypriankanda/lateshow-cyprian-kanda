# run.py

from app import create_app
from flask_migrate import Migrate
from app.models import db

app = create_app()
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
