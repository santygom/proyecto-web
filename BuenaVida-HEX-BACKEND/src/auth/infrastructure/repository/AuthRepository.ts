import AuthRepositoryPort from "../../domain/port/driven/AuthRepositoryPort";

export default class AuthRepository implements AuthRepositoryPort {
  private tokens: Map<string, { userId: string; expiresAt: number }> = new Map();

  public async generateToken(userId: string): Promise<string> {
    // En una aplicación real, usarías JWT u otro sistema de tokens
    const token = `token_${userId}_${Date.now()}`;
    
    // Guardamos el token con una expiración de 1 hora
    this.tokens.set(token, {
      userId,
      expiresAt: Date.now() + 3600000 // 1 hora en milisegundos
    });
    
    return token;
  }

  public async validateToken(token: string): Promise<string | null> {
    const tokenData = this.tokens.get(token);
    
    if (!tokenData) {
      return null;
    }
    
    // Verificar si el token ha expirado
    if (tokenData.expiresAt < Date.now()) {
      this.tokens.delete(token);
      return null;
    }
    
    return tokenData.userId;
  }
}