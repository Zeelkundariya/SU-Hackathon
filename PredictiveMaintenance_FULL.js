// ============================================================
// PREDICTIVE MAINTENANCE - Enhanced Industrial Failure Analysis
// Includes Manager & Strategic Owner views as per user request.
// ============================================================

import React, { useState, useEffect } from "react";
import api from "../api";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell, Legend
} from 'recharts';
import {
  Zap, DollarSign, Activity, Settings, Package,
  BrainCircuit, CheckCircle, Thermometer, Wind,
  Bot, Bell, Map, Layout, Waves, History,
  Clock, ShieldAlert, RotateCcw, TrendingUp,
  FileText, ShieldCheck, PieChart, AlertTriangle, ArrowUpRight
} from 'lucide-react';

export default function PredictiveMaintenance() {
  // ---------- user role state for dual dashboard ----------
  const [role, setRole] = useState('Manager'); // 'Manager' or 'Owner'

  // ---------- failure report data ----------
  const [failureReport, setFailureReport] = useState([
    {
      id: 'L-01',
      name: 'Loom #1 (Primary)',
      type: 'Loom',
      failureMode: 'Spindle Bearing Degraded',
      costOfFailure: 125000,
      depreciation: '15.2%',
      costRecovery: 85000,
      profitGain: 42000,
      solution: 'Lubrication + Dynamic Load Re-balancing',
      status: 'Critical'
    },
    {
      id: 'D-01',
      name: 'Dyeing Jet #1',
      type: 'Dyeing',
      failureMode: 'Hydraulic Seal Leak',
      costOfFailure: 89000,
      depreciation: '8.4%',
      costRecovery: 45000,
      profitGain: 31000,
      solution: 'Replace Seal + Recalibrate Pressure Valve',
      status: 'Warning'
    },
    {
      id: 'W-01',
      name: 'Warper MC #2',
      type: 'Warping',
      failureMode: 'Logic Controller Glitch',
      costOfFailure: 210000,
      depreciation: '22.1%',
      costRecovery: 180000,
      profitGain: 95000,
      solution: 'AI Path Correction + CPU Heat-sink Upgrade',
      status: 'Critical'
    },
    {
      id: 'S-01',
      name: 'Spinning Frame #4',
      type: 'Spinning',
      failureMode: 'Motor Commutator Wear',
      costOfFailure: 55000,
      depreciation: '11.0%',
      costRecovery: 12000,
      profitGain: 18500,
      solution: 'Full Overhaul scheduled for Shift C',
      status: 'Healthy'
    }
  ]);

  // ---------- standard states ----------
  const [manualData] = useState(JSON.parse(localStorage.getItem('manualFactoryData')) || {});
  const [advancedPdM, setAdvancedPdM] = useState({});
  const [systemEvents, setSystemEvents] = useState([
    { id: 1, time: '10:42:15', msg: 'AI: Failure Analysis Report Generated', type: 'info' },
    { id: 2, time: '10:40:02', msg: 'Recovery Plan: Cost extraction active', type: 'success' },
    { id: 3, time: '10:35:44', msg: 'Admin: Depreciation metrics updated', type: 'warning' }
  ]);

  const [liveSensors, setLiveSensors] = useState({
    temp: 72, tempTrend: 2, vibration: 45, vibrationTrend: 5,
    power: 4.2, pressure: 45, status: 'Running'
  });

  const [failureTrend, setFailureTrend] = useState([
    { time: '24h ago', risk: 10 }, { time: '18h ago', risk: 15 },
    { time: '12h ago', risk: 18 }, { time: '6h ago', risk: 22 }, { time: 'Now', risk: 30 }
  ]);

  // ---------- live updates ----------
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSensors(prev => ({
        ...prev,
        vibration: prev.vibration + (Math.random() > 0.5 ? 2 : -2),
        temp: prev.temp + (Math.random() > 0.5 ? 1 : -1)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.post("/ai/advanced-pdm", {
      vibration: 45, temp: 35, uptime: 500,
      ambientTemp: 38, acousticFreq: 2, powerConsumption: 4.2,
      speedRpm: 1800, humidity: 65, dustLevel: 150
    }).then(r => setAdvancedPdM(r.data)).catch(() => {});
  }, []);

  // ============================================================
  //  RENDER LOGIC
  // ============================================================
  return (
    <div className="maintenance-panel animate-fade-in mesh-bg" 
         style={{ padding: '2rem', borderRadius: '30px', minHeight: '100vh', background: 'var(--bg-dark)' }}>

      {/* ── Role Selector (Top Right) ── */}
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
        <div style={{ background: 'rgba(27,42,65,0.05)', padding: '4px', borderRadius: '12px', display: 'flex', border: '1px solid rgba(27,42,65,0.1)' }}>
          <button 
            onClick={() => setRole('Manager')}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: role === 'Manager' ? '#1B2A41' : 'transparent',
              color: role === 'Manager' ? '#fff' : '#1B2A41',
              fontWeight: 'bold', fontSize: '0.75rem', transition: '0.3s'
            }}>
            MANAGER VIEW
          </button>
          <button 
            onClick={() => setRole('Owner')}
            style={{ 
              padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: role === 'Owner' ? '#1B2A41' : 'transparent',
              color: role === 'Owner' ? '#fff' : '#1B2A41',
              fontWeight: 'bold', fontSize: '0.75rem', transition: '0.3s'
            }}>
            STRATEGIC OWNER
          </button>
        </div>
      </div>

      {/* 1. Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="text-gradient-primary" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem', color: '#1B2A41' }}>
          {role === 'Manager' ? 'Operational Failure Report' : 'Strategic Maintenance Dashboard'}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="pulse" style={{ width: '8px', height: '8px', background: '#2E8B57', borderRadius: '50%' }}></div> 
            {role === 'Manager' ? 'Live Technical Telemetry' : 'Financial Impact Sync Active'}
          </div>
          <span>•</span>
          <div>Enterprise: <strong>Bhilwara Textiles MC-1</strong></div>
        </div>
      </div>

      {/* 2. Top level metrics change based on role */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {role === 'Manager' ? (
          <>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #2E8B57', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Technical Up-time</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>98.4%</div>
              <div style={{ fontSize: '0.7rem', color: '#2E8B57', marginTop: '5px' }}>Optimal Sync Rate</div>
            </div>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #C97A40', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Vibration Index</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>{liveSensors.vibration}mm/s</div>
              <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '5px' }}>+5% Spike detected</div>
            </div>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #1B2A41', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Open Work Orders</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>12</div>
              <div style={{ fontSize: '0.7rem', color: '#4B5563', marginTop: '5px' }}>4 Critical Jobs</div>
            </div>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #2E8B57', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Sensor Health</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>94%</div>
              <div style={{ fontSize: '0.7rem', color: '#2E8B57', marginTop: '5px' }}>Bhilwara Hub Online</div>
            </div>
          </>
        ) : (
          <>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #2E8B57', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Total Failure Cost</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>₹4,79,000</div>
              <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '5px' }}>Loss across 3 units</div>
            </div>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #C97A40', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Cost Recovered</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2E8B57' }}>₹3,22,000</div>
              <div style={{ fontSize: '0.7rem', color: '#2E8B57', marginTop: '5px' }}>+12% vs last month</div>
            </div>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #1B2A41', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Profit Gain (AI Shift)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1B2A41' }}>₹1,86,500</div>
              <div style={{ fontSize: '0.7rem', color: '#1B2A41', marginTop: '5px' }}>Optimization yield</div>
            </div>
            <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #2E8B57', background: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '4px', fontWeight: 'bold' }}>Asset Depreciation</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#C97A40' }}>14.2%</div>
              <div style={{ fontSize: '0.7rem', color: '#C97A40', marginTop: '5px' }}>Weighted Avg.</div>
            </div>
          </>
        )}
      </div>

      {/* 3. MAIN CONTENT: Industrial Failure Analysis Report */}
      <div className="premium-card" style={{ padding: '2rem', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#1B2A41', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText color="#C97A40" /> {role === 'Manager' ? 'Failure Analysis & Operational Solutions' : 'Asset Depreciation & Recovery Comparison'}
            </h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#6B7280' }}>Comparing Industrial Machine Failure Vectors (Loom, Dyeing, Warping)</p>
          </div>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>EXPORT PDF REPORT</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Machine ID</th>
                <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Failure Mode</th>
                {role === 'Manager' ? (
                  <>
                    <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Solution Advisory</th>
                    <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Status</th>
                  </>
                ) : (
                  <>
                    <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Fail. Cost</th>
                    <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Depreciation</th>
                    <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Recovery</th>
                    <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Profit Gain</th>
                  </>
                )}
                <th style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6B7280' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {failureReport.map((m, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6', transition: '0.2s' }} className="table-row-hover">
                  <td style={{ padding: '15px 10px' }}>
                    <div style={{ fontWeight: 'bold', color: '#1B2A41' }}>{m.id}</div>
                    <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>{m.name}</div>
                  </td>
                  <td style={{ padding: '15px 10px' }}>
                    <div style={{ fontSize: '0.85rem', color: m.status === 'Critical' ? '#ef4444' : '#1B2A41', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {m.status === 'Critical' && <AlertTriangle size={14} />} {m.failureMode}
                    </div>
                  </td>
                  {role === 'Manager' ? (
                    <>
                      <td style={{ padding: '15px 10px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#4B5563', fontStyle: 'italic', maxWidth: '250px' }}>{m.solution}</div>
                      </td>
                      <td style={{ padding: '15px 10px' }}>
                         <span style={{ 
                           padding: '4px 10px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '800',
                           background: m.status === 'Critical' ? 'rgba(239,68,68,0.1)' : m.status === 'Warning' ? 'rgba(201,122,64,0.1)' : 'rgba(46,139,87,0.1)',
                           color: m.status === 'Critical' ? '#ef4444' : m.status === 'Warning' ? '#C97A40' : '#2E8B57'
                         }}>
                           {m.status.toUpperCase()}
                         </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#1B2A41' }}>₹{(m.costOfFailure/1000).toFixed(1)}k</td>
                      <td style={{ padding: '15px 10px', color: '#C97A40', fontWeight: 'bold' }}>{m.depreciation}</td>
                      <td style={{ padding: '15px 10px', color: '#2E8B57', fontWeight: 'bold' }}>₹{(m.costRecovery/1000).toFixed(1)}k</td>
                      <td style={{ padding: '15px 10px', color: '#1B2A41', fontWeight: 'bold' }}>₹{(m.profitGain/1000).toFixed(1)}k</td>
                    </>
                  )}
                  <td style={{ padding: '15px 10px' }}>
                     <button style={{ background: 'transparent', border: 'none', color: '#2E8B57', cursor: 'pointer', fontWeight: 'bold' }}>
                        <ArrowUpRight size={18} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. CHARTS COMPARISON */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="premium-card" style={{ padding: '2rem', background: '#fff' }}>
           <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1B2A41', marginBottom: '1.5rem' }}>Data Comparison: Failure Cost vs. Recovery (₹)</h3>
           <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={failureReport}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="id" fontSize={11} stroke="#6B7280" />
                  <YAxis fontSize={11} stroke="#6B7280" />
                  <Tooltip 
                    cursor={{fill: 'rgba(27,42,65,0.02)'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                  <Bar dataKey="costOfFailure" name="Failure Cost" fill="#1B2A41" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="costRecovery" name="Cost Recovery" fill="#2E8B57" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="premium-card" style={{ padding: '2rem', background: '#1B2A41', color: '#fff' }}>
           <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fff', marginBottom: '1.5rem' }}>Strategic Solution Plan</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '15px', borderLeft: '4px solid #C97A40' }}>
                 <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Priority Fix</div>
                 <div style={{ fontSize: '1rem', fontWeight: 'bold', margin: '5px 0' }}>W-01 Warping MC Repair</div>
                 <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Deploying thermal shielding to recover 85% of logic efficiency by 4PM.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '15px', borderLeft: '4px solid #2E8B57' }}>
                 <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Recovery Tip</div>
                 <div style={{ fontSize: '1rem', fontWeight: 'bold', margin: '5px 0' }}>Bulk Lube Upgrade</div>
                 <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Standardizing grease viscosity across fleet reduces depreciation by 2.1%/yr.</p>
              </div>
              <button 
                className="btn-primary" 
                style={{ background: '#2E8B57', color: '#fff', border: 'none', padding: '12px', marginTop: '10px' }}
                onClick={() => alert("Dispatching AI Solutions to shop-floor edge nodes.")}
              >
                APPLY ALL SOLUTIONS
              </button>
           </div>
        </div>
      </div>

      {/* 5. Live Failure Pulse Waveform */}
      <div className="premium-card" style={{ padding: '2rem', background: '#fff' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1B2A41', marginBottom: '1.5rem' }}>Predictive Failure Probability Graph</h3>
        <div style={{ height: '150px' }}>
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

      {/* Style Overrides */}
      <style>{`
        .table-row-hover:hover {
          background: rgba(27,42,65,0.02);
        }
        .text-gradient-primary {
          background: linear-gradient(to right, #1B2A41, #2E8B57);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .premium-card {
          border-radius: 20px;
          border: 1px solid rgba(27,42,65,0.05);
          transition: 0.3s;
        }
        .btn-primary {
          background: #1B2A41;
          color: #fff;
          border-radius: 12px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(27,42,65,0.2);
        }
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        .pulse {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
