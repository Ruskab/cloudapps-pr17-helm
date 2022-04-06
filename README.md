# Comandos utiles 

````shell
# volume local dir with the container
minikube mount /pod-data:/pod-data
# open port to access from local
kubectl port-forward nginx 8081:80
#curl basico desde intelij shell
 curl http://localhost:8081/data.txt -UseBasicParsing
#get endpoint with port 
minikube service server-service --url;


check app toposerv
https://cluster-ip/toposervice/api/topographicdetails/Madrid
http://cluster-ip/
````

#start minikube
````shell
minikube start --network-plugin=cni --cni=false --driver=hyperv
````

#First version
* app accesible via NodePort and exposed port 30000
  * server service: type nodePort
  * toposervice : type nodePort

check connection
````shell
.\test.bat 172.24.250.168
````

#Apply policy deny all
````shell
kubectl apply -f .\kubernetes\network\np-deny-all.yaml
````

* if check connection server and toposervice not reachable FAIL


* create policy deny all
````shell
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
````

* create all pods policy permit all

````shell
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: rabbitmq-np
spec:
  podSelector:
    matchLabels:
      app: rabbitmq
  ingress:
    - from: []
  egress:
    - to: []

````

kubectl get networkpolicies

kubectl -n kube-system exec cilium-1c2cz cilium endpoint list






```shell
minikube addons enable ingress
```
 
  * server service: type ClusterIP


````shell
working API

apiVersion: networking.k8s.io/v1
kind: Ingress  
metadata:  
  name: cluster-ip-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
   - host: cluster-ip
     http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: server-service
            port:
              number: 3000
      - path: /toposervice(/|$)(.*)
        pathType: ImplementationSpecific
        backend:
          service:
            name: toposervice-service
            port:
              number: 8181
````

working webapp
nginx.ingress.kubernetes.io/rewrite-target: /

# EoloPlanner

Este proyecto es una aplicación distribuida formada por diferentes servicios que se comunican entre sí usando API REST y gRPC. La aplicación ofrece un interfaz web que se comunica con el servidor con GraphQL. 

Algunos servicios están implementados con Node.js/Express y otros con Java/Spring. Estas tecnologías deben estar instaladas en el host para poder construir y ejecutar los servicios. También se requiere Docker para ejecutar los servicios auxiliares (MySQL y MongoDB).

Para la construcción de los servicios y su ejecución, así como la ejecución de los servicios auxiliares requeridos se usan scripts implementados en Node.js. Posiblemente no sea el lenguaje de scripting más utilizado para este caso de uso, pero en este caso concreto facilita la interoperabilidad en varios SOs y es sencillo.

## Iniciar servicios auxiliares: MongoDB y MySQL

Los servicios auxiliares se ejecutan con la tecnología de contenedores Docker usando el siguiente comando:

```
$ node exec_aux_services.js
```

## Construir servicios

Descarga las dependencias y construye los proyectos. En proyectos Java usa Maven. En proyectos Node usa NPM:

```
$ node build.js
```

## Ejecutar servicios

Ejecuta los servicios. En proyectos Java usa Maven. En proyectos Node usa esta tecnología directamente:

```
$ node exec.js
```