class UserService {
  constructor(api_server_url) {
    this.baseURL = api_server_url;
  }

  async request(url, options) {
    try {
      const res = await fetch(url, options);

      // Check if the response is OK and the content type is JSON
      if (!res.ok) {
        if (res.headers.get("Content-Type")?.includes("application/json")) {
          const errorResponse = await res.json();
          throw new Error(
            errorResponse.message || `HTTP error! status: ${res.status}`
          );
        } else {
          // For non-JSON responses, read the response as text
          const errorText = await res.text();
          throw new Error(errorText || `HTTP error! status: ${res.status}`);
        }
      }

      // Only parse the response as JSON if the content type is application/json
      if (res.headers.get("Content-Type")?.includes("application/json")) {
        return await res.json();
      }

      // If the response is not JSON, handle accordingly (e.g., return a success message)
      return { status: "success", message: "Operation completed successfully" };
    } catch (error) {
      console.error("Error in UserService:", error);
      return { status: "error", message: error.message };
    }
  }

  getAllUsers() {
    return this.request(`${this.baseURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  }

  getUser(id) {
    return this.request(`${this.baseURL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  }

  createUser(user) {
    return this.request(`${this.baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  updateUser(user) {
    return this.request(`${this.baseURL}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  deleteUser(id) {
    return this.request(`${this.baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

module.exports = UserService;
