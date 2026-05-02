const API_URL = "http://127.0.0.1:5000/items";

function loadItems(searchQuery = "") {
    let url = API_URL;
    if (searchQuery) {
        url += "?search=" + searchQuery;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("items-container");
            if (!container) return;

            container.innerHTML = "";

            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");

                const badgeClass = item.type === "Lost" ? "lost" : "found";

                card.innerHTML = `
                    <h3>${item.title}</h3>
                    <span class="badge ${badgeClass}">${item.type}</span>
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p><strong>Location:</strong> ${item.location}</p>
                    <p><strong>Contact:</strong> ${item.contact}</p>
                    <button onclick="deleteItem(${item.id})" class="btn">Delete</button>
                `;

                container.appendChild(card);
            });
        });
}

function searchItems() {
    const searchValue = document.getElementById("searchInput").value;
    loadItems(searchValue);
}

function deleteItem(id) {
    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadItems();
    });
}

if (document.getElementById("items-container")) {
    loadItems();
}

if (document.getElementById("item-form")) {
    document.getElementById("item-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const location = document.getElementById("location").value;
        const contact = document.getElementById("contact").value;
        const type = document.getElementById("type").value;

        fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, category, location, contact, type})
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message || data.error);
            window.location.href = "index.html";
        });
    });
}