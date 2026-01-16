---
created: 1970-01-01T01:00
updated: 2025-12-07T09:22
---
## Cheat sheet

```java
/*
 * ---- 1. MAIN APP (Spring Boot) ----
 */
@SpringBootApplication     // Enables component scan, auto-config, bootstrapping
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}


/*
 * ---- 2. DEPENDENCY INJECTION (IoC) ----
 */
@Service                   // Marks a service bean
public class UserService {

    private final UserRepository repo;

    @Autowired              // Inject dependency (constructor injection recommended)
    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}


/*
 * ---- 3. CONTROLLERS (REST API) ----
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service; // Spring injects automatically
    }

    @GetMapping              // GET /users
    public List<User> findAll() {
        return service.getAll();
    }

    @PostMapping             // POST /users
    public User create(@RequestBody User user) {
        return service.save(user);
    }
}


/*
 * ---- 4. JPA ENTITY + REPOSITORY ----
 */
@Entity
public class User {
    @Id @GeneratedValue
    private Long id;

    private String name;
    private int age;
}

public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data generates implementation automatically
    List<User> findByName(String name); // Derived query
}


/*
 * ---- 5. CONFIGURATION & BEANS ----
 */
@Configuration
public class AppConfig {

    @Bean                // Manually define bean (rare with Spring Boot)
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}


/*
 * ---- 6. TRANSACTIONS ----
 */
@Service
public class BillingService {

    @Transactional       // Rolls back on RuntimeException
    public void chargeCustomer(Long id) {
        // DB changes here are atomic
    }
}


/*
 * ---- 7. AOP (Aspect Example) ----
 */
@Aspect
@Component
public class LogAspect {

    @Pointcut("execution(* com.example..*Service.*(..))")
    public void serviceMethods(){}

    @Before("serviceMethods()")
    public void beforeCall(JoinPoint jp) {
        System.out.println("Calling: " + jp.getSignature());
    }
}


/*
 * ---- 8. SECURITY (Very Basic) ----
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .httpBasic();     // Basic auth for simplicity
        return http.build();
    }
}


/*
 * ---- 9. PROPERTIES (application.yml) ----
 * spring:
 *   datasource:
 *     url: jdbc:postgresql://localhost:5432/db
 *   jpa:
 *     hibernate:
 *       ddl-auto: update
 */


/*
 * ---- 10. COMMON ANNOTATIONS QUICK LIST ----
 * @RestController    -> REST API controller
 * @Service           -> Business logic bean
 * @Repository        -> DB interaction bean
 * @Component         -> Generic Spring bean
 * @Autowired         -> Dependency injection
 * @Configuration     -> Java config class
 * @Bean              -> Manual bean definition
 * @Entity            -> JPA entity
 * @Transactional     -> DB transaction boundaries
 * @Value             -> Inject config value
 */

```
#### Add a certificate to the java runtime needed for [[TLS]] connections (confirmed)

```bash
# Convert Cert.crt using keytool
keytool -importcert \
  -alias keycloak \
  -file keycloak.crt \
  -keystore keycloak.jks \
  -storepass changeit \
  -storetype JKS \
  -trustcacerts

# Locate the JAVA_HOME in Idea by going to File -> Project structure

#Copy it to the right java directory
cp keycloak.jks JAVA_HOME/lib/security/cacerts/keycloak.jks
```

Used by [[PKCE Flow]] on the java backend.