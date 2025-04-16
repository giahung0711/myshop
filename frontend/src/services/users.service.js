/**
* @param {string} url

* @param {RequestInit} options
* @returns Promise<Response>
*/
async function efetch(url, options = {}) {
  try {
    const result = await fetch(url, options);
    const json = await result.json();

    if (!result.ok || json?.status !== 'success') {
      throw new Error(json.message || 'Phản hồi không thành công');
    }

    return json; // Trả về toàn bộ JSON để sử dụng đầy đủ dữ liệu
  } catch (error) {
    throw new Error(error.message);
  }
}
export function useUsersService() {
  const baseUrl = 'http://localhost:3000/api/v1/user';
  // hàm đăng nhập
  async function login(userlogin) {
    return efetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userlogin),
      credentials: 'include'
    });
  }
  // hàm lấy thông tin người dùng
  async function fetchUser() {
    const response = await efetch(`${baseUrl}/getUser`, {
      method: 'GET'
    });

    return response.user; // Trả về thông tin người dùng
  }
  async function createUser(user) {
    return efetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      credentials: 'include'
    });
  }
  // Hàm đăng xuất
  async function logout() {
    return efetch(`${baseUrl}/logout`, {
      method: 'POST'
    });
  }

  return {
    fetchUser,
    login,
    logout,
    createUser
  };
}
export default useUsersService();
