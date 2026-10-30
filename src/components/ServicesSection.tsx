import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { DomainItem } from '../types';
import { Bot, Cpu, Eye, MessageSquareCode, Activity, Sparkles, Check, ChevronRight } from 'lucide-react';

const REAL_DOMAINS: (DomainItem & { icon: React.ElementType })[] = [
  {
    id: 'agentic-workflows',
    number: '01',
    name: 'Agentic Workflows & Multi-Agent Systems',
    tag: 'Agentic Workflows',
    focus: 'Autonomous Reasoning & Tool Use',
    description:
      'Autonomous multi-agent orchestration with state-machine graphs, tool verification, deterministic fallback loops, and human-in-the-loop checkpoints.',
    technologies: ['LangGraph', 'AutoGen', 'Tool Calling', 'Pydantic AI', 'Python', 'Redis'],
    capability: 'Self-healing tool execution with 99.7% task completion fidelity in production.',
    icon: Bot,
  },
  {
    id: 'llm-pipelines-rag',
    number: '02',
    name: 'Enterprise LLM Pipelines & Hybrid RAG',
    tag: 'LLM Pipelines',
    focus: 'High-Concurrency Knowledge Retrieval',
    description:
      'Context-aware document parsing, hybrid dense-sparse vector & knowledge graph retrieval, dynamic chunking, and real-time hallucination verification.',
    technologies: ['Qdrant', 'LlamaIndex', 'DSPy', 'vLLM', 'PyTorch', 'FastAPI'],
    capability: '<280ms P95 semantic search latency with citation grounding on enterprise knowledge bases.',
    icon: Cpu,
  },
  {
    id: 'computer-vision',
    number: '03',
    name: 'Computer Vision & Multimodal Reasoning',
    tag: 'Computer Vision',
    focus: 'Edge Visual Inference & VLM Triage',
    description:
      'Real-time edge visual inference, Vision-Language Model (VLM) inspection pipelines, multimodal document extraction, and continuous video stream anomaly detection.',
    technologies: ['YOLO', 'ONNX Runtime', 'OpenCV', 'CLIP', 'WebSockets', 'CUDA'],
    capability: '60 FPS live video stream triage with <45ms edge inference on resource-constrained hardware.',
    icon: Eye,
  },
  {
    id: 'nlp-finetuning',
    number: '04',
    name: 'NLP & Domain-Specific Fine-Tuning',
    tag: 'NLP',
    focus: 'PEFT, LoRA & Structured Extraction',
    description:
      'Custom parameter-efficient fine-tuning (LoRA / QLoRA), synthetic dataset generation, strict JSON schema validation, and specialized domain model optimization.',
    technologies: ['Hugging Face', 'PEFT', 'Unsloth', 'Transformers', 'DSPy', 'Tokenizers'],
    capability: '4x throughput improvement on specialized enterprise entity extraction benchmarks.',
    icon: MessageSquareCode,
  },
  {
    id: 'real-time-systems',
    number: '05',
    name: 'Real-Time & Distributed Systems',
    tag: 'Real-Time Systems',
    focus: 'Low-Latency Event-Driven Architecture',
    description:
      'Event-driven microservices, high-throughput streaming architectures, distributed caching, and bidirectional WebSocket communication with strict latency SLAs.',
    technologies: ['FastAPI', 'Node.js', 'Redis Streams', 'Kafka', 'Docker', 'PostgreSQL'],
    capability: 'Sub-100ms end-to-end event loops across distributed multi-tenant workers.',
    icon: Activity,
  },
];

export const ServicesSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>(REAL_DOMAINS[0].id);

  const active = REAL_DOMAINS.find((d) => d.id === selectedDomain) || REAL_DOMAINS[0];
  const ActiveIcon = active.icon;

  return (
    <section
      id="domains"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={40} className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            className="text-[#0C0C0C] font-black uppercase tracking-tight leading-tight text-center"
            style={{ fontSize: 'clamp(2.2rem, 6.5vw, 90px)' }}
          >
            Domains Interested to work
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-normal tracking-wide text-[#0C0C0C]/60 uppercase max-w-xl mx-auto">
            Deep focus on autonomous agent orchestration, production ML pipelines, and resilient distributed architectures.
          </p>
        </FadeIn>

        {/* 5 Real Domain Tags Bar */}
        <FadeIn delay={0.1} y={20} className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {REAL_DOMAINS.map((domain) => {
              const isSelected = domain.id === selectedDomain;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer min-h-[44px] ${
                    isSelected
                      ? 'bg-[#0C0C0C] text-white shadow-lg shadow-black/15 scale-105'
                      : 'bg-black/[0.04] text-[#0C0C0C]/80 hover:bg-black/[0.08] border border-black/10'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-[#B600A8]' : 'bg-black/30'
                    }`}
                  />
                  <span>{domain.tag}</span>
                  <span className="font-mono text-[10px] opacity-60">{domain.number}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Active Domain Deep-Dive Card */}
        <FadeIn delay={0.2} y={30} className="mb-16 sm:mb-20">
          <div className="p-6 sm:p-10 md:p-12 rounded-[32px] sm:rounded-[40px] border-2 border-[#0C0C0C] bg-[#FAFAFA] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Number, Title, Description, Capability */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-black/20">
                    {active.number}
                  </span>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-3 py-1 rounded-full">
                    {active.focus}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0C0C0C] text-white flex items-center justify-center shrink-0">
                    <ActiveIcon className="w-5 h-5 text-[#B600A8]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#0C0C0C] tracking-tight">
                    {active.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-[#0C0C0C]/80 font-normal leading-relaxed">
                  {active.description}
                </p>

                <div className="p-4 rounded-2xl bg-white border border-black/10 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-black block mb-0.5">
                      Production Benchmark
                    </span>
                    <span className="text-xs sm:text-sm text-[#0C0C0C]/70">
                      {active.capability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Stack & Framework Badges */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-black/10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0C0C0C]/50 block">
                  Core Technologies & Frameworks
                </span>

                <div className="flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-xl bg-black/[0.04] border border-black/10 text-xs font-semibold text-[#0C0C0C] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-black/10">
                  <span className="text-xs font-mono text-[#0C0C0C]/60 block mb-2">
                    DEPLOYMENT TARGETS
                  </span>
                  <div className="text-xs text-[#0C0C0C]/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Latency SLA:</span>
                      <span className="font-semibold text-black">&lt;100ms – 300ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Execution Environment:</span>
                      <span className="font-semibold text-black">Sandboxed Container / AWS ECS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Observability:</span>
                      <span className="font-semibold text-black">OpenTelemetry Traces</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 5 Domains Grid Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REAL_DOMAINS.map((domain, index) => {
            const Icon = domain.icon;
            const isSelected = domain.id === selectedDomain;
            return (
              <FadeIn key={domain.id} delay={index * 0.08} y={20}>
                <div
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer h-full flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#0C0C0C] bg-[#0C0C0C] text-white shadow-xl'
                      : 'border-black/10 bg-white text-[#0C0C0C] hover:border-black/30 hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-mono text-xl font-bold ${
                          isSelected ? 'text-white/40' : 'text-black/30'
                        }`}
                      >
                        {domain.number}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-white/10 text-[#B600A8]' : 'bg-black/5 text-[#0C0C0C]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold uppercase tracking-tight mb-2">
                      {domain.tag}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isSelected ? 'text-white/70' : 'text-black/60'
                      }`}
                    >
                      {domain.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-semibold">
                    <span className={isSelected ? 'text-[#B600A8]' : 'text-[#0C0C0C]/60'}>
                      {domain.technologies.slice(0, 3).join(' • ')}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-[#B600A8]' : 'text-black/40'
                      }`}
                    />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
