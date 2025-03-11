export default interface AuthRepositoryPort {
    generateToken(userId: string): Promise<string>;
    validateToken(token: string): Promise<string | null>; // Retorna el userId si el token es válido
  }