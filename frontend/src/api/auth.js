import http from "./http";

class AuthApi {
  constructor() {
    this.url = `/users`;
    this.request = http;
  }

  async login(username, password) {
    try {
      const response = await this.request.post(`${this.url}/auth/login`, {
        username,
        password,
      });
      if (response?.data?.code === "SUCCESS") {
        const { accessToken, result } = response.data;
        return {
          access_token: accessToken,
          status: response.status,
          message: result,
        };
      }
      return {
        status: response.status,
        message: response.data.error.message,
      };
    } catch (error) {
      console.log("🚀 ~ AuthApi ~ login ~ error:", error);
      return Promise.reject(error);
    }
  }

  // public async getMe(token: string | null): Promise<TUser> {
  // 	const response = await this.request.get<TUser>(`/me`, {
  // 		headers: {
  // 			Authorization: `Bearer ${token}`,
  // 		},
  // 	});
  // 	return response.data;
  // }

  async getMe() {
    const response = await this.request.get(`${this.url}/me`);
    if (response.data.code === "SUCCESS") {
      const result = {
        ...response.data.data,
        userId: response.data.data._id,
        employeeId: response.data.data.employee,
        roleName: response.data.data.roleName,
      };
      return result;
    }
  }

  async logout() {
    try {
      console.log(this.request);

      const response = await this.request.post(`${this.url}/auth/logout`);
      if (response.data.code === 0) {
        return {
          status: response.status,
          message: response.data.message,
        };
      }
      return {
        status: 400,
        message: "Logout failed! Please try again later.",
      };
    } catch (error) {
      console.log("🚀 ~ AuthApi ~ logout ~ error", error);
      return {
        status: 400,
        message: "Logout failed! Please try again later.",
      };
    }
  }
}

const authApi = new AuthApi();

export default authApi;
