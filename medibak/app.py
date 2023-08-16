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


if __name__ == '__main__':
    app.run(port=5000)
