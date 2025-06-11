// Default posts array with images
const posts = [
  {
    title: "Tech Trends 2025",
    category: "Tech",
    date: "June 1, 2025",
    content: "AI is changing everything. Let’s explore what’s coming in 2025...",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    comments: []
  },
  {
    title: "Mindfulness for Developers",
    category: "Lifestyle",
    date: "June 3, 2025",
    content: "Coding is intense, but mindfulness can keep you grounded...",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    comments: []
  }
];

// Render all posts on the home page
function renderPosts() {
  const container = document.getElementById('posts-container');
  container.innerHTML = ''; // Clear existing posts

  posts.forEach((post, idx) => {
    const article = document.createElement('article');
    article.classList.add('post');

    let imageHTML = '';
    if (post.imageUrl && post.imageUrl.trim() !== '') {
      imageHTML = `<img src="${post.imageUrl}" alt="${post.title} image" />`;
    }

    article.innerHTML = `
      <h3>${post.title}</h3>
      <p class="meta">Category: ${post.category} | Date: ${post.date}</p>
      ${imageHTML}
      <p>${post.content}</p>
      <button onclick="toggleComments(this)">Show Comments</button>
      <div class="comments hidden">
        <input type="text" placeholder="Add a comment..." />
        <button onclick="addComment(this, ${idx})">Post</button>
        <ul class="comment-list">
          ${post.comments.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    `;
    container.appendChild(article);
  });
}

// Show or hide sections
function showSection(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

// Toggle comments visibility
function toggleComments(button) {
  const commentBox = button.nextElementSibling;
  commentBox.classList.toggle("hidden");
  button.textContent = commentBox.classList.contains("hidden")
    ? "Show Comments"
    : "Hide Comments";
}

// Add comment to a post
function addComment(button, postIndex) {
  const input = button.previousElementSibling;
  const commentList = button.nextElementSibling;
  const comment = input.value.trim();
  if (comment) {
    posts[postIndex].comments.push(comment);
    const li = document.createElement("li");
    li.textContent = comment;
    commentList.appendChild(li);
    input.value = "";
  }
}

// Simulated user database
const userDB = {
  admin: "1234"
};

// Registered users storage (simulate)
let registeredUsers = { ...userDB };

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (registeredUsers[user] && registeredUsers[user] === pass) {
    alert("Login successful! Showing admin panel...");
    document.getElementById("login-msg").textContent = "";
    showSection("admin");
  } else if (!registeredUsers[user]) {
    alert("User not found, please register.");
    registerUser(user, pass);
  } else {
    alert("Incorrect password. Please try again.");
  }
}

// Simulate user registration
function registerUser(username, password) {
  if (!username || !password) {
    alert("Please enter a valid username and password to register.");
    return;
  }
  if (!registeredUsers[username]) {
    registeredUsers[username] = password;
    alert("Registration successful! Please login now.");
    showSection("login");
  } else {
    alert("User already exists. Please login.");
    showSection("login");
  }
}

// Add new blog post from admin panel
function addNewBlog() {
  const titleInput = document.getElementById("post-title");
  const contentInput = document.getElementById("post-content");
  const categorySelect = document.getElementById("post-category");
  const imageInput = document.getElementById("post-image-url");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const category = categorySelect.value;
  const imageUrl = imageInput.value.trim();
  const date = new Date().toLocaleDateString('en-US', {
    year: "numeric", month: "long", day: "numeric"
  });

  if (!title || !content) {
    alert("Please enter both title and content for the blog.");
    return;
  }

  posts.push({
    title,
    category,
    date,
    content,
    imageUrl,
    comments: []
  });

  alert("New blog added!");

  // Clear inputs
  titleInput.value = "";
  contentInput.value = "";
  imageInput.value = "";

  // Show updated posts on home
  showSection("home");
  renderPosts();
}

// Initial posts render
renderPosts();
