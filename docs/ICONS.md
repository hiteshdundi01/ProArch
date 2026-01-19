# Supported Icons

ProArch automatically detects technology keywords in your Mermaid node labels and assigns the appropriate icon.

For example, a node labeled `[Auth Service]` will match the "auth" keyword and display a lock icon. A node labeled `[Postgres DB]` will match "postgres" and show the PostgreSQL logo.

## Icon Mapping Table

| Keyword(s) | Icon | Category |
|------------|------|----------|
| `aws`, `amazon` | ![AWS](https://cdn.simpleicons.org/amazonaws/FF9900?size=16) | Cloud |
| `gcp`, `google` | ![GCP](https://cdn.simpleicons.org/googlecloud/4285F4?size=16) | Cloud |
| `azure`, `microsoft` | ![Azure](https://cdn.simpleicons.org/microsoftazure/0089D6?size=16) | Cloud |
| `kubernetes`, `k8s` | ![K8s](https://cdn.simpleicons.org/kubernetes/326CE5?size=16) | Infrastructure |
| `docker`, `container` | ![Docker](https://cdn.simpleicons.org/docker/2496ED?size=16) | Infrastructure |
| `nginx` | ![Nginx](https://cdn.simpleicons.org/nginx/009639?size=16) | Infrastructure |
| `kafka` | ![Kafka](https://cdn.simpleicons.org/apachekafka/231F20?size=16) | Messaging |
| `redis` | ![Redis](https://cdn.simpleicons.org/redis/DC382D?size=16) | Database |
| `postgres`, `postgresql` | ![Postgres](https://cdn.simpleicons.org/postgresql/4169E1?size=16) | Database |
| `mysql` | ![MySQL](https://cdn.simpleicons.org/mysql/4479A1?size=16) | Database |
| `mongo`, `mongodb` | ![MongoDB](https://cdn.simpleicons.org/mongodb/47A248?size=16) | Database |
| `react` | ![React](https://cdn.simpleicons.org/react/61DAFB?size=16) | Frontend |
| `next`, `nextjs` | ![Next.js](https://cdn.simpleicons.org/nextdotjs/000000?size=16) | Frontend |
| `vue` | ![Vue](https://cdn.simpleicons.org/vuedotjs/4FC08D?size=16) | Frontend |
| `angular` | ![Angular](https://cdn.simpleicons.org/angular/DD0031?size=16) | Frontend |
| `node`, `nodejs` | ![Node](https://cdn.simpleicons.org/nodedotjs/339933?size=16) | Backend |
| `python` | ![Python](https://cdn.simpleicons.org/python/3776AB?size=16) | Backend |
| `go`, `golang` | ![Go](https://cdn.simpleicons.org/go/00ADD8?size=16) | Backend |
| `rust` | ![Rust](https://cdn.simpleicons.org/rust/000000?size=16) | Backend |
| `java` | ![Java](https://cdn.simpleicons.org/openjdk/000000?size=16) | Backend |
| `github` | ![GitHub](https://cdn.simpleicons.org/github/181717?size=16) | DevOps |
| `gitlab` | ![GitLab](https://cdn.simpleicons.org/gitlab/FC6D26?size=16) | DevOps |
| `jenkins` | ![Jenkins](https://cdn.simpleicons.org/jenkins/D24939?size=16) | DevOps |
| `terraform` | ![Terraform](https://cdn.simpleicons.org/terraform/7B42BC?size=16) | DevOps |

*Note: This is a subset of the 100+ supported icons. View `src/lib/icons/iconMapper.ts` for the complete list.*
