# Práctica 3

El manifiesto `global-np.yaml` contine las network policies:
 * Deny All
 * Una que permite el acceso por DNS a los pods con la etiqueta `dns-policy: enabled`.

En cada manifiesto están definidos el Deployment, Service, PVC y los network policies de cada servicio.

# Minikube

Debe tener los siguientes servicios:
 * Cilium
 * Ingress
 * La IP de minukube configurada en el /etc/hosts para atender al dominio `cluster-ip`

# Pruebas de funcionamiento

* Servidor: http://cluster-ip/
* Servicio de topografía: http://cluster-ip/toposervice/api/topographicdetails/jaca
