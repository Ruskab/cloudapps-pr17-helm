# Comandos utiles 

````shell
#default Ingress + network policies + persistance
helm install  myapp .\helmchart

#explicit params (no ingress, no network policies, no persistance, NodePort)
helm install --set ingressEnabled=false,networkPoliciesEnabled=false,persistanceEnabled=false,serviceType=NodePort  myapp .\helmchart


#No ingress + LoadBalancer + 2 replicas 
helm install --set ingressEnabled=false,serviceType=LoadBalancer,eoloServer.replicas=2  myapp .\helmchart



kubectl get service ingress-nginx-controller -n ingress-nginx --output='jsonpath={.spec.ports[0].nodePort}'



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
  namespace a la misma vez sin ningún tipo de interferencia. Eso implica que los
  nombre de los recursos, las etiquetas y demás identificadores que sean necesarios
  estén prefijados con el nombre de la release
   - Clase 6 -> 2:37 multiple hosts in same ingress

 - [ ] Se podrá activar o desactivar el ingress para la aplicación. Se tendrá en cuenta
   cómo afecta la existencia de ingress a otros recursos del despliegue para que el
   server y el toposervice sigan siendo accesibles desde el exterior (obviamente sin
   compartir dominio).
 - [ ] Se deberá poder configurar el tipo de servicio (NodePort o LoadBalancer) para
   publicar el server y el toposervice en caso de que no se use el ingress.
 - [ ] Se deberá poder configurar el dominio del host del ingress.
 - [ ] Respecto a la persistencia, se deberá poder configurar si:
   - Se crean los PersistenceVolumes (opción por defecto)
   - No se crean porque se asume que ya están creados. En este caso, se
     deberá poder especificar la storageclass de cada servicio que lo necesita
     (mysql, rabbit y mongo)
   - Se crean de forma dinámica usando el StorageClass por defecto de la
     plataforma
 - [ ] Se deberá poder configurar si se aplican Network Policies o no
 - [ ] Se deberá poder configurar la imagen y el tag de cada uno de los servicios
 - [ ] Se deberá publicar un repositorio con el chart en un servidor http (GitHub, por
   ejemplo) y darlo de alta en ArtifactHUB
 - [ ] En el NOTES.txt se deberá indicar cómo acceder a los servicios una vez desplegada
   la release. Esa información deberá depender de si se usa ingress o no.
---
 - [ ] Se debe grabar un vídeo en el que se vea cómo se despliega una release con ingress y
   luego se actualiza esa release para que no use ingrees. En el vídeo se tienen que mostrar
   los recursos kubernetes que se ven afectados por el cambio. También se tiene que mostrar
   el servicio funcionando en ambos casos.









