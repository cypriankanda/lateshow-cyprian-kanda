# app/routes.py

from flask import Blueprint, request, jsonify
from .models import db, Episode, Guest, Appearance
from sqlalchemy.exc import IntegrityError

api = Blueprint('api', __name__)

@api.route('/episodes')
def get_episodes():
    return jsonify([ep.to_dict() for ep in Episode.query.all()])

@api.route('/episodes/<int:id>')
def get_episode(id):
    episode = Episode.query.get(id)
    if not episode:
        return jsonify({"error": "Episode not found"}), 404
    data = episode.to_dict()
    data["appearances"] = [a.to_dict() for a in episode.appearances]
    return jsonify(data)

@api.route('/guests')
def get_guests():
    return jsonify([guest.to_dict() for guest in Guest.query.all()])

@api.route('/appearances', methods=['POST'])
def post_appearance():
    try:
        data = request.get_json()
        appearance = Appearance(
            rating=data["rating"],
            episode_id=data["episode_id"],
            guest_id=data["guest_id"]
        )
        db.session.add(appearance)
        db.session.commit()
        return jsonify(appearance.to_dict()), 201
    except (ValueError, IntegrityError) as e:
        db.session.rollback()
        return jsonify({"errors": [str(e)]}), 400

@api.route('/episodes/<int:id>', methods=['DELETE'])
def delete_episode(id):
    episode = Episode.query.get(id)
    if not episode:
        return jsonify({"error": "Episode not found"}), 404
    db.session.delete(episode)
    db.session.commit()
    return jsonify({}), 204
