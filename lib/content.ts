import { WHATSAPP_NUMBER } from "./whatsapp";

// ── Types ───────────────────────────────────────────────────────────────────
export type Proposition = { title: string; detail: string };
export type Service = { name: string; description: string };
export type Pillar = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  services: Service[];
};
export type CapabilityGroup = { category: string; items: string[] };
export type ProcessStep = { title: string; description: string };
export type Location = { city: string; region: string; role?: string };
export type Testimonial = { quote: string; name: string; title: string };
export type NavLink = { label: string; href: string };

// ── Site / contact ───────────────────────────────────────────────────────────
export const site = {
  name: "Chipzenix",
  tagline: "Engineering Tomorrow's Silicon",
  taglineLong: "Innovating silicon, delivering excellence, building lasting partnerships.",
  intro:
    "Chipzenix is a semiconductor engineering services company. We design VLSI & ASIC, build embedded systems, and accelerate AI hardware — from architecture to signoff.",
  contact: {
    whatsapp: WHATSAPP_NUMBER,
    whatsappDisplay: "+91 96181 02268",
    email: "hello@chipzenix.com",
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const mission =
  "We accelerate our clients' product roadmaps with semiconductor and embedded engineering they can build a company on.";

export const vision =
  "To be the engineering partner the semiconductor industry trusts to define the next decade of silicon.";

// ── How we work (positioning, not track-record metrics) ──────────────────────
export const propositions: Proposition[] = [
  {
    title: "Under one roof",
    detail:
      "VLSI/ASIC design and embedded systems from a single accountable team — no hand-offs between vendors.",
  },
  {
    title: "Architecture to signoff",
    detail:
      "We own the full flow — RTL and microarchitecture through verification, physical design, and clean signoff.",
  },
  {
    title: "No black boxes",
    detail:
      "Reviewable milestones, live coverage tracking, and documentation your team can own and extend.",
  },
];

// ── Service pillars ──────────────────────────────────────────────────────────
export const pillars: Pillar[] = [
  {
    id: "vlsi",
    title: "VLSI & ASIC",
    tagline: "From RTL to tapeout",
    description:
      "Full-flow digital and analog design — front-end through physical signoff — for ASICs that hit their power, performance, and area targets.",
    services: [
      { name: "RTL Design", description: "Synthesizable Verilog/SystemVerilog written for clean timing, area, and power from the first commit." },
      { name: "Functional Verification", description: "UVM testbenches, assertions, and coverage closure that find bugs long before silicon does." },
      { name: "Design for Testability (DFT)", description: "Scan, MBIST, and boundary-scan insertion for high fault coverage and manufacturable test." },
      { name: "Physical Design (PD)", description: "Floorplanning through place-and-route and ECOs, taken to a clean, routable layout." },
      { name: "Static Timing Analysis (STA)", description: "Multi-corner, multi-mode timing signoff that closes setup, hold, and clock-domain paths." },
      { name: "Layout Design", description: "Full-custom and semi-custom layout with care for matching, parasitics, and DRC/LVS-clean results." },
      { name: "Circuit Design", description: "Transistor-level design of standard cells and custom blocks for target speed, power, and area." },
      { name: "Analog & Mixed-Signal", description: "PLLs, data converters, SerDes, and power management designed across the analog/digital boundary." },
      { name: "FPGA Design", description: "RTL, synthesis, and timing closure on AMD and Intel FPGAs for prototyping and production." },
      { name: "Library Characterization", description: "Liberty timing, power, and noise models characterized across PVT corners." },
      { name: "Signoff & Reliability", description: "IR-drop, electromigration, and physical verification that hold up to foundry signoff decks." },
      { name: "EDA / CAD Automation", description: "Tcl and Python flows that cut runtime and remove manual steps from the design loop." },
    ],
  },
  {
    id: "embedded",
    title: "Embedded Systems",
    tagline: "Where silicon meets software",
    description:
      "Firmware, drivers, and hardware for connected products — built for tight memory, real-time deadlines, and the field.",
    services: [
      { name: "Embedded Firmware", description: "Bare-metal and RTOS firmware in C/C++ tuned for constrained memory and real-time deadlines." },
      { name: "Embedded Linux", description: "Board bring-up, Yocto/Buildroot images, and kernel work for custom hardware." },
      { name: "RTOS Development", description: "FreeRTOS, Zephyr, and custom schedulers configured for deterministic real-time behavior." },
      { name: "IoT Solutions", description: "Connected devices end to end — sensing, edge logic, secure connectivity, and cloud handoff." },
      { name: "Automotive Embedded", description: "AUTOSAR-aligned, functional-safety-aware software for automotive ECUs." },
      { name: "Device Drivers", description: "Drivers and hardware abstraction layers for sensors, displays, and peripherals." },
      { name: "FPGA & SoC Solutions", description: "Hardware/software co-design across FPGA fabric and embedded processors." },
      { name: "Hardware Design", description: "Schematic capture, PCB layout, and bring-up for custom embedded boards." },
      { name: "Connectivity & Protocols", description: "I2C, SPI, UART, CAN, USB, BLE, and Ethernet stacks integrated and validated." },
      { name: "Testing & Validation", description: "Hardware-in-the-loop rigs, automated regression, and compliance testing for embedded targets." },
      { name: "Edge AI & ML", description: "Quantized models deployed to MCUs and edge accelerators for on-device inference." },
    ],
  },
];

// ── Capabilities (the tech arsenal) ──────────────────────────────────────────
export const capabilities: CapabilityGroup[] = [
  { category: "Languages & HDLs", items: ["Verilog", "SystemVerilog", "VHDL", "Embedded C", "C++", "Python", "Tcl"] },
  { category: "Verification", items: ["UVM", "SystemVerilog Assertions", "Coverage-driven", "Formal", "Gate-level sim"] },
  { category: "Methodologies", items: ["Constrained-random", "Low-power (UPF)", "DFT & scan", "STA signoff", "Emulation"] },
  { category: "EDA Tools", items: ["Cadence", "Synopsys", "Siemens EDA", "AMD Vivado", "Intel Quartus"] },
  { category: "Protocols & IP", items: ["AMBA / AXI", "PCIe", "USB", "Ethernet", "DDR", "MIPI"] },
  { category: "Platforms", items: ["RTOS", "Embedded Linux", "FreeRTOS", "Zephyr", "AUTOSAR"] },
  { category: "Architectures", items: ["ARM", "RISC-V", "x86", "FPGA fabric"] },
  { category: "Connectivity", items: ["I2C", "SPI", "UART", "CAN", "BLE", "Wi-Fi"] },
];

// ── Industries ───────────────────────────────────────────────────────────────
export const industries: string[] = [
  "Semiconductor",
  "Automotive",
  "Consumer Electronics",
  "Aerospace",
  "Telecommunications",
  "Healthcare Devices",
  "Industrial Automation",
  "AI & Edge Computing",
];

// ── Process ──────────────────────────────────────────────────────────────────
export const processSteps: ProcessStep[] = [
  { title: "Discovery & scoping", description: "We map your requirements, constraints, and schedule into a concrete, de-risked engagement plan." },
  { title: "Architecture & planning", description: "Microarchitecture, verification strategy, and milestones agreed before a line of RTL is written." },
  { title: "Execution & verification", description: "Design and verification run in lockstep, with reviewable milestones and live coverage tracking." },
  { title: "Signoff & handoff", description: "Clean signoff, complete documentation, and a handoff your team can own and extend." },
];

// ── Testimonials (illustrative — replace with real client quotes) ────────────
export const testimonials: Testimonial[] = [
  {
    quote:
      "Chipzenix executed our 7nm SoC verification flawlessly. Their UVM expertise and discipline meaningfully reduced our schedule risk.",
    name: "Anika Rao",
    title: "VP Engineering, Helix Silicon",
  },
  {
    quote:
      "They took our embedded platform from a flaky prototype to a shipping product. Firmware quality and communication were both exceptional.",
    name: "Daniel Mertens",
    title: "Director of Hardware, Northwind Robotics",
  },
  {
    quote:
      "The physical-design team closed timing on a block we'd fought for months. Clean signoff, complete documentation, zero drama.",
    name: "Priya Nair",
    title: "Silicon Lead, Aether Compute",
  },
];

// ── Locations ────────────────────────────────────────────────────────────────
export const locations: Location[] = [
  { city: "Hyderabad", region: "Telangana, India", role: "Headquarters" },
  { city: "Satupally", region: "Telangana, India", role: "Engineering centre" },
];
