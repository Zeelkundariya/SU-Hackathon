import api from "../api";
import { useEffect, useState } from "react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell, Legend, PieChart, Pie
} from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  LayoutDashboard, Users, Zap, DollarSign, Activity, Settings, Info, Briefcase,
  ShieldCheck, CheckCircle2, Factory, BarChart3, Play,
  Cpu, TrendingUp, Droplets, Wind, Package, Plus, Award,
  ShieldAlert, BrainCircuit, Layers, CheckCircle, Thermometer, Globe, Building2, Database,
  MessageCircle, Video, Wand2, Smartphone, Bot,
  Box, Network, Mic, Droplet, RefreshCcw, Fingerprint, MessageSquare, ArrowRight, Landmark, BookOpen, FileScan, Sparkles, Recycle, Flame,
  Scissors, AlertTriangle, Share2, Calendar, RotateCcw, X, Bell, User, Clock, Map, Layout, Waves, History, FileText, ArrowUpRight, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { agentsData } from "../data/agentsData"; export default function Dashboard() {
  const navigate = useNavigate();
  // --- AI States ---
  // Overview & Ops
  const [delay, setDelay] = useState("");
  const [pei, setPei] = useState(0);
  const [peiTrend, setPeiTrend] = useState([]);
  const [maintenanceScore, setMaintenanceScore] = useState(0);
  const [reliability, setReliability] = useState(0);
  const [digitalMaturity, setDigitalMaturity] = useState(0);
  const [benchmark, setBenchmark] = useState({});
  const [solar, setSolar] = useState({});
  const [workforce, setWorkforce] = useState({});
  const [safety, setSafety] = useState({});
  const [maintenance, setMaintenance] = useState({});

  // Supply Chain
  const [yarnPrice, setYarnPrice] = useState({});
  const [subcontractor, setSubcontractor] = useState({});
  const [season, setSeason] = useState({});
  const [exportScore, setExportScore] = useState(0);
  const [cluster, setCluster] = useState({});
  const [inventoryAlerts, setInventoryAlerts] = useState([]);

  // Sustainability
  const [esg, setEsg] = useState({});
  const [water, setWater] = useState({});
  const [waterTrend, setWaterTrend] = useState([]);
  const [waste, setWaste] = useState({});
  const [heatwave, setHeatwave] = useState({ isHeatwave: false, alert: "", recommendation: "" });
  const [anomaly, setAnomaly] = useState({ hasAnomaly: false, type: "Normal" });
  // Finance & Risk
  const [costOptimization, setCostOptimization] = useState({});
  const [costBreakdown, setCostBreakdown] = useState([]);
  const [creditRisk, setCreditRisk] = useState({});
  const [profit, setProfit] = useState({});
  const [buyerRisk, setBuyerRisk] = useState({});
  const [govSchemes, setGovSchemes] = useState({});

  // Textile Specific
  const [textileMetrics, setTextileMetrics] = useState({});
  const [textileTrend, setTextileTrend] = useState([]);
  const [textileFlow, setTextileFlow] = useState({});
  const [quality, setQuality] = useState({});
  const [yarnOpt, setYarnOpt] = useState({});
  const [laborSkill, setLaborSkill] = useState({});
  const [downtimePrediction, setDowntimePrediction] = useState({});
  const [workflowOpt, setWorkflowOpt] = useState({});
  const [advancedPdM, setAdvancedPdM] = useState({});
  const [manualData, setManualData] = useState(JSON.parse(localStorage.getItem('manualFactoryData')) || {});

  // Interactive Demo States
  const [yarnReordered, setYarnReordered] = useState(false);
  const [yarnLoading, setYarnLoading] = useState(false);

  // WhatsApp Chat Sequence State (0: Initial, 1: Owner Typing, 2: Owner Replied, 3: AI Processing, 4: Done)
  const [waStep, setWaStep] = useState(0);
  const [ownerReply, setOwnerReply] = useState('');
  const [whatsappSuggestions, setWhatsappSuggestions] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [twilioPhone, setTwilioPhone] = useState('');
  const [twilioSent, setTwilioSent] = useState(false);

  // New Conversational Feature States (0: Idle/Alert, 1: Conversation Started, 2: Action Pending, 3: Completed)
  const [yarnState, setYarnState] = useState(0);
  const [truckState, setTruckState] = useState(0);
  const [deadStockState, setDeadStockState] = useState(0);
  const [solarState, setSolarState] = useState(0);
  const [mahaparvState, setMahaparvState] = useState(0);
  const [cottonYarnState, setCottonYarnState] = useState(0); // 0: Idle, 1: Awaiting, 2: Approved
  const [machineHealthState, setMachineHealthState] = useState(0); // 0: Healthy, 1: Dispatched

  // Request ID Tracking
  const [activeRequestIds, setActiveRequestIds] = useState({
    yarn: null,
    truck: null,
    deadStock: null,
    solar: null,
    mahaparv: null,
    cottonYarn: null,
    machineHealth: null,
    whatsapp: null
  });

  // Track Request IDs specifically for the 52 Agent Library core systems
  const [coreRequestIds, setCoreRequestIds] = useState({});

  // Core Agent States (0: Idle, 1: Active/Syncing, 2: Waiting for Owner, 3: Completed)
  const [coreStates, setCoreStates] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  });

  const [lastAgentMsg, setLastAgentMsg] = useState({
    yarn: "Expected 8% price hike in Bhilwara Mandi by Friday.",
    truck: "200 Rolls ready. An empty truck returning to Surat is 5km away.",
    deadStock: '3,000m of rejected "Navy Blue Poly-Cotton" taking up warehouse space.',
    solar: "Loom startup peak detected. Recommend shifting Loom 4 & 5 startup to 12:30 PM.",
    mahaparv: "Wedding season & Navratri scraping predicts 400% surge in specific design demand.",
    core: {
      1: "INITIALIZING BRAHMA KERNEL...",
      2: "ESTABLISHING NEURO-SYNC PATHWAYS...",
      3: "CALCULATING QUANTUM PERMUTATIONS...",
      4: "SYNCING MAHA-ORCHESTRATOR...",
      5: "Pinging Edge Node Bhilwara...",
      6: "Loading NLP Models...",
      7: "Scanning for Resource Conflicts..."
    }
  });

  // --- Dynamic Core Agent Data Engine (Realistic Simulation) ---
  useEffect(() => {
    const generateDynamicData = () => {
      setLastAgentMsg(prev => {
        const newCoreState = { ...prev.core };

        // Only update if the agent is in the idle ("monitoring") state
        if (coreStates[1] === 0) {
          const cpuLoad = (Math.random() * (85 - 30) + 30).toFixed(1);
          const activeNodes = Math.floor(Math.random() * (52 - 45) + 45);
          newCoreState[1] = `[Brahma Kernel] Load: ${cpuLoad}%. Balancing ${activeNodes}/52 sub-agents. Active threads: ${Math.floor(Math.random() * 5000 + 1000)}.`;
        }

        if (coreStates[2] === 0) {
          const packetLoss = (Math.random() * 0.05).toFixed(3);
          const syncRate = Math.floor(Math.random() * (1200 - 800) + 800);
          newCoreState[2] = `[Neuro-Sync] Edge telemetry sync rate: ${syncRate} ops/sec. Packet loss: ${packetLoss}%. Pathway integrity verified.`;
        }

        if (coreStates[3] === 0) {
          const permutations = (Math.random() * (9.5 - 2.1) + 2.1).toFixed(2);
          const currentEff = (Math.random() * (98.9 - 94.2) + 94.2).toFixed(1);
          newCoreState[3] = `[Quantum-Swarm] Evaluating ${permutations}M schedule permutations. Current factory efficiency isolated at ${currentEff}%.`;
        }

        if (coreStates[4] === 0) {
          const cottonIndex = (Math.random() * (102.5 - 98.1) + 98.1).toFixed(2);
          const polyDemand = (Math.random() * (15 - 2) + 2).toFixed(1);
          newCoreState[4] = `[Maha-Orch] Global Cotton Index: ${cottonIndex} (-0.2%). Poly-blend export demand rising by ${polyDemand}% in European markets.`;
        }

        if (coreStates[5] === 0) {
          const latency = (Math.random() * (2.5 - 0.8) + 0.8).toFixed(1);
          const temp = (Math.random() * (35.5 - 28.0) + 28.0).toFixed(1);
          newCoreState[5] = `[Edge Node] Zero-latency safety override active. Floor Node 4 latency: ${latency}ms. Ambient server temp: ${temp}°C.`;
        }

        if (coreStates[6] === 0) {
          const logs = Math.floor(Math.random() * (450 - 100) + 100);
          const confidence = (Math.random() * (99.9 - 92.5) + 92.5).toFixed(1);
          newCoreState[6] = `[NLP Engine] Processing ${logs} rolling Hindi/Mewari voice-logs from shop floor. Transcription confidence: ${confidence}%.`;
        }

        if (coreStates[7] === 0) {
          const locksFree = Math.floor(Math.random() * (1024 - 900) + 900);
          const resolveTime = (Math.random() * (15.5 - 2.1) + 2.1).toFixed(1);
          newCoreState[7] = `[Conflict Resolver] ${locksFree} Mutex locks available. Last resource contention resolved in ${resolveTime}ms. Zero system-lock detected.`;
        } // eslint-disable-line no-unused-vars

        return { ...prev, core: newCoreState };
      });
    };

    const interval = setInterval(generateDynamicData, 4500); // Update every 4.5 seconds
    return () => clearInterval(interval);
  }, [coreStates]);

  // --- Owner Approval Polling ---
  const [activeRequests, setActiveRequests] = useState([]);

  useEffect(() => {
    const pollRequests = async () => {
      try {
        const res = await api.get("/ai/requests");
        const currentRequests = res.data;
        if (Array.isArray(currentRequests)) {
          setActiveRequests(currentRequests);
          currentRequests.forEach(req => {
            if (req.status === 'Approved') {
              if (req._id === activeRequestIds.yarn && yarnState === 2) setYarnState(3);
              if (req._id === activeRequestIds.truck && truckState === 2) setTruckState(3);
              if (req._id === activeRequestIds.deadStock && deadStockState === 2) setDeadStockState(3);
              if (req._id === activeRequestIds.solar && solarState === 2) setSolarState(3);
              if (req._id === activeRequestIds.mahaparv && mahaparvState === 2) setMahaparvState(3);
              if (req._id === activeRequestIds.cottonYarn && cottonYarnState === 1) {
                setCottonYarnState(2);
                setYarnReordered(true);
              }
              if (req._id === activeRequestIds.machineHealth && machineHealthState === 1) {
                setMachineHealthState(2);
                setTicketGenerated(true);
              }
              if (req._id === activeRequestIds.whatsapp && waStep === 1) {
                setWaStep(2);
                setSystemEvents(p => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `WhatsApp AI: Custom Request Approved by Owner.`, type: 'success' }, ...p]);
              }
              // Handle 52 Agent Library (Core Systems)
              Object.keys(coreRequestIds).forEach(agentId => {
                if (req._id === coreRequestIds[agentId] && coreStates[agentId] === 2) {
                  setCoreStates(prev => ({ ...prev, [agentId]: 3 }));
                  setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Core AI: Request Approved. Optimization complete.`, type: 'success' }, ...prev]);
                }
              });
            } else if (req.status === 'Rejected') {
              if (req._id === activeRequestIds.yarn && yarnState === 2) { setYarnState(0); setLastAgentMsg(p => ({ ...p, yarn: "Owner REJECTED the bulk order." })); }
              if (req._id === activeRequestIds.truck && truckState === 2) { setTruckState(0); setLastAgentMsg(p => ({ ...p, truck: "Owner REJECTED the booking." })); }
              if (req._id === activeRequestIds.deadStock && deadStockState === 2) { setDeadStockState(0); setLastAgentMsg(p => ({ ...p, deadStock: "Owner REJECTED the stock liquidation." })); }
              if (req._id === activeRequestIds.solar && solarState === 2) { setSolarState(0); setLastAgentMsg(p => ({ ...p, solar: "Owner REJECTED the energy shift." })); }
              if (req._id === activeRequestIds.mahaparv && mahaparvState === 2) { setMahaparvState(0); setLastAgentMsg(p => ({ ...p, mahaparv: "Owner REJECTED the pattern change." })); }
              if (req._id === activeRequestIds.whatsapp && waStep === 1) {
                setWaStep(3);
                setSystemEvents(p => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'WhatsApp AI: Custom Request REJECTED by Owner.', type: 'warning' }, ...p]);
              }
              // Handle 52 Agent Library Rejections
              Object.keys(coreRequestIds).forEach(agentId => {
                if (req._id === coreRequestIds[agentId] && coreStates[agentId] === 2) {
                  setCoreStates(prev => ({ ...prev, [agentId]: 0 }));
                  setLastAgentMsg(p => ({ ...p, core: { ...p.core, [agentId]: "Owner REJECTED the request." } }));
                }
              });
            }
          });
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    const hasPendingCoreState = Object.values(coreStates).some(s => s === 2);
    if (yarnState === 2 || truckState === 2 || deadStockState === 2 || solarState === 2 || mahaparvState === 2 || waStep === 1 || cottonYarnState === 1 || machineHealthState === 1 || hasPendingCoreState) {
      const interval = setInterval(pollRequests, 3000);
      return () => clearInterval(interval);
    }
  }, [yarnState, truckState, deadStockState, solarState, mahaparvState, waStep, cottonYarnState, machineHealthState, coreStates, activeRequestIds, coreRequestIds]);

  const triggerOwnerRequest = async (agentName, type, details) => {
    try {
      const res = await api.post("/ai/request", { agentName, requestType: type, details });
      setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Signal sent to Owner Command Terminal: ${type}`, type: 'info' }, ...prev]);
      return res.data; // Return the created request object with _id
    } catch (err) {
      console.error("Request error:", err);
      return null;
    }
  };

  // UI States
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotification, setShowNotification] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  // --- New PdM Dynamic States ---
  const [liveSensors, setLiveSensors] = useState({ temp: 72, tempTrend: 2, vibration: 45, vibrationTrend: 5, power: 4.2, pressure: 45, status: 'Running' });
  const [failureTrend, setFailureTrend] = useState([{ time: '24h ago', risk: 10 }, { time: '18h ago', risk: 15 }, { time: '12h ago', risk: 18 }, { time: '6h ago', risk: 22 }, { time: 'Now', risk: 30 }]);
  const [maintenanceDelay, setMaintenanceDelay] = useState(0); // 0 = today
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [shiftSimResult, setShiftSimResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [workOrderStep, setWorkOrderStep] = useState(0); // 0: Idle, 1: Sent, 2: Confirmed
  const [isBudgeting, setIsBudgeting] = useState(false);
  const [budgetApplied, setBudgetApplied] = useState(false);

  // --- Dynamic Dashboard Data ---
  const [fleetData, setFleetData] = useState([
    { name: 'Loom #1 (Primary)', score: 92, status: 'Healthy', color: '#A2CB8B', trend: '+1.2%', id: 'L-01', type: 'Loom' },
    { name: 'Loom #2 (Stenter)', score: 76, status: 'Warning', color: '#1E1E1E', trend: '-2.4%', id: 'S-01', type: 'Stenter' },
    { name: 'Loom #3 (Spinning)', score: 61, status: 'Critical', color: '#1E1E1E', trend: '-8.1%', id: 'W-01', type: 'Warper' },
    { name: 'Loom #4 (Dyeing)', score: 88, status: 'Healthy', color: '#A2CB8B', trend: '+0.5%', id: 'D-01', type: 'Dyeing' },
    { name: 'Warping M/C #1', score: 70, status: 'Warning', color: '#1E1E1E', trend: 'Stable', id: 'F-01', type: 'Finishing' },
    { name: 'Finishing Row B', score: 95, status: 'Healthy', color: '#A2CB8B', trend: '+2.1%', id: 'D-02', type: 'Drying' },
  ]);

  const [ledgerData, setLedgerData] = useState([
    { date: '12 Mar', task: 'Logic Controller Patch', tech: 'System AI', res: 'Optimized' },
    { date: '10 Mar', task: 'Roll Bearing Swap', tech: 'R. Sharma', res: 'Successful' },
  ]);

  const [currentShift, setCurrentShift] = useState(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return 'Morning (06:00 - 14:00)';
    if (hour >= 14 && hour < 22) return 'Evening (14:00 - 22:00)';
    return 'Night (22:00 - 06:00)';
  });

  // Smart Alerts
  const [smartAlerts, setSmartAlerts] = useState([
    { msg: 'Motor vibration increased by 35%', level: 'warning', time: '2m ago', priority: 'High' },
    { msg: 'Belt wear detected (Sector 4)', level: 'warning', time: '15m ago', priority: 'Medium' },
    { msg: 'Loom #4: Lubrication required', level: 'danger', time: 'Just now', priority: 'CRITICAL' }
  ]);

  const [pdMRole, setPdMRole] = useState('Manager');
  const [failureReport, setFailureReport] = useState([
    { id: 'LOOM-04', type: 'Loom', status: 'Critical', failureMode: 'Bearing Fatigue', costOfFailure: 124000, depreciation: '8.2%', costRecovery: 85000, profitGain: 42000, solution: 'Replace ball-bearings & synchronise lubrication.', technicalRisk: 88, uptime: 92 },
    { id: 'DYE-02', type: 'Dyeing', status: 'Warning', failureMode: 'Thermal Instability', costOfFailure: 89000, depreciation: '4.5%', costRecovery: 62000, profitGain: 28000, solution: 'Recalibrate steam-valve timing.', technicalRisk: 45, uptime: 96 },
    { id: 'WARP-01', type: 'Warping', status: 'Optimal', failureMode: 'Tension Drift', costOfFailure: 45000, depreciation: '2.1%', costRecovery: 38000, profitGain: 15000, solution: 'Sync warp-beam speed sensor.', technicalRisk: 12, uptime: 99 },
    { id: 'SPIN-07', type: 'Spinning', status: 'Warning', failureMode: 'Motor Drag', costOfFailure: 72000, depreciation: '5.1%', costRecovery: 25000, profitGain: 12000, solution: 'Replace commutator brushes.', technicalRisk: 62, uptime: 94 }
  ]);

  const [sensorHealth, setSensorHealth] = useState({ online: 18, total: 20, signals: ['Active', 'Active', 'Active', 'Degraded'] });
  const [machineTimers, setMachineTimers] = useState({ A: '124:12:05', B: '89:45:12', C: '12:04:55', D: '00:00:00' });

  useEffect(() => {
    if (activeTab === 'maintenance') {
      const interval = setInterval(() => {
        // Update live sensors logic (existing)
        setLiveSensors(prev => ({
          temp: prev.temp + (Math.random() > 0.5 ? 1 : -1),
          tempTrend: Math.floor(Math.random() * 3),
          vibration: prev.vibration + (Math.random() > 0.5 ? 2 : -2),
          vibrationTrend: Math.floor(Math.random() * 5),
          power: +(prev.power + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1),
          pressure: Math.min(60, Math.max(30, prev.pressure + (Math.random() > 0.5 ? 1 : -1))),
          status: Math.random() > 0.95 ? 'Warning' : 'Running'
        }));

        // Update failure trend (existing)
        setFailureTrend(prev => {
          const next = [...prev];
          next.shift();
          next.push({ time: 'Now', risk: Math.min(100, Math.max(0, Math.floor(prev[prev.length - 1].risk + Math.random() * 8 - 2))) });
          return next;
        });

        // Update IoT health randomly
        setSensorHealth(prev => ({
          ...prev,
          online: Math.random() > 0.9 ? (Math.random() > 0.5 ? 17 : 19) : prev.online
        }));

        // Update Fleet Data Randomly
        setFleetData(prev => prev.map(m => ({
          ...m,
          score: Math.min(100, Math.max(40, m.score + (Math.random() > 0.5 ? 1 : -1))),
          status: (m.score > 85 ? 'Healthy' : m.score > 65 ? 'Warning' : 'Critical'),
          color: (m.score > 85 ? '#A2CB8B' : m.score > 65 ? '#84B179' : '#84B179')
        })));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Interactive Machine Slider State
  const [machineVibration, setMachineVibration] = useState(45);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [pdmSim, setPdmSim] = useState({
    temp: 78,
    ambientTemp: 42,
    acousticFreq: 2.5,
    power: 4.8,
    rpm: 1850,
    humidity: 62,
    dust: 120
  });
  const [userRole, setUserRole] = useState('Owner'); // Admin, Manager, Operator
  const [isAiLearningMode, setIsAiLearningMode] = useState(true);
  const [lang, setLang] = useState('EN'); // EN, HI
  const [executiveSummary, setExecutiveSummary] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [machineStatus, setMachineStatus] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState("");
  const [systemEvents, setSystemEvents] = useState([
    { id: 1, time: '10:42:15', msg: 'AI: Shift 1 Production Optimized (+5.2%)', type: 'info' },
    { id: 2, time: '10:40:02', msg: 'System: Solar Battery grid-sync complete', type: 'success' },
    { id: 3, time: '10:35:44', msg: 'Wear-Audit: Stenter Processor vibration high', type: 'warning' },
    { id: 4, time: '10:30:12', msg: 'Quality: AQL 2.5 Batch-42 passed', type: 'success' },
    { id: 5, time: '10:25:05', msg: 'Alert: Grid power fluctuation detected', type: 'danger' }
  ]);

  // Sync Global Role with PdM Mode
  useEffect(() => {
    if (userRole === 'Manager') setPdMRole('Manager');
    if (userRole === 'Owner') setPdMRole('Owner');
  }, [userRole]);

  useEffect(() => {
    // Check for user-driven data overrides from LocalStorage
    const rawManualData = localStorage.getItem('manualFactoryData');
    const localManualData = rawManualData ? JSON.parse(rawManualData) : null;
    if (localManualData) setManualData(localManualData);

    // Prepare standardized payloads
    const prodPayload = localManualData ? {
      actualOutput: localManualData.actualOutput,
      expectedOutput: localManualData.expectedOutput
    } : {};

    const maintPayload = localManualData ? {
      uptime: localManualData.uptime,
      breakdowns: localManualData.breakdowns,
      daysSince: localManualData.daysSince
    } : {};

    const textilePayload = localManualData ? {
      fabricProduced: localManualData.fabricProducedMeters,
      loomHours: localManualData.loomHours,
      yarnUsed: localManualData.yarnUsedKg
    } : {};

    const financePayload = localManualData ? {
      cost: localManualData.operatingCost,
      price: localManualData.revenue
    } : {};

    const qualityPayload = localManualData ? {
      defects: localManualData.defectsCount,
      totalUnits: localManualData.totalUnitsTested
    } : {};

    /*
     * Phase 4: Winner's Final Final Polish - SaaS & Strategy
     * - [x] Implement Dynamic Role-Based Layouts (Operator/Manager/Owner)
     * - [x] Create "Strategic Intelligence" Tab (SaaS/ESG/Maturity)
     * - [x] Build "Bhilwara Gov-Portal" Section (Local Schemes)
     * - [x] Upgrade "What-If" Tool into interactive Simulation Hub
     * - [x] Final Aesthetic Sweep (Glow effects & Command Center feel)
     */

    // Basic Data
    api.get("/machine/status").then(r => setMachineStatus(r.data));
    api.get("/inventory/alerts").then(r => setInventoryAlerts(r.data));

    // Operations & Overview
    api.post("/ai/delay", { avgOutput: manualData?.actualOutput }).then(r => setDelay(r.data));
    api.post("/ai/efficiency", prodPayload).then(r => {
      setPei(r.data.current);
      if (r.data.trend) setPeiTrend(r.data.trend);
    });
    api.post("/ai/maintenance", {
      uptimeHours: manualData?.uptime,
      breakdowns: manualData?.breakdowns,
      vibration: manualData?.vibration,
      temp: manualData?.temp
    }).then(r => setMaintenance(r.data));
    api.post("/ai/quality", {
      defects: manualData?.defectsCount,
      totalUnits: manualData?.totalUnitsTested,
      gsmDeviation: manualData?.gsmDeviation,
      colorVariance: manualData?.colorVariance,
      shrinkage: manualData?.shrinkage,
      certification: manualData?.certification
    }).then(r => setQuality(r.data));
    api.post("/ai/safety", {
      accidentFreeDays: manualData?.accidentFreeDays,
      ppeComplianceRate: manualData?.ppeCompliance,
      drills: manualData?.safetyDrills,
      hazards: manualData?.unresolvedHazards
    }).then(r => setSafety(r.data));
    api.post("/ai/maintenance-score", maintPayload).then(r => setMaintenanceScore(r.data.score || r.data));
    api.post("/ai/anomaly", { todayValue: manualData?.actualOutput }).then(r => setAnomaly(r.data));
    api.post("/ai/reliability", { uptime: manualData?.uptime }).then(r => setReliability(r.data.availability !== undefined ? r.data.availability : r.data));
    api.post("/ai/digital-maturity", {}).then(r => setDigitalMaturity(r.data.score || r.data));
    api.post("/ai/benchmark", { actualOutput: manualData?.actualOutput }).then(r => setBenchmark(r.data));
    api.post("/ai/power", {
      powerUsed: manualData?.powerConsumedKwh,
      solarContribution: manualData?.solarContribution
    }).then(r => setSolar(r.data));
    api.post("/ai/workforce", { actualOutput: manualData?.actualOutput, workers: manualData?.activeWorkers }).then(r => setWorkforce(r.data));

    // Supply Chain
    api.post("/ai/yarn-price", { yarnPrice: manualData?.yarnPrice }).then(r => setYarnPrice(r.data));
    api.post("/ai/subcontractor", {}).then(r => setSubcontractor(r.data));
    api.post("/ai/seasonal-demand", {}).then(r => setSeason(r.data));
    api.post("/ai/export-score", {}).then(r => setExportScore(r.data.score || r.data));
    api.post("/ai/cluster", {
      actualOutput: manualData?.actualOutput,
      targetOutput: manualData?.expectedOutput
    }).then(r => setCluster(r.data));

    // Sustainability
    api.post("/ai/esg", { wasteKg: manualData?.wasteResaleValue, downtimeHours: (manualData?.breakdowns || 0) * 4 }).then(r => {
      setEsg(r.data);
    });
    api.post("/ai/water", {
      waterUsage: manualData?.waterUsage,
      recycledWater: manualData?.recycledWater
    }).then(r => {
      setWater(r.data);
      if (r.data.trend) setWaterTrend(r.data.trend);
    });
    api.post("/ai/waste", { actualOutput: manualData?.actualOutput }).then(r => setWaste(r.data));
    api.post("/ai/heatwave", {}).then(r => setHeatwave(r.data));

    // Finance
    api.post("/ai/cost-optimization", { actualOutputToday: manualData?.actualOutput }).then(r => {
      setCostOptimization(r.data);
      if (r.data.breakdown) setCostBreakdown(r.data.breakdown);
    });
    api.post("/ai/credit-risk", {}).then(r => setCreditRisk(r.data));
    api.post("/ai/profit", financePayload).then(r => setProfit(r.data));
    api.post("/ai/buyer-risk", {}).then(r => setBuyerRisk(r.data));
    api.post("/ai/gov-schemes", {}).then(r => setGovSchemes(r.data));

    // Textile
    api.post("/ai/textile-metrics", textilePayload).then(r => {
      setTextileMetrics(r.data);
      if (r.data.trend) setTextileTrend(r.data.trend);
    });
    api.post("/ai/textile-flow", {}).then(r => setTextileFlow(r.data));
    api.post("/ai/quality", qualityPayload).then(r => setQuality(r.data));
    api.post("/ai/yarn-optimize", {}).then(r => setYarnOpt(r.data));
    api.post("/ai/labor-skill", { trainingHours: manualData?.trainingHours }).then(r => setLaborSkill(r.data));

    // PS-005 Advanced Automation
    api.post("/ai/predict-downtime", {
      vibration: manualData?.vibration,
      temp: manualData?.temp,
      uptime: manualData?.uptime
    }).then(r => setDowntimePrediction(r.data));

    api.post("/ai/advanced-pdm", {
      vibration: manualData?.vibration,
      temp: manualData?.temp,
      uptime: manualData?.uptime,
      ambientTemp: manualData?.ambientTemp,
      acousticFreq: manualData?.acousticFreq
    }).then(r => setAdvancedPdM(r.data));

    api.post("/ai/optimize-workflow", {
      grey: textileFlow.greyProduced,
      dyed: textileFlow.dyedCompleted,
      finished: textileFlow.finishedCompleted
    }).then(r => setWorkflowOpt(r.data));

    api.post("/ai/executive-summary", prodPayload).then(r => setExecutiveSummary(r.data));
    api.post("/ai/recommendations", maintPayload).then(r => setRecommendations(r.data.actions));
  }, []);

  // NEW: Live PdM Update Hook
  useEffect(() => {
    api.post("/ai/advanced-pdm", {
      vibration: machineVibration,
      temp: pdmSim.temp,
      uptime: manualData?.machineUptime || 98,
      ambientTemp: pdmSim.ambientTemp,
      acousticFreq: pdmSim.acousticFreq,
      powerConsumption: pdmSim.power,
      speedRpm: pdmSim.rpm,
      humidity: pdmSim.humidity,
      dustLevel: pdmSim.dust
    }).then(r => {
      setAdvancedPdM(r.data);
      // Automatically add non-standard recommendations to the list
      if (r.data.recommendation && r.data.recommendation !== "Continue Normal Ops") {
        setRecommendations(prev => {
          if (prev.includes(r.data.recommendation)) return prev;
          return [r.data.recommendation, ...prev];
        });
      }
    });
  }, [machineVibration, pdmSim, manualData?.machineUptime]);

  const renderAgentGrid = (categories, title) => (
    <div className="stat-card" style={{ marginTop: '1.5rem', background: 'rgba(132, 177, 121, 0.05)', border: '1px solid rgba(132, 177, 121, 0.2)' }}>
      <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Bot size={18} color="var(--primary)" /> {title} (From 52 Agent Library)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {agentsData.filter(a => categories.includes(a.category)).map(agent => (
          <div key={typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id} style={{
            background: 'rgba(132, 177, 121,0.02)',
            border: '1px solid rgba(132, 177, 121,0.05)',
            borderRadius: '12px',
            padding: '16px',
            transition: 'all 0.2s',
            cursor: 'default'
          }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(132, 177, 121, 0.05)'; e.currentTarget.style.borderColor = 'rgba(132, 177, 121, 0.3)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(132, 177, 121,0.02)'; e.currentTarget.style.borderColor = 'rgba(132, 177, 121,0.05)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', background: 'rgba(132, 177, 121,0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{typeof agent.category === 'object' ? JSON.stringify(agent.category) : agent.category}</span>
              {agent.status === 'Active' ? <span style={{ color: 'var(--accent)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.5s infinite' }}></div> Active</span> : <span style={{ color: 'var(--warning)', fontSize: '0.7rem' }}>Learning Mode</span>}
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.3 }}>{typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id}. {typeof agent.name === 'object' ? JSON.stringify(agent.name) : agent.name}</div>

            {agent.risk !== 'Low' && agent.risk !== 'N/A' && (
              <div style={{ fontSize: '0.75rem', color: agent.risk.includes('Critical') ? 'var(--danger)' : 'var(--warning)' }}>
                Alert Policy: <strong>{typeof agent.risk === 'object' ? JSON.stringify(agent.risk) : agent.risk}</strong>
              </div>
            )}

            {/* Interactive Logic for Core Systems */}
            {agent.category === 'Core Systems' && (
              <div style={{ marginTop: '12px', borderTop: '1px solid rgba(132, 177, 121,0.05)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.65rem', color: '#1E1E1E', fontStyle: 'italic', marginBottom: '2px', lineHeight: '1.4' }}>
                  {
                    {
                      1: "Master control node balancing 52 sub-agents to prevent system lag.",
                      2: "Central nervous system syncing telemetry between edge looms and cloud.",
                      3: "Calculates global permutations for optimum production schedule.",
                      4: "Global market sync. Adjusts local outputs to real-time demands.",
                      5: "Zero-latency processor for critical machine safety shutdowns.",
                      6: "Translates Hindi/Mewari voice commands into machine code.",
                      7: "Automatically resolves resource conflicts between AI sub-agents."
                    }[agent.id]
                  }
                </div>
                {lastAgentMsg.core[agent.id] && (
                  <div style={{ background: 'rgba(132, 177, 121, 0.1)', padding: '8px', borderRadius: '6px', fontSize: '0.75rem', color: '#1E1E1E', borderLeft: '2px solid var(--primary)' }}>
                    <strong>{agent.name.split(' ')[0]}AI:</strong> {lastAgentMsg.core[agent.id]}
                  </div>
                )}

                {!coreStates[agent.id] && (
                  <button className="btn-primary"
                    style={{ width: '100%', background: 'var(--primary)', border: 'none', color: '#1E1E1E', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                    onClick={() => {
                      setCoreStates(prev => ({ ...prev, [agent.id]: 1 }));
                      const msgs = {
                        1: "Re-balancing agent weights for current shift. Efficiency delta: +2.1%. Proceed?",
                        2: "Detected neural bottleneck in Loom 4 telemetry. Run Neuro-Optimization?",
                        3: "Synchronizing global optimum across all clusters. Resource lock required. Engage?",
                        4: "Export demand rising in Bursa cluster. Sync factory patterns with Global IQ?",
                        5: "Node load high. Offload non-critical telemetry to cloud to reduce local lag?",
                        6: "Processing last 4 hours of Hindi/Mewari logs. Extract actionable insights?",
                        7: "Minor resource overlap between Yarn & Logistics agents. Run Conflict Audit?"
                      };
                      setLastAgentMsg(prev => ({ ...prev, core: { ...prev.core, [agent.id]: msgs[agent.id] } }));
                    }}
                  >
                    Engage Agent
                  </button>
                )}

                {coreStates[agent.id] === 1 && (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn-primary"
                      style={{ flex: 1, background: 'var(--accent)', border: 'none', color: 'black', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                      onClick={() => {
                        setCoreStates(prev => ({ ...prev, [agent.id]: 2 }));
                        triggerOwnerRequest(agent.name.split(' ')[0] + 'AI', 'System Orchestration', lastAgentMsg.core[agent.id]).then(req => {
                          if (req?._id) setCoreRequestIds(p => ({ ...p, [agent.id]: req._id }));
                        });
                      }}
                    >
                      Process Now
                    </button>
                    <button className="btn-primary" style={{ background: 'rgba(132, 177, 121,0.05)', border: 'none', color: '#1E1E1E', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }} onClick={() => setCoreStates(prev => ({ ...prev, [agent.id]: 0 }))}>Hold</button>
                  </div>
                )}

                {coreStates[agent.id] === 2 && (
                  <div style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '0.7rem', fontWeight: '800', padding: '4px', animation: 'pulse 2s infinite' }}>
                    Waiting for Executive Approval... ⏳
                  </div>
                )}

                {coreStates[agent.id] === 3 && (
                  <div style={{ textAlign: 'center', color: '#A2CB8B', fontSize: '0.7rem', fontWeight: '800', padding: '4px' }}>
                    Status: OPTIMIZED ✅
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    // Generate contextual suggestions based on live dashboard state
    const contextualPool = [];
    const randomPool = [
      "Approve overtime for Shift B (Weavers)",
      "Sell 3,000m Navy Blue dead-stock for ₹4.25L",
      "Reject 1500m Substandard Denim Batch #42",
      "Re-program Looms 1-3 for Navratri design surge",
      "Release quarterly bonus for Top 5% Operators",
      "Request QA audit for incoming Cotton stock",
      "Shift export focus to European Poly-blend market",
      "Schedule complete factory deep-clean this Sunday",
      "Release payment for pending Logistics Invoice #892"
    ];

    // Priority 1: Machine Health & Maintenance
    if (machineVibration > 75) {
      contextualPool.push(`Dispatch Tech-Team to Loom (Vib: ${machineVibration}Hz)`);
      contextualPool.push("Approve ₹15k emergency parts for Loom Repair");
    } else if (maintenanceScore < 85) {
      contextualPool.push("Authorize preventative maintenance on Stenter #2");
    }

    // Priority 2: Inventory & Supply Chain
    if (cottonYarnState === 0 || inventoryAlerts.length > 0) {
      contextualPool.push("Order 500kg Cotton from Sharma Suppliers (Fastest)");
      contextualPool.push("Expedite 200kg Poly-blend from RJ Textiles");
    }

    // Priority 3: Energy & Grid
    const hour = new Date().getHours();
    if (hour >= 13 && hour <= 15) { // Afternoon peak
      contextualPool.push("Shift Looms 5-8 to Solar Grid to save power");
      contextualPool.push("Pre-heat DG Sets for expected 2PM grid cut");
    }

    // Combine contextual (high priority) with random filler to always have 3-4 suggestions
    const finalSuggestions = [...contextualPool];

    // Shuffle randompool
    for (let i = randomPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomPool[i], randomPool[j]] = [randomPool[j], randomPool[i]];
    }

    // Fill the rest until we have exactly 3 suggestions
    let i = 0;
    while (finalSuggestions.length < 3 && i < randomPool.length) {
      if (!finalSuggestions.includes(randomPool[i])) {
        finalSuggestions.push(randomPool[i]);
      }
      i++;
    }

    setWhatsappSuggestions(finalSuggestions.slice(0, 3));
  }, [machineVibration, cottonYarnState, maintenanceScore, inventoryAlerts]);

  return (
    <div className="dashboard-container" style={{ display: 'flex', background: '#070b14', minHeight: '100vh', color: '#1E1E1E', overflow: 'hidden' }}>
      {/* Sidebar */}
      <nav className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
        <div className="logo">
          <Factory size={24} />
          <span>SmartFactory AI</span>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: '4px' }}>
            Live: {typeof executiveSummary.pei === 'object' ? JSON.stringify(executiveSummary.pei) : executiveSummary.pei || 0}% Efficiency
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: '4px', marginBottom: '10px' }}>
          <ul className="nav-links">
          <li className={`sidebar-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} />
            {lang === 'EN' ? 'SME Command Center' : 'अवलोकन'}
          </li>

          {(userRole === 'Operator' || userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'operations' ? 'active' : ''}`} onClick={() => setActiveTab('operations')}>
              <Cpu size={18} />
              {lang === 'EN' ? 'Plant Floor' : 'प्लांट फ्लोर'}
            </li>
          )}




          {(userRole === 'Operator' || userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveTab('maintenance')}>
              <Settings size={18} />
              {lang === 'EN' ? `Maintenance (${pdMRole} View)` : `रखरखाव (${pdMRole})`}
            </li>
          )}




          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
              <DollarSign size={20} />
              {lang === 'EN' ? 'Financial KPI' : 'वित्त और जोखिम'}
            </li>
          )}

          {(userRole === 'Operator' || userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'textile' ? 'active' : ''}`} onClick={() => setActiveTab('textile')}>
              <Briefcase size={18} />
              {lang === 'EN' ? 'Textile Operations' : 'वस्त्र विशेष'}
            </li>
          )}




          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => setActiveTab('strategy')}>
              <TrendingUp size={20} />
              {lang === 'EN' ? 'Strategic Intelligence' : 'रणनीतिक बुद्धिमत्ता'}
            </li>
          )}

          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'agents' ? 'active' : ''}`} onClick={() => setActiveTab('agents')}>
              <Bot size={20} />
              {lang === 'EN' ? 'AI Agent Library (52)' : 'एजंट लाइब्रेरी'}
            </li>
          )}

          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'gov' ? 'active' : ''}`} onClick={() => setActiveTab('gov')} style={{ color: '#0ea5e9' }}>
              <Factory size={18} />
              {lang === 'EN' ? 'Bhilwara Gov-Portal' : 'भीलवाड़ा सरकार पोर्टल'}
            </li>
          )}



        </ul>
      </div>

        <div className="sidebar-footer" style={{ 
          padding: '1rem', 
          borderTop: '1px solid var(--border)', 
          marginTop: 'auto', 
          flexShrink: 0,
          background: 'rgba(255,255,255,0.9)',
          zIndex: 10
        }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '800', letterSpacing: '1px' }}>SYSTEM ACCESS</div>

          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              style={{
                width: '100%',
                background: '#162436',
                color: '#fff',
                border: 'none',
                padding: '10px 16px', // Reduced padding
                borderRadius: '30px', // Adjusted radius
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)', // Subtler shadow
                transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1rem' }}> {/* Smaller icon */}
                  {userRole === 'Owner' ? '👑' : userRole === 'Manager' ? '📊' : '👷'}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {userRole === 'Owner' ? 'STRATEGIC' : userRole === 'Manager' ? 'MANAGER' : 'OPERATOR'}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {userRole === 'Owner' ? 'OWNER' : 'DASHBOARD'}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} style={{ transform: isRoleOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s', opacity: 0.8 }} />
            </button>

            {isRoleOpen && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                width: '100%',
                background: '#1B2A41',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                zIndex: 1000,
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {[
                  { id: 'Operator', label: 'OPERATOR VIEW', icon: '👷' },
                  { id: 'Manager', label: 'MANAGER DASHBOARD', icon: '📊' },
                  { id: 'Owner', label: 'STRATEGIC OWNER', icon: '👑' }
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      setUserRole(option.id);
                      if (option.id === 'Manager') setPdMRole('Manager');
                      if (option.id === 'Owner') setPdMRole('Owner');
                      setIsRoleOpen(false);
                    }}
                    style={{
                      padding: '12px 18px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: userRole === option.id ? '#3b82f6' : 'transparent',
                      transition: '0.2s',
                    }}
                    onMouseOver={(e) => { if (userRole !== option.id) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseOut={(e) => { if (userRole !== option.id) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span>{option.icon}</span>
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>AI Learning</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: '#D9B091', borderRadius: '50%' }}></div>
              <div
                style={{ width: '32px', height: '18px', background: isAiLearningMode ? '#162436' : '#E2E8F0', borderRadius: '10px', position: 'relative', transition: '0.3s', cursor: 'pointer' }}
                onClick={() => setIsAiLearningMode(!isAiLearningMode)}
              >
                <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: isAiLearningMode ? '17px' : '3px', transition: '0.3s', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Interface</span>
            <button
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              style={{
                cursor: 'pointer',
                background: '#fff',
                border: '1px solid #cbd5e1',
                color: '#1e293b',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: '800',
                minWidth: '40px'
              }}
            >
              {lang}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="welcome-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span className="badge" style={{ background: 'var(--primary)', color: '#1E1E1E', padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '1px' }}>
                {userRole.toUpperCase()} ACCESS
              </span>
              {userRole === 'Owner' && <span className="badge" style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', border: '1px solid #eab308' }}>PREMIUM ROLE</span>}
            </div>
            <h1>{lang === 'EN' ? `Welcome, ${userRole === 'Owner' ? 'Strategic Owner' : userRole}` : `${userRole === 'Owner' ? 'रणनीतिक मालिक' : userRole} का स्वागत है`}</h1>
            <p>{lang === 'EN' ? 'Real-time intelligence and AI-driven optimization' : 'रीयल-टाइम इंटेलिजेंस और एआई-संचालित अनुकूलन'}</p>
          </div>
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className={`btn-primary ${isSimulating ? 'pulse-heavy' : ''}`}
              disabled={isSimulating}
              onClick={() => {
                setIsSimulating(true);
                const shiftOutput = manualData?.actualOutput || 80;
                api.post("/ai/simulate", {
                  outputPerShift: shiftOutput,
                  shifts: 3,
                  deadlineDays: 5
                })
                  .then(r => {
                    setSimulation(r.data.result);
                    setTimeout(() => setIsSimulating(false), 2000);
                  })
                  .catch(err => {
                    alert("Simulation error: " + err.message);
                    setIsSimulating(false);
                  });
              }}
            >
              <Play size={16} style={{ marginRight: '8px' }} />
              {isSimulating ? 'AI PROCESSING...' : 'Simulate Shift'}
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            <div className="executive-banner" style={{ background: 'linear-gradient(135deg, #84B179 0%, #E8F5BD 100%)', padding: '2.5rem', borderRadius: '1.5rem', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>TexTech Intelligence Hub</h2>
                <p style={{ color: 'rgba(132, 177, 121,0.8)', maxWidth: '700px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  The factory is performing at <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{typeof pei === 'object' ? JSON.stringify(pei) : pei}%</span> efficiency.
                  AI predicts <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{String(delay || "").includes('High') ? 'moderate' : 'zero'}</span> disruption risk in the current production cycle.
                </p>
                <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem' }}>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>PLANT HEALTH</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800' }}>{typeof maintenanceScore === 'object' ? JSON.stringify(maintenanceScore) : maintenanceScore}%</div>
                  </div>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>LIVE ALERTS</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: inventoryAlerts.length > 0 ? 'var(--danger)' : 'white' }}>{typeof inventoryAlerts.length === 'object' ? JSON.stringify(inventoryAlerts.length) : inventoryAlerts.length}</div>
                  </div>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>RELIABILITY</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)' }}>{typeof reliability === 'object' ? JSON.stringify(reliability) : reliability}%</div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.15 }}></div>
              <div style={{ position: 'absolute', left: '40%', bottom: '-50px', width: '250px', height: '250px', background: 'var(--accent)', filter: 'blur(80px)', opacity: 0.1 }}></div>
            </div>

            {/* FEATURE: Executive Summary Panel (Big Impression) */}
            <div className="alert alert-info" style={{
              marginBottom: '2rem',
              border: 'none',
              background: 'linear-gradient(135deg, rgba(132, 177, 121, 0.1) 0%, rgba(132, 177, 121, 0.1) 100%)',
              borderLeft: '4px solid var(--primary)',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary)', color: '#1E1E1E', padding: '12px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(132, 177, 121, 0.3)' }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '4px' }}>Executive Strategy Summary</h2>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: '1.4' }}>
                    {typeof executiveSummary.summary === 'object' ? JSON.stringify(executiveSummary.summary) : executiveSummary.summary || "Analyzing plant telemetry... Overall production is stable with a 12% projected growth in net margin this month. Workforce skill index in Bhilwara cluster is up by 4%."}
                  </p>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
                  <div className="pulse" style={{ width: '8px', height: '8px', background: pei > 80 ? 'var(--accent)' : 'var(--danger)', borderRadius: '50%' }}></div>
                </div>
                <div className="stat-header">
                  <div className="stat-icon"><Activity size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(162, 203, 139, 0.1)', color: 'var(--accent)' }}>AI REAL-TIME</span>
                </div>
                <div className="stat-value">{typeof pei === 'object' ? JSON.stringify(pei) : pei || 0}%</div>
                <div className="stat-label">Production Efficiency Index</div>
              </div>

              {/* FEATURE: AI Anomaly Detection */}
              <div className="stat-card" style={{ border: anomaly.hasAnomaly ? '1px solid var(--danger)' : '1px solid rgba(132, 177, 121,0.05)' }}>
                <div className="stat-header">
                  <div className="stat-icon" style={{ color: anomaly.hasAnomaly ? 'var(--danger)' : 'var(--accent)' }}>
                    <ShieldAlert size={20} />
                  </div>
                  <span className="badge" style={{ background: anomaly.hasAnomaly ? 'rgba(239, 68, 68, 0.1)' : 'rgba(162, 203, 139, 0.1)', color: anomaly.hasAnomaly ? 'var(--danger)' : 'var(--accent)' }}>
                    {anomaly.hasAnomaly ? 'ANOMALY DETECTED' : 'SECURE'}
                  </span>
                </div>
                <div className="stat-value">{typeof anomaly.type === 'object' ? JSON.stringify(anomaly.type) : anomaly.type || 'Normal'}</div>
                <div className="stat-label">AI Anomaly Monitor</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon"><ShieldCheck size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(132, 177, 121, 0.1)', color: 'var(--primary)' }}>PREDICTIVE</span>
                </div>
                <div className="stat-value">{typeof reliability === 'object' ? JSON.stringify(reliability) : reliability || 0}%</div>
                <div className="stat-label">System Reliability Score</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon"><Zap size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>RISK LEVEL</span>
                </div>
                <div className="stat-value">{String(delay || "").includes('High') ? 'Elevated' : 'Stable'}</div>
                <div className="stat-label">Delivery Delay Prediction</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon"><Briefcase size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(132, 177, 121, 0.1)', color: '#1E1E1E' }}>STRATEGIC</span>
                </div>
                <div className="stat-value">{typeof digitalMaturity === 'number' ? digitalMaturity : (digitalMaturity?.score || 0)}/100</div>
                <div className="stat-label">MSME Digital Maturity</div>
              </div>

              {/* RESTORED: Local Yarn Predictor */}
              <div className="stat-card" style={{ border: '1px solid rgba(162, 203, 139, 0.3)', background: 'linear-gradient(180deg, rgba(6, 78, 59, 0.4) 0%, rgba(2, 44, 34, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A2CB8B', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <TrendingUp size={14} /> Local Yarn Predictor
                  </div>
                  <span className="badge" style={{ background: 'rgba(162, 203, 139, 0.15)', color: '#A2CB8B', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(162, 203, 139, 0.3)' }}>7-DAY FORECAST</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#A2CB8B', marginBottom: '8px' }}>Buy Signal: Cotton</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#1E1E1E', borderLeft: '3px solid #A2CB8B' }}>
                    <strong>YarnAI:</strong> {lastAgentMsg.yarn}
                  </div>

                  {yarnState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#A2CB8B', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setYarnState(1);
                        setLastAgentMsg(prev => ({ ...prev, yarn: "Mandi prices are rising. 500kg order will save ₹12,000 if placed now. Shall I draft the PO?" }));
                      }}
                    >Negotiate with Mandi</button>
                  )}

                  {yarnState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#A2CB8B', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setYarnState(2);
                          setLastAgentMsg(prev => ({ ...prev, yarn: "Proposed PO: 500kg. Waiting for Owner Approval in Command Terminal..." }));
                          const req = await triggerOwnerRequest('YarnAI', 'Purchase Order', 'Order 500kg Cotton Yarn from Sharma Suppliers at ₹240/kg.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, yarn: req._id }));
                        }}
                      >Request Approval</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(132, 177, 121,0.1)', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setYarnState(0)}>Wait</button>
                    </div>
                  )}

                  {yarnState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: '#84B179', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#84B179', borderRadius: '50%' }}></div>
                      Waiting for Owner...
                    </div>
                  )}

                  {yarnState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(162, 203, 139, 0.2)', borderRadius: '6px', color: '#A2CB8B', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Approved & Finalized ✅
                    </div>
                  )}
                </div>
              </div>

              {/* RESTORED: AI Mahaparv Swarm */}
              <div className="stat-card" style={{ border: '1px solid rgba(236, 72, 153, 0.3)', background: 'linear-gradient(180deg, rgba(131, 24, 67, 0.4) 0%, rgba(76, 29, 149, 0.6) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Activity size={14} /> AI 'Mahaparv' Swarm
                  </div>
                  <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(236, 72, 153, 0.3)' }}>CULTURAL PEAK</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f472b6', marginBottom: '8px' }}>Dobby Weave Surge</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(244, 114, 182, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#1E1E1E', borderLeft: '3px solid #f472b6' }}>
                    <strong>SwarmAI:</strong> {lastAgentMsg.mahaparv}
                  </div>

                  {mahaparvState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#ec4899', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setMahaparvState(1);
                        setLastAgentMsg(prev => ({ ...prev, mahaparv: "I can re-program Looms 1-3 to the wedding design set. Expected revenue increase: ₹1.8L. Execute shift?" }));
                      }}
                    >Analyze Demand</button>
                  )}

                  {mahaparvState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#ec4899', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setMahaparvState(2);
                          setLastAgentMsg(prev => ({ ...prev, mahaparv: "Requesting Pattern Shift approval from Owner Terminal..." }));
                          const req = await triggerOwnerRequest('SwarmAI', 'Pattern Shift', 'Re-program Looms 1-3 to Dobby Weave for wedding season surge.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, mahaparv: req._id }));
                        }}
                      >Request Shift</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(132, 177, 121,0.1)', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setMahaparvState(0)}>Later</button>
                    </div>
                  )}

                  {mahaparvState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '6px', color: '#f472b6', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#f472b6', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {mahaparvState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '6px', color: '#f472b6', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Shift Approved 🌸
                    </div>
                  )}
                </div>
              </div>

              {/* Redesigned Cotton Yarn */}
              <div className="stat-card" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(180deg, rgba(69, 10, 10, 0.4) 0%, rgba(199, 234, 187, 0.6) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Zap size={14} /> Low Material Alert
                  </div>
                  <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#1E1E1E', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(239, 68, 68, 0.3)' }}>LOW MATERIAL</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1E1E', marginBottom: '8px' }}>Cotton Yarn</div>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0, marginBottom: '1rem', lineHeight: 1.4, flex: 1, color: '#1E1E1E' }}>Stock depletion in 2 days</p>
                <button
                  className="btn-primary"
                  style={{ width: '100%', background: cottonYarnState === 2 ? 'var(--accent)' : cottonYarnState === 1 ? 'rgba(59, 130, 246, 0.2)' : '#84B179', fontSize: '0.8rem', padding: '8px', border: cottonYarnState === 1 ? '1px solid #84B179' : 'none', color: cottonYarnState === 1 ? '#84B179' : 'white', cursor: (cottonYarnState === 2 || cottonYarnState === 1) ? 'default' : 'pointer', borderRadius: '6px', fontWeight: 'bold', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  disabled={cottonYarnState === 2 || cottonYarnState === 1 || yarnLoading}
                  onClick={async () => {
                    setCottonYarnState(1);
                    const req = await triggerOwnerRequest('InventoryAI', 'Material Reorder', 'Auto-reorder 500kg Cotton Yarn due to low stock alert.');
                    if (req?._id) setActiveRequestIds(prev => ({ ...prev, cottonYarn: req._id }));
                  }}
                >
                  {cottonYarnState === 1 ? (
                    <>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#84B179', borderRadius: '50%' }}></div>
                      Waiting for Owner...
                    </>
                  ) : cottonYarnState === 2 ? 'Material Ordered ✅' : 'Auto-Reorder Material'}
                </button>
              </div>

              {/* RESTORED: Empty-Truck Matchmaker */}
              <div className="stat-card" style={{ border: '1px solid rgba(59, 130, 246, 0.3)', background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.4) 0%, rgba(23, 37, 84, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#84B179', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Layers size={14} /> Empty-Truck Matchmaker
                  </div>
                  <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#84B179', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(59, 130, 246, 0.3)' }}>LOGISTICS</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#84B179', marginBottom: '8px' }}>Surat Route: 40% Off</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#1E1E1E', borderLeft: '3px solid #84B179' }}>
                    <strong>LogisticsAI:</strong> {lastAgentMsg.truck}
                  </div>

                  {truckState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#84B179', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setTruckState(1);
                        setLastAgentMsg(prev => ({ ...prev, truck: "I have 200 rolls ready. Negotiating ₹14,500 rate with driver MH-09. Book now?" }));
                      }}
                    >Contact Driver</button>
                  )}

                  {truckState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#84B179', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setTruckState(2);
                          setLastAgentMsg(prev => ({ ...prev, truck: "Truck Request sent to Owner Terminal. Rate: ₹14,500." }));
                          const req = await triggerOwnerRequest('LogisticsAI', 'Truck Booking', 'Book empty return-truck MH-09 for Surat delivery at ₹14,500.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, truck: req._id }));
                        }}
                      >Request Booking</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(132, 177, 121,0.1)', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setTruckState(0)}>Decline</button>
                    </div>
                  )}

                  {truckState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: '#84B179', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#84B179', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {truckState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '6px', color: '#84B179', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Booking Approved 🚚
                    </div>
                  )}
                </div>
              </div>

              {/* NEW: Textile Quality Pulse */}
              <div className="stat-card" style={{ border: '1px solid rgba(236, 72, 153, 0.3)', background: 'linear-gradient(180deg, rgba(80, 7, 36, 0.6) 0%, rgba(30, 5, 20, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Scissors size={14} /> AI Textile Quality Pulse
                  </div>
                  <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(236, 72, 153, 0.3)' }}>QUALITY AI</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ec4899', marginBottom: '8px' }}>Risk: {advancedPdM.textileInsights?.yarnBreakageRisk || 'Low'}</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(236, 72, 153, 0.05)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#1E1E1E' }}>
                    <strong>QualityAI:</strong> {advancedPdM.textileInsights?.yarnBreakageRisk === 'High'
                      ? "High humidity/dust detected. Risk of yarn snapping is 85%. Adjust HVAC immediately."
                      : "Environment optimal. Fabric defect probability at minimal 0.4%."}
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.8 }}>
                    <span>Defect Prob: {advancedPdM.textileInsights?.fabricDefectProb || '0.4%'}</span>
                    <span>Dust Level: {pdmSim.dust}µg</span>
                  </div>
                </div>
              </div>

              {/* RESTORED: AI Dead-Stock Liquidator */}
              <div className="stat-card" style={{ border: '1px solid rgba(132, 177, 121, 0.3)', background: 'linear-gradient(180deg, rgba(66, 32, 6, 0.6) 0%, rgba(30, 10, 0, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E1E1E', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <ArrowRight size={14} /> AI Dead-Stock Liquidator
                  </div>
                  <span className="badge" style={{ background: 'rgba(132, 177, 121, 0.15)', color: '#1E1E1E', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(132, 177, 121, 0.3)' }}>REVENUE</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E1E1E', marginBottom: '8px' }}>₹4.5L Trapped Inventory</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(132, 177, 121, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#1E1E1E', borderLeft: '3px solid #84B179' }}>
                    <strong>LiquidityAI:</strong> {lastAgentMsg.deadStock}
                  </div>

                  {deadStockState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#84B179', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setDeadStockState(1);
                        setLastAgentMsg(prev => ({ ...prev, deadStock: "I found 3 buyers in Surat interested in this Poly-Cotton batch. Current best bid: ₹4.25L. Accept?" }));
                      }}
                    >Find Buyers</button>
                  )}

                  {deadStockState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#84B179', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setDeadStockState(2);
                          setLastAgentMsg(prev => ({ ...prev, deadStock: "Sent bid of ₹4.25L to Owner Portal for final sign-off." }));
                          const req = await triggerOwnerRequest('LiquidityAI', 'Stock Liquidation', 'Sell 3,000m rejected Navy Blue stock to Surat buyer for ₹4.25L.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, deadStock: req._id }));
                        }}
                      >Request Sell</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(132, 177, 121,0.1)', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setDeadStockState(0)}>Wait</button>
                    </div>
                  )}

                  {deadStockState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(132, 177, 121, 0.1)', borderRadius: '6px', color: '#1E1E1E', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(132, 177, 121, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#84B179', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {deadStockState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(132, 177, 121, 0.2)', borderRadius: '6px', color: '#1E1E1E', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Liquidation Approved ✅
                    </div>
                  )}
                </div>
              </div>

              {/* RESTORED: Solar-Grid Load Shifter */}
              <div className="stat-card" style={{ border: '1px solid rgba(234, 179, 8, 0.3)', background: 'linear-gradient(180deg, rgba(66, 32, 6, 0.4) 0%, rgba(20, 10, 0, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fde047', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Sparkles size={14} /> Solar-Grid Load Shifter
                  </div>
                  <span className="badge" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(234, 179, 8, 0.3)' }}>ENERGY SAVE</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#eab308', marginBottom: '8px' }}>Peak Solar: 3.2kW</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#1E1E1E', borderLeft: '3px solid #eab308' }}>
                    <strong>EnergyAI:</strong> {lastAgentMsg.solar}
                  </div>

                  {solarState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setSolarState(1);
                        setLastAgentMsg(prev => ({ ...prev, solar: "Grid prices are spiking. Shifting 4 high-torque looms to solar grid will save ₹2,400 today. Align?" }));
                      }}
                    >Check Savings</button>
                  )}

                  {solarState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setSolarState(2);
                          setLastAgentMsg(prev => ({ ...prev, solar: "Energy shift proposal sent to Owner Command Terminal." }));
                          const req = await triggerOwnerRequest('EnergyAI', 'Energy Grid Shift', 'Shift high-torque looms (4, 5, 8, 9) to solar grid to save ₹2,400.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, solar: req._id }));
                        }}
                      >Request Shift</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(132, 177, 121,0.1)', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setSolarState(0)}>Ignore</button>
                    </div>
                  )}

                  {solarState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '6px', color: '#eab308', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(234, 179, 8, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#eab308', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {solarState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '6px', color: '#eab308', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Grid Shift Approved ⚡
                    </div>
                  )}
                </div>
              </div>

              {/* NEW INTERACTIVE FEATURE: Machine Health Slider */}
              <div className="stat-card" style={{ borderLeft: `4px solid ${machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)'}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="stat-header">
                  <div className="stat-icon" style={{ color: machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)' }}><Activity size={20} /></div>
                  <span className="badge" style={{ background: machineVibration > 85 ? 'rgba(239, 68, 68, 0.1)' : machineVibration > 65 ? 'rgba(132, 177, 121, 0.1)' : 'rgba(162, 203, 139, 0.1)', color: machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)' }}>
                    {machineVibration > 85 ? 'CRITICAL' : machineVibration > 65 ? 'WARNING' : 'HEALTHY'}
                  </span>
                </div>
                <div className="stat-value" style={{ color: machineVibration > 85 ? 'var(--danger)' : '#f1f5f9' }}>{typeof machineVibration === 'object' ? JSON.stringify(machineVibration) : machineVibration} Hz</div>
                <div className="stat-label">Loom Vibration Frequency (Live Drag)</div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={typeof machineVibration === 'object' ? JSON.stringify(machineVibration) : machineVibration}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setMachineVibration(val);
                    if (val > 85 && machineHealthState === 0) {
                      setMachineHealthState(1);
                      triggerOwnerRequest('MaintenanceAI', 'Emergency Repair', `CRITICAL: Loom Vibration spiked to ${val}Hz. Dispatched technician requested.`).then(req => {
                        if (req?._id) setActiveRequestIds(p => ({ ...p, machineHealth: req._id }));
                      });
                    }
                  }}
                  style={{ width: '100%', marginTop: '1rem', accentColor: machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)', cursor: 'ew-resize' }}
                />
                {machineHealthState === 1 && (
                  <div style={{ marginTop: '10px', textAlign: 'center', padding: '6px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', color: '#1E1E1E', fontWeight: 'bold', fontSize: '0.7rem', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <div className="pulse" style={{ width: '8px', height: '8px', background: '#84B179', borderRadius: '50%' }}></div>
                    Emergency Request Sent to Owner
                  </div>
                )}
                {machineHealthState === 2 && (
                  <div style={{ marginTop: '10px', textAlign: 'center', padding: '6px', background: 'rgba(162, 203, 139, 0.2)', borderRadius: '6px', color: '#A2CB8B', fontWeight: 'bold', fontSize: '0.7rem' }}>
                    Technician Dispatched ✅
                  </div>
                )}
              </div>
            </div>

            {/* NEW: Simulation Control Hub (Interactive Demo) */}
            <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(14, 165, 233, 0.1), transparent)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}>
                <Cpu size={22} /> PdM Simulation Hub
              </h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Adjust real-time sensor inputs to see how the AI responds to different conditions (Bhilwara heat, acoustic anomalies, etc).
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', display: 'block', marginBottom: '8px', color: '#1E1E1E' }}>CORE MACHINE TEMP: {pdmSim.temp}°C</label>
                  <input
                    type="range" min="40" max="110"
                    value={pdmSim.temp}
                    onChange={(e) => setPdmSim({ ...pdmSim, temp: parseInt(e.target.value) })}
                    style={{ width: '100%', accentcolor: '#1E1E1E' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', display: 'block', marginBottom: '8px', color: '#1E1E1E' }}>AMBIENT HEAT: {pdmSim.ambientTemp}°C</label>
                  <input
                    type="range" min="30" max="55"
                    value={pdmSim.ambientTemp}
                    onChange={(e) => setPdmSim({ ...pdmSim, ambientTemp: parseInt(e.target.value) })}
                    style={{ width: '100%', accentcolor: '#1E1E1E' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', display: 'block', marginBottom: '8px', color: '#1E1E1E' }}>SPEED (RPM): {pdmSim.rpm}</label>
                  <input
                    type="range" min="500" max="3000" step="10"
                    value={pdmSim.rpm}
                    onChange={(e) => setPdmSim({ ...pdmSim, rpm: parseInt(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', display: 'block', marginBottom: '8px', color: '#1E1E1E' }}>POWER: {pdmSim.power} kW</label>
                  <input
                    type="range" min="1" max="15" step="0.1"
                    value={pdmSim.power}
                    onChange={(e) => setPdmSim({ ...pdmSim, power: parseFloat(e.target.value) })}
                    style={{ width: '100%', accentColor: '#f1f5f9' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', display: 'block', marginBottom: '8px', color: '#1E1E1E' }}>ACOUSTIC FREQ: {pdmSim.acousticFreq} kHz</label>
                  <input
                    type="range" min="1" max="15" step="0.1"
                    value={pdmSim.acousticFreq}
                    onChange={(e) => setPdmSim({ ...pdmSim, acousticFreq: parseFloat(e.target.value) })}
                    style={{ width: '100%', accentColor: '#ec4899' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: '800', display: 'block', marginBottom: '4px', color: '#1E1E1E' }}>HUMIDITY %</label>
                    <input
                      type="range" min="20" max="95"
                      value={pdmSim.humidity}
                      onChange={(e) => setPdmSim({ ...pdmSim, humidity: parseInt(e.target.value) })}
                      style={{ width: '100%', accentColor: '#38bdf8' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: '800', display: 'block', marginBottom: '4px', color: '#1E1E1E' }}>DUST LEVEL</label>
                    <input
                      type="range" min="50" max="800"
                      value={pdmSim.dust}
                      onChange={(e) => setPdmSim({ ...pdmSim, dust: parseInt(e.target.value) })}
                      style={{ width: '100%', accentcolor: '#1E1E1E' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-container">
                <h3 className="section-title">Production Efficiency Trend (7D)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={peiTrend.length > 0 ? peiTrend : [
                    { name: 'Mon', pei: 82 }, { name: 'Tue', pei: 85 }, { name: 'Wed', pei: 83 },
                    { name: 'Thu', pei: 88 }, { name: 'Fri', pei: 84 }, { name: 'Sat', pei: 86 }, { name: 'Sun', pei: 84 },
                  ]}>
                    <defs>
                      <linearGradient id="colorPei" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={typeof 0.3 === 'object' ? JSON.stringify(0.3) : 0.3} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#84B179" />
                    <YAxis stroke="#84B179" domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip contentStyle={{ background: '#E8F5BD', border: '1px solid #334155', borderRadius: '8px' }} itemStyle={{ color: '#1E1E1E' }} />
                    <Area type="monotone" dataKey="pei" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPei)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="section-title">Factory Risk Heatmap</h3>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[...Array(9)].map((_, i) => {
                    // Dynamic Zone Logic
                    const zones = ['Prod-A', 'Prod-B', 'Logistics', 'Supply', 'Core', 'QA', 'Energy', 'Labor', 'IT'];

                    let bgCol = 'rgba(5, 150, 105, 0.6)'; // Default Healthy Green
                    let lbl = 'Healthy';

                    // Zone 0: Prod-A (Tied to Vibration Slider)
                    if (i === 0) {
                      if (machineVibration > 85) { bgCol = 'rgba(153, 27, 27, 0.6)'; lbl = 'CRITICAL'; }
                      else if (machineVibration > 65) { bgCol = 'rgba(217, 119, 6, 0.6)'; lbl = 'Warning'; }
                      else { bgCol = 'rgba(6, 95, 70, 0.6)'; lbl = 'Stable'; }
                    }
                    // Zone 3: Supply (Tied to Yarn)
                    else if (i === 3) {
                      if (yarnReordered) { bgCol = 'rgba(5, 150, 105, 0.6)'; lbl = 'Healthy'; }
                      else { bgCol = 'rgba(217, 119, 6, 0.6)'; lbl = 'Low Stock'; }
                    }
                    // Zone 6: Energy (Also tied to Vibration friction)
                    else if (i === 6) {
                      if (machineVibration > 85) { bgCol = 'rgba(153, 27, 27, 0.6)'; lbl = 'Spike'; }
                      else { bgCol = 'rgba(6, 95, 70, 0.6)'; lbl = 'Stable'; }
                    }
                    else {
                      // Static background for others to look real
                      const randStates = [
                        { c: 'rgba(6, 95, 70, 0.6)', l: 'Stable' }, // 1: Prod-B
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 2: Logistics
                        null,
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 4: Core
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 5: QA
                        null,
                        { c: 'rgba(217, 119, 6, 0.6)', l: 'Alert' }, // 7: Labor
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 8: IT
                      ];
                      if (randStates[i]) {
                        bgCol = randStates[i].c;
                        lbl = randStates[i].l;
                      }
                    }

                    return (
                      <div key={i} style={{ background: bgCol, borderRadius: '12px', padding: '10px', fontSize: '0.7rem', border: '1px solid rgba(132, 177, 121,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transition: 'all 0.3s ease' }}>
                        <div style={{ fontWeight: '800', marginBottom: '2px', letterSpacing: '0.02em', fontSize: '0.65rem' }}>{lbl}</div>
                        <div style={{ opacity: 0.6, fontSize: '0.55rem' }}>{zones[i]}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1.25rem', fontStyle: 'italic' }}>
                  Live visual analysis across nine factory dimensions.
                </div>
              </div>
            </div>

            {/* HACKATHON WINNER: Interactive WhatsApp Chat Simulation */}
            <div className="stat-card mt-6" style={{ background: 'linear-gradient(rgba(37, 211, 102, 0.05), transparent)', border: '1px solid rgba(37, 211, 102, 0.2)' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#25D366', marginBottom: '1.5rem', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MessageCircle size={22} /> AI WhatsApp Factory Assistant (Live Sync)</span>

                {/* Real Twilio SMS Trigger */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(37,211,102,0.3)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#1E1E1E' }}>Live Demo:</span>
                  <input
                    type="text"
                    placeholder="+1234567890"
                    value={twilioPhone}
                    onChange={(e) => setTwilioPhone(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', outline: 'none', width: '120px' }}
                  />
                  <button
                    onClick={async () => {
                      if (!twilioPhone) return alert("Enter a phone number including country code (e.g., +1234567890)");
                      const msg = "SmartFactory AI Alert: I am your AI Factory Assistant. You can now reply to this thread with any custom request or approval, and I will route it to the Owner Terminal.";
                      try {
                        const res = await fetch('http://localhost:5000/api/whatsapp/send', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ to: twilioPhone.trim(), message: msg })
                        });
                        if (res.ok) {
                          setTwilioSent(true);
                          setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Live WhatsApp Alert sent via Twilio to ${twilioPhone}`, type: 'success' }, ...prev]);
                        } else {
                          alert("Failed to send WhatsApp message. Check backend Twilio setup.");
                        }
                      } catch (err) {
                        alert("Network error. Backend not running?");
                      }
                    }}
                    disabled={twilioSent}
                    style={{ background: twilioSent ? '#334155' : '#25D366', color: twilioSent ? '#84B179' : '#000', border: 'none', borderRadius: '12px', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold', cursor: twilioSent ? 'default' : 'pointer' }}
                  >
                    {twilioSent ? 'Sent ✅' : 'Send Alert 🚀'}
                  </button>
                </div>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#0b141a', padding: '1.5rem', borderRadius: '16px', backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover', backgroundBlendMode: 'overlay', border: '1px solid rgba(132, 177, 121,0.05)' }}>

                {/* Message 1: AI General Prompt */}
                <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '10px 14px', borderRadius: '0 8px 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 'bold', marginBottom: '4px' }}>Maha-Connect AI</div>
                  <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                    Welcome to Maha-Connect. I am your SmartFactory AI Assistant. <br /><br />
                    Type your custom request for the Owner Terminal below, or tap an AI suggestion pill to draft instantly.
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>

                {/* Message 2: Exact User Request */}
                {waStep >= 1 && (
                  <div style={{ alignSelf: 'flex-end', background: '#005c4b', padding: '10px 14px', borderRadius: '8px 0 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', marginTop: '8px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                      {ownerReply}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <span style={{ color: '#53bdeb', marginLeft: '2px' }}>✓✓</span></div>
                  </div>
                )}

                {/* Message 3: AI Status Update */}
                {waStep >= 1 && (
                  <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '10px 14px', borderRadius: '0 8px 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', marginTop: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 'bold', marginBottom: '4px' }}>Maha-Connect AI</div>
                    <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                      {waStep === 1 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="pulse" style={{ width: '8px', height: '8px', background: '#25D366', borderRadius: '50%' }}></div>
                          Request sent to Owner Terminal. Waiting for approval...
                        </div>
                      ) : waStep === 2 ? (
                        <div style={{ color: '#A2CB8B', fontWeight: 'bold' }}>Request Approved by Owner ✅</div>
                      ) : (
                        <div style={{ color: '#1E1E1E', fontWeight: 'bold' }}>Request Rejected by Owner ❌</div>
                      )}
                    </div>
                    {waStep >= 2 && <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>}
                  </div>
                )}
              </div>

              {/* Input Area with Suggestions */}
              {waStep === 0 && (
                <div style={{ marginTop: '1rem' }}>
                  {/* AI Suggestions Row */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {whatsappSuggestions.map(sugg => (
                      <button
                        key={sugg}
                        onClick={() => setOwnerReply(sugg)}
                        style={{ background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)', color: '#25D366', borderRadius: '12px', padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(37, 211, 102, 0.2)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)'; }}
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>

                  {/* Text Input Row */}
                  <div style={{ display: 'flex', gap: '8px', background: '#0b141a', padding: '10px', borderRadius: '24px', border: '1px solid rgba(132, 177, 121,0.1)', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Type a custom request for the Owner..."
                      value={ownerReply}
                      onChange={(e) => setOwnerReply(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter' && ownerReply.trim().length > 0) {
                          setWaStep(1); // Set to waiting status immediately
                          const req = await triggerOwnerRequest('WhatsAppAI', 'Custom Request', ownerReply.trim());
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, whatsapp: req._id }));
                        }
                      }}
                      style={{ flex: 1, background: '#2a3942', border: 'none', color: '#d1d7db', padding: '12px 16px', borderRadius: '20px', fontSize: '0.95rem', outline: 'none' }}
                    />
                    <button
                      style={{ background: '#00a884', color: '#111b21', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: ownerReply.trim().length > 0 ? 'pointer' : 'not-allowed', opacity: ownerReply.trim().length > 0 ? 1 : 0.5, transition: '0.2s' }}
                      disabled={ownerReply.trim().length === 0}
                      onClick={async () => {
                        setWaStep(1); // Set to waiting status immediately
                        const req = await triggerOwnerRequest('WhatsAppAI', 'Custom Request', ownerReply.trim());
                        if (req?._id) setActiveRequestIds(prev => ({ ...prev, whatsapp: req._id }));
                      }}
                    >
                      <svg viewBox="0 0 24 24" height="20" width="20" preserveAspectRatio="xMidYMid meet" fill="currentColor">
                        <path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>


            {renderAgentGrid(['Core Systems'], 'Core AI & Orchestration')}
          </>
        )}

        {
          activeTab === 'operations' && (
            <>
              <div className="stats-grid">
                <div className="stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div className="stat-header"><span className="stat-label">Predictive Maintenance</span><Activity size={20} color="var(--primary)" /></div>
                  <div className="stat-value" style={{ color: maintenance.maintenanceProbability?.includes('critical') ? 'var(--danger)' : 'white' }}>
                    {typeof maintenance.maintenanceProbability === 'object' ? JSON.stringify(maintenance.maintenanceProbability) : maintenance.maintenanceProbability || '0%'}
                  </div>
                  <div className="stat-label">{typeof maintenance.status === 'object' ? JSON.stringify(maintenance.status) : maintenance.status || 'Optimizing...'}</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #84B179', background: 'linear-gradient(rgba(132, 177, 121, 0.05), transparent)' }}>
                  <div className="stat-header"><span className="stat-label">Bhilwara Grid Predictor</span><Zap size={20} color="#84B179" /></div>
                  <div className="stat-value" style={{ color: '#1E1E1E', fontSize: '1.5rem' }}>Cut Warning: 2 PM</div>
                  <div className="stat-label font-bold text-red-400">Action: Pre-heat DG Sets</div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', background: '#84B179', fontSize: '0.75rem', padding: '0.5rem', border: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
                    onClick={() => alert('Generators Synced. Loom downtime prevented during load shedding.')}
                  >
                    <Cpu size={14} style={{ display: 'inline', marginRight: '4px' }} /> Auto-Sync Generators
                  </button>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                  <div className="stat-header"><span className="stat-label">Active Loom Count</span><LayoutDashboard size={20} color="var(--accent)" /></div>
                  <div className="stat-value">18 / 20</div>
                  <div className="stat-label">2 Looms in Cycle-Maint</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f97316' }}>
                  <div className="stat-header"><span className="stat-label">AI Fatigue Predictor</span><Users size={20} color="#f97316" /></div>
                  <div className="stat-value" style={{ color: '#f97316' }}>High Risk</div>
                  <div className="stat-label">Shift B (Weavers)</div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', background: '#f97316', fontSize: '0.75rem', padding: '0.5rem', border: 'none', color: '#1E1E1E', cursor: 'pointer', borderRadius: '4px' }}
                    onClick={() => {
                      alert('Shift Rotation Optimized! Relief workers assigned to Sector 4.');
                      setSafety(prev => ({ ...prev, ppeCompliance: 100 }));
                    }}
                  >
                    Optimize Shift Rotation
                  </button>
                </div>
              </div>

              {/* RESTORED: Voice-Assisted Operator Panel */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#84B179', margin: '0 0 10px 0' }}><Mic size={20} /> Voice-Assisted Operator Panel (Hindi/Marwari)</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Designed for shop-floor workers. No typing required. Just tap and speak to log downtime or request maintenance.</p>
                  </div>
                  <button className="btn-primary" style={{ background: '#84B179', color: '#1E1E1E', border: 'none', padding: '15px 30px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
                    <Mic size={18} /> Hold to Speak
                  </button>
                </div>
              </div>

              <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
                <div className="chart-container">
                  <h3 className="section-title">Live System Events Log</h3>
                  <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '10px' }}>
                    {systemEvents.map(ev => (
                      <div key={typeof ev.id === 'object' ? JSON.stringify(ev.id) : ev.id} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderBottom: '1px solid rgba(132, 177, 121,0.05)', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '600', minWidth: '60px' }}>{typeof ev.time === 'object' ? JSON.stringify(ev.time) : ev.time}</span>
                        <span style={{
                          color: ev.type === 'danger' ? 'var(--danger)' :
                            ev.type === 'warning' ? '#84B179' :
                              ev.type === 'success' ? 'var(--accent)' : 'white',
                          fontWeight: ev.type === 'danger' || ev.type === 'warning' ? '700' : '400'
                        }}>
                          {typeof ev.msg === 'object' ? JSON.stringify(ev.msg) : ev.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'rgba(132, 177, 121,0.05)', fontSize: '0.75rem', padding: '0.5rem' }}>
                    View Full Audit Log
                  </button>
                </div>
                <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(rgba(162, 203, 139, 0.1), transparent)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', marginBottom: '0.5rem' }}>SAFETY PULSE</div>
                    <div style={{ fontSize: '3rem', fontWeight: '900', color: '#A2CB8B' }}>{typeof safety.accidentFreeRecord === 'object' ? JSON.stringify(safety.accidentFreeRecord) : safety.accidentFreeRecord || '120'}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Accident-Free Days</div>
                    <div className="learning-dot active" style={{ margin: '1rem auto' }}></div>
                    <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Top 1% National Excellence</p>
                  </div>
                </div>
              </div>

              {/* RESTORED: Holographic & Quantum Orchestrator */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0%, transparent 100%)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Box size={22} color="#a855f7" />
                      <h3 style={{ margin: 0, color: '#a855f7' }}>Holographic 'Digital Twin' Analytics</h3>
                    </div>
                    <div className="pulse" style={{ width: '8px', height: '8px', background: '#84B179', borderRadius: '50%' }}></div>
                  </div>
                  <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Projected spatial AI view of machine telemetry. Visualizes invisible mechanical stress points using "Heatwave" spatial mapping.</p>
                  <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(90deg, #a855f7, #84B179)', border: 'none', color: '#1E1E1E', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Load 3D Spatial Twin</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Network size={22} color="#84B179" />
                      <h3 style={{ margin: 0, color: '#1E1E1E' }}>Quantum-Swarm 'Omni-Orchestrator'</h3>
                    </div>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #84B179', color: '#84B179', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                      GLOBAL OPTIMUM<br />99.98%
                    </div>
                  </div>
                  <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Meta-AI synchronizing all 28 agents. Micro-adjusts looms 100x/sec to perfectly balance Speed vs. Energy vs. Quality.</p>
                  <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(90deg, #84B179, #84B179)', border: 'none', color: '#1E1E1E', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Engage Universal Orchestration</button>
                </div>

                {/* RESTORED: Thermal AI Lint-Fire Predictor */}
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1E1E1E', margin: '0 0 10px 0' }}><Flame size={20} /> Thermal AI Lint-Fire Predictor</h3>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Textile mills are fire hazards. Our AI uses thermal cameras to detect "hot-spots" in accumulated lint before they ignite, automatically triggering the overhead misting system.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#1E1E1E', fontWeight: 'bold', textTransform: 'uppercase' }}>Surface Temp</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1E1E1E' }}>42<span style={{ fontSize: '1rem', color: '#1E1E1E' }}>°C</span></div>
                      <div style={{ fontSize: '0.65rem', color: '#A2CB8B', fontWeight: 'bold' }}>SAFE RANGE</div>
                    </div>
                  </div>
                </div>

                {/* RESTORED: ML 'Karigar' Skill-Atlas */}
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(132, 177, 121, 0.05) 0%, transparent 100%)', border: '1px solid rgba(132, 177, 121, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1E1E1E', margin: '0 0 10px 0' }}><Users size={20} /> ML 'Karigar' (Skill-Atlas) Indexer</h3>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Automatically maps worker output quality against specific machines and yarn types. Suggests the best weaver for complex Suiting/Shirting orders to minimize loom-stoppage.</p>
                    </div>
                    <button className="btn-primary" style={{ background: '#84B179', color: '#1E1E1E', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Assign Best Karigar</button>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ marginTop: '1.5rem' }}>
                <h3 className="section-title">Plant Floor Status</h3>
                <div className="machine-grid">
                  {machineStatus.map(m => (
                    <div key={typeof m.id === 'object' ? JSON.stringify(m.id) : m.id} className="stat-card" style={{ padding: '1.25rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                      {m.status === 'Running' && (
                        <div className="learning-dot active" style={{ position: 'absolute', top: '15px', right: '15px' }}></div>
                      )}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>{typeof m.name === 'object' ? JSON.stringify(m.name) : m.name}</div>
                        <span className={`badge ${m.status === 'Running' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.6rem' }}>{typeof m.status === 'object' ? JSON.stringify(m.status) : m.status}</span>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          <span>Loom Health</span>
                          <span>{typeof m.health === 'object' ? JSON.stringify(m.health) : m.health}%</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(132, 177, 121,0.05)', borderRadius: '3px' }}>
                          <div style={{ height: '100%', width: `${typeof m.health === 'object' ? JSON.stringify(m.health) : m.health}%`, background: m.health > 70 ? 'var(--accent)' : 'var(--danger)', borderRadius: '3px', boxShadow: `0 0 10px ${m.health > 70 ? 'rgba(162, 203, 139, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}></div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Temp</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: m.temp > 80 && m.name.includes('Loom') ? 'var(--danger)' : 'white' }}>{typeof m.temp === 'object' ? JSON.stringify(m.temp) : m.temp}°C</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>RPM/Spd</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>{typeof m.rpm === 'object' ? JSON.stringify(m.rpm) : m.rpm}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: '0.75rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.6 }}>
                        <Activity size={10} /> Vibration: <span style={{ color: m.vibration === 'High' ? 'var(--danger)' : 'var(--accent)' }}>{typeof m.vibration === 'object' ? JSON.stringify(m.vibration) : m.vibration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HACKATHON WINNER: Computer Vision Mockup */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(132, 177, 121, 0.15), transparent)', border: '1px solid rgba(132, 177, 121, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#C7EABB' }}>
                    <Video size={22} /> Live Computer Vision Defect Detection
                  </h3>
                  <span className="badge" style={{ background: '#84B179', color: '#1E1E1E' }}>MODEL: YOLOv8 (EDGE)</span>
                </div>
                <div style={{
                  width: '100%', height: '220px', background: '#000', borderRadius: '12px', position: 'relative', overflow: 'hidden',
                  backgroundImage: 'url("https://www.fibre2fashion.com/news/images/270/shutterstock_1854497641_289356.jpg")',
                  backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid #E8F5BD'
                }}>
                  {/* Simulated Scanner Line */}
                  <div style={{ position: 'absolute', top: 0, left: '30%', width: '4px', height: '100%', background: 'rgba(132, 177, 121, 0.7)', boxShadow: '0 0 15px #84B179', animation: 'scan 3s infinite linear' }}></div>
                  {/* Simulated Defect Box */}
                  <div style={{ position: 'absolute', top: '40%', left: '45%', border: '2px solid #84B179', width: '50px', height: '50px', backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                    <div style={{ background: '#84B179', color: '#1E1E1E', fontSize: '0.6rem', padding: '2px 4px', fontWeight: 'bold', position: 'absolute', top: '-18px', left: '-2px', whiteSpace: 'nowrap' }}>
                      1.2mm Yarn Breakage (97%)
                    </div>
                  </div>
                  {/* Recording indicator */}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#84B179', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                    <span style={{ fontSize: '0.7rem', color: '#1E1E1E', fontWeight: 'bold' }}>LIVE FEED - Loom 4</span>
                  </div>
                </div>
                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes scan { 0% { left: 10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 90%; opacity: 0; } }
                    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
                  ` }} />
              </div>

              {renderAgentGrid(['Operations', 'Quality Control', 'Labor & HR'], 'Production & Operations AI')}
            </>
          )
        }

        {
          activeTab === 'maintenance' && (
            <div id="maintenance-pdf-content" className="maintenance-panel animate-fade-in mesh-bg" style={{ padding: '2rem', borderRadius: '30px', minHeight: '100vh', position: 'relative', background: '#F7F9F9' }}>
              
              <div id="pdf-only-header" style={{ display: 'none', marginBottom: '2.5rem', borderBottom: '3px solid #1B2A41', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#1B2A41', padding: '10px', borderRadius: '8px' }}>
                      <Factory size={32} color="#fff" />
                    </div>
                    <div>
                      <h1 style={{ color: '#1B2A41', margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.5px' }}>SmartFactory AI</h1>
                      <div style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '2px' }}>Next-Gen Industrial Intelligence Platform</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#1B2A41', fontWeight: '900', fontSize: '1rem', textTransform: 'uppercase' }}>Industrial Analytics Report</div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', margin: '4px 0' }}>Bhilwara Textile Hub | Facility ID: TEX-BH-77</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#2E8B57' }}>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', background: '#F3F4F6', padding: '10px 15px', borderRadius: '6px', fontSize: '0.8rem', color: '#374151', borderLeft: '4px solid #C97A40' }}>
                  <strong>CONFIDENTIAL:</strong> This document contains proprietary industrial data. Certified for <strong>{pdMRole === 'Manager' ? 'Operational Management' : 'Strategic Executive'} Review</strong>.
                </div>
              </div>

              {/* --- Role Selector REMOVED FROM CONTENT (Now in Sidebar) --- */}

              {/* 1. Header & Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                  <h1 className="text-gradient-primary" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem', color: '#1B2A41' }}>
                    {pdMRole === 'Manager' ? 'Industrial Failure Report' : 'Asset Recovery & Depreciation'}
                  </h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div className="pulse" style={{ width: '8px', height: '8px', background: '#2E8B57', borderRadius: '50%' }}></div> Live Sync: Bhilwara Hub</div>
                    <span>•</span>
                    <div>Shift: <strong style={{ color: 'var(--accent)' }}>{currentShift}</strong></div>
                  </div>
                </div>
              </div>

              {/* 2. Top level metrics change based on role */}
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {pdMRole === 'Manager' ? (
                  <>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #2E8B57', background: '#fff' }}>
                      <div className="glass-icon"><Clock size={20} color="#2E8B57" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Technical Up-time</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>98.4%</div>
                    </div>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #C97A40', background: '#fff' }}>
                      <div className="glass-icon"><Activity size={20} color="#C97A40" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Vibration Index</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>{liveSensors.vibration}mm/s</div>
                    </div>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #1B2A41', background: '#fff' }}>
                      <div className="glass-icon"><Settings size={20} color="#1B2A41" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Active Work Orders</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>12</div>
                    </div>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #2E8B57', background: '#fff' }}>
                      <div className="glass-icon"><ShieldCheck size={20} color="#2E8B57" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Safety Compliance</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>100%</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #2E8B57', background: '#fff' }}>
                      <div className="glass-icon"><AlertTriangle size={20} color="#ef4444" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Total Failure Cost</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>₹4.79 Lakh</div>
                    </div>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #C97A40', background: '#fff' }}>
                      <div className="glass-icon"><DollarSign size={20} color="#2E8B57" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Cost Recovered</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2E8B57' }}>₹3.22 Lakh</div>
                    </div>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #1B2A41', background: '#fff' }}>
                      <div className="glass-icon"><ArrowUpRight size={20} color="#1B2A41" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Net Profit Gain</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>₹1.86 Lakh</div>
                    </div>
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #C97A40', background: '#fff' }}>
                      <div className="glass-icon"><TrendingUp size={20} color="#C97A40" /></div>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', margin: '10px 0 4px 0', fontWeight: 'bold' }}>Depreciation Rate</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#C97A40' }}>14.2%</div>
                    </div>
                  </>
                )}
              </div>

              {/* 3. MAIN CONTENT: Industrial Failure Analysis Report */}
              <div className="premium-card" style={{ padding: '2rem', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#1B2A41', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText color="#C97A40" /> {pdMRole === 'Manager' ? 'Operational Failure Analysis' : 'Industrial Recovery Report & Analysis'}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#6B7280' }}>Comparing Industrial Machine Failure Vectors (Loom, Dyeing, Warping)</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.7rem', background: 'transparent', border: '1px solid #1B2A41', color: '#1B2A41' }} onClick={() => alert('Accessing secure machine logs from Bhilwara Hub... Interface synchronised.')}>MACHINE LOGS</button>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '8px 20px', fontSize: '0.7rem' }}
                      onClick={async () => {
                        const btn = document.activeElement;
                        btn.innerText = 'DOWNLOADING...';
                        try {
                          const input = document.getElementById('maintenance-pdf-content');
                          const pdfHeader = document.getElementById('pdf-only-header');
                          const pdfFooter = document.getElementById('pdf-only-footer');
                          
                          // Scroll to top to ensure clean capture
                          window.scrollTo(0,0);
                          
                          // Show PDF elements
                          pdfHeader.style.display = 'block';
                          pdfFooter.style.display = 'block';
                          
                          const canvas = await html2canvas(input, {
                            scale: 2, // Higher quality for professional look
                            useCORS: true,
                            backgroundColor: '#F7F9F9',
                            logging: false,
                            windowWidth: input.scrollWidth,
                            windowHeight: input.scrollHeight
                          });
                          
                          // Hide PDF elements back
                          pdfHeader.style.display = 'none';
                          pdfFooter.style.display = 'none';

                          const imgData = canvas.toDataURL('image/png'); // Use PNG for better quality in text
                          const pdf = new jsPDF('p', 'mm', 'a4');
                          
                          const imgProps = pdf.getImageProperties(imgData);
                          const pdfWidth = pdf.internal.pageSize.getWidth();
                          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                          
                          // Add image with margins
                          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                          
                          // Set PDF properties for professionalism
                          pdf.setProperties({
                            title: `Industrial Report - ${pdMRole}`,
                            subject: 'Textile Factory Analytics',
                            author: 'SmartFactory AI',
                            keywords: 'maintenance, report, industrial, AI',
                            creator: 'SmartFactory AI System'
                          });

                          // Professional Filename
                          const fileName = `Textile-Analytics-Report-${pdMRole}-${new Date().toISOString().split('T')[0]}.pdf`;
                          
                          // Save the PDF directly (most stable across browsers)
                          pdf.save(fileName);

                        } catch (err) {
                          console.error("PDF Export Audit Error:", err);
                          alert('PDF generation failed. Please check browser permissions or try again.');
                        } finally {
                          btn.innerText = 'EXPORT PDF';
                        }
                      }}
                    >
                      EXPORT PDF
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                        <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Machine ID</th>
                        <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Failure Mode</th>
                        {pdMRole === 'Manager' ? (
                          <>
                            <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Technical Solution</th>
                            <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Status</th>
                          </>
                        ) : (
                          <>
                            <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Depreciation</th>
                            <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Fail. Cost</th>
                            <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Recovery</th>
                            <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Gain</th>
                          </>
                        )}
                        <th style={{ padding: '15px 10px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#6B7280' }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {failureReport.map((m, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6', transition: '0.2s' }} className="table-row-hover">
                          <td style={{ padding: '15px 10px' }}>
                            <div style={{ fontWeight: 'bold', color: '#1B2A41', fontSize: '0.9rem' }}>{m.id}</div>
                            <div style={{ fontSize: '0.65rem', color: '#6B7280' }}>{m.type} Unit</div>
                          </td>
                          <td style={{ padding: '15px 10px' }}>
                            <div style={{ fontSize: '0.85rem', color: m.status === 'Critical' ? '#ef4444' : '#1B2A41', display: 'flex', alignItems: 'center', gap: '5px' }}>
                              {m.status === 'Critical' && <AlertTriangle size={14} />} {m.failureMode}
                            </div>
                          </td>
                          {pdMRole === 'Manager' ? (
                            <>
                              <td style={{ padding: '15px 10px' }}>
                                <div style={{ fontSize: '0.8rem', color: '#4B5563', fontStyle: 'italic', maxWidth: '200px' }}>{m.solution}</div>
                              </td>
                              <td style={{ padding: '15px 10px' }}>
                                <span style={{
                                  padding: '4px 10px', borderRadius: '20px', fontSize: '0.6rem', fontWeight: '900',
                                  background: m.status === 'Critical' ? 'rgba(239,68,68,0.1)' : m.status === 'Warning' ? 'rgba(201,122,64,0.1)' : 'rgba(46,139,87,0.1)',
                                  color: m.status === 'Critical' ? '#ef4444' : m.status === 'Warning' ? '#C97A40' : '#2E8B57'
                                }}>
                                  {m.status.toUpperCase()}
                                </span>
                              </td>
                            </>
                          ) : (
                            <>
                              <td style={{ padding: '15px 10px', color: '#C97A40', fontWeight: 'bold', fontSize: '0.85rem' }}>{m.depreciation}</td>
                              <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#ef4444', fontSize: '0.85rem' }}>₹{(m.costOfFailure / 1000).toFixed(1)}k</td>
                              <td style={{ padding: '15px 10px', color: '#2E8B57', fontWeight: 'bold', fontSize: '0.85rem' }}>₹{(m.costRecovery / 1000).toFixed(1)}k</td>
                              <td style={{ padding: '15px 10px', color: '#1B2A41', fontWeight: 'bold', fontSize: '0.85rem' }}>₹{(m.profitGain / 1000).toFixed(1)}k</td>
                            </>
                          )}
                          <td style={{ padding: '15px 10px' }}>
                            <button style={{ background: 'transparent', border: 'none', color: '#2E8B57', cursor: 'pointer' }}>
                              <ArrowUpRight size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. Comparison Chart Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="premium-card" style={{ padding: '2rem', background: '#fff' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1B2A41', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BarChart3 size={20} color="#1B2A41" /> {pdMRole === 'Manager' ? 'Technical Machine Health (%)' : 'Asset Financial Comparison (₹k)'}
                  </h3>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={failureReport}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis dataKey="id" fontSize={11} stroke="#6B7280" />
                        <YAxis fontSize={11} stroke="#6B7280" />
                        <Tooltip
                          cursor={{ fill: 'rgba(27,42,65,0.02)' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        {pdMRole === 'Manager' ? (
                          <>
                            <Bar dataKey="uptime" name="Uptime %" fill="#2E8B57" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="technicalRisk" name="Risk Score" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          </>
                        ) : (
                          <>
                            <Bar dataKey="costOfFailure" name="Failure Cost" fill="#1B2A41" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="costRecovery" name="Cost Recovery" fill="#2E8B57" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="profitGain" name="Net Gain" fill="#C97A40" radius={[4, 4, 0, 0]} />
                          </>
                        )}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="premium-card" style={{ padding: '2rem', background: '#1B2A41', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BrainCircuit size={20} color="#C97A40" /> Recommended Solutions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #C97A40' }}>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6 }}>Immediate Action</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '4px 0' }}>W-01 Logic Calibration</div>
                      <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>Recalibrating CPU clusters to prevent ₹2.1L production loss.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #2E8B57' }}>
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6 }}>Recovery Strategy</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '4px 0' }}>Bulk Asset Overhaul</div>
                      <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0 }}>Syncing maintenance shift to low-load windows improves net profit by 8.4%.</p>
                    </div>
                    <button
                      className="btn-primary"
                      style={{ background: '#2E8B57', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', transition: '0.3s' }}
                      onClick={() => alert("Dispatching AI-driven technical solutions to shop floor edge nodes...")}
                    >
                      IMPLEMENT ALL SOLUTIONS
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Live Failure Pulse Waveform */}
              <div className="premium-card" style={{ padding: '2rem', background: '#fff', borderRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1B2A41', margin: 0 }}>Machine Failure Probability (Fleet Pulse)</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C97A40' }}></div> Vibration</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1B2A41' }}></div> Stress</div>
                  </div>
                </div>
                <div style={{ height: '120px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={failureTrend}>
                      <defs>
                        <linearGradient id="failGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C97A40" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#C97A40" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="risk" stroke="#C97A40" strokeWidth={3} fill="url(#failGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <style dangerouslySetInnerHTML={{ __html: `
                .table-row-hover:hover { background: rgba(27,42,65,0.02); }
                .text-gradient-primary { background: linear-gradient(to right, #1B2A41, #2E8B57); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .btn-primary:active { transform: scale(0.98); }
                @media print {
                  .sidebar, .header, nav, .btn-primary, [style*="position: absolute; top: 1rem"] { display: none !important; }
                  .main-content { margin-left: 0 !important; padding: 0 !important; }
                  .maintenance-panel { padding: 0 !important; border-radius: 0 !important; background: #fff !important; }
                  .premium-card { box-shadow: none !important; border: 1px solid #eee !important; break-inside: avoid; }
                  body { background: #fff !important; }
                }
              ` }} />

              {/* --- PDF ONLY FOOTER (HIDDEN IN UI) --- */}
              <div id="pdf-only-footer" style={{ display: 'none', marginTop: '4rem', borderTop: '2px solid #E5E7EB', paddingTop: '1.5rem', fontSize: '0.75rem', color: '#6B7280' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#1B2A41', fontWeight: 'bold', marginBottom: '5px' }}>Technical Methodology</div>
                    <p style={{ margin: 0 }}>
                      This report was autonomously generated by SmartFactory AI v4.2 Edge Nodes. 
                      Predictive Maintenance (PdM) vectors are verified using multi-modal sensor fusion. 
                      All financial metrics (Depreciation, Cost Recovery) align with industrial standard accounting.
                    </p>
                  </div>
                  <div style={{ flex: 1, textAlign: 'right', marginLeft: '40px' }}>
                    <div style={{ color: '#1B2A41', fontWeight: 'bold', marginBottom: '5px' }}>Digital Signature</div>
                    <div style={{ border: '1px dashed #D1D5DB', padding: '10px', borderRadius: '4px', display: 'inline-block', minWidth: '150px', textAlign: 'center' }}>
                      <span style={{ fontSize: '1rem', color: '#1B2A41', fontWeight: 'bold' }}>AI-Verified/v4.2</span>
                      <div style={{ fontSize: '0.6rem', color: '#9CA3AF' }}>UUID: {Math.random().toString(36).substr(2, 12).toUpperCase()}</div>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '0.65rem' }}>Page 1 of 1</div>
                  </div>
                </div>
              </div>
            </div>
          )
        }



        {
          activeTab === 'textile' && (
            <div className="textile-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Production Flow</span><Cpu size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof textileFlow.rejectionRate === 'object' ? JSON.stringify(textileFlow.rejectionRate) : textileFlow.rejectionRate || '0'}%</div>
                  <div className="stat-label">Rejection Rate (Grey to Finished)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #0ea5e9', background: 'linear-gradient(rgba(14, 165, 233, 0.05), transparent)' }}>
                  <div className="stat-header"><span className="stat-label">AI ZLD Water Monitor</span><Droplets size={20} color="#0ea5e9" /></div>
                  <div className="stat-value" style={{ color: '#0ea5e9' }}>94% Reused</div>
                  <div className="stat-label">pH imbalance in Dye Tank 2</div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', background: '#0ea5e9', fontSize: '0.75rem', padding: '0.5rem', border: 'none', color: '#1E1E1E', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
                    onClick={() => alert('Chemical Dosing Adjusted via IoT! ZLD (Zero Liquid Discharge) Compliance Restored.')}
                  >
                    <Wind size={14} style={{ display: 'inline', marginRight: '4px' }} /> Auto-Adjust Dosing
                  </button>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Labor skill index</span><Users size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof laborSkill.overallScore === 'object' ? JSON.stringify(laborSkill.overallScore) : laborSkill.overallScore || '78'}/100</div>
                  <div className="stat-label">Bhilwara Cluster Avg: 72</div>
                </div>
              </div>

              {/* FEATURE: Grey to Finished Fabric Tracking */}
              <div className="stat-card" style={{ marginTop: '1.5rem', padding: '2rem' }}>
                <h3 className="section-title">Grey Fabric to Finished Fabric Flow</h3>
                {/* AI Learning Mode / Simulation Banner */}
                {isAiLearningMode && (
                  <div style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.2) 0%, rgba(132, 177, 121, 0.2) 100%)',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'pulse-glow 2s infinite'
                  }}>
                    <BrainCircuit size={20} color="#0ea5e9" />
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0ea5e9' }}>
                      AI LEARNING MODE ACTIVE:
                    </span>
                    <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                      Simulator is modeling "What-If" scenarios based on current production data. Insights are projected.
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(132, 177, 121, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><Layers size={24} color="var(--primary)" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Grey</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{typeof textileFlow.greyProduced === 'object' ? JSON.stringify(textileFlow.greyProduced) : textileFlow.greyProduced || 0}m</div>
                  </div>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(132, 177, 121,0.1)', margin: '0 10px', marginTop: '-30px', position: 'relative' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--primary)', opacity: 0.3 }}></div>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(162, 203, 139, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><Droplets size={24} color="var(--accent)" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Dyed</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{typeof textileFlow.dyedCompleted === 'object' ? JSON.stringify(textileFlow.dyedCompleted) : textileFlow.dyedCompleted || 0}m</div>
                  </div>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(132, 177, 121,0.1)', margin: '0 10px', marginTop: '-30px', position: 'relative' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--accent)', opacity: 0.3 }}></div>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(132, 177, 121, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><CheckCircle size={24} color="#84B179" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Finished</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{typeof textileFlow.finishedCompleted === 'object' ? JSON.stringify(textileFlow.finishedCompleted) : textileFlow.finishedCompleted || 0}m</div>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(162, 203, 139, 0.05)', border: '1px solid rgba(162, 203, 139, 0.1)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, color: 'var(--accent)' }}>Workflow Optimization Engine</h4>
                      <span style={{ fontSize: '0.7rem', padding: '4px 8px', background: 'rgba(14, 165, 233, 0.2)', border: '1px solid #0ea5e9', borderRadius: '4px', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '4px' }}><BrainCircuit size={12} /> XGBoost Classifier</span>
                    </div>
                    <span className="badge" style={{ background: 'var(--accent)', color: '#000' }}>+{typeof workflowOpt.projectedEfficiencyGain === 'object' ? JSON.stringify(workflowOpt.projectedEfficiencyGain) : workflowOpt.projectedEfficiencyGain || '0%'} GAIN</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <BrainCircuit size={20} color="var(--accent)" style={{ marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px' }}>Bottleneck Detected: {typeof workflowOpt.bottleneck === 'object' ? JSON.stringify(workflowOpt.bottleneck) : workflowOpt.bottleneck || 'None'}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{typeof workflowOpt.recommendedAction === 'object' ? JSON.stringify(workflowOpt.recommendedAction) : workflowOpt.recommendedAction || 'All systems are operating at peak efficiency.'}</div>

                      {workflowOpt.bottleneck && workflowOpt.bottleneck !== 'None' && (
                        <button
                          style={{ marginTop: '1rem', background: 'var(--accent)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                          onClick={() => {
                            alert('Resource reallocation executed! Synchronizing production speeds...');
                            setWorkflowOpt(prev => ({ ...prev, bottleneck: 'Resolved', recommendedAction: 'Flow synchronized successfully.', projectedEfficiencyGain: 'Optimized' }));
                          }}
                        >
                          Execute Reassignment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={16} color="var(--danger)" />
                  <span><strong>AI Flow Analytics:</strong> {typeof textileFlow.bottleneck === 'object' ? JSON.stringify(textileFlow.bottleneck) : textileFlow.bottleneck || 'Analyzing production steps for bottlenecks...'}</span>
                </div>
              </div>

              {/* RESTORED: AI Mending Copilot */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(234, 179, 8, 0.05) 0%, transparent 100%)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#eab308', margin: '0 0 10px 0' }}><CheckCircle size={20} /> AI Mending (Quality Repair) Copilot</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Bridges Loom Computer Vision data directly to manual mending workers. Instead of checking an entire 100m roll manually, the AI points the worker exactly to the defect locations.</p>
                  </div>
                  <button className="btn-primary" style={{ background: '#eab308', color: 'black', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wind size={18} /> Alert Mending Team
                  </button>
                </div>
              </div>

              {/* SECTION: Yarn Count */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'rgba(132, 177, 121, 0.05)' }}>
                <h3 className="section-title">Yarn Count & Fabric Mix Optimization</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Suggested Count</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{typeof yarnOpt.suggestedCount === 'object' ? JSON.stringify(yarnOpt.suggestedCount) : yarnOpt.suggestedCount || '30s Cotton'}</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Cost Saving per kg</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent)' }}>₹{typeof yarnOpt.costSavingPerKg === 'object' ? JSON.stringify(yarnOpt.costSavingPerKg) : yarnOpt.costSavingPerKg || '12.5'}</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Blend Quality Factor</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{typeof yarnOpt.qualityFactor === 'object' ? JSON.stringify(yarnOpt.qualityFactor) : yarnOpt.qualityFactor || 'Exquisite'}</div>
                  </div>
                </div>
              </div>

              {/* RESTORED: GSM Auto-Corrector */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.05) 0%, transparent 100%)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899', margin: '0 0 10px 0' }}><Activity size={20} /> Real-Time GSM (Fabric Weight) Auto-Corrector</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Bhilwara's main cause of buyer rejection is uneven GSM. AI monitors yarn tension and automatically adjusts the take-up roller speed to keep GSM perfectly flat at 170g.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: '#f472b6', fontWeight: 'bold' }}>GSM:</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1E1E1E' }}>170<span style={{ fontSize: '1rem', color: '#1E1E1E' }}>g</span></div>
                    </div>
                    <button className="btn-primary" style={{ background: '#ec4899', color: '#1E1E1E', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Settings size={18} /> Auto-Calibrate
                    </button>
                  </div>
                </div>
              </div>

              {/* RESTORED: Chindi Matchmaker */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(162, 203, 139, 0.05) 0%, transparent 100%)', border: '1px solid rgba(162, 203, 139, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A2CB8B', margin: '0 0 10px 0' }}><Recycle size={20} /> AI 'Chindi' (Textile Waste) Matchmaker</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Stop sending fabric waste to the landfill. Our AI tracks your current "Chindi" volume and instantly matches you with local Bhilwara recyclers buying at the best per-kg rate.</p>
                  </div>
                  <span className="badge" style={{ background: '#A2CB8B', color: 'black', fontWeight: '900' }}>CIRCULAR ECONOMY</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#1E1E1E', textTransform: 'uppercase', marginBottom: '5px' }}>Current Scrap Volume</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1E1E1E' }}>420 kg</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#1E1E1E', textTransform: 'uppercase', marginBottom: '5px' }}>Market Rate (Bhilwara)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#A2CB8B' }}>₹12 / kg</div>
                  </div>
                  <button className="btn-primary" style={{ background: '#A2CB8B', color: 'black', border: 'none', padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', height: '100%' }}>
                    Sell Scrap Locally
                  </button>
                </div>
              </div>

              {/* RESTORED: Textile Operations Premium Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, #0b1e2a 0%, transparent 100%)', border: '1px solid #0ea5e9', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '8px' }}><Droplets size={20} /> ZLD (Zero Liquid Discharge) Water Optimizer</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Optimizes chemical dosing in the recycling plant based on dye-waste turbidity. Maximizes water recovery in Bhilwara's water-scarce environment.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0ea5e9' }}>88.4%</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.6, letterSpacing: '1px' }}>RECOVERY RATE</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#A2CB8B' }}>₹8.2k</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.6, letterSpacing: '1px' }}>SLUDGE SAVING</div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#0ea5e9', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><RefreshCcw size={16} style={{ display: 'inline', marginRight: '8px' }} /> Optimize Water Dosing</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, #1f1406 0%, transparent 100%)', border: '1px solid #f97316', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#f97316', display: 'flex', alignItems: 'center', gap: '8px' }}><Fingerprint size={20} /> Micro-Texture 'Fabric Fingerprint'</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Uses Deep-CV to map the unique microscopic weave of every Bhilwara roll. Generates a blockchain-ready authenticity certificate to prevent counterfeits.</p>
                    </div>
                    <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '8px 16px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f97316' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#f97316', letterSpacing: '1px' }}>GENUINE</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Roll #BH902-X</div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#f97316', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Authenticate Roll Texture</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(162, 203, 139, 0.1) 0%, transparent 100%)', border: '1px solid rgba(162, 203, 139, 0.3)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                      <h3 style={{ margin: '0 0 5px 0', color: '#A2CB8B', display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={20} /> Mewari-Dialect 'Anuvad' Voice-to-Log</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Captures local weaver slang and translates it into formal ISO-compliant audit logs. Bridges the communication gap for export-quality documentation.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontStyle: 'italic', color: '#A2CB8B', fontSize: '0.9rem' }}>"Loom me hichki hai"</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', color: '#84B179' }}><ArrowRight size={12} /> Periodic oscillation in motor drive detected.</div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#A2CB8B', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><Mic size={16} style={{ display: 'inline', marginRight: '8px' }} /> Listen to Karigar Slang</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#1E1E1E', display: 'flex', alignItems: 'center', gap: '8px' }}><Wand2 size={20} /> 'Virasat' (Heritage) Pattern GenAI</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Infuses traditional Bandhani/Phad mathematical logic into modern export-grade weave patterns. Creates a "Bhilwara-Exclusive" premium product line.</p>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: 'radial-gradient(circle, #84B179 2px, transparent 2px)', backgroundSize: '8px 8px', opacity: 0.5, borderRadius: '4px' }}></div>
                  </div>
                  <button className="btn-primary" style={{ background: '#84B179', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Generate Heritage Weave</button>
                </div>
              </div>

              {renderAgentGrid(['Supply Chain', 'Sustainability'], 'Supply Chain & Sustainability AI')}
            </div>
          )
        }





        {
          activeTab === 'finance' && (
            <div className="finance-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(162, 203, 139, 0.1) 0%, rgba(199, 234, 187, 0) 100%)' }}>
                  <div className="stat-header"><span className="stat-label">Real-Time Profit Margin</span><DollarSign size={20} color="var(--accent)" /></div>
                  <div className="stat-value">₹{typeof profit.monthlyProfit === 'object' ? JSON.stringify(profit.monthlyProfit) : profit.monthlyProfit || '0'} Cr</div>
                  <div className="stat-label">Projection (Next 30D)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Credit & Payment Risk</span><ShieldCheck size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof creditRisk.riskScore === 'object' ? JSON.stringify(creditRisk.riskScore) : creditRisk.riskScore || 'Low'}</div>
                  <div className="stat-label">Status: {typeof creditRisk.status === 'object' ? JSON.stringify(creditRisk.status) : creditRisk.status || 'Excellent'}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cost Optimization</span><Cpu size={20} color="var(--primary)" /></div>
                  <div className="stat-value">₹{typeof costOptimization.totalSavings === 'object' ? JSON.stringify(costOptimization.totalSavings) : costOptimization.totalSavings || '1.2'}L</div>
                  <div className="stat-label">Potential Monthly Savings</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cost per Meter</span><Activity size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof profit.costPerMeter === 'object' ? JSON.stringify(profit.costPerMeter) : profit.costPerMeter || '₹8.50'}</div>
                  <div className="stat-label">Textile Cluster Benchmark</div>
                </div>
              </div>

              {/* RESTORED: Finance Arbitrage Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #E8F5BD 0%, #172554 100%)', border: '1px solid #84B179', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, color: '#93c5fd', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={16} /> Global Price Arbitrage</h4>
                    <span style={{ fontSize: '0.6rem', color: '#84B179', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>London/Bursa/China</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E1E1E', marginBottom: '8px' }}>Arbitrage Gap: +₹14.2/m</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>Detected price-drop in Turkish cotton yarn. Buy window open for next 3 hours.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#84B179', border: 'none', color: '#1E1E1E', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/arbitrage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ commodity: 'cotton', market: 'Bursa', volume: 500 }) }); const data = await res.json(); alert(data.message || 'Arbitrage locked successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/arbitrage. Please ensure the backend is running.'); } }}>Lock Arbitrage Window</button>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #E8F5BD 0%, #064e3b 100%)', border: '1px solid #A2CB8B', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, color: '#C7EABB', fontSize: '1rem' }}>AI Cash-Crunch Predictor</h4>
                    <Landmark size={18} color="#A2CB8B" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#A2CB8B', marginBottom: '8px' }}>Deficit Risk: 14 Days</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>₹12 Lakh locked in unpaid invoices. Recommending immediate factoring.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#A2CB8B', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/cash-crunch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ totalUnpaid: 1200000, deficitDays: 14 }) }); const data = await res.json(); alert(data.message || 'Invoice factoring initiated successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/cash-crunch. Please ensure the backend is running.'); } }}><RefreshCcw size={14} style={{ display: 'inline', marginRight: '6px' }} /> Auto-Factor Unpaid Invoices</button>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #E8F5BD 0%, #84B179 100%)', border: '1px solid #84B179', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, color: '#E8F5BD', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={16} /> AI 'Bahi-Khata' Scanner</h4>
                    <span style={{ fontSize: '0.6rem', color: '#1E1E1E', fontWeight: 'bold', letterSpacing: '1px', background: 'rgba(132, 177, 121,0.2)', padding: '2px 6px', borderRadius: '4px' }}>LEGACY SYNC</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E1E1E', marginBottom: '8px' }}>Digital Conversion Ready</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>Detected handwritten Marwari/Hindi ledger entries in red 'Bahi-Khata'. Extraction is pending.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: 'transparent', border: '1px solid #84B179', color: '#E8F5BD', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/ledger-scan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ledgerType: 'Bahi-Khata', language: 'Marwari/Hindi' }) }); const data = await res.json(); alert(data.message || 'Ledger scanned and synced successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/ledger-scan. Please ensure the backend is running.'); } }}><FileScan size={14} style={{ display: 'inline', marginRight: '6px' }} /> Scan & Sync Traditional Ledger</button>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #E8F5BD 0%, #422006 100%)', border: '1px solid #eab308', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, color: '#fde047', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={16} /> AI 'Mahajan' Trust-Score</h4>
                    <span style={{ fontSize: '0.6rem', color: '#eab308', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>Cluster Reputation</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#eab308', marginBottom: '8px' }}>A+ (Trust Index: 94)</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>Peer-verified reputation for payment punctuality & quality consistency in Bhilwara.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/trust-score', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ score: 'A+', trustIndex: 94, suppliers: 15 }) }); const data = await res.json(); alert(data.message || 'Trust-Score shared successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/trust-score. Please ensure the backend is running.'); } }}>Share Trust-Score with Suppliers</button>
                  </div>
                </div>
              </div>

              <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card">
                  <h3 className="section-title">Payment Cycle & Credit Risk Tracker</h3>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Avg. Payment Collection Period</span>
                      <span style={{ fontWeight: '700' }}>{typeof creditRisk.avgCollectionDays === 'object' ? JSON.stringify(creditRisk.avgCollectionDays) : creditRisk.avgCollectionDays || '28'} Days</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>ECGC Export Insurance</span>
                      <span style={{ color: 'var(--accent)', fontWeight: '700' }}>COVERED (Grade A)</span>
                    </div>
                    <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(162, 203, 139, 0.1)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--accent)' }}>
                      High-trust buyer network detected in current pipeline.
                    </div>
                  </div>
                </div>

                <div className="chart-container">
                  <h3 className="section-title">Cost Breakdown & Optimization Target</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={costBreakdown.length > 0 ? costBreakdown : [
                      { name: 'Labor', target: 80, actual: 70 },
                      { name: 'Yarn', target: 90, actual: 85 },
                      { name: 'Power', target: 60, actual: 40 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="name" stroke="#84B179" />
                      <YAxis stroke="#84B179" />
                      <Tooltip contentStyle={{ background: '#E8F5BD', border: 'none' }} />
                      <Bar dataKey="actual" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="rgba(132, 177, 121,0.1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {renderAgentGrid(['Finance'], 'Finance & Sector Analytics AI')}
            </div>
          )
        }

        {
          activeTab === 'strategy' && (
            <div className="strategy-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card" style={{ border: '1px solid var(--accent)', background: 'rgba(162, 203, 139, 0.05)' }}>
                  <div className="stat-header"><span className="stat-label">MSME Growth Score</span><TrendingUp size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof digitalMaturity === 'object' ? JSON.stringify(digitalMaturity) : digitalMaturity || 0}/100</div>
                  <div className="stat-label">Digital Transformation Index</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cluster Rank</span><Award size={20} color="var(--primary)" /></div>
                  <div className="stat-value">TOP 15%</div>
                  <div className="stat-label">Bhilwara Textile Cluster</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Subsidy Status</span><Building2 size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof govSchemes.tufsStatus === 'object' ? JSON.stringify(govSchemes.tufsStatus) : govSchemes.tufsStatus || 'Eligible'}</div>
                  <div className="stat-label">TUFS / RIPS Potential</div>
                </div>
              </div>

              <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card">
                  <h3 className="section-title">Eligible MSME Schemes</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {govSchemes.eligibleSchemes && govSchemes.eligibleSchemes.length > 0 ? govSchemes.eligibleSchemes.map((s, i) => (
                      <div key={i} style={{ padding: '1rem', background: 'rgba(162, 203, 139, 0.1)', borderLeft: '3px solid var(--accent)', borderRadius: '8px', fontSize: '0.9rem' }}>
                        <strong>{s}</strong>
                      </div>
                    )) : (
                      <div style={{ opacity: 0.6 }}>No specific schemes detected for current investment profile.</div>
                    )}
                  </div>
                </div>

                <div className="stat-card">
                  <h3 className="section-title">Strategic ROI Insights</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(132, 177, 121, 0.1)', borderRadius: '12px' }}>
                      <p style={{ fontWeight: '700', marginBottom: '5px' }}>Solar Transition ROI</p>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Current solar at {typeof solar.solarPercentage === 'object' ? JSON.stringify(solar.solarPercentage) : solar.solarPercentage || 0}%. Increasing to 40% will save ₹85,000/month in power costs.</p>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px' }}>
                      <p style={{ fontWeight: '700', marginBottom: '5px' }}>Labor Skill Impact</p>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Workers are {typeof laborSkill.overallScore === 'object' ? JSON.stringify(laborSkill.overallScore) : laborSkill.overallScore || 0}% proficient. 10 hours of extra training will boost PEI by 4%.</p>
                    </div>
                  </div>
                </div>
              </div>
              {renderAgentGrid(['Core Systems', 'Finance'], 'Strategic Intelligence AI')}
            </div>
          )
        }

        {
          activeTab === 'agents' && (
            <div className="agents-panel animate-fade-in" style={{ paddingBottom: '2rem' }}>
              <div className="stat-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(90deg, rgba(132, 177, 121, 0.1) 0%, transparent 100%)', border: '1px solid rgba(132, 177, 121, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ padding: '12px', background: 'var(--primary)', borderRadius: '12px' }}>
                    <Bot size={32} color="#fff" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>SmartFactory AI: The Power of 52</h2>
                    <p style={{ opacity: 0.6, margin: 0, marginTop: '4px' }}>Browse the complete directory of 52 specialized autonomous agents powering the Nirvana factory.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {agentsData.map(agent => (
                  <div key={typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id} style={{
                    background: 'rgba(132, 177, 121,0.02)',
                    border: '1px solid rgba(132, 177, 121,0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    transition: 'all 0.2s',
                    cursor: 'default'
                  }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(132, 177, 121, 0.05)'; e.currentTarget.style.borderColor = 'rgba(132, 177, 121, 0.3)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(132, 177, 121,0.02)'; e.currentTarget.style.borderColor = 'rgba(132, 177, 121,0.05)'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(132, 177, 121,0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{typeof agent.category === 'object' ? JSON.stringify(agent.category) : agent.category}</span>
                      {agent.status === 'Active' ? <span style={{ color: 'var(--accent)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.5s infinite' }}></div> Active</span> : <span style={{ color: 'var(--warning)', fontSize: '0.7rem' }}>Learning Mode</span>}
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.3 }}>{typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id}. {typeof agent.name === 'object' ? JSON.stringify(agent.name) : agent.name}</div>

                    {agent.risk !== 'Low' && agent.risk !== 'N/A' && (
                      <div style={{ fontSize: '0.75rem', color: agent.risk.includes('Critical') ? 'var(--danger)' : 'var(--warning)' }}>
                        Alert Policy: <strong>{typeof agent.risk === 'object' ? JSON.stringify(agent.risk) : agent.risk}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        }

        {
          activeTab === 'gov' && (
            <div className="gov-panel animate-fade-in">
              <div className="stat-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(90deg, #E8F5BD 0%, #E8F5BD 100%)', border: '1px solid #0ea5e9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ padding: '12px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px' }}>
                    <Building2 size={32} color="#0ea5e9" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Bhilwara MSME Gov-Portal</h2>
                    <p style={{ opacity: 0.6, margin: 0 }}>Integrated Hub for Textile Subsidies & Benefits</p>
                  </div>
                </div>
              </div>

              <div className="charts-grid">
                <div className="stat-card">
                  <h3 className="section-title">Active Applications</h3>
                  <div style={{ opacity: 0.6, textAlign: 'center', padding: '2rem' }}>
                    <Database size={48} style={{ marginBottom: '10px' }} />
                    <p style={{ margin: '1rem 0' }}>Connect your Udyam Aadhar to track live applications.</p>
                    <button className="btn-cyan-gradient" style={{ padding: '10px 30px', border: 'none', borderRadius: '8px', color: '#1E1E1E', fontWeight: '700', cursor: 'pointer', background: '#0ea5e9' }}>LINK TO UDYAM</button>
                  </div>
                </div>
                <div className="stat-card">
                  <h3 className="section-title">Cluster Notifications</h3>
                  <div className="recommendations-list">
                    <div className="alert alert-info" style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', fontSize: '0.85rem' }}>New Rajasthan Energy Policy (2024) released for Textile Clusters.</div>
                    <div className="alert alert-info" style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', fontSize: '0.85rem' }}>Deadline for SITP Interest Subvention: Oct 31st.</div>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(14, 165, 233, 0.1), transparent)' }}>
                <h3 className="section-title" style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Factory size={22} /> Rajasthan MSME Policy Support
                </h3>
                <div className="stats-grid" style={{ marginTop: '2rem' }}>
                  <div style={{ padding: '1.5rem', background: 'rgba(132, 177, 121,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: '800', color: '#0ea5e9' }}>PMEGP Eligibility</div>
                    <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{govSchemes.pmegpEligible ? 'Qualified ✅' : 'Review Needed ⏳'}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Subsidy: Up to 35% of project cost.</div>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'rgba(132, 177, 121,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: '800', color: '#0ea5e9' }}>CLCSS (Tech Upgrade)</div>
                    <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>High Probability</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>15% capital subsidy for machinery.</div>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'rgba(132, 177, 121,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: '800', color: '#0ea5e9' }}>RIPS 2022 Benefits</div>
                    <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Eligible (Textile Focus)</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Electricity duty & Land tax exemptions.</div>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'rgba(162, 203, 139, 0.05)' }}>
                <h4 style={{ marginBottom: '1rem' }}>Live Government Insights for Bhilwara</h4>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>AI recommends applying for **M-SME Excellence Awards** based on your current PEI of {typeof pei === 'object' ? JSON.stringify(pei) : pei}% and ZLD compliance status.</p>
                <button className="btn-primary" style={{ marginTop: '1.5rem', background: '#0ea5e9', color: '#1E1E1E', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Download Compliance Report</button>
              </div>

              {/* HACKATHON WINNER: GenAI Auto-Filler */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(236, 72, 153, 0.1), transparent)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899' }}>
                    <Wand2 size={22} /> GenAI Subsidy Auto-Filler
                  </h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Tired of complex government forms? Our Generative AI reads your factory's live data (production, power, employment) and instantly drafts the Rajasthan RIPS 2022 subsidy application.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <button
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ec4899', color: '#1E1E1E', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                    onClick={() => alert('GenAI is drafting your RIPS 2022 application... Factory data extracted successfully! PDF generated.')}
                  >
                    <Bot size={18} /> GENERATE RIPS APPLICATION
                  </button>
                </div>
              </div>
              {renderAgentGrid(['Finance'], 'MSME Compliance & Growth AI')}
            </div>
          )
        }

      </main>

      {/* 9. Shift Simulation Modal */}
      {showShiftModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <div className="stat-card" style={{ width: '90%', maxWidth: '500px', background: '#E8F5BD', border: '1px solid #84B179', borderRadius: '16px', padding: '2rem', animation: 'slideUp 0.3s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#1E1E1E', display: 'flex', alignItems: 'center', gap: '10px' }}><Cpu /> Shift Simulation Output</h2>
              <button onClick={() => setShowShiftModal(false)} style={{ background: 'transparent', border: 'none', color: '#1E1E1E', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h3 style={{ fontSize: '1rem', color: '#84B179', marginBottom: '1rem' }}>Predicted 8-Hour Shift Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Expected Failures</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{liveSensors.temp > 85 ? 3 : 1}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Probable Downtime</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E1E1E' }}>{liveSensors.temp > 85 ? '120 min' : '30 min'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Estimated Shift Loss</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E1E1E' }}>₹{liveSensors.temp > 85 ? '45,000' : '8,500'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>AI Optimization Path</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#A2CB8B' }}>Dynamic ✓</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.9rem', background: 'rgba(132, 177, 121,0.05)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ color: '#A2CB8B', fontWeight: 'bold' }}>AI ADVANTAGE:</span> Scheduling Loom #4 maintenance at 2 PM saves ₹4,200 in idle labor costs.
                </div>
              </div>

              <button className="btn-primary" style={{ background: '#84B179', color: '#1E1E1E', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { alert('Adjustment strategies applied to floor controllers.'); setShowShiftModal(false); }}>
                APPLY OPTIMIZATION STRATEGY
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        @keyframes pulse-glow { 0% { box-shadow: 0 0 5px rgba(132, 177, 121, 0.2); } 50% { box-shadow: 0 0 20px rgba(132, 177, 121, 0.6); } 100% { box-shadow: 0 0 5px rgba(132, 177, 121, 0.2); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
        .animate-scan { position: relative; overflow: hidden; }
        .animate-scan::after { content: ""; position: absolute; left: 0; right: 0; height: 2px; background: rgba(162, 203, 139, 0.5); box-shadow: 0 0 10px rgba(162, 203, 139, 0.8); animation: scan 3s linear infinite; }
      `}</style>
    </div>
  );
}

