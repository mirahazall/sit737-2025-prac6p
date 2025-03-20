To deploy this app to a local kubernetes cluster using Docker:
- Install kubectl (https://kubernetes.io/docs/tasks/tools/)
- Enable Docker’s Local Kubernetes Instance by following these steps:
1. Open Docker Desktop
2. Go to Settings (Top Right Corner Gear icon )
3. Select Kubernetes option in left panel
4. Select Enable Kubernetes option in right panel
5. Click Apply & Restart
6. Click Install option
- To switch the Kubernetes context to Docker Desktop so that you can use Docker’s built-in Kubernetes cluster use: "kubectl config use-context docker-desktop"
- To confirm the current kubernetes cluster use: "kubectl config current-context"
- Create a deploy.yaml file and place it inside the scripts directory which will be located in your app’s root directory.
- To build the docker image use: "docker build -t calculator-microservice ."
- To apply the deployment use: "kubectl apply -f scripts/deploy.yaml"
- To check if the pods are running use: "kubectl get pods"
- To check if the service is running use: "kubectl get services"
- To check the deployments use: "kubectl get deployments"


