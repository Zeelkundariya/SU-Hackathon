/**
 * Advanced Predictive Maintenance Module
 * Features: Acoustic Analysis, Heat Correction, RUL, and Textile-specific Anomaly Detection
 */

module.exports.calculateAdvancedPdM = ({
    vibration = 45,     // in Hz
    temp = 35,          // in C
    uptime = 500,       // hours
    ambientTemp = 38,   // external Bhilwara weather
    acousticFreq = 2,    // noise frequency in kHz
    powerConsumption = 4.2, // kW
    speedRpm = 1800,     // RPM
    humidity = 65,       // % (Critical for yarn quality)
    dustLevel = 150       // µg/m³
}) => {
    // 1. Heat Stress Correction (Rajasthan Logic)
    const heatCorrectionFactor = ambientTemp > 40 ? 1.2 : 1.0;
    const effectiveTemp = temp * heatCorrectionFactor;

    // 2. Anomaly Detection Logic
    const acousticRisk = acousticFreq > 8 ? 40 : acousticFreq > 4 ? 15 : 0;
    const vibrationRisk = vibration > 100 ? 60 : vibration > 85 ? 45 : vibration > 65 ? 15 : 0;
    const heatRisk = effectiveTemp > 90 ? 30 : effectiveTemp > 75 ? 10 : 0;
    const powerAnomaly = (powerConsumption > 6.5 || powerConsumption < 1.5) ? 20 : 0;

    // 3. Textile-Specific Faults
    const yarnBreakageRisk = (humidity < 40 || humidity > 85 || dustLevel > 400) ? "High" : "Low";
    const loomStoppageRisk = vibrationRisk > 20 ? "Elevated" : "Normal";
    
    // 4. Health Score (0-100)
    let totalRisk = (acousticRisk + vibrationRisk + heatRisk + powerAnomaly);
    const healthScore = Math.max(0, 100 - (totalRisk / 1.5)).toFixed(1);

    // 5. RUL (Remaining Useful Life) Calculation
    const decayFactor = (vibration * 0.4) + (effectiveTemp * 0.3) + (powerConsumption * 5);
    const RUL_Hours = Math.max(0, 2000 - decayFactor).toFixed(0);

    // 6. AI Spare Parts Predictor
    const partsRequired = [];
    if (vibrationRisk > 30) partsRequired.push({ part: "Motor Mounts & Balancing Weights", inStock: true, cost: "₹1,500" });
    if (acousticRisk > 30) partsRequired.push({ part: "Spindle Bearings (SKF-X7)", inStock: false, cost: "₹4,500" });
    if (heatRisk > 20) partsRequired.push({ part: "Thermal Exhaust Filter", inStock: true, cost: "₹350" });
    if (powerAnomaly > 0) partsRequired.push({ part: "3-Phase Contactor Relay", inStock: true, cost: "₹1,200" });
    if (yarnBreakageRisk === "High") partsRequired.push({ part: "Humidifier Micro-Nozzle", inStock: true, cost: "₹850" });
    
    if (partsRequired.length === 0) {
        partsRequired.push({ part: "None (System Healthy)", inStock: true, cost: "₹0" });
    }

    // 7. Production Impact Analysis
    const possibleDowntimeHours = (100 - healthScore) * 0.5;
    const impactPerHour = 5000;
    const productionLossEstimate = (possibleDowntimeHours * impactPerHour).toFixed(0); // ₹5000/hr loss
    
    // 8. Financial ROI / Maintenance Costs vs Savings
    const preventionCost = RUL_Hours < 100 ? 15000 : 2500;
    const potentialSavings = (RUL_Hours < 50) ? (impactPerHour * 24) - preventionCost : Math.max(0, productionLossEstimate - preventionCost);

    return {
        healthScore,
        remainingLifeHours: RUL_Hours,
        failureProbability: `${Math.min(100, (100 - healthScore) * 1.5).toFixed(1)}%`,
        status: healthScore < 40 ? "CRITICAL" : healthScore < 75 ? "WARNING" : "HEALTHY",
        partsRequired,
        productionLossEstimate: `₹${parseInt(productionLossEstimate).toLocaleString()}`,
        netSavingsPotential: `₹${parseInt(potentialSavings).toLocaleString()}`,
        maintenanceSchedule: RUL_Hours < 50 ? "Now" : `${Math.floor(RUL_Hours / 24)} days`,
        sensors: {
            power: `${powerConsumption} kW`,
            rpm: speedRpm,
            humidity: `${humidity}%`,
            dust: `${dustLevel} µg/m³`
        },
        textileInsights: {
            yarnBreakageRisk,
            loomStoppageRisk,
            fabricDefectProb: `${(vibrationRisk / 2).toFixed(1)}%`
        }
    };
};
