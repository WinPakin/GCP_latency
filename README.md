# GCP_latency

This project seeks to explore how the location of a computing unit affects the latency of different types of computing architecture. The two types of computing infrastructure that will be tested are GCP function servers and a two tier microserver application hosted by GCP kubernetes engine. The testing server is located in central U.S., and the tested computing units are locationed at Google's Data centers in central U.S., southeast Asia, and west Europe. The front end is built using Angular 8.0.0 and served using Express.js. 


# Port Used
Angular Port **4200**

Node Port **8080**

Golang Test Port **5002**

Golang 2nd Port **5000**

Golang gRPC Port **5001**

# k8 Components

## Front End
 
### Deployments
frontend-deployment	(acts as the server that tests and records the statistics of the location latency tests.)

### Service 
frontend-service (Load Balancer where client accesses the app IP = http://35.239.28.45)

## Multilayer App

### Deployments
tier1-deployment
tier2-deployment

### Service 
first-contact (Load Balancer gets tested by latency-frontend)
cluster-service	(Links tier1 and tier2)

## API Test

### Deployments
sndserv (REST API server)
grpcserv (gRPC server)
testserv (Server that tests sndserv and grpcserv)
### Service
sndserv-service (ClusterIP)
grpcserv-service (ClusterIP)
testserv-service (ClusterIP)





