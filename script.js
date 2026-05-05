const text = ["Modern Websites", "Business Websites", "Portfolio Websites"];
let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function type() {
    currentText = text[i];

    if (!isDeleting) {
        document.getElementById("typing").innerHTML =
            currentText.substring(0, j + 1);
        j++;

        if (j === currentText.length) {
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        }
    } else {
        document.getElementById("typing").innerHTML =
            currentText.substring(0, j - 1);
        j--;

        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % text.length;
        }
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();

// submit review
document.getElementById("reviewForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const review = document.getElementById("review").value;

    await fetch("http://localhost:5000/add-review", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, rating, review })
    });

    alert("Review submitted!");
    loadReviews();
});

// load reviews
async function loadReviews() {
    const res = await fetch("http://localhost:5000/reviews");
    const data = await res.json();

    const container = document.getElementById("reviewsContainer");
    container.innerHTML = "";

    data.forEach(r => {
        container.innerHTML += `
            <div class="review-card">
                <p>${r.review}</p>
                <h4>${r.name} - ${r.rating}⭐</h4>
            </div>
        `;
    });
}

// load on start
loadReviews();
mongoose.connect("mongodb://127.0.0.1:27017/reviews")

const elements = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
});
window.addEventListener("load", () => {
    elements.forEach(el => {
        el.classList.add("show");
    });
});