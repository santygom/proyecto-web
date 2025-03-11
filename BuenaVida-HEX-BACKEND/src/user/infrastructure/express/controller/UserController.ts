import { Request, Response } from "express";
import UserControllerExpressInterface from "../../../domain/interfaces/UserControllerExpressInterface";
import UserUseCasePort from "../../../domain/port/driver/UserUseCasePort";
import UsersToJson from "./UsersToJson";
import User from "../../../domain/user/User";

export default class UserController implements UserControllerExpressInterface {
  constructor(private readonly userUseCase: UserUseCasePort) {}

  getUsers(_req: Request, res: Response): void {
    this.userUseCase
      .getUsers()
      .then(users => {
        const users_json = UsersToJson.get(users);

        if (users_json.length === 0) {
          res.status(404).send("Users not found");
          return;
        }

        res.status(200).json(users_json);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  getUserById(req: Request, res: Response): void {
    const id = req.params["id"];
    this.userUseCase
      .getUserById(id as string)
      .then(user => {
        if (user.isNull()) {
          res.status(404).send("User not found");
          return;
        }

        const user_json = UsersToJson.getSingle(user);
        res.status(200).json(user_json);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  createUser(req: Request, res: Response): void {
    try {
      // Validar datos de entrada
      const { name, email, password, role } = req.body;
      
      if (!name || !email || !password) {
        res.status(400).json({ error: "Name, email and password are required" });
        return;
      }

      // Crear usuario
      const user = new User({
        id: '', // El ID se generará en el repositorio
        name,
        email,
        password, // Nota: en una aplicación real, deberías encriptar la contraseña
        role: role || 'user' // Role por defecto
      });

      this.userUseCase
        .createUser(user)
        .then(createdUser => {
          res.status(201).json(UsersToJson.getSingle(createdUser));
        })
        .catch(error => {
          res.status(500).json({ error: error.message });
        });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  updateUser(req: Request, res: Response): void {
    const id = req.params["id"];
    
    try {
      // Obtener el usuario actual
      this.userUseCase.getUserById(id as string)
        .then(existingUser => {
          if (existingUser.isNull()) {
            res.status(404).send("User not found");
            return;
          }
          
          // Actualizar usuario con los datos proporcionados
          const { name, email, password, role } = req.body;
          
          const updatedUser = new User({
            id: id as string,
            name: name || existingUser.getName(),
            email: email || existingUser.getEmail(),
            password: password || existingUser.getPassword(),
            role: role || existingUser.getRole()
          });
          
          this.userUseCase.updateUser(id as string, updatedUser)
            .then(result => {
              if (result === false) {
                res.status(404).send("User not found or could not be updated");
                return;
              }
              
              if (typeof result !== 'boolean') {
                res.status(200).json(UsersToJson.getSingle(result));
              } else {
                res.status(200).json({ success: true });
              }
            })
            .catch(error => {
              res.status(500).json({ error: error.message });
            });
        })
        .catch(error => {
          res.status(500).json({ error: error.message });
        });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteUser(req: Request, res: Response): void {
    const id = req.params["id"];
    
    this.userUseCase.deleteUser(id as string)
      .then(success => {
        if (!success) {
          res.status(404).send("User not found or could not be deleted");
          return;
        }
        
        res.status(200).json({ success: true });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }
}