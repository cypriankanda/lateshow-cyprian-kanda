# app/seed.py

from app import create_app
from app.models import db, Episode, Guest, Appearance

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    ep1 = Episode(date="1/11/99", number=1)
    ep2 = Episode(date="1/12/99", number=2)

    guest1 = Guest(name="Michael J. Fox", occupation="actor")
    guest2 = Guest(name="Sandra Bernhard", occupation="Comedian")
    guest3 = Guest(name="Tracey Ullman", occupation="television actress")

    db.session.add_all([ep1, ep2, guest1, guest2, guest3])
    db.session.commit()

    a1 = Appearance(rating=4, episode_id=ep1.id, guest_id=guest1.id)
    a2 = Appearance(rating=5, episode_id=ep2.id, guest_id=guest3.id)
    db.session.add_all([a1, a2])
    db.session.commit()

    print("✅ Seed data inserted successfully!")
