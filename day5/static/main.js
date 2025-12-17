const form = document.getElementById("giftForm")
const giftsContainer = document.getElementById("gifts");
const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const trackerPage = document.getElementById("trackerPage");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const password = document.getElementById("password").value;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        
        if (response.ok) {
            loginPage.classList.add("hidden");
            trackerPage.classList.remove("hidden");
            await loadGifts();
        } else {
            loginError.textContent = "Invalid password. Try again.";
            loginError.classList.remove("hidden");
        }
    } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = "An error occurred. Try again.";
        loginError.classList.remove("hidden");
    }
});

async function loadGifts() {
    const response = await fetch('/gifts');
    const gifts = await response.json();
    
    giftsContainer.innerHTML = '';
    gifts.forEach(gift => {
        const row = document.createElement("tr");
        const statusColors = {
            'completed': 'bg-green-100 text-green-700 border border-green-300',
            'incoming': 'bg-blue-100 text-blue-700 border border-blue-300',
            'pending': 'bg-yellow-100 text-yellow-700 border border-yellow-300'
        };
        const status = gift.status || 'incoming';
        const statusClass = statusColors[status] || 'bg-gray-100 text-gray-700 border border-gray-300';
        
        row.innerHTML = `
            <td class="border border-gray-200 p-4 font-medium text-gray-800">${gift.name}</td>
            <td class="border border-gray-200 p-4 text-gray-700">${gift.gift}</td>
            <td class="border border-gray-200 p-4 text-center">
                <span class="${statusClass} px-4 py-2 rounded-full text-sm font-semibold inline-block">${status}</span>
            </td>
        `;
        row.classList.add('hover:bg-gray-50', 'transition');
        giftsContainer.appendChild(row);
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.elements.name.value;
    const gift = form.elements.gift.value;

    await fetch('/gifts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gift })
    });

    form.reset();
    await loadGifts(); 
});