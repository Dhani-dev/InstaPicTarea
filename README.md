# instapic-app

# Introducción a JavaScript

# JSON Web Tokens (JWT) en Angular

## Quées un JWT?

JWT (JSON Web Token) es un **formato estándar** para transmitir información de manera segura entre dos partes como un objeto JSON. Es muy utilizado para autenticación.

---

## Estructura de un JWT

Un JWT consta de tres partes codificadas en base64 separadas por puntos (`.`):

1. **Header**: tipo de token y algoritmo de cifrado.
2. **Payload**: datos del usuario y claims personalizados.
3. **Signature**: verificación de integridad.

```
xxxxx.yyyyy.zzzzz
```

---

## Cómo funciona JWT en autenticación?

1. El usuario envía credenciales (usuario/contraseña).
2. El backend genera un JWT y lo devuelve.
3. El frontend lo almacena (normalmente en localStorage).
4. Cada petición posterior envía el token en el header `Authorization`.

---

## Ejemplo en Angular

### Servicio de autenticación

```ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
}
```

---

### Interceptor para agregar JWT

```ts
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
```

---

## Ventajas

- Stateless: no requiere mantener sesión en servidor.
- Escalable.
- Puede llevar información útil (como roles) en el payload.

## Riesgos

- Si el token es robado, el atacante puede suplantar al usuario.
- Evitar guardarlos en `localStorage` si hay riesgo de XSS (Cross-Site Scripting).

---

## Recomendaciones

- Usar HTTPS siempre.
- Cortos periodos de expiración + Refresh Tokens.
- Validar y firmar tokens correctamente en el backend.

---

## Desencriptando con JWT

El JWT permite tener información del usuario (nombre de usuario, roles, expiración, etc). Para manipular esta información existen librerías tales como **jwt-decode**.

- Instalar jwt-decode

```js

npm install jwt-decode

```


- Crear un servicio para manejar el token

```ts
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

export interface JwtPayload {
  email: string;
  username: string;
  exp: number;
  iat?: number;
}


@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'token';

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.decodeToken();
    if (!payload?.exp) return true;

    const now = Math.floor(Date.now() / 1000); // tiempo en segundos
    return payload.exp < now;
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}

```

- Usar el servicio en un componente o en un guard

```ts
constructor(private tokenService: TokenService) {}

ngOnInit() {
  const tokenData = this.tokenService.decodeToken();

  if (tokenData) {
    console.log('Usuario:', tokenData.username);
    console.log('Email:', tokenData.email);
    console.log('Expira en:', new Date(tokenData.exp * 1000));
  }

  if (this.tokenService.isTokenExpired()) {
    console.warn('Token expirado');
  }
}

```


## Generar el token en el backend

El token es generado desde el backend.

- Instalar la libreria de JWT

```js

npm install @nestjs/jwt

```

- Agregar al módulo de autenticación, el módulo de JWT

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    JwtModule.register({
      global:true, //habilitamos el uso global
      secret: 'AABBCC', //Definimos una clave que 'firme' el jwt
      signOptions: { expiresIn: '1h' } //Definimos un tiempo de expiración del token
    })
  ]
})
export class AuthModule {}
```

- Inyectar al servicio de autenticación, el servicio jwt-service

```ts
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){}

    private getToken(user:SignUpDto):string{
        return this.jwtService.sign({
          username:user.username,
          email:user.email
        });
    }

}
```

- En las respuestas de los métodos de login y sign-up, hacer un llamado al método **getToken**, para generarlo

```ts

    login(loginDto: LoginDto) {
        const user = this.users.find(user=>user.username===loginDto.username && user.password===loginDto.password);
        if(!user){
            throw new NotFoundException('Invalid credentials');
        }
        return {
            success:true,
            token:this.getToken(user)
        }
    }


    signUp(signUpDto: SignUpDto):LoginResponse {
        const user = this.users.find(user=>user.username===signUpDto.username);
        if(user){
            throw new BadRequestException('User already exists');
        }
        this.users.push(signUpDto);
        return {
            success:true,
            token:this.getToken(signUpDto)
        }
    }

```