import { APIService } from '../base';

interface UserSignupData {
  name: string;
  email: string;
}

interface AccountInfo {
  title: string;
  password: string;
  day: string;
  month: string;
  year: string;
  newsletter: boolean;
  specialOffers: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

class LoginService extends APIService {
  static property = "user";
  static path = `${this.property}s`;
  static status = "active";

  /**
   * Register a new user
   */
  static async registerUser(signupData: UserSignupData) {
    return await this.create(`${this.path}/signup`, signupData);
  }

  /**
   * Create user account with detailed information
   */
  static async createAccount(accountInfo: AccountInfo) {
    return await this.create(`${this.path}/create_account`, accountInfo);
  }

  /**
   * Login user
   */
  static async login(credentials: LoginCredentials) {
    const response = await this.create(`${this.path}/login`, credentials);
    if (response.token) {
      await this.setToken(response.token);
    }
    return response;
  }

  /**
   * Verify user is logged in
   */
  static async verifyLogin() {
    return await this.fetch(`${this.path}/verify`, {});
  }

  /**
   * Delete user account
   */
  static async deleteAccount(userId: string | number) {
    return await this.delete(`${this.path}/delete_account`, userId);
  }

  /**
   * Check if email exists
   */
  static async checkEmailExists(email: string) {
    return await this.fetch(`${this.path}/check_email`, { email });
  }

  /**
   * Get user details
   */
  static async getUserDetails() {
    return await this.fetch(`${this.path}/details`, {});
  }

  /**
   * Update user details
   */
  static async updateUserDetails(userData: Partial<AccountInfo>) {
    return await this.update(`${this.path}/update_account`, 'current', userData);
  }

  /**
   * Logout user
   */
  static async logout() {
    await this.setToken('');
    return await this.create(`${this.path}/logout`, {});
  }
}

export default LoginService;
