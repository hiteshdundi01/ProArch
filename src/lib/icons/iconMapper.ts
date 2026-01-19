import {
    SiNginx,
    SiRedis,
    SiPostgresql,
    SiMongodb,
    SiMysql,
    SiDocker,
    SiKubernetes,
    SiAmazonwebservices,
    SiGooglecloud,
    SiNodedotjs,
    SiPython,
    SiGo,
    SiReact,
    SiApachekafka,
    SiApachespark,
    SiElasticsearch,
    SiGraphql,
    SiRabbitmq,
    SiApachecassandra,
    SiVault,
    SiTerraform,
    SiPrometheus,
    SiGrafana,
    SiJenkins,
    SiGithubactions,
    SiVercel,
    SiNetlify,
    SiCloudflare,
    SiHeroku,
    SiDigitalocean,
    SiSupabase,
    SiFirebase,
    SiAuth0,
    SiStripe,
    SiTwilio,
    SiSendgrid,
    SiDatadog,
    SiNewrelic,
    SiSplunk,
    SiAnsible,
    SiAmazons3,
    SiAmazondynamodb,
    SiAmazonec2,
    SiAmazonecs,
    SiAmazoneks,
    SiAmazonrds,
    SiAmazonsqs,
    SiAwslambda,
    SiReactivex,
    SiApache,
    SiTraefikproxy,
    SiIstio,
    SiLinkedin,
} from 'react-icons/si';

import {
    FaServer,
    FaDatabase,
    FaCloud,
    FaLock,
    FaCog,
    FaNetworkWired,
    FaEnvelope,
    FaUserShield,
    FaShieldAlt,
    FaGlobe,
    FaDesktop,
    FaMobile,
    FaCode,
    FaFileAlt,
    FaChartLine,
    FaBolt,
    FaCubes,
} from 'react-icons/fa';

import { IconType } from 'react-icons';

interface IconMapping {
    icon: IconType;
    color: string;
}

// Comprehensive icon mappings with brand colors
const iconMappings: Record<string, IconMapping> = {
    // Web Servers & Ingress
    'nginx': { icon: SiNginx, color: '#009639' },
    'ingress': { icon: SiNginx, color: '#009639' },
    'apache': { icon: SiApache, color: '#D22128' },
    'traefik': { icon: SiTraefikproxy, color: '#24A1C1' },
    'haproxy': { icon: FaNetworkWired, color: '#4A90D9' },

    // Databases
    'postgres': { icon: SiPostgresql, color: '#4169E1' },
    'postgresql': { icon: SiPostgresql, color: '#4169E1' },
    'redis': { icon: SiRedis, color: '#DC382D' },
    'mongo': { icon: SiMongodb, color: '#47A248' },
    'mongodb': { icon: SiMongodb, color: '#47A248' },
    'mysql': { icon: SiMysql, color: '#4479A1' },
    'cassandra': { icon: SiApachecassandra, color: '#1287B1' },
    'dynamodb': { icon: SiAmazondynamodb, color: '#4053D6' },
    'elasticsearch': { icon: SiElasticsearch, color: '#005571' },
    'elastic': { icon: SiElasticsearch, color: '#005571' },
    'database': { icon: FaDatabase, color: '#6366F1' },
    'db': { icon: FaDatabase, color: '#6366F1' },
    'rds': { icon: SiAmazonrds, color: '#527FFF' },

    // Cloud Providers
    'aws': { icon: SiAmazonwebservices, color: '#FF9900' },
    'amazon': { icon: SiAmazonwebservices, color: '#FF9900' },
    'gcp': { icon: SiGooglecloud, color: '#4285F4' },
    'google': { icon: SiGooglecloud, color: '#4285F4' },
    'azure': { icon: FaCloud, color: '#0089D6' },
    'microsoft': { icon: FaCloud, color: '#0089D6' },
    'digitalocean': { icon: SiDigitalocean, color: '#0080FF' },
    'heroku': { icon: SiHeroku, color: '#430098' },
    'vercel': { icon: SiVercel, color: '#000000' },
    'netlify': { icon: SiNetlify, color: '#00C7B7' },
    'cloudflare': { icon: SiCloudflare, color: '#F38020' },
    'cloud': { icon: FaCloud, color: '#0EA5E9' },

    // Containers & Orchestration
    'docker': { icon: SiDocker, color: '#2496ED' },
    'container': { icon: SiDocker, color: '#2496ED' },
    'kubernetes': { icon: SiKubernetes, color: '#326CE5' },
    'k8s': { icon: SiKubernetes, color: '#326CE5' },
    'ecs': { icon: SiAmazonecs, color: '#FF9900' },
    'eks': { icon: SiAmazoneks, color: '#FF9900' },
    'ec2': { icon: SiAmazonec2, color: '#FF9900' },
    'lambda': { icon: SiAwslambda, color: '#FF9900' },
    'istio': { icon: SiIstio, color: '#466BB0' },

    // Message Queues
    'kafka': { icon: SiApachekafka, color: '#231F20' },
    'rabbitmq': { icon: SiRabbitmq, color: '#FF6600' },
    'rabbit': { icon: SiRabbitmq, color: '#FF6600' },
    'sqs': { icon: SiAmazonsqs, color: '#FF4F8B' },
    'queue': { icon: FaCubes, color: '#8B5CF6' },
    'nats': { icon: FaServer, color: '#27AAE1' },
    'pubsub': { icon: SiGooglecloud, color: '#4285F4' },

    // Data Processing
    'spark': { icon: SiApachespark, color: '#E25A1C' },
    'streaming': { icon: SiReactivex, color: '#B7178C' },

    // Languages & Frameworks
    'node': { icon: SiNodedotjs, color: '#339933' },
    'nodejs': { icon: SiNodedotjs, color: '#339933' },
    'python': { icon: SiPython, color: '#3776AB' },
    'go': { icon: SiGo, color: '#00ADD8' },
    'golang': { icon: SiGo, color: '#00ADD8' },
    'react': { icon: SiReact, color: '#61DAFB' },

    // API & Services
    'api': { icon: FaServer, color: '#10B981' },
    'rest': { icon: FaServer, color: '#10B981' },
    'graphql': { icon: SiGraphql, color: '#E10098' },
    'grpc': { icon: FaBolt, color: '#244C5A' },
    'service': { icon: FaServer, color: '#6366F1' },
    'microservice': { icon: FaCubes, color: '#8B5CF6' },
    'server': { icon: FaServer, color: '#64748B' },

    // Storage
    's3': { icon: SiAmazons3, color: '#569A31' },
    'storage': { icon: SiAmazons3, color: '#569A31' },
    'bucket': { icon: SiAmazons3, color: '#569A31' },

    // Auth & Security
    'auth': { icon: FaUserShield, color: '#F59E0B' },
    'auth0': { icon: SiAuth0, color: '#EB5424' },
    'oauth': { icon: FaLock, color: '#10B981' },
    'vault': { icon: SiVault, color: '#000000' },
    'security': { icon: FaShieldAlt, color: '#EF4444' },
    'firewall': { icon: FaShieldAlt, color: '#EF4444' },

    // BaaS
    'supabase': { icon: SiSupabase, color: '#3ECF8E' },
    'firebase': { icon: SiFirebase, color: '#FFCA28' },

    // DevOps & CI/CD
    'jenkins': { icon: SiJenkins, color: '#D24939' },
    'github': { icon: SiGithubactions, color: '#2088FF' },
    'actions': { icon: SiGithubactions, color: '#2088FF' },
    'terraform': { icon: SiTerraform, color: '#7B42BC' },
    'ansible': { icon: SiAnsible, color: '#EE0000' },

    // Monitoring & Observability
    'prometheus': { icon: SiPrometheus, color: '#E6522C' },
    'grafana': { icon: SiGrafana, color: '#F46800' },
    'datadog': { icon: SiDatadog, color: '#632CA6' },
    'newrelic': { icon: SiNewrelic, color: '#008C99' },
    'splunk': { icon: SiSplunk, color: '#000000' },
    'monitor': { icon: FaChartLine, color: '#10B981' },
    'metrics': { icon: FaChartLine, color: '#10B981' },
    'logging': { icon: FaFileAlt, color: '#6366F1' },
    'logs': { icon: FaFileAlt, color: '#6366F1' },

    // Communication
    'email': { icon: FaEnvelope, color: '#EA4335' },
    'mail': { icon: FaEnvelope, color: '#EA4335' },
    'sendgrid': { icon: SiSendgrid, color: '#1A82E2' },
    'twilio': { icon: SiTwilio, color: '#F22F46' },
    'sms': { icon: FaMobile, color: '#10B981' },

    // Payments
    'stripe': { icon: SiStripe, color: '#635BFF' },
    'payment': { icon: SiStripe, color: '#635BFF' },

    // Client types
    'web': { icon: FaGlobe, color: '#3B82F6' },
    'browser': { icon: FaDesktop, color: '#64748B' },
    'mobile': { icon: FaMobile, color: '#10B981' },
    'app': { icon: FaMobile, color: '#8B5CF6' },
    'client': { icon: FaDesktop, color: '#64748B' },
    'user': { icon: FaUserShield, color: '#6366F1' },
    'cdn': { icon: FaGlobe, color: '#F59E0B' },
    'cache': { icon: FaBolt, color: '#EF4444' },

    // Social
    'linkedin': { icon: SiLinkedin, color: '#0A66C2' },

    // Generic
    'gateway': { icon: FaNetworkWired, color: '#8B5CF6' },
    'load': { icon: FaNetworkWired, color: '#0EA5E9' },
    'balancer': { icon: FaNetworkWired, color: '#0EA5E9' },
    'lb': { icon: FaNetworkWired, color: '#0EA5E9' },
    'proxy': { icon: FaNetworkWired, color: '#64748B' },
    'config': { icon: FaCog, color: '#64748B' },
    'settings': { icon: FaCog, color: '#64748B' },
    'worker': { icon: FaCog, color: '#F59E0B' },
    'job': { icon: FaCog, color: '#F59E0B' },
    'scheduler': { icon: FaCog, color: '#8B5CF6' },
    'cron': { icon: FaCog, color: '#8B5CF6' },
    'function': { icon: FaCode, color: '#10B981' },
};

// Default fallback
const defaultIcon: IconMapping = { icon: FaServer, color: '#64748B' };

/**
 * Get icon and color for a given label
 * Searches keywords in the label (case-insensitive)
 */
export function getIconForLabel(label: string): IconMapping {
    const lowerLabel = label.toLowerCase();

    // Check each keyword
    for (const [keyword, mapping] of Object.entries(iconMappings)) {
        if (lowerLabel.includes(keyword)) {
            return mapping;
        }
    }

    return defaultIcon;
}

/**
 * Get a list of all available icon keywords for documentation
 */
export function getAvailableKeywords(): string[] {
    return Object.keys(iconMappings).sort();
}
