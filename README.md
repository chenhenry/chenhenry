Introduction
============

Atlas UI App (atlas-us-app) includes two parts:
*   atlas-ui-frontend 
*   atlas-ui-server side 
 

Front End Content (atlas-ui-frontend)
=====================================
Front end content comes from atlas-ui-frontend project.

This is a self-contained AngularJS single application. Developer can work on UI code independent from ui-server side.

Build
-----
In development mode

```commandline
   npm install -- first time
   npm start 
```

It can also be automatically triggered by atlas-ui-sever as part of the maven build.

Server Side(atlas-ui-server)
============================
Server side provides security authentication capacity, configuration, package and deployment capabity.

Build
-----------
Maven build automatically pulls from **atlas-ui-frontend** project dist and public static content, puts those under resources/static. Spring boot automatically packages all content underneath into one jar.
  
Modify the following lines in pom.xml in case you have different local project folder structure other than default
  
``` xml
    <uiResourcesDir>${basedir}}/../atlas-ui-frontend</uiResourcesDir>
```
  Run “mvn clean install” as usual to generate final uberjar atlas-ui-app-<xxxx>.jar
 
```commandlines
   production mode: Build atlas-ui-frontend and atlas-ui-server side, then start atlas-ui-server application
   mvn spring-boot:run 
   
   development mode: build atlas-ui-server side only, then start atlas-ui-server application
   mvn spring-boot:run -Pdevelop
   
   commandline run application jar
   java -jar atlas-ui-server-0.0.1-SNAPSHOT.jar

   Commandline run with externalized application.yml
   java -jar atlas-ui-server-0.0.1-SNAPSHOT.jar --spring.config.location=classpath:/application.yml,file:<override_file_path>.yml   

   A windows sample below
   java -jar atlas-ui-server-0.0.1-SNAPSHOT.jar --spring.config.location=classpath:/application.yml,file:C:/atlas-repo/atlas-ui-app-develop/config/application_dev.yml   
```


Handle security with oAuth2 + OpenId
----------- 
For this to work we need some changes on the server side. The "home"
controller needs an endpoint at "/user" that describes the currently
authenticated user. That's quite easy to do, e.g. in our main class:

.Application
[source,java]
-----------

```java
@SpringBootApplication
@EnableOAuth2Sso
@RestController
@Configuration
public class Application {
  
  @RequestMapping("/user")
  public Principal user(Principal principal) {
    return principal;
  }

  public static void main(String[] args) {
    SpringApplication.run(SocialApplication.class, args);
  }

}
```

Note the use of `@RestController` and `@RequestMapping` and the
`java.util.Principal` we inject into the handler method.

WARNING: It's not a great idea to return a whole `Principal` in a
`/user` endpoint like that (it might contain information you would
rather not reveal to a browser client). We only did it to get
something working quickly. Later in the guide we will convert the
endpoint to hide the information we don't need the browser to have.

To make the link visible we also need to switch off the security on the
home page by adding a `WebSecurityConfigurer`:

.Wso2Application
[source,java]
-----------

```java
@SpringBootApplication
@EnableOAuth2Sso
@RestController
@Configuration
public class Application extends WebSecurityConfigurerAdapter {
    ...

   @Override
   protected void configure(HttpSecurity http) throws Exception {
      ... 
       http.antMatcher("/**").authorizeRequests()
                .antMatchers("/", "/login**", "/webjars/**", "/styles.css").permitAll()
                .anyRequest().authenticated()
                .and().logout().logoutSuccessUrl("/").permitAll()
                .and().csrf().csrfTokenRepository(csrfTokenRepository())
                .and().addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
   }
}
```

Spring Boot attaches a special meaning to a `WebSecurityConfigurer` on
the class that carries the `@EnableOAuth2Sso` annotation: it uses it
to configure the security filter chain that carries the OAuth2
authentication processor. So all we need to do to make out home page
visible is to explicitly `authorizeRequests()` to the home page and
the static resources it contains (we also include access to the login
endpoints which handle the authentication). All other requests
(e.g. to the `/user` endpoint) require authentication.

With that change in place the application is complete, and if you run
it and visit the home page you should see a nicely styled HTML link to
"login with Wso2 Identity Server". The link takes you not directly to Wso2 Identity server,
but to the local path that processes the authentication (and sends a
redirect to Wso2 Identity Server). Once you have authenticated you get redirected
back to the local app, where it now displays your name (assuming you
have set up your permissions in wso2 identity server to allow access to that
data).

Introduce "profile"
-----------
To switch on/off authentication wiring to ease development effort

```json
 application.yml
    profile: production 
```
    if profile = develop, security wiring will be short-wired, hence skip any wso2 authentication
    otherwise –authentication flow will be enforced.


Development Workflow 
===========
There are two profiles added in in **atlas-ui-server/pom.xml**
•	develop: only start the spring-boot services(without UI)
•	production: will start the spring-boot with UI inside a single jar

Suggested workflow under development mode
 1.start “atlas-ui-frontend” using “npm start”
 2.start “atlas-ui-server” using “mvn spring-boot:run –Pdevelop” which only starts backend service

when  edit frontend code, the webpack-dev-server will auto refresh the page;
when  edit the backend code, the spring-boot-dev-tool will auto restart the embed tomcat server;

To switch to development mode, one needs to:
*change the “profile=develop” property in  **atlas-ui-server\src\main\resources\application.yml**
*change the “backend” in constants.ts

``` javascript
 export var CONSTANTS = {
    "atlas": {
        "ui": {
            //change it to "" in production mode
            //change it absolute url of the atlas ui backedn, i.e. http://localhost:7001 when in development mode
            "backend": "",
            //change it to true in frontend development only mode 
            "frontendOnly": false
       }
    }
 }
```


When one prefer working on front-end code only, one can 
1. modify constants.ts

``` javascript
 export var CONSTANTS = {
    "atlas": {
        "ui": {
            //change it to "" in production mode
            //change it absolute url of the atlas ui backedn, i.e. http://localhost:7001 when in development mode
            "backend": "",
            //change it to true in frontend development only mode 
            "frontendOnly": true
       }
    }
 }
```

2.change app.module.ts

``` javascript
if(!CONSTANTS.atlas.ui.frontendOnly){
   ... 
 });
}
else{
   console.log(" frontendOnly - mock constant uiconfig....");
   
   //Define services end-points as constants in frontendOnly mode
   var mockserviceEndpoints ={
    "dataconnector":"http://appatlas1:8080",
   "storage":"http://localhost:8080",
   "mapping":"http://appatlas3:8081",
   "frd":"http://appatlas1:8083"};
   
    angular.module("app.configs.endpoint").constant("endpoints", mockserviceEndpoints);
    angular.bootstrap(document, ['app']);
}

```
