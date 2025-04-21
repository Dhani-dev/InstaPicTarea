# 📘 ¿Qué es un Observable en Angular?

En Angular, un **Observable** es una herramienta poderosa para manejar datos **asíncronos** y **eventos**. Proviene de la librería **RxJS**, que ya viene incluida en Angular.

---

## 🔄 ¿Qué es un Observable?

Un **Observable** es como una **fuente de datos que emite valores en el tiempo**. Puede emitir uno o varios valores, o incluso ninguno, y otras partes del código pueden **suscribirse** para reaccionar a esos valores cuando ocurren.

---

## 🧠 ¿Para qué se usan en Angular?

Los Observables se usan frecuentemente en Angular para:

- Llamadas HTTP (`HttpClient`)
- Manejo de eventos del usuario (clics, inputs, etc.)
- Formularios reactivos
- Comunicación entre componentes o servicios

---

## 📦 Ejemplo básico

```ts
import { Observable } from 'rxjs';

const obs$ = new Observable<string>((observer) => {
  observer.next('Hola');
  observer.next('¿Cómo estás?');
  observer.complete();
});

obs$.subscribe({
  next: (valor) => console.log('Valor:', valor),
  complete: () => console.log('¡Completado!')
});
```

```txt
// Salida esperada en consola:
Valor: Hola
Valor: ¿Cómo estás?
¡Completado!
```

---

## 📡 Ejemplo real: Llamada HTTP en Angular

### 1. Servicio: `user.service.ts`

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.com/usuario';

  constructor(private http: HttpClient) {}

  getUsuario(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
```

### 2. Componente: `user.component.ts` (suscripción manual)

```ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  usuario?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsuario('123').subscribe({
      next: (user) => this.usuario = user,
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Petición completada')
    });
  }
}
```

### 3. Vista HTML: `user.component.html`

```html
<div *ngIf="usuario">
  <p>Nombre: {{ usuario.nombre }}</p>
  <p>Email: {{ usuario.email }}</p>
</div>
```

```txt
// Salida esperada en consola:
Petición completada

// Y en el navegador:
Nombre: Juan Pérez
Email: juan@example.com
```

---

## 🧪 Alternativa: uso del `async` pipe

### Componente: `user.component.ts` con `async`

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  usuario$: Observable<User>;

  constructor(private userService: UserService) {
    this.usuario$ = this.userService.getUsuario('123');
  }
}
```

### Vista HTML con `async` pipe

```html
<div *ngIf="usuario$ | async as usuario">
  <p>Nombre: {{ usuario.nombre }}</p>
  <p>Email: {{ usuario.email }}</p>
</div>
```

```txt
// Comportamiento del async pipe:
// - Se suscribe automáticamente al Observable
// - Muestra el valor cuando está disponible
// - Se desuscribe automáticamente al destruir el componente
```

---

## ✅ Resumen

```txt
Los Observables son esenciales para trabajar con operaciones asíncronas en Angular. Te permiten:

✅ Reaccionar a flujos de datos con múltiples valores  
✅ Encadenar transformaciones como map, filter, switchMap  
✅ Manejar errores de forma elegante  
✅ Mantener el código limpio, reactivo y moderno
```
