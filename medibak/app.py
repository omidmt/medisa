from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import sqlite3

from config import get_config

app = Flask(__name__)
CORS(app)

@app.route('/api/podcasts', methods=['GET'])
def get_podcasts():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect(get_config().db_file)
        cursor = conn.cursor()

        # Execute the query to retrieve podcasts
        cursor.execute("SELECT id, name, image_url, html_url FROM podcasts")
        podcasts = cursor.fetchall()

        # Convert the result into a list of dictionaries
        podcasts_list = [{"id": p[0], "name": p[1], "image_url": p[2], "html_url": p[3]} for p in podcasts]

        # Close the connection
        conn.close()

        return jsonify(podcasts_list)
    except Exception as e:
        return str(e), 500

@app.route('/podcast/<int:podcast_id>', methods=['GET'])
def get_podcast_details(podcast_id):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect(get_config().db_file)
        cursor = conn.cursor()

        # Query to get the podcast details
        cursor.execute("SELECT * FROM podcasts WHERE id = ?", (podcast_id,))
        podcast = cursor.fetchone()
        if podcast is None:
            return "Podcast not found", 404

        podcast_details = {
            # "id": podcast[0],
            # "user_id": podcast[1],
            "name": podcast[2],
            # "xml_url": podcast[3],
            "html_url": podcast[4],
            "image_url": podcast[5],
            "title": podcast[6],
            "description": podcast[7],
            # "language": podcast[8],
            # "timestamp": podcast[9]
        }

        # Query to get the episodes of the podcast
        cursor.execute("SELECT * FROM episodes WHERE podcast_id = ?", (podcast_id,))
        episodes = cursor.fetchall()

        # Convert the result into a list of dictionaries
        episodes_list = [{
            "id": e[0],
            # "podcast_id": e[1],
            "url": e[2],
            # "file_name": e[3],
            "title": e[4],
            "description": e[5],
            "pub_date": e[6],
            "link": e[7],
            "image_url": e[8],
            "downloaded": e[9],
            # "timestamp": e[10],
            # "update_time": e[11]
        } for e in episodes]

        # Close the connection
        conn.close()

        return jsonify({"podcast": podcast_details, "episodes": episodes_list})
    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run(port=5000)
