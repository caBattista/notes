---
created: 1970-01-01T01:00
updated: 2026-01-19T08:55
---
## 1. What is Angular?

Angular is a **TypeScript-based frontend framework** for building single-page applications (SPAs). It uses:

- Component-based architecture
- Declarative templates (HTML)
- Dependency Injection (DI)
- RxJS for reactive programming

---
## 2. Angular CLI (Most Important Commands)

### Install

```bash
npm install -g @angular/cli
```
### Create Project

```bash
ng new my-app
cd my-app
ng serve
```
### Serve App

```bash
ng serve
ng serve --open
ng serve --port 4201
```
### Generate Files

```bash
ng generate component my-component
ng g c my-component

ng g module my-module
ng g service my-service
ng g directive my-directive
ng g pipe my-pipe
ng g guard my-guard
```
### Build

```bash
ng build
ng build --configuration production
```
### Test & Lint

```bash
ng test
ng e2e
ng lint
```

---
## 3. Project Structure (Key Files)

```
src/
 ├── app/
 │   ├── app.component.ts
 │   ├── app.component.html
 │   ├── app.component.css
 │   ├── app.module.ts
 │   └── app-routing.module.ts
 ├── assets/
 ├── environments/
 └── main.ts
```

- `main.ts` bootstraps the app
- `app.module.ts` root module
- `app.component.*` root component

---
## 4. Modules

### Root Module

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
### Feature Module

```ts
@NgModule({
  declarations: [FeatureComponent],
  imports: [CommonModule]
})
export class FeatureModule {}
```

---
## 5. Components

### Component Basics

```ts
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  name = 'John';
}
```
### Template

```html
<p>Hello {{ name }}</p>
```

---
## 6. Data Binding

### Interpolation

```html
{{ value }}
```
### Property Binding

```html
<img [src]="imageUrl" />
```
### Event Binding

```html
<button (click)="onClick()">Click</button>
```
### Two-Way Binding

```html
<input [(ngModel)]="username" />
```

Requires:

```ts
import { FormsModule } from '@angular/forms';
```

---
## 7. Directives

### Structural Directives

```html
<div *ngIf="isLoggedIn"></div>
<div *ngFor="let item of items"></div>
<div [ngSwitch]="value">
  <p *ngSwitchCase="1"></p>
</div>
```
### Attribute Directives

```html
<div [ngClass]="{ active: isActive }"></div>
<div [ngStyle]="{ color: 'red' }"></div>
```

---
## 8. Services & Dependency Injection

### Service

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers() { return []; }
}
```
### Inject Service

```ts
constructor(private userService: UserService) {}
```

---
## 9. Routing

### Routes

```ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: '' }
];
```
### Router Module

```ts
RouterModule.forRoot(routes)
```
### Router Outlet

```html
<router-outlet></router-outlet>
```
### Navigation

```ts
this.router.navigate(['/users']);
```

```html
<a routerLink="/users">Users</a>
```

---
## 10. Lifecycle Hooks

```ts
ngOnInit()
ngOnChanges()
ngAfterViewInit()
ngOnDestroy()
```

Most used: `OnInit`

---
## 11. Forms

### Template-Driven Forms

```html
<form #f="ngForm">
  <input name="email" ngModel required />
</form>
```
### Reactive Forms

```ts
this.form = new FormGroup({
  email: new FormControl('', Validators.required)
});
```

```html
<form [formGroup]="form">
  <input formControlName="email" />
</form>
```

---
## 12. Pipes

### Built-in Pipes

```html
{{ today | date }}
{{ price | currency }}
{{ text | uppercase }}
```
### Custom Pipe

```ts
@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform {
  transform(value: string) {
    return value.slice(0, 5);
  }
}
```

---
## 13. HTTP Client

```ts
import { HttpClient } from '@angular/common/http';
```

```ts
this.http.get('api/users').subscribe(data => {});
```

Enable:

```ts
HttpClientModule
```

---
## 14. RxJS Basics

### Observable

```ts
this.http.get(...).subscribe();
```
### Common Operators

```ts
map
filter
switchMap
tap
catchError
```

---
## 15. Guards

```ts
canActivate(): boolean {
  return this.isAuthenticated;
}
```

```ts
{ path: 'admin', canActivate: [AuthGuard] }
```

---
## 16. Environment Config

```ts
import { environment } from '../environments/environment';
```

```ts
environment.production
environment.apiUrl
```

---
## 17. Best Practices

- Use **OnPush** change detection when possible
- Keep components small
- Use services for business logic
- Unsubscribe from observables (or use async pipe)
- Lazy load feature modules
---
## 18. Helpful Commands Summary

```bash
ng g c
ng g s
ng g m
ng g g
ng serve
ng build --prod
```

---
## 19. Must-Know Concepts Checklist

- Components & Templates
- Modules
- Data Binding
- Dependency Injection
- Routing
- Observables & RxJS
- Forms
- HTTP

---