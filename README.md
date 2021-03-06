# Comandos utiles 

```mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```

````puml
Class01 <|-- Class02
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 -- Class10
````

````shell
#default Ingress + network policies + persistance create default PV
helm install  myapp .\helmchart

#using my planner
helm install --set plannerImage=ruskab/myplanner,plannerTag=v1.0 otherapp .\helmchart

#explicit params (no ingress, no network policies, dynamic persistance, NodePort)
helm install --set ingressEnabled=false,networkPoliciesEnabled=false,mysql.storageClass=,mongodb.storageClass=,rabbitmq.storageClass=,serviceType=NodePort  myapp .\helmchart


#No ingress + LoadBalancer + 2 replicas 
helm install --set ingressEnabled=false,serviceType=LoadBalancer,eoloServer.replicas=2  myapp .\helmchart

#Provide persistance PV
helm install --set mysql.storageClass=mymysqlpv,mongodb.storageClass=mymongodbpv,rabbitmq.storageClass=myrabbitmqpv  myapp .\helmchart

kubectl get service ingress-nginx-controller -n ingress-nginx --output='jsonpath={.spec.ports[0].nodePort}'

# isntall release 1 myapp
helm install --set ingress.host=otherip,networkPoliciesEnabled=false,persistenceEnabled=false myapp .\helmchart
# install release 2 otherapp
helm install --set ingress.host=otherip,networkPoliciesEnabled=false,persistenceEnabled=false otherapp .\helmchart


# volume local dir with the container
minikube mount /pod-data:/pod-data
# open port to access from local
kubectl port-forward nginx 8081:80
#curl basico desde intelij shell
 curl http://localhost:8081/data.txt -UseBasicParsing
#get endpoint with port 
minikube service server-service --url;

kubectl -n kube-system exec cilium-1c2cz cilium endpoint list
minikube addons enable ingress


check app toposerv
https://cluster-ip/toposervice/api/topographicdetails/Madrid
http://cluster-ip/
````

#start minikube
````shell
minikube start --network-plugin=cni --cni=false --driver=hyperv
````

# checklist 

 - [ ] Se debe permitir que convivan dos releases del mismo chart en el mismo
  namespace a la misma vez sin ning??n tipo de interferencia. Eso implica que los
  nombre de los recursos, las etiquetas y dem??s identificadores que sean necesarios
  est??n prefijados con el nombre de la release
   - Clase 6 -> 2:37 multiple hosts in same ingress

 - [ ] Se podr?? activar o desactivar el ingress para la aplicaci??n. Se tendr?? en cuenta
   c??mo afecta la existencia de ingress a otros recursos del despliegue para que el
   server y el toposervice sigan siendo accesibles desde el exterior (obviamente sin
   compartir dominio).
 - [ ] Se deber?? poder configurar el tipo de servicio (NodePort o LoadBalancer) para
   publicar el server y el toposervice en caso de que no se use el ingress.
 - [ ] Se deber?? poder configurar el dominio del host del ingress.
 - [ ] Respecto a la persistencia, se deber?? poder configurar si:
   - Se crean los PersistenceVolumes (opci??n por defecto)
   - No se crean porque se asume que ya est??n creados. En este caso, se
     deber?? poder especificar la storageclass de cada servicio que lo necesita
     (mysql, rabbit y mongo)
   - Se crean de forma din??mica usando el StorageClass por defecto de la
     plataforma
 - [ ] Se deber?? poder configurar si se aplican Network Policies o no
 - [ ] Se deber?? poder configurar la imagen y el tag de cada uno de los servicios
 - [ ] Se deber?? publicar un repositorio con el chart en un servidor http (GitHub, por
   ejemplo) y darlo de alta en ArtifactHUB
 - [ ] En el NOTES.txt se deber?? indicar c??mo acceder a los servicios una vez desplegada
   la release. Esa informaci??n deber?? depender de si se usa ingress o no.
---
 - [ ] Se debe grabar un v??deo en el que se vea c??mo se despliega una release con ingress y
   luego se actualiza esa release para que no use ingrees. En el v??deo se tienen que mostrar
   los recursos kubernetes que se ven afectados por el cambio. Tambi??n se tiene que mostrar
   el servicio funcionando en ambos casos.









