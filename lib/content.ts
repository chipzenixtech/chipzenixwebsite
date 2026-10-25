import { WHATSAPP_NUMBER } from "./whatsapp";

// Copy rule: no em dashes in visible text (client preference). Use commas,
// colons or full stops instead.

// ── Types ───────────────────────────────────────────────────────────────────
export type CapabilityGroup = { category: string; items: string[] };
export type ProcessStep = { title: string; description: string };
export type Location = { city: string; region: string; role?: string };
export type NavLink = { label: string; href: string };
export type Faq = { question: string; answer: string };
export type PageSeo = { title: string; description: string; keywords?: string[] };
export type DomainPillarId = "vlsi" | "embedded";
export type DomainGroup = { title: string; items: string[] };
export type Domain = {
  slug: string;
  pillar: DomainPillarId;
  /** Card title, as in the client deck. */
  title: string;
  /** Card one-liner. */
  tagline: string;
  /** Detail page H1. */
  pageTitle: string;
  /** Search + share description (110–160 chars). */
  description: string;
  intro: string[];
  groups: DomainGroup[];
};
export type Reason = { title: string; detail: string };

// ── Site / contact ───────────────────────────────────────────────────────────
export const site = {
  name: "Chipzenix",
  tagline: "Engineering Tomorrow's Silicon",
  taglineLong: "Innovating silicon, delivering excellence, building lasting connections.",
  heroIntro:
    "Innovating Silicon, Delivering Excellence, Building Lasting Connections, from VLSI, embedded software and application software.",
  intro:
    "Chipzenix is a technology-driven engineering services company specializing in VLSI design, semiconductor physical design, analog layout engineering, embedded systems development and ASIC/SoC design services.",
  contact: {
    whatsapp: WHATSAPP_NUMBER,
    whatsappDisplay: "+91 96181 02268",
    email: "hello@chipzenix.com",
  },
  // Profile URLs. Leave a value empty until the account exists: empty links are
  // hidden in the footer and left out of the structured data.
  socials: {
    linkedin: "",
    x: "",
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/#technology" },
  { label: "Industries", href: "/#industries" },
];

/** Hero slideshow, in display order. */
export const heroSlides = [
  {
    src: "/images/die.webp",
    alt: "Macro photograph of an integrated-circuit die with fine gold bond wires",
    caption: "silicon die · post-bond inspection",
  },
  {
    src: "/images/wafer.webp",
    alt: "Patterned silicon wafer covered in an array of chip dies",
    caption: "patterned wafer · die array",
  },
  {
    src: "/images/pcb.webp",
    alt: "Close-up of a populated embedded circuit board with chips and passive components",
    caption: "embedded hardware · populated board",
  },
  {
    src: "/images/cleanroom.webp",
    alt: "Engineers in cleanroom suits operating semiconductor fabrication equipment",
    caption: "cleanroom · fabrication tools",
  },
];

/** Primary call to action in the nav and mobile menu. */
export const navCta: NavLink = { label: "Get in Touch", href: "/contact" };

// ── About ────────────────────────────────────────────────────────────────────
export const about = {
  kicker: "About Chipzenix",
  title: "Premier semiconductor partner for",
  titleAccent: "global innovators",
  body: "We are a technology-driven engineering services company specializing in VLSI design, semiconductor physical design, analog layout engineering, embedded systems development and ASIC/SoC design services.",
};

export const mission =
  "Deliver innovative, reliable, and cost-effective engineering solutions that enable customers to bring cutting-edge products to market faster.";

export const vision =
  "To become a trusted global partner for semiconductor & embedded engineering services.";

// ── Domains of expertise ─────────────────────────────────────────────────────
export const expertise = {
  kicker: "Domains of Expertise",
  title: "Engineering Excellence Across",
  titleAccent: "VLSI & Embedded",
  titleEnd: "Technologies",
  intro:
    "Delivering end-to-end semiconductor and embedded system solutions from concept to silicon and beyond.",
};

export const domainPillars: Record<
  DomainPillarId,
  { id: DomainPillarId; label: string; chipLabel: string; heading: string; partNo: string }
> = {
  vlsi: {
    id: "vlsi",
    label: "VLSI Domains",
    chipLabel: "VLSI",
    heading: "Silicon design, verification & signoff",
    partNo: "CZX-V01",
  },
  embedded: {
    id: "embedded",
    label: "Embedded Domains",
    chipLabel: "Embedded",
    heading: "Firmware, systems & edge intelligence",
    partNo: "CZX-E01",
  },
};

// VLSI pages carry the client's own service write-ups. The deck's cards for STA
// and DFT had no write-up, so those pages are built from the card text and the
// STA/signoff lists in the Physical Design write-up. Design Verification had a
// write-up but no card, so it gets one.
export const domains: Domain[] = [
  {
    slug: "analog-layout",
    pillar: "vlsi",
    title: "Analog Layout",
    tagline: "Custom analog and standard cell layout for advanced nodes.",
    pageTitle: "Analog Layout Services",
    description:
      "Custom analog and mixed-signal IC layout for SerDes, PLL, PMIC and RF blocks, with DRC/LVS-clean physical verification at advanced nodes.",
    intro: [
      "We provide high-quality custom analog and mixed-signal IC layout services for developing high-performance mixed-signal, RF, SerDes, PLL, PMIC and custom analog cells.",
      "Our layout engineers combine a deep understanding of device physics, process technologies, parasitic effects, device matching, symmetry, noise coupling, IR drop, electromigration and manufacturing constraints to deliver robust, silicon-proven layouts across advanced technology nodes.",
      "From individual analog IP blocks to complete mixed-signal macros, we support customers throughout the physical implementation and verification cycle.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          "Transistor-Level Layout",
          "Full-Custom Layout",
          "Analog IP Layout",
          "Mixed-Signal Layout",
          "Custom Device Layout",
          "Hierarchical Layout",
          "Block-Level Layout",
          "Top-Level Integration",
          "Layout Optimization",
        ],
      },
      {
        title: "Physical Verification",
        items: ["DRC", "LVS", "ERC", "Antenna Checks", "Density Checks", "EM/IR", "Latch-up", "PERC"],
      },
      {
        title: "SerDes",
        items: [
          "Rx Layout",
          "Tx Layout",
          "CTLE",
          "DFE",
          "Clocking Layout",
          "Serializer",
          "Deserializer",
          "PLL",
          "VCO",
          "Charge Pump",
        ],
      },
      {
        title: "Power Management (PMIC)",
        items: ["LDO", "Bandgap", "Power Switch", "Reference Circuits", "ESD Circuits", "Driver & Pre-Driver"],
      },
      { title: "Data Converters", items: ["ADC", "DAC"] },
      { title: "RF Circuits", items: ["LNA", "Mixer", "TIA"] },
      { title: "Advanced Node Expertise", items: ["TSMC N2 / N3 / N5", "Samsung SF2 / SF4", "Intel 18A"] },
    ],
  },
  {
    slug: "analog-circuit",
    pillar: "vlsi",
    title: "Analog Circuit",
    tagline: "Transistor-level design of analog, RF and high-speed digital circuits.",
    pageTitle: "Analog Design Services",
    description:
      "End-to-end analog and mixed-signal IC design: op-amps, bandgaps, LDOs, PLLs, SerDes front-ends and data converters, from architecture to silicon.",
    intro: [
      "We provide end-to-end analog and mixed-signal IC design services for semiconductor companies, product organizations, startups and research institutions. Our experts support the complete analog design flow, from architecture and transistor-level circuit design to layout, verification, tape-out and silicon validation.",
      "We help customers develop high-performance, low-power and area-efficient analog IPs optimized for their application and technology requirements.",
    ],
    groups: [
      {
        title: "Analog Circuit Design",
        items: [
          "Operational Amplifiers",
          "Comparators",
          "Bandgap References",
          "Current & Voltage References",
          "Bias Generation Circuits",
          "LDO Regulators",
          "Charge Pumps",
          "Oscillators",
          "Precision Analog Blocks",
        ],
      },
      {
        title: "High-Speed Interface Design",
        items: [
          "SerDes Analog Front-End",
          "Clock Data Recovery (CDR)",
          "Equalizers",
          "Tx & Rx Circuits",
          "Driver Circuits",
          "Termination Networks",
          "High-Speed I/O Interfaces",
        ],
      },
      { title: "PLL", items: ["Clock Distribution Networks"] },
      {
        title: "Data Converters",
        items: ["ADC", "DAC", "Sample and Hold Circuits", "Calibration Techniques", "High-Speed Sampling Systems"],
      },
    ],
  },
  {
    slug: "physical-design",
    pillar: "vlsi",
    title: "Physical Design (PD)",
    tagline: "Floorplanning, P&R and timing closure at advanced nodes.",
    pageTitle: "Physical Design Services",
    description:
      "RTL-to-GDSII physical design: floorplanning, power planning, placement, CTS, routing, timing closure and signoff for tape-out ready silicon.",
    intro: [
      "Our Physical Design services help semiconductor companies transform synthesized RTL into optimized, signoff-ready physical implementations.",
      "We support the complete digital implementation flow, from netlist preparation, floorplanning and power planning to placement, CTS, routing, timing closure, physical verification and GDSII generation.",
      "Our focus is on achieving the right balance of Performance, Power and Area (PPA) while maintaining design quality, reliability and tape-out readiness.",
    ],
    groups: [
      {
        title: "Floorplanning & Implementation",
        items: [
          "Die & Core Planning",
          "Macro Placement",
          "Standard Cell Planning",
          "I/O Planning",
          "Power Grid Planning",
          "Placement Constraints",
          "Routing Resource Planning",
          "Congestion Analysis",
          "Timing-Aware Floorplanning",
          "GDSII Generation",
        ],
      },
      {
        title: "Clock Tree Synthesis",
        items: [
          "Clock Tree Synthesis",
          "Clock Network Optimization",
          "Clock Buffer Insertion",
          "Clock Skew Optimization",
          "Clock Latency Optimization",
          "Clock Routing",
          "Clock Transition Optimization",
          "Post-CTS Timing Optimization",
        ],
      },
      {
        title: "Static Timing Analysis",
        items: [
          "Setup Analysis",
          "Hold Analysis",
          "Timing Constraint Validation",
          "Path Analysis",
          "Buffer Optimization",
          "Cell Sizing",
          "ECO Implementation",
          "Critical Path Optimization",
          "Multi-Corner Multi-Mode Analysis",
        ],
      },
      {
        title: "Timing Signoff",
        items: ["Static Timing Analysis", "Setup/Hold Closure", "Multi-Corner Analysis", "Multi-Mode Analysis", "Clock Analysis"],
      },
      { title: "Power Signoff", items: ["Dynamic Power", "Leakage Power", "IR Drop", "Electromigration"] },
      { title: "Physical Signoff", items: ["DRC", "LVS", "ERC", "Antenna", "Density", "Metal Fill"] },
    ],
  },
  {
    slug: "rtl-design",
    pillar: "vlsi",
    title: "RTL Design",
    tagline: "Synthesizable RTL microarchitecture for high-performance SoCs and IPs.",
    pageTitle: "RTL Design Services",
    description:
      "Synthesizable Verilog and SystemVerilog RTL for ASIC and SoC designs: microarchitecture, IP integration, lint and CDC-aware development.",
    intro: [
      "We develop robust and synthesizable RTL architectures for ASIC and SoC designs, with a strong focus on performance, power, area, scalability and design quality.",
    ],
    groups: [
      {
        title: "Our RTL capabilities include",
        items: [
          "RTL Architecture and Microarchitecture",
          "Verilog and SystemVerilog RTL Development",
          "Control and Datapath Design",
          "IP Integration",
          "Interface Development",
          "RTL Optimization",
          "Design Enhancements and Feature Additions",
          "Coding Guidelines and RTL Quality Checks",
          "Lint and CDC-Aware RTL Development",
        ],
      },
    ],
  },
  {
    slug: "design-verification",
    pillar: "vlsi",
    title: "Design Verification (DV)",
    tagline: "UVM, formal and coverage-driven verification from block level to full chip.",
    pageTitle: "Design Verification Services",
    description:
      "UVM, formal and coverage-driven design verification from block level to full-chip SoC, with regression automation and emulation support.",
    intro: [
      "Our Design Verification services help semiconductor companies validate the functionality, reliability and performance of complex digital designs before tape-out.",
      "We use industry-standard verification methodologies to identify functional issues early, improve coverage, accelerate debug and increase confidence in silicon readiness.",
      "From block-level verification to full-chip and SoC verification, we provide scalable verification solutions tailored to your design and project requirements.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          "UVM-Based Testbench Architecture & Implementation",
          "Formal Verification & Assertion-Based Checking",
          "Coverage-Driven Verification (Functional, Code, Assertion)",
          "Gate-Level Simulation & Low-Power Verification",
          "Debug Using Waveform Viewers and Tool-Specific Platforms",
          "Integration with Emulators and FPGA Prototyping Platforms",
          "Continuous Integration (CI) and Regression Automation",
        ],
      },
    ],
  },
  {
    slug: "static-timing-analysis",
    pillar: "vlsi",
    title: "Static Timing Analysis (STA)",
    tagline: "Multi-mode multi-corner STA, ECO loops and signoff timing.",
    pageTitle: "Static Timing Analysis Services",
    description:
      "Multi-mode multi-corner static timing analysis: setup and hold closure, constraint validation, ECO loops and timing signoff for tape-out.",
    intro: [
      "We close timing across every mode and corner your design runs in, with multi-mode multi-corner STA, iterative ECO loops and signoff timing.",
      "Timing work runs alongside physical implementation, so constraint issues and critical paths are found and fixed long before tape-out.",
    ],
    groups: [
      {
        title: "Timing Analysis",
        items: [
          "Setup Analysis",
          "Hold Analysis",
          "Timing Constraint Validation",
          "Path Analysis",
          "Critical Path Optimization",
          "Multi-Corner Multi-Mode Analysis",
        ],
      },
      { title: "ECO Loops", items: ["ECO Implementation", "Buffer Optimization", "Cell Sizing"] },
      {
        title: "Timing Signoff",
        items: ["Setup/Hold Closure", "Multi-Corner Analysis", "Multi-Mode Analysis", "Clock Analysis"],
      },
    ],
  },
  {
    slug: "design-for-testability",
    pillar: "vlsi",
    title: "Design for Testability (DFT)",
    tagline: "Scan, BIST, MBIST and boundary-scan insertion for manufacturable silicon.",
    pageTitle: "Design for Testability (DFT) Services",
    description:
      "Design for testability services: scan, BIST, MBIST and boundary-scan insertion that make silicon testable and manufacturable at volume.",
    intro: [
      "We build testability into your design with scan, BIST, MBIST and boundary-scan insertion, so the silicon you tape out can be tested and manufactured with confidence.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: ["Scan Insertion", "Built-In Self-Test (BIST)", "Memory BIST (MBIST)", "Boundary-Scan Insertion"],
      },
    ],
  },

  // Embedded pages: the deck gave card text only, so each page expands that
  // text with the embedded scope already described across this site.
  {
    slug: "embedded-systems",
    pillar: "embedded",
    title: "Embedded Systems",
    tagline: "Custom embedded hardware and software, from board bring-up to field-ready products.",
    pageTitle: "Embedded Systems Engineering",
    description:
      "Custom embedded systems engineering: hardware design, board bring-up, device drivers, connectivity and validation for production-ready products.",
    intro: [
      "We engineer complete embedded systems: the board, the low-level software that brings it up, and the drivers and connectivity that make it a product.",
      "Hardware and software are developed together, so integration issues surface early and the system is validated before it reaches the field.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          "Schematic Capture & PCB Layout",
          "Board Bring-Up",
          "Device Drivers & Hardware Abstraction Layers",
          "FPGA & SoC Hardware/Software Co-Design",
          "Hardware-in-the-Loop Testing",
          "Automated Regression & Validation",
        ],
      },
      { title: "Connectivity & Protocols", items: ["I2C", "SPI", "UART", "CAN", "USB", "BLE", "Ethernet"] },
    ],
  },
  {
    slug: "embedded-firmware",
    pillar: "embedded",
    title: "Embedded Firmware",
    tagline: "Bare-metal and RTOS firmware for ARM, RISC-V and proprietary MCUs.",
    pageTitle: "Embedded Firmware Development",
    description:
      "Bare-metal and RTOS firmware in C and C++ for ARM, RISC-V and proprietary MCUs, built for constrained memory and real-time deadlines.",
    intro: [
      "We write bare-metal and RTOS-based firmware for ARM, RISC-V and proprietary microcontrollers, tuned for tight memory budgets and real-time deadlines.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          "Bare-Metal Firmware",
          "RTOS-Based Firmware",
          "Embedded C & C++",
          "Peripheral & Device Drivers",
          "Low-Level Hardware Bring-Up",
          "Firmware Testing & Validation",
        ],
      },
      { title: "Architectures", items: ["ARM", "RISC-V", "Proprietary MCUs"] },
    ],
  },
  {
    slug: "embedded-linux",
    pillar: "embedded",
    title: "Embedded Linux",
    tagline: "BSP, Yocto, kernel and userspace engineering for Linux platforms.",
    pageTitle: "Embedded Linux Development",
    description:
      "Embedded Linux engineering: BSPs, Yocto and Buildroot images, kernel and driver work, and userspace development for custom hardware platforms.",
    intro: [
      "We bring Linux up on custom hardware and keep it maintainable: board support packages, reproducible builds, kernel work and the userspace your product runs on.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          "Board Support Packages (BSP)",
          "Yocto & Buildroot Images",
          "Board Bring-Up",
          "Kernel Configuration & Development",
          "Linux Device Drivers",
          "Userspace Engineering",
        ],
      },
    ],
  },
  {
    slug: "rtos-development",
    pillar: "embedded",
    title: "RTOS Development",
    tagline: "Deterministic firmware on FreeRTOS, Zephyr, ThreadX and AUTOSAR OS.",
    pageTitle: "RTOS Development",
    description:
      "Deterministic RTOS firmware on FreeRTOS, Zephyr, ThreadX and AUTOSAR OS, configured for reliable real-time behavior on embedded targets.",
    intro: [
      "We build deterministic, real-time firmware on the RTOS that fits your product, configured and validated so tasks meet their deadlines every time.",
    ],
    groups: [
      { title: "Operating Systems", items: ["FreeRTOS", "Zephyr", "ThreadX", "AUTOSAR OS"] },
      {
        title: "Capabilities",
        items: ["RTOS Porting & Configuration", "Task & Scheduler Design", "Custom Schedulers", "Real-Time Performance Validation"],
      },
    ],
  },
  {
    slug: "iot-edge-computing",
    pillar: "embedded",
    title: "IoT & Edge Computing",
    tagline: "End-to-end IoT: device, gateway, cloud and OTA pipelines.",
    pageTitle: "IoT & Edge Computing Solutions",
    description:
      "End-to-end IoT engineering across device, gateway and cloud, with secure connectivity, edge logic and over-the-air (OTA) update pipelines.",
    intro: [
      "We engineer connected products end to end: the device, the gateway, the cloud hand-off and the over-the-air pipeline that keeps them up to date in the field.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          "Device Firmware",
          "Gateway Development",
          "Cloud Integration",
          "OTA Update Pipelines",
          "Secure Connectivity",
          "Sensing & Edge Logic",
        ],
      },
    ],
  },
  {
    slug: "automotive-autosar",
    pillar: "embedded",
    title: "Automotive & AUTOSAR",
    tagline: "AUTOSAR, ISO 26262 and ASPICE compliant automotive software.",
    pageTitle: "Automotive & AUTOSAR Software",
    description:
      "Automotive embedded software for ECUs: AUTOSAR-based development aligned with ISO 26262 functional safety and ASPICE process requirements.",
    intro: [
      "We develop automotive ECU software on AUTOSAR, following ISO 26262 functional safety and ASPICE process requirements from the start.",
    ],
    groups: [
      { title: "Standards", items: ["AUTOSAR", "ISO 26262", "ASPICE"] },
      { title: "Capabilities", items: ["ECU Software Development", "AUTOSAR OS", "CAN Communication"] },
    ],
  },
  {
    slug: "industrial-automation",
    pillar: "embedded",
    title: "Industrial Automation",
    tagline: "Smart solutions for industrial control, monitoring and automation.",
    pageTitle: "Industrial Automation Solutions",
    description:
      "Smart embedded solutions for industrial control, monitoring and automation, from controller firmware and connectivity to testing and validation.",
    intro: [
      "We build the embedded intelligence behind industrial control, monitoring and automation systems: firmware that runs reliably, talks to the plant and is tested before deployment.",
    ],
    groups: [
      {
        title: "Capabilities",
        items: [
          "Industrial Control Firmware",
          "Monitoring & Data Acquisition",
          "Automation Systems",
          "Industrial Connectivity (CAN, Ethernet)",
          "Testing & Validation",
        ],
      },
    ],
  },
  {
    slug: "embedded-ai-ml",
    pillar: "embedded",
    title: "Embedded AI/ML",
    tagline: "On-device AI inference on MCUs, NPUs and FPGAs.",
    pageTitle: "Embedded AI/ML Solutions",
    description:
      "On-device AI inference on MCUs, NPUs and FPGAs: quantized models deployed to edge hardware for fast, private and power-efficient intelligence.",
    intro: [
      "We deploy AI where the data is: quantized models running inference on microcontrollers, NPUs and FPGAs, without a round trip to the cloud.",
    ],
    groups: [
      { title: "Targets", items: ["MCUs", "NPUs", "FPGAs"] },
      { title: "Capabilities", items: ["Model Quantization", "On-Device Inference", "Edge Accelerator Integration"] },
    ],
  },
];

export const domainsFor = (pillar: DomainPillarId) => domains.filter((d) => d.pillar === pillar);
export const domainHref = (d: Pick<Domain, "pillar" | "slug">) => `/services/${d.pillar}/${d.slug}`;

// ── Why choose us ────────────────────────────────────────────────────────────
export const reasons: Reason[] = [
  {
    title: "Experienced Semiconductor Engineers",
    detail: "A team fluent in the full flow, from RTL and verification to analog layout and signoff.",
  },
  {
    title: "Advanced Node Expertise",
    detail: "Hands-on with leading nodes, including TSMC N2/N3/N5, Samsung SF2/SF4 and Intel 18A.",
  },
  {
    title: "End-to-End Design Support",
    detail: "One partner from specification and architecture through tape-out and silicon validation.",
  },
  {
    title: "Flexible Engagement Models",
    detail: "Bring us in for a single block, a complete project or as an extension of your team.",
  },
  {
    title: "High-Quality Deliverables",
    detail: "Clean, reviewed and documented work that holds up at signoff and in your own reviews.",
  },
  {
    title: "Confidential & Secure Development",
    detail: "Your IP stays protected, with strict confidentiality and secure handling of design data.",
  },
  {
    title: "Competitive Pricing",
    detail: "Senior-level engineering at a cost that keeps your program on budget.",
  },
  {
    title: "Fast Turnaround Time",
    detail: "Focused execution and clear milestones that get your products to market faster.",
  },
];

// ── Capabilities (the technology section) ────────────────────────────────────
export const capabilities: CapabilityGroup[] = [
  { category: "Languages & HDLs", items: ["Verilog", "SystemVerilog", "VHDL", "Embedded C", "C++", "Python", "Tcl"] },
  { category: "Verification", items: ["UVM", "SystemVerilog Assertions", "Coverage-driven", "Formal", "Gate-level sim"] },
  { category: "Methodologies", items: ["Constrained-random", "Low-power (UPF)", "DFT & scan", "STA signoff", "Emulation"] },
  { category: "EDA Tools", items: ["Cadence", "Synopsys", "Siemens EDA", "AMD Vivado", "Intel Quartus"] },
  { category: "Advanced Nodes", items: ["TSMC N2 / N3 / N5", "Samsung SF2 / SF4", "Intel 18A"] },
  { category: "Protocols & IP", items: ["AMBA / AXI", "PCIe", "USB", "Ethernet", "DDR", "MIPI"] },
  { category: "Platforms", items: ["FreeRTOS", "Zephyr", "ThreadX", "Embedded Linux", "Yocto", "AUTOSAR"] },
  { category: "Architectures", items: ["ARM", "RISC-V", "x86", "FPGA fabric"] },
];

// ── Industries ───────────────────────────────────────────────────────────────
export const industries: string[] = [
  "Semiconductors & SoCs",
  "Automotive",
  "Industrial Automation",
  "IoT & Edge Computing",
  "AI & Machine Learning",
  "Networking & High-Speed Connectivity",
];

// ── Process ──────────────────────────────────────────────────────────────────
export const processSteps: ProcessStep[] = [
  { title: "Discovery & scoping", description: "We map your requirements, constraints, and schedule into a concrete, de-risked engagement plan." },
  { title: "Architecture & planning", description: "Microarchitecture, verification strategy, and milestones agreed before a line of RTL is written." },
  { title: "Execution & verification", description: "Design and verification run in lockstep, with reviewable milestones and live coverage tracking." },
  { title: "Signoff & handoff", description: "Clean signoff, complete documentation, and a handoff your team can own and extend." },
];

// ── Locations ────────────────────────────────────────────────────────────────
export const locations: Location[] = [
  { city: "Hyderabad", region: "Telangana, India", role: "Headquarters" },
  { city: "Satupally", region: "Telangana, India", role: "Engineering centre" },
];

// ── FAQ (visible on the home page + FAQPage structured data) ─────────────────
// Answers are assembled from the data above so they can never drift from it.
const list = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items[0];
const capabilityItems = (category: string) =>
  capabilities.find((c) => c.category === category)?.items ?? [];

export const faqs: Faq[] = [
  {
    question: "What does Chipzenix do?",
    answer: `${site.intro} VLSI and embedded engineering sit under one roof, from concept to silicon and beyond.`,
  },
  {
    question: "Which VLSI design services does Chipzenix offer?",
    answer: `${list(domainsFor("vlsi").map((d) => d.title))}: silicon design, verification and signoff.`,
  },
  {
    question: "What embedded systems engineering does Chipzenix take on?",
    answer: `${list(domainsFor("embedded").map((d) => d.title))}: firmware, systems and edge intelligence.`,
  },
  {
    question: "Which process nodes does Chipzenix work on?",
    answer: `Our analog layout and implementation work covers advanced nodes including ${list(capabilityItems("Advanced Nodes"))}.`,
  },
  {
    question: "Which industries does Chipzenix work with?",
    answer: `${list(industries)}.`,
  },
  {
    question: "Which EDA tools and languages do your engineers use?",
    answer: `EDA tools: ${list(capabilityItems("EDA Tools"))}. Languages and HDLs: ${list(capabilityItems("Languages & HDLs"))}. Verification is built on ${list(capabilityItems("Verification"))}.`,
  },
  {
    question: "Where is Chipzenix located?",
    answer: `${locations.map((l) => `${l.city} (${l.role?.toLowerCase()})`).join(" and ")}, both in Telangana, India.`,
  },
  {
    question: "How do I start a project with Chipzenix?",
    answer: `Message us on WhatsApp at ${site.contact.whatsappDisplay}, or fill in the contact form, which opens WhatsApp with your enquiry ready to send. Tell us what you're designing and we usually come back within a day.`,
  },
];

// ── Per-page search & share copy ─────────────────────────────────────────────
// Titles stay under ~60 characters and descriptions under ~160 so search results
// and WhatsApp/Telegram/LinkedIn link previews show them in full.
export const pageSeo = {
  home: {
    title: "Chipzenix | VLSI, ASIC & Embedded Systems Engineering",
    description:
      "Semiconductor engineering partner for VLSI design, analog layout, physical design, verification and embedded systems, from concept to silicon.",
    keywords: [
      "semiconductor engineering services",
      "VLSI design services",
      "analog layout services",
      "physical design services",
      "ASIC design company",
      "SoC design services",
      "design verification services",
      "embedded systems engineering",
      "embedded firmware development",
      "VLSI company Hyderabad",
    ],
  },
  services: {
    title: "VLSI & Embedded Engineering Services",
    description:
      "Analog layout, analog circuit, physical design, RTL, DV, STA and DFT, plus embedded firmware, Linux, RTOS, IoT, automotive and edge AI services.",
    keywords: [
      "analog layout services",
      "analog IC design services",
      "physical design services",
      "RTL design services",
      "design verification services",
      "static timing analysis",
      "DFT services",
      "embedded Linux development",
      "AUTOSAR software development",
    ],
  },
  about: {
    title: "About Us",
    description:
      "A technology-driven engineering services company in Hyderabad and Satupally, Telangana, specializing in VLSI, analog layout and embedded systems.",
  },
  careers: {
    title: "Careers in VLSI & Embedded Engineering",
    description:
      "Join Chipzenix: VLSI, verification, physical design and embedded engineering roles in Hyderabad and Satupally, Telangana. Remote-friendly.",
    keywords: ["VLSI jobs Hyderabad", "embedded engineer jobs", "verification engineer jobs", "physical design jobs"],
  },
  contact: {
    title: "Contact Us",
    description: `Start a VLSI, analog layout or embedded engineering project with Chipzenix. Message us on WhatsApp at ${site.contact.whatsappDisplay}, we usually reply within a day.`,
  },
} satisfies Record<string, PageSeo>;

export const domainSeo = (d: Domain): PageSeo => ({ title: d.pageTitle, description: d.description });
