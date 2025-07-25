const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  coins: number;
  isVerified: boolean;
  joinDate: string;
  expert?: Expert;
}

export interface Expert {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  pricePerMessage: number;
  image?: string;
  isOnline: boolean;
  nextAvailable?: string;
  tags: string[];
  verified: boolean;
  category: string;
  languages: string[];
  responseTime?: string;
  sessions: number;
  followers: number;
  description?: string;
}

export interface Formation {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: number;
  type: string;
  maxPlaces: number;
  currentPlaces: number;
  location: string;
  image?: string;
  tags: string[];
  nextSession?: string;
  description: string;
  schedule?: string;
  modules: string[];
  category: string;
}

export interface Video {
  id: number;
  title: string;
  instructor: string;
  duration: number;
  views: number;
  likes: number;
  category: string;
  isPremium: boolean;
  price: number;
  thumbnail?: string;
  description: string;
  publishedAt: string;
}

// Utilitaire pour les requêtes API
class ApiService {
  private static getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private static async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erreur réseau' }));
      throw new Error(error.message || 'Erreur API');
    }
    return response.json();
  }

  // Authentification
  static async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  static async getMe() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Experts
  static async getExperts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/experts?${searchParams}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  static async getExpert(id: number) {
    const response = await fetch(`${API_BASE_URL}/experts/${id}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Formations
  static async getFormations(params?: {
    category?: string;
    level?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/formations?${searchParams}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  static async getFormationById(id: number) {
    const response = await fetch(`${API_BASE_URL}/formations/${id}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  static async enrollInFormation(id: number) {
    const response = await fetch(`${API_BASE_URL}/formations/${id}/enroll`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Vidéos
  static async getVideos(params?: {
    category?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/videos?${searchParams}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  static async getVideoById(id: number) {
    const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  static async likeVideo(id: number) {
    const response = await fetch(`${API_BASE_URL}/videos/${id}/like`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Rendez-vous
  static async getAppointments(status?: string) {
    const searchParams = new URLSearchParams();
    if (status) {
      searchParams.append('status', status);
    }
    
    const response = await fetch(`${API_BASE_URL}/appointments?${searchParams}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  static async createAppointment(appointmentData: {
    expertId: number;
    type: string;
    date: string;
    time: string;
    duration: string;
    category: string;
    formationId?: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(appointmentData)
    });
    return this.handleResponse(response);
  }

  // Profil utilisateur
  static async getUserProfile() {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  static async updateUserProfile(profileData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    location?: string;
    avatar?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return this.handleResponse(response);
  }

  static async getUserStats() {
    const response = await fetch(`${API_BASE_URL}/users/stats`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Administration
  static async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/users?${searchParams}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }
}

export default ApiService;

