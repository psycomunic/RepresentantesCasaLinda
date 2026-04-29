import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

interface BrazilMapProps {
    leads: any[];
}

// GeoJSON for Brazil states
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/brazil/br-states.json";

export const BrazilMap: React.FC<BrazilMapProps> = ({ leads }) => {
    // Compute lead density by state
    const stateCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        leads.forEach(lead => {
            const uf = lead.estado?.toUpperCase().trim();
            if (uf) {
                counts[uf] = (counts[uf] || 0) + 1;
            }
        });
        return counts;
    }, [leads]);

    const maxCount = Math.max(...Object.values(stateCounts), 1);

    // Helper to get color based on count
    const getColor = (count: number) => {
        if (!count || count === 0) return "#1A1A1A"; // default empty state (brand dark) // bg-[#1A1A1A]

        // Calculate intensity (0.2 to 1.0)
        const intensity = 0.2 + (0.8 * (count / maxCount));

        // We want a gold color: rgba(197,160,89, alpha)
        return `rgba(197, 160, 89, ${Math.min(intensity, 1)})`;
    };

    return (
        <div className="w-full h-full relative border border-white/5 rounded-3xl bg-white/[0.01] overflow-hidden flex flex-col justify-center items-center">
            <div className="absolute top-6 left-8 z-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-1">Origem dos Leads</h3>
                <p className="text-[10px] text-white/40 mb-4">Mapeamento nacional de interesse</p>

                {/* Simple Legend */}
                <div className="flex items-center gap-2 mt-4 text-[10px] text-white/50 bg-black/40 p-2 rounded-lg backdrop-blur-sm border border-white/5 inline-flex">
                    <div className="w-3 h-3 rounded-full bg-[#1A1A1A] border border-white/10"></div> <span className="mr-2">0</span>
                    <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(197, 160, 89, 0.2)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(197, 160, 89, 0.6)' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(197, 160, 89, 1)' }}></div>
                    <span className="ml-1">+{maxCount} Leads</span>
                </div>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 650, center: [-54, -15] }} // Centered on Brazil
                className="w-full h-full md:h-[400px] outline-none"
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            // The matching field for the state acronym may vary depending on the TopoJSON.
                            // Often it's `geo.properties.HASC_1` (e.g. "BR.SP"). We extract the UF.
                            const hasc = geo.properties.HASC_1 || "";
                            const uf = hasc.split('.')[1] || geo.properties.id || ""; // fallback

                            const count = stateCounts[uf] || 0;
                            const color = getColor(count);

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={color}
                                    stroke="#333333"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: count > 0 ? "#E5C06A" : "#2a2a2a", outline: "none", cursor: 'pointer', transition: 'all 200ms' },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};
