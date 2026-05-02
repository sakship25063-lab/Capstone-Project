from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = []
item_id_counter = 1


# GET API (with search)
@app.route("/items", methods=["GET"])
def get_items():
    search = request.args.get("search")

    if search:
        filtered = [
            item for item in items
            if search.lower() in item["title"].lower()
        ]
        return jsonify(filtered)

    return jsonify(items)


# POST API (Add item)
@app.route("/items", methods=["POST"])
def add_item():
    global item_id_counter

    data = request.get_json()

    required_fields = ["title", "category", "location", "contact", "type"]

    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    new_item = {
        "id": item_id_counter,
        "title": data["title"],
        "category": data["category"],
        "location": data["location"],
        "contact": data["contact"],
        "type": data["type"]
    }

    items.append(new_item)
    item_id_counter += 1

    return jsonify({"message": "Item added successfully"}), 201


# DELETE API
@app.route("/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    global items
    items = [item for item in items if item["id"] != item_id]
    return jsonify({"message": "Item deleted successfully"})


if __name__ == "__main__":
    app.run(debug=True)