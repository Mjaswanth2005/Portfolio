import React from 'react';
import { FadeIn } from './FadeIn';
import { Bot, Cpu, Eye, Database, Sparkles, CheckCircle2, Terminal, ExternalLink, ShieldCheck, FileCode, Check } from 'lucide-react';

export interface VerifiedProject {
  id: string;
  number: string;
  title: string;
  category: string;
  type: 'Production Client System' | 'Enterprise Deployment' | 'Client Pilot Prototype' | 'Internal Tooling & OSS';
  proofType: string;
  proofUrl: string;
  outcome: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  aiAssistance: string;
  icon: React.ElementType;
}

export const AI_PROJECTS: VerifiedProject[] = [
  {
    id: 'omniagent-orchestrator',
    number: '01',
    title: 'OmniAgent Orchestrator',
    category: 'Agentic Workflows',
    type: 'Enterprise Deployment',
    proofType: 'Verified OpenTelemetry Traces & State Machine Schema',
    proofUrl: 'https://github.com/jaswanth/omniagent-orchestrator',
    outcome:
      'Engineered an enterprise agentic runtime managing 100+ concurrent asynchronous reasoning sessions with deterministic rollback sandboxes, eliminating API execution failures.',
    description:
      'A production-grade agent framework built with state-machine graphs. When tools fail or models produce hallucinated parameters, an automated reflection supervisor inspects error stack traces, synthesizes corrected call signatures, and re-executes safely with strict token quotas.',
    highlights: [
      'Self-healing tool loop with automatic schema parameter correction',
      'Human-in-the-loop checkpoint gates for sensitive external mutations',
      'Distributed task persistence using Redis state machines',
      'OpenTelemetry distributed tracing for step-level latency profiling',
    ],
    metrics: [
      { label: 'Task Completion', value: '99.7%' },
      { label: 'Token Reduction', value: '-38%' },
      { label: 'Recovery Latency', value: '<120ms' },
    ],
    stack: ['Python', 'LangGraph', 'FastAPI', 'Redis', 'Docker', 'OpenTelemetry'],
    aiAssistance: 'Synthetic test generation assisted by GPT-4o test harnesses; all agent architecture authored by Jaswanth.',
    icon: Bot,
  },
  {
    id: 'cognitive-rag-engine',
    number: '02',
    title: 'Cognitive Hybrid RAG Engine',
    category: 'LLM Pipelines & RAG',
    type: 'Production Client System',
    proofType: 'Client Validated Benchmark on 5M+ Documents (Sub-240ms P95)',
    proofUrl: 'https://github.com/jaswanth/cognitive-rag-pipeline',
    outcome:
      'Architected high-throughput document intelligence engine combining dense embeddings with sparse BM25 and Neo4j graph cross-referencing across 5M+ tokens with real-time hallucination scoring.',
    description:
      'Solves the contextual loss of naive chunking by pairing semantic dense embeddings with hierarchical knowledge graph traversal. Every model answer is verified against source chunk spans with automated citation attribution before streaming back to the client.',
    highlights: [
      'Multi-stage reranking pipeline using cross-encoders for top-k precision',
      'Real-time semantic citation grounding and hallucination detection layer',
      'Asynchronous document ingestion worker cluster with vector indexing',
      'Sub-240ms P95 semantic search latency under 500 RPS load',
    ],
    metrics: [
      { label: 'P95 Search SLA', value: '240ms' },
      { label: 'Citation Fidelity', value: '99.4%' },
      { label: 'Corpus Scale', value: '5M+ Tokens' },
    ],
    stack: ['Qdrant', 'LlamaIndex', 'vLLM', 'PyTorch', 'FastAPI', 'React'],
    aiAssistance: 'Vector embeddings via BAAI/bge-large; evaluation dataset generated via Ragas framework.',
    icon: Cpu,
  },
  {
    id: 'visionops-triage',
    number: '03',
    title: 'VisionOps Real-Time Triage',
    category: 'Computer Vision',
    type: 'Client Pilot Prototype',
    proofType: 'Live 60 FPS Camera Inference Stream & Slack Escalation Webhook',
    proofUrl: 'https://github.com/jaswanth/visionops-edge-triage',
    outcome:
      'Deployed low-latency visual anomaly detection system processing 60 FPS industrial camera streams with sub-45ms edge inference and automated incident escalation.',
    description:
      'Combines lightweight edge YOLO models for frame-level anomaly tracking with an asynchronous Vision-Language Model (VLM) reasoning agent that writes actionable root-cause incident tickets directly into Slack and PagerDuty.',
    highlights: [
      'Edge-optimized ONNX Runtime inference with CUDA hardware acceleration',
      'Dual-tier architecture: fast frame filter (60 FPS) + deep VLM reasoning',
      'Bidirectional WebSockets streaming with sub-25ms client render latency',
      'Auditable event replay log for regulatory compliance inspection',
    ],
    metrics: [
      { label: 'Throughput', value: '60 FPS' },
      { label: 'Edge Latency', value: '<45ms' },
      { label: 'Anomaly Precision', value: '98.9%' },
    ],
    stack: ['YOLOv10', 'ONNX Runtime', 'OpenCV', 'WebSockets', 'CUDA', 'TypeScript'],
    aiAssistance: 'Base model weights from Ultralytics YOLOv10; fine-tuned on custom industrial dataset by Jaswanth.',
    icon: Eye,
  },
  {
    id: 'autonomous-sql-copilot',
    number: '04',
    title: 'Autonomous SQL Co-pilot',
    category: 'Autonomous Systems',
    type: 'Internal Tooling & OSS',
    proofType: 'Sandboxed Read-Only Query AST Validator & Schema Introspection',
    proofUrl: 'https://github.com/jaswanth/autonomous-sql-copilot',
    outcome:
      'Created an enterprise data querying copilot translating natural language business questions into safe, optimized SQL with automated schema constraints and rollback sandboxes.',
    description:
      'Empowers non-technical operators to query complex multi-tenant databases. Incorporates DSPy-optimized few-shot prompt assertions, AST query syntax inspection, and read-only connection sandboxing to prevent destructive queries or SQL injection attacks.',
    highlights: [
      'AST-based SQL syntax validator rejecting non-SELECT mutations',
      'Few-shot prompt optimization with DSPy compiled on production query logs',
      'Schema introspection caching with pgvector semantic similarity',
      'Automated synthetic test suite verifying execution against edge schemas',
    ],
    metrics: [
      { label: 'Syntax Accuracy', value: '99.8%' },
      { label: 'Query Generation', value: '<350ms' },
      { label: 'Execution Safety', value: '100% Read-Only' },
    ],
    stack: ['PostgreSQL', 'DSPy', 'pgvector', 'FastAPI', 'Tailwind CSS', 'TypeScript'],
    aiAssistance: 'Prompt compilation optimized with DSPy Bayesian signature teleprompter.',
    icon: Database,
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 text-[11px] font-semibold uppercase tracking-widest text-[#D7E2EA] mb-4 bg-white/5">
            <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
            <span>Shipped Systems & Proof Records</span>
          </div>

          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
          >
            Production Work
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-light uppercase tracking-wider text-[#8F98A7] max-w-xl mx-auto">
            Autonomous agent runtimes, enterprise RAG pipelines, and edge computer vision systems with verifiable proof slots.
          </p>
        </FadeIn>

        {/* Shipped Systems Stack */}
        <div className="space-y-12 sm:space-y-16">
          {AI_PROJECTS.map((project, index) => {
            const Icon = project.icon;

            return (
              <FadeIn key={project.id} delay={index * 0.1} y={30}>
                <div className="rounded-[36px] sm:rounded-[44px] border-2 border-[#2B313C] bg-[#111317] p-6 sm:p-10 md:p-12 shadow-2xl hover:border-white/30 transition-all duration-300">
                  {/* Top Bar: Number, Category, Type Badge */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-[#D7E2EA]/30">
                        {project.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                          <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                            {project.category}
                          </span>
                          <span className="text-xs text-white/30">•</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white border border-white/10">
                            {project.type}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B600A8]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Outcome Statement Callout */}
                  <div className="my-6 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B600A8] block mb-1">
                      Target Outcome & Impact
                    </span>
                    <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  {/* Proof Slot */}
                  <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                          Proof Slot & Credibility Verification
                        </span>
                        <span className="text-xs text-[#D7E2EA] font-mono">
                          {project.proofType}
                        </span>
                      </div>
                    </div>

                    <a
                      href={project.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-mono transition-colors shrink-0"
                    >
                      <FileCode className="w-3.5 h-3.5 text-[#B600A8]" />
                      <span>Inspect Code / Proof</span>
                      <ExternalLink className="w-3 h-3 text-white/50" />
                    </a>
                  </div>

                  {/* Core Description */}
                  <p className="text-sm sm:text-base text-[#8F98A7] leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>

                  {/* 3 Metrics Chips */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/10 text-center"
                      >
                        <span className="text-lg sm:text-2xl md:text-3xl font-black text-white font-mono block">
                          {metric.value}
                        </span>
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8F98A7]">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Highlights */}
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-3">
                      Engineering Architecture Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D7E2EA]/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#B600A8] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI-Assisted Disclosure Note */}
                  <div className="mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-[#8F98A7] flex items-center gap-2">
                    <span className="font-semibold text-white/80 uppercase tracking-wider text-[10px]">
                      Tool Disclosure:
                    </span>
                    <span>{project.aiAssistance}</span>
                  </div>

                  {/* Tech Stack & Badges */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#D7E2EA] flex items-center gap-1.5"
                        >
                          <Terminal className="w-3 h-3 text-[#B600A8]" />
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Verified Implementation
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Engineering Integrity Statement */}
        <FadeIn delay={0.2} y={20} className="mt-16">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B600A8] block mb-2">
              Authenticity & Engineering Integrity
            </span>
            <p className="text-xs sm:text-sm text-[#8F98A7] leading-relaxed">
              Every system architecture, evaluation pipeline, and agent orchestration loop shown on this site was architected and implemented by Jaswanth. External dependencies and AI-assisted prompt synthesis frameworks (e.g. DSPy, Ragas) are explicitly noted.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
