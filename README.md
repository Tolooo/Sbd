# Sbd
## Inside a `/Sbd` directory run the following command:
### Starting backend
Requirements:

 * Java 8
 
 * Maven  

Add ojdbc7 driver

```
mvn install:install-file -Dfile=.//lib//ojdbc7.jar -DgroupId=com.Oracle -DartifactId=ojdbc7 -Dversion=12.1.0 -Dpackaging=jar
```  

Compile project

```
mvn package
```  

Start project

```
java -jar ./target/SBD-1.0-SNAPSHOT.war
```  

### Starting frontend
```  
http-server ./src/main/resources -p 8081
```  

Requirements:  
https://nodejs.org/en/  
https://www.npmjs.com/package/http-server