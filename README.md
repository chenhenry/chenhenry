Introduction
============
This is Atlas storage backend service project powered by spring-boot.

Configure
=========

- Database scripts:

```
  run the scripts under atlas-storage-service/src/main/database.
```


Prepare
=======

To build the atlas-storage web client, you need to install following tools on your machine:
    - Maven 3
    - JDK 1.6+


Install
=======

```
    mvn clean install
```


Perform a release
=================
Use `mvn release:prepare` and enter need information. When done, use `mvn release:perform`.


Spring boot run command
=======================
To run the web application, run ```mvn spring-boot:run``` under atlas-storage-service project.

The "spring-boot-dev-tools" is configured for the project. Once finish editing the java class files in the Intellij IDE, just "make" the project using Intellij
, it will trigger the application reloaded automatically which will greatly save restarting time.


*Swagger UI URL*
==================
```
   http://localhost:8080/swagger-ui.html
   http://localhost:8080/v2/api-docs
```

