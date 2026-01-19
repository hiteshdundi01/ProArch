export interface SampleTemplate {
    name: string;
    description: string;
    code: string;
}

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
    {
        name: 'Microservices Architecture',
        description: 'Classic microservices with API gateway',
        code: `graph LR
    subgraph "API Gateway"
    GW[Nginx Gateway]
    end
    
    subgraph "Services"
    US[User Service]
    OS[Order Service]
    PS[Product Service]
    end
    
    subgraph "Data Layer"
    PG[Postgres DB]
    RD[Redis Cache]
    MQ[RabbitMQ]
    end
    
    GW --> US
    GW --> OS
    GW --> PS
    
    US --> PG
    US --> RD
    OS --> PG
    OS --> MQ
    PS --> PG
    PS --> RD
`,
    },
    {
        name: 'AWS Infrastructure',
        description: 'AWS cloud architecture with ECS',
        code: `graph TB
    subgraph "AWS Cloud"
    subgraph "VPC"
    ALB[AWS Load Balancer]
    ECS1[ECS Service 1]
    ECS2[ECS Service 2]
    end
    
    RDS[Amazon RDS]
    S3[S3 Bucket]
    SQS[Amazon SQS]
    end
    
    CF[CloudFlare CDN] --> ALB
    ALB --> ECS1
    ALB --> ECS2
    ECS1 --> RDS
    ECS2 --> RDS
    ECS1 --> S3
    ECS2 --> SQS
`,
    },
    {
        name: 'Event-Driven System',
        description: 'Kafka-based event streaming',
        code: `graph LR
    subgraph "Producers"
    API[REST API]
    WH[Webhook Handler]
    end
    
    subgraph "Event Bus"
    KF[Apache Kafka]
    end
    
    subgraph "Consumers"
    AN[Analytics Service]
    NT[Notification Service]
    AU[Audit Logger]
    end
    
    subgraph "Storage"
    ES[Elasticsearch]
    PG[Postgres DB]
    end
    
    API --> KF
    WH --> KF
    KF --> AN
    KF --> NT
    KF --> AU
    AN --> ES
    AU --> PG
`,
    },
    {
        name: 'Kubernetes Cluster',
        description: 'K8s deployment with ingress',
        code: `graph TD
    subgraph "Kubernetes Cluster"
    subgraph "Ingress"
    ING[Nginx Ingress]
    end
    
    subgraph "Apps"
    FE[Frontend Pod]
    BE[Backend Pod]
    WK[Worker Pod]
    end
    
    subgraph "Platform"
    IS[Istio Mesh]
    PR[Prometheus]
    GF[Grafana]
    end
    end
    
    subgraph "External"
    DB[Postgres DB]
    RD[Redis Cache]
    end
    
    ING --> FE
    ING --> BE
    BE --> RD
    BE --> DB
    WK --> DB
    IS -.-> BE
    IS -.-> WK
    PR --> GF
`,
    },
    {
        name: 'CI/CD Pipeline',
        description: 'GitHub Actions to production',
        code: `graph LR
    subgraph "Source"
    GH[GitHub Repo]
    end
    
    subgraph "CI/CD"
    GA[GitHub Actions]
    DK[Docker Build]
    end
    
    subgraph "Registry"
    ECR[AWS ECR]
    end
    
    subgraph "Deployment"
    TF[Terraform]
    K8S[Kubernetes]
    end
    
    subgraph "Monitoring"
    DD[Datadog]
    PG[PagerDuty]
    end
    
    GH --> GA
    GA --> DK
    DK --> ECR
    ECR --> TF
    TF --> K8S
    K8S --> DD
    DD --> PG
`,
    },
    {
        name: 'GraphQL API',
        description: 'GraphQL federation architecture',
        code: `graph TB
    subgraph "Clients"
    WEB[Web App]
    MOB[Mobile App]
    end
    
    subgraph "Gateway"
    GQL[GraphQL Gateway]
    AUTH[Auth0]
    end
    
    subgraph "Subgraphs"
    USR[Users Subgraph]
    PRD[Products Subgraph]
    ORD[Orders Subgraph]
    end
    
    subgraph "Data"
    PG1[Postgres Users]
    PG2[Postgres Products]
    MG[MongoDB Orders]
    RD[Redis Cache]
    end
    
    WEB --> GQL
    MOB --> GQL
    GQL --> AUTH
    GQL --> USR
    GQL --> PRD
    GQL --> ORD
    USR --> PG1
    USR --> RD
    PRD --> PG2
    ORD --> MG
`,
    },
];
